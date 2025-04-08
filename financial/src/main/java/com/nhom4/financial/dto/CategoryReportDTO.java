package com.nhom4.financial.dto;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class CategoryReportDTO {
    private Map<String, Double> incomeByCategory;  // Tổng thu nhập theo danh mục
    private Map<String, Double> expenseByCategory; // Tổng chi tiêu theo danh mục
    private List<CategoryStatDTO> categoryStats;

    public CategoryReportDTO(Map<String, Double> incomeByCategory, Map<String, Double> expenseByCategory, List<CategoryStatDTO> categoryStats) {
        this.incomeByCategory = incomeByCategory;
        this.expenseByCategory = expenseByCategory;
        this.categoryStats = categoryStats;
    }

    // Thêm phương thức getter cho categoryStats
    public List<CategoryStatDTO> getCategoryStats() {
        return categoryStats;
    }

    public CategoryReportDTO(List<CategoryStatDTO> categoryStats) {
        this.categoryStats = categoryStats;
        this.incomeByCategory = new HashMap<>();
        this.expenseByCategory = new HashMap<>();

        for (CategoryStatDTO stat : categoryStats) {
            // Giả sử bạn phân loại cho thu nhập và chi tiêu
            if (stat.getTotalAmount() > 0) {
                incomeByCategory.put(stat.getCategoryName(), stat.getTotalAmount());
            } else {
                expenseByCategory.put(stat.getCategoryName(), stat.getTotalAmount());
            }
        }
    }

    public Map<String, Double> getAllIncome() {
        return Collections.unmodifiableMap(incomeByCategory);
    }

    public Map<String, Double> getAllExpense() {
        return Collections.unmodifiableMap(expenseByCategory);
    }

    public double getTotalIncome() {
        return incomeByCategory.values().stream().mapToDouble(Double::doubleValue).sum();
    }

    public double getTotalExpense() {
        return expenseByCategory.values().stream().mapToDouble(Double::doubleValue).sum();
    }
    // Lớp DTO nội bộ
    public static class CategoryStatDTO {
        private String categoryName;
        private double totalAmount;
        private double averageAmount;
        private double percentageChange;

        public CategoryStatDTO(String categoryName, double totalAmount, double averageAmount, double percentageChange) {
            this.categoryName = categoryName;
            this.totalAmount = totalAmount;
            this.averageAmount = averageAmount;
            this.percentageChange = percentageChange;
        }

        // Getters
        public String getCategoryName() { return categoryName; }
        public double getTotalAmount() { return totalAmount; }
        public double getAverageAmount() { return averageAmount; }
        public double getPercentageChange() { return percentageChange; }
    }
    // Getters, setters
    public Map<String, Double> getIncomeByCategory() { return incomeByCategory; }
    public void setIncomeByCategory(Map<String, Double> incomeByCategory) { this.incomeByCategory = incomeByCategory; }
    public Map<String, Double> getExpenseByCategory() { return expenseByCategory; }
    public void setExpenseByCategory(Map<String, Double> expenseByCategory) { this.expenseByCategory = expenseByCategory; }

}