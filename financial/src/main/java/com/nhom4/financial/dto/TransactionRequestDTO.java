package com.nhom4.financial.dto;

import java.util.Date;

public class TransactionRequestDTO {
    private double amount;
    private String description;
    private Long categoryId;
    private Date date;
    private String type; // "income" hoặc "expense"

    // Getters, setters
    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public Long getCategoryId() { return categoryId; }
    public void setCategoryId(Long categoryId) { this.categoryId = categoryId; }
    public Date getDate() { return date; }
    public void setDate(Date date) { this.date = date; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
}