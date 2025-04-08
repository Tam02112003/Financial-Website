package com.nhom4.financial.dto;

import java.util.Date;

public class TransactionDTO {
    private Long id;
    private double amount;
    private String description;
    private Date date;
    private String type;
    private String categoryName;

    // Constructor
    public TransactionDTO(Long id, double amount, String description, Date date, String type, String categoryName) {
        this.id = id;
        this.amount = amount;
        this.description = description;
        this.date = date;
        this.type = type;
        this.categoryName = categoryName;
    }

    // Getters, setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public Date getDate() { return date; }
    public void setDate(Date date) { this.date = date; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public String getCategoryName() { return categoryName; }
    public void setCategoryName(String categoryName) { this.categoryName = categoryName; }
}