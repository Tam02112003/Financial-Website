package com.nhom4.financial.dto;

import lombok.Data;

@Data
public class AuthResponse {
    private String token;
    // Thêm constructor nhận token
    public AuthResponse(String token) {
        this.token = token;
    }

    // Constructor mặc định (nếu cần)
    public AuthResponse() {}
}