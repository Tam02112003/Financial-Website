package com.nhom4.financial.dto;

public class SummaryReportDTO {
    private double totalIncome;
    private double totalExpense;
    private double balance;

    public SummaryReportDTO(double totalIncome, double totalExpense, double balance) {
        this.totalIncome = totalIncome;
        this.totalExpense = totalExpense;
        this.balance = balance;
    }

    // Getters, setters
    public double getTotalIncome() { return totalIncome; }
    public void setTotalIncome(double totalIncome) { this.totalIncome = totalIncome; }
    public double getTotalExpense() { return totalExpense; }
    public void setTotalExpense(double totalExpense) { this.totalExpense = totalExpense; }
    public double getBalance() { return balance; }
    public void setBalance(double balance) { this.balance = balance; }
}