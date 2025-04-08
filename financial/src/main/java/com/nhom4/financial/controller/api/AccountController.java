package com.nhom4.financial.controller.api;

import com.nhom4.financial.dto.AccountDTO;
import com.nhom4.financial.dto.AccountUpdateDTO;
import com.nhom4.financial.service.AccountService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/account")
public class AccountController {
    private final AccountService accountService;

    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    // Xem thông tin tài khoản
    @GetMapping
    public AccountDTO getAccountInfo(Authentication authentication) {
        String username = authentication.getName();
        return accountService.getAccountInfo(username);
    }

    // Cập nhật thông tin tài khoản
    @PutMapping
    public AccountDTO updateAccount(
            Authentication authentication,
            @RequestBody AccountUpdateDTO request) {
        String username = authentication.getName();
        return accountService.updateAccount(username, request);
    }
}