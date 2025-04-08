package com.nhom4.financial.controller.api;

import com.nhom4.financial.dto.CategoryReportDTO;
import com.nhom4.financial.dto.TransactionDTO;
import com.nhom4.financial.dto.TransactionRequestDTO;
import com.nhom4.financial.entity.User;
import com.nhom4.financial.repository.UserRepository;
import com.nhom4.financial.service.TransactionService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api")
public class TransactionController {
    private final TransactionService transactionService;
    private final UserRepository userRepository;

    public TransactionController(TransactionService transactionService, UserRepository userRepository) {
        this.transactionService = transactionService;
        this.userRepository = userRepository;
    }

    // Endpoint từ trước (danh sách giao dịch)
    @GetMapping("/transactions")
    public List<TransactionDTO> getTransactions(
            Authentication authentication,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date endDate) {
        String username = authentication.getName();
        Long userId = userRepository.findByUsername(username).get().getId();
        return transactionService.getTransactions(userId, startDate, endDate);
    }

    // Endpoint mới: Thêm giao dịch
    @PostMapping("/transactions")
    public TransactionDTO addTransaction(
            Authentication authentication,
            @RequestBody TransactionRequestDTO request) {
        String username = authentication.getName();
        Long userId = userRepository.findByUsername(username).get().getId();
        return transactionService.addTransaction(userId, request);
    }
    // Endpoint mới: Lấy chi tiết giao dịch
    @GetMapping("/transactions/{id}")
    public TransactionDTO getTransaction(
            Authentication authentication,
            @PathVariable Long id) {
        String username = authentication.getName();
        Long userId = userRepository.findByUsername(username).get().getId();
        return transactionService.getTransactionById(userId, id);
    }
    @DeleteMapping("/transactions/{id}")
    public ResponseEntity<?> deleteTransaction(
            Authentication authentication,
            @PathVariable Long id) {
        try {
            String username = authentication.getName();
            User user = userRepository.findByUsername(username)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            transactionService.deleteTransaction(user.getId(), id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(e.getMessage());
        }
    }
    // Endpoint mới: Cập nhật giao dịch
    @PutMapping("/transactions/{id}")
    public TransactionDTO updateTransaction(
            Authentication authentication,
            @PathVariable Long id,
            @RequestBody TransactionRequestDTO request) {
        String username = authentication.getName();
        Long userId = userRepository.findByUsername(username).get().getId();
        return transactionService.updateTransaction(userId, id, request);
    }


    @GetMapping("/transactions/category-stats")
    public CategoryReportDTO getCategoryStats(
            Authentication authentication,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date endDate) {

        // Debug 1: Log tham số đầu vào
        System.out.println("Received request with:");
        System.out.println("Start Date: " + startDate);
        System.out.println("End Date: " + endDate);

        String username = authentication.getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Debug 2: Log user info
        System.out.println("For user: " + user.getId() + " - " + username);

        // Lấy dữ liệu từ service
        CategoryReportDTO result = transactionService.getCategoryStats(user.getId(), startDate, endDate);

        // Debug 3: Log kết quả từ service
        System.out.println("Service returned: " + result.getCategoryStats().size() + " categories");

        // Xử lý trường hợp null
        if(result.getCategoryStats() == null || result.getCategoryStats().isEmpty()) {
            System.out.println("Warning: No data found for the given period");
        }

        return result;
    }
}