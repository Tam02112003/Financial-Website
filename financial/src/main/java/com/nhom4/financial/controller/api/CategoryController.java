package com.nhom4.financial.controller.api;

import com.nhom4.financial.dto.CategoryDTO;
import com.nhom4.financial.repository.UserRepository;
import com.nhom4.financial.service.CategoryService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {
    private final CategoryService categoryService;
    private final UserRepository userRepository;

    public CategoryController(CategoryService categoryService, UserRepository userRepository) {
        this.categoryService = categoryService;
        this.userRepository = userRepository;
    }

    // Xem danh sách danh mục
    @GetMapping
    public List<CategoryDTO> getCategories(Authentication authentication) {
        String username = authentication.getName();
        Long userId = userRepository.findByUsername(username).get().getId();
        return categoryService.getCategories(userId);
    }

    // Thêm danh mục mới
    @PostMapping
    public CategoryDTO addCategory(
            Authentication authentication,
            @RequestBody CategoryDTO request) {
        String username = authentication.getName();
        Long userId = userRepository.findByUsername(username).get().getId();
        return categoryService.addCategory(userId, request);
    }

    // Sửa danh mục
    @PutMapping("/{id}")
    public CategoryDTO updateCategory(
            Authentication authentication,
            @PathVariable Long id,
            @RequestBody CategoryDTO request) {
        String username = authentication.getName();
        Long userId = userRepository.findByUsername(username).get().getId();
        return categoryService.updateCategory(userId, id, request);
    }

    // Xóa danh mục
    @DeleteMapping("/{id}")
    public void deleteCategory(
            Authentication authentication,
            @PathVariable Long id) {
        String username = authentication.getName();
        Long userId = userRepository.findByUsername(username).get().getId();
        categoryService.deleteCategory(userId, id);
    }
}