package com.nhom4.financial.util;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtUtil {
    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private long expiration;

    // Tạo SecretKey từ chuỗi secret
    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(secret.getBytes());
    }

    public String generateToken(String username) {
        return Jwts.builder()
                .subject(username) // Thay setSubject bằng subject
                .issuedAt(new Date()) // Thay setIssuedAt bằng issuedAt
                .expiration(new Date(System.currentTimeMillis() + expiration)) // Thay setExpiration bằng expiration
                .signWith(getSigningKey()) // Thay signWith(SignatureAlgorithm, secret) bằng signWith(SecretKey)
                .compact();
    }

    public String getUsernameFromToken(String token) {
        return Jwts.parser()
                .verifyWith(getSigningKey()) // Thay setSigningKey bằng verifyWith
                .build()
                .parseSignedClaims(token) // Thay parseClaimsJws bằng parseSignedClaims
                .getPayload()
                .getSubject();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                    .verifyWith(getSigningKey()) // Thay setSigningKey bằng verifyWith
                    .build()
                    .parseSignedClaims(token); // Thay parseClaimsJws bằng parseSignedClaims
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}