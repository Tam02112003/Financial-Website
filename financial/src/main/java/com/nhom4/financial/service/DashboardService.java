package com.nhom4.financial.service;

import com.nhom4.financial.entity.Transaction;
import com.nhom4.financial.repository.TransactionRepository;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class DashboardService {
    private final TransactionRepository transactionRepository;

    public DashboardService(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    public Map<String, Object> getDashboardData(Long userId) {
        List<Transaction> transactions = transactionRepository.findByUserId(userId);

        double totalIncome = transactions.stream()
                .filter(t -> "income".equals(t.getType()))
                .mapToDouble(Transaction::getAmount)
                .sum();
        double totalExpense = transactions.stream()
                .filter(t -> "expense".equals(t.getType()))
                .mapToDouble(Transaction::getAmount)
                .sum();
        double balance = totalIncome - totalExpense;

        Map<String, Object> chartData = new HashMap<>();
        transactions.stream()
                .filter(t -> "expense".equals(t.getType()))
                .collect(Collectors.groupingBy(
                        t -> t.getCategory().getName(),
                        Collectors.summingDouble(Transaction::getAmount)))
                .forEach(chartData::put);

        Map<String, Object> data = new HashMap<>();
        data.put("totalIncome", totalIncome);
        data.put("totalExpense", totalExpense);
        data.put("balance", balance);
        data.put("chartData", chartData);

        return data;
    }
}