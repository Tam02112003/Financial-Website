package com.nhom4.financial.dto;

public class AccountDTO {
    private String username;
    private String email;

    public AccountDTO(String username, String email) {
        this.username = username;
        this.email = email;
    }

    // Getters, setters
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
}