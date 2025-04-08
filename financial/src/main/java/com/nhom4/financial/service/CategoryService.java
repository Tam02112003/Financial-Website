package com.nhom4.financial.service;

import com.nhom4.financial.dto.CategoryDTO;
import com.nhom4.financial.entity.Category;
import com.nhom4.financial.entity.User;
import com.nhom4.financial.repository.CategoryRepository;
import com.nhom4.financial.repository.TransactionRepository;
import com.nhom4.financial.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryService {
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;
    private final TransactionRepository transactionRepository;

    public CategoryService(CategoryRepository categoryRepository, UserRepository userRepository,TransactionRepository transactionRepository) {
        this.categoryRepository = categoryRepository;
        this.userRepository = userRepository;
        this.transactionRepository = transactionRepository;
    }

    // Xem danh sách danh mục
    public List<CategoryDTO> getCategories(Long userId) {
        return categoryRepository.findByUserId(userId).stream()
                .map(c -> new CategoryDTO(c.getId(), c.getName()))
                .collect(Collectors.toList());
    }

    // Thêm danh mục mới
    public CategoryDTO addCategory(Long userId, CategoryDTO request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        if (request.getName() == null || request.getName().trim().isEmpty()) {
            throw new IllegalArgumentException("Category name cannot be empty");
        }

        Category category = new Category();
        category.setName(request.getName());
        category.setUser(user);

        Category savedCategory = categoryRepository.save(category);
        return new CategoryDTO(savedCategory.getId(), savedCategory.getName());
    }

    // Sửa danh mục
    public CategoryDTO updateCategory(Long userId, Long categoryId, CategoryDTO request) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new IllegalArgumentException("Category not found"));

        // Kiểm tra quyền sở hữu
        if (!category.getUser().getId().equals(userId)) {
            throw new IllegalArgumentException("Unauthorized access to category");
        }

        if (request.getName() == null || request.getName().trim().isEmpty()) {
            throw new IllegalArgumentException("Category name cannot be empty");
        }

        category.setName(request.getName());
        Category updatedCategory = categoryRepository.save(category);
        return new CategoryDTO(updatedCategory.getId(), updatedCategory.getName());
    }

    // Trong CategoryService
    public void deleteCategory(Long userId, Long categoryId) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new IllegalArgumentException("Category not found"));

        if (!category.getUser().getId().equals(userId)) {
            throw new IllegalArgumentException("Unauthorized access to category");
        }

        // Kiểm tra xem danh mục có giao dịch nào không
        long transactionCount = transactionRepository.countByCategoryId(categoryId);
        if (transactionCount > 0) {
            throw new IllegalStateException("Cannot delete category because it is associated with transactions");
        }

        categoryRepository.delete(category);
    }
}