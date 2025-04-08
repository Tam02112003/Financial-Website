package com.nhom4.financial.service;

import com.nhom4.financial.dto.CategoryReportDTO;
import com.nhom4.financial.dto.TransactionDTO;
import com.nhom4.financial.dto.TransactionRequestDTO;
import com.nhom4.financial.entity.Category;
import com.nhom4.financial.entity.Transaction;
import com.nhom4.financial.entity.User;
import com.nhom4.financial.repository.CategoryRepository;
import com.nhom4.financial.repository.TransactionRepository;
import com.nhom4.financial.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class TransactionService {
    private final TransactionRepository transactionRepository;
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;

    public TransactionService(TransactionRepository transactionRepository,
                              CategoryRepository categoryRepository,
                              UserRepository userRepository) {
        this.transactionRepository = transactionRepository;
        this.categoryRepository = categoryRepository;
        this.userRepository = userRepository;
    }

    // Phương thức từ trước (danh sách giao dịch)
    public List<TransactionDTO> getTransactions(Long userId, Date startDate, Date endDate) {
        List<Transaction> transactions;
        if (startDate != null && endDate != null) {
            transactions = transactionRepository.findByUserIdAndDateRange(userId, startDate, endDate);
        } else {
            transactions = transactionRepository.findByUserId(userId);
        }
        return transactions.stream()
                .map(t -> new TransactionDTO(
                        t.getId(), t.getAmount(), t.getDescription(), t.getDate(), t.getType(),
                        t.getCategory() != null ? t.getCategory().getName() : "Uncategorized"))
                .collect(Collectors.toList());
    }

    // Phương thức mới: Thêm giao dịch
    public TransactionDTO addTransaction(Long userId, TransactionRequestDTO request) {
        try {
            // Tìm user
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new IllegalArgumentException("User not found"));

            // Tìm category
            Category category = categoryRepository.findById(request.getCategoryId())
                    .orElseThrow(() -> new IllegalArgumentException("Category not found"));

            // Kiểm tra type hợp lệ
            if (!"income".equalsIgnoreCase(request.getType()) && !"expense".equalsIgnoreCase(request.getType())) {
                throw new IllegalArgumentException("Invalid transaction type. Must be 'income' or 'expense'");
            }

            // Kiểm tra amount
            if (request.getAmount() <= 0) {
                throw new IllegalArgumentException("Amount must be greater than 0");
            }

            // Tạo transaction mới
            Transaction transaction = new Transaction();
            transaction.setAmount(request.getAmount());
            transaction.setDescription(request.getDescription());
            transaction.setDate(request.getDate() != null ? request.getDate() : new Date());
            transaction.setType(request.getType().toLowerCase());
            transaction.setCategory(category);
            transaction.setUser(user);

            // Lưu vào DB
            Transaction savedTransaction = transactionRepository.save(transaction);

            return new TransactionDTO(
                    savedTransaction.getId(),
                    savedTransaction.getAmount(),
                    savedTransaction.getDescription(),
                    savedTransaction.getDate(),
                    savedTransaction.getType(),
                    savedTransaction.getCategory().getName()
            );
        } catch (Exception e) {
            throw new RuntimeException("Failed to add transaction: " + e.getMessage(), e);
        }
    }

    public void deleteTransaction(Long userId, Long transactionId) {
        Transaction transaction = transactionRepository.findById(transactionId)
                .orElseThrow(() -> new IllegalArgumentException("Transaction not found"));

        // Kiểm tra quyền sở hữu
        if (!transaction.getUser().getId().equals(userId)) {
            throw new IllegalArgumentException("Unauthorized to delete this transaction");
        }

        transactionRepository.delete(transaction);
    }

    // Phương thức mới: Lấy chi tiết giao dịch
    public TransactionDTO getTransactionById(Long userId, Long transactionId) {
        Transaction transaction = transactionRepository.findById(transactionId)
                .orElseThrow(() -> new IllegalArgumentException("Transaction not found"));

        // Kiểm tra quyền sở hữu
        if (!transaction.getUser().getId().equals(userId)) {
            throw new IllegalArgumentException("Unauthorized access to transaction");
        }

        return new TransactionDTO(
                transaction.getId(), transaction.getAmount(), transaction.getDescription(),
                transaction.getDate(), transaction.getType(),
                transaction.getCategory() != null ? transaction.getCategory().getName() : "Uncategorized");
    }

    // Phương thức mới: Cập nhật giao dịch
    public TransactionDTO updateTransaction(Long userId, Long transactionId, TransactionRequestDTO request) {
        Transaction transaction = transactionRepository.findById(transactionId)
                .orElseThrow(() -> new IllegalArgumentException("Transaction not found"));

        // Kiểm tra quyền sở hữu
        if (!transaction.getUser().getId().equals(userId)) {
            throw new IllegalArgumentException("Unauthorized access to transaction");
        }

        // Tìm category
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new IllegalArgumentException("Category not found"));

        // Kiểm tra type hợp lệ
        if (!"income".equals(request.getType()) && !"expense".equals(request.getType())) {
            throw new IllegalArgumentException("Invalid transaction type");
        }

        // Cập nhật thông tin
        transaction.setAmount(request.getAmount());
        transaction.setDescription(request.getDescription());
        transaction.setDate(request.getDate() != null ? request.getDate() : transaction.getDate());
        transaction.setType(request.getType());
        transaction.setCategory(category);

        // Lưu vào DB
        Transaction updatedTransaction = transactionRepository.save(transaction);

        // Trả về DTO
        return new TransactionDTO(
                updatedTransaction.getId(), updatedTransaction.getAmount(), updatedTransaction.getDescription(),
                updatedTransaction.getDate(), updatedTransaction.getType(), updatedTransaction.getCategory().getName());
    }


    public CategoryReportDTO getCategoryStats(Long userId, Date startDate, Date endDate) {
        // 1. Lấy tất cả giao dịch trong khoảng thời gian
        List<Transaction> transactions = transactionRepository.findByUserIdAndDateBetween(userId, startDate, endDate);

        if (transactions.isEmpty()) {
            return new CategoryReportDTO(new HashMap<>(), new HashMap<>(), Collections.emptyList());
        }

        // 2. Tách income và expense riêng biệt
        Map<String, Double> incomeByCategory = new HashMap<>();
        Map<String, Double> expenseByCategory = new HashMap<>();
        Map<String, CategoryStatData> statDataMap = new HashMap<>();

        // 3. Tính toán số tháng cho average
        long months = ChronoUnit.MONTHS.between(
                startDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate(),
                endDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate()
        ) + 1;

        // 4. Xử lý từng giao dịch
        for (Transaction t : transactions) {
            String categoryName = t.getCategory() != null ? t.getCategory().getName() : "Uncategorized";
            double amount = t.getAmount();

            if ("income".equalsIgnoreCase(t.getType())) {
                incomeByCategory.merge(categoryName, amount, Double::sum);

                // Chuẩn bị dữ liệu cho stats
                statDataMap.computeIfAbsent(categoryName, k -> new CategoryStatData())
                        .addIncome(amount);
            } else if ("expense".equalsIgnoreCase(t.getType())) {
                expenseByCategory.merge(categoryName, amount, Double::sum);

                // Chuẩn bị dữ liệu cho stats
                statDataMap.computeIfAbsent(categoryName, k -> new CategoryStatData())
                        .addExpense(amount);
            }
        }

        // 5. Tạo danh sách thống kê chi tiết
        List<CategoryReportDTO.CategoryStatDTO> stats = new ArrayList<>();

        statDataMap.forEach((categoryName, data) -> {
            // Tính % change cho từng loại
            double incomePercentageChange = calculatePercentageChange(
                    userId, data.incomeCategoryId, startDate, endDate, "income");
            double expensePercentageChange = calculatePercentageChange(
                    userId, data.expenseCategoryId, startDate, endDate, "expense");

            // Thêm thống kê income nếu có
            if (data.totalIncome > 0) {
                stats.add(new CategoryReportDTO.CategoryStatDTO(
                        categoryName,
                        data.totalIncome,
                        data.totalIncome / months,
                        incomePercentageChange
                ));
            }

            // Thêm thống kê expense nếu có
            if (data.totalExpense > 0) {
                stats.add(new CategoryReportDTO.CategoryStatDTO(
                        categoryName,
                        data.totalExpense,
                        data.totalExpense / months,
                        expensePercentageChange
                ));
            }
        });

        return new CategoryReportDTO(incomeByCategory, expenseByCategory, stats);
    }

    // Lớp helper để lưu trữ tạm thời
    private static class CategoryStatData {
        Long incomeCategoryId;
        Long expenseCategoryId;
        double totalIncome;
        double totalExpense;

        void addIncome(double amount) {
            this.totalIncome += amount;
        }

        void addExpense(double amount) {
            this.totalExpense += amount;
        }
    }

    // Sửa lại phương thức calculatePercentageChange
    private double calculatePercentageChange(Long userId, Long categoryId,
                                             Date currentStart, Date currentEnd,
                                             String type) {
        if (categoryId == null) return 0.0;

        // Tính toán khoảng thời gian tháng trước
        Calendar cal = Calendar.getInstance();
        cal.setTime(currentStart);
        cal.add(Calendar.MONTH, -1);
        cal.set(Calendar.DAY_OF_MONTH, 1);
        Date previousStart = cal.getTime();

        cal.setTime(currentEnd);
        cal.add(Calendar.MONTH, -1);
        cal.set(Calendar.DAY_OF_MONTH, cal.getActualMaximum(Calendar.DAY_OF_MONTH));
        Date previousEnd = cal.getTime();

        // Lấy tổng theo loại
        Double previousTotal = transactionRepository.sumAmountByUserAndCategoryAndTypeAndDateBetween(
                userId, categoryId, type, previousStart, previousEnd);
        Double currentTotal = transactionRepository.sumAmountByUserAndCategoryAndTypeAndDateBetween(
                userId, categoryId, type, currentStart, currentEnd);

        // Xử lý các trường hợp đặc biệt
        if (previousTotal == null || previousTotal == 0) {
            return currentTotal != null && currentTotal > 0 ? 100.0 : 0.0;
        }

        if (currentTotal == null || currentTotal == 0) {
            return -100.0;
        }

        return ((currentTotal - previousTotal) / previousTotal) * 100;
    }

}