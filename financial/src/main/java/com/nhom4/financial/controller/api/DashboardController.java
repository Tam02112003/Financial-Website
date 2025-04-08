package com.nhom4.financial.controller.api;

import com.nhom4.financial.repository.UserRepository;
import com.nhom4.financial.service.DashboardService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class DashboardController {
    private final DashboardService dashboardService;
    private final UserRepository userRepository;

    public DashboardController(DashboardService dashboardService, UserRepository userRepository) {
        this.dashboardService = dashboardService;
        this.userRepository = userRepository;
    }

    @GetMapping("/dashboard")
    public Map<String, Object> getDashboardData(Authentication authentication) {
        String username = authentication.getName();
        Long userId = userRepository.findByUsername(username).get().getId();
        return dashboardService.getDashboardData(userId);
    }
}