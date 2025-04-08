package com.nhom4.financial.service;

import com.nhom4.financial.dto.CategoryReportDTO;
import com.nhom4.financial.dto.SummaryReportDTO;
import com.nhom4.financial.dto.TransactionDTO;
import com.nhom4.financial.entity.Transaction;
import com.nhom4.financial.repository.TransactionRepository;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class ReportService {
    private final TransactionRepository transactionRepository;

    public ReportService(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    public SummaryReportDTO getSummaryReport(Long userId, String timeRange) {
        Calendar calendar = Calendar.getInstance();
        Date endDate = calendar.getTime();
        Date startDate;

        switch (timeRange.toLowerCase()) {
            case "day":
                calendar.set(Calendar.HOUR_OF_DAY, 0);
                calendar.set(Calendar.MINUTE, 0);
                calendar.set(Calendar.SECOND, 0);
                calendar.set(Calendar.MILLISECOND, 0);
                startDate = calendar.getTime();
                break;
            case "week":
                calendar.set(Calendar.DAY_OF_WEEK, calendar.getFirstDayOfWeek());
                calendar.set(Calendar.HOUR_OF_DAY, 0);
                calendar.set(Calendar.MINUTE, 0);
                calendar.set(Calendar.SECOND, 0);
                calendar.set(Calendar.MILLISECOND, 0);
                startDate = calendar.getTime();
                break;
            case "month":
                calendar.set(Calendar.DAY_OF_MONTH, 1);
                calendar.set(Calendar.HOUR_OF_DAY, 0);
                calendar.set(Calendar.MINUTE, 0);
                calendar.set(Calendar.SECOND, 0);
                calendar.set(Calendar.MILLISECOND, 0);
                startDate = calendar.getTime();
                break;
            default:
                throw new IllegalArgumentException("Invalid time range. Use 'day', 'week', or 'month'");
        }

        List<Transaction> transactions = transactionRepository.findByUserIdAndDateRange(userId, startDate, endDate);
        double totalIncome = transactions.stream()
                .filter(t -> "income".equals(t.getType()))
                .mapToDouble(Transaction::getAmount)
                .sum();
        double totalExpense = transactions.stream()
                .filter(t -> "expense".equals(t.getType()))
                .mapToDouble(Transaction::getAmount)
                .sum();
        double balance = totalIncome - totalExpense;

        return new SummaryReportDTO(totalIncome, totalExpense, balance);
    }

    public CategoryReportDTO getCategoryReport(Long userId, String timeRange) {
        // Xác định khoảng thời gian
        Calendar calendar = Calendar.getInstance();
        Date endDate = calendar.getTime();
        Date startDate;

        switch (timeRange.toLowerCase()) {
            case "day":
                calendar.set(Calendar.HOUR_OF_DAY, 0);
                calendar.set(Calendar.MINUTE, 0);
                calendar.set(Calendar.SECOND, 0);
                calendar.set(Calendar.MILLISECOND, 0);
                startDate = calendar.getTime();
                break;
            case "week":
                calendar.set(Calendar.DAY_OF_WEEK, calendar.getFirstDayOfWeek());
                calendar.set(Calendar.HOUR_OF_DAY, 0);
                calendar.set(Calendar.MINUTE, 0);
                calendar.set(Calendar.SECOND, 0);
                calendar.set(Calendar.MILLISECOND, 0);
                startDate = calendar.getTime();
                break;
            case "month":
                calendar.set(Calendar.DAY_OF_MONTH, 1);
                calendar.set(Calendar.HOUR_OF_DAY, 0);
                calendar.set(Calendar.MINUTE, 0);
                calendar.set(Calendar.SECOND, 0);
                calendar.set(Calendar.MILLISECOND, 0);
                startDate = calendar.getTime();
                break;
            default:
                throw new IllegalArgumentException("Invalid time range. Use 'day', 'week', or 'month'");
        }

        // Lấy danh sách giao dịch trong khoảng thời gian
        List<Transaction> transactions = transactionRepository.findByUserIdAndDateRange(userId, startDate, endDate);
        List<CategoryReportDTO.CategoryStatDTO> stats = new ArrayList<>();
        // Tính tổng thu nhập theo danh mục
        Map<String, Double> incomeByCategory = transactions.stream()
                .filter(t -> "income".equals(t.getType()))
                .collect(Collectors.groupingBy(
                        t -> t.getCategory() != null ? t.getCategory().getName() : "Uncategorized",
                        Collectors.summingDouble(Transaction::getAmount)
                ));

        // Tính tổng chi tiêu theo danh mục
        Map<String, Double> expenseByCategory = transactions.stream()
                .filter(t -> "expense".equals(t.getType()))
                .collect(Collectors.groupingBy(
                        t -> t.getCategory() != null ? t.getCategory().getName() : "Uncategorized",
                        Collectors.summingDouble(Transaction::getAmount)
                ));

        return new CategoryReportDTO(incomeByCategory, expenseByCategory, stats);
    }
    // Phương thức mới: Báo cáo chi tiết
    public List<TransactionDTO> getDetailedReport(Long userId, Date startDate, Date endDate) {
        if (startDate == null || endDate == null) {
            throw new IllegalArgumentException("Start date and end date are required");
        }

        List<Transaction> transactions = transactionRepository.findByUserIdAndDateRange(userId, startDate, endDate);
        return transactions.stream()
                .map(t -> new TransactionDTO(
                        t.getId(), t.getAmount(), t.getDescription(), t.getDate(), t.getType(),
                        t.getCategory() != null ? t.getCategory().getName() : "Uncategorized"))
                .collect(Collectors.toList());
    }
}