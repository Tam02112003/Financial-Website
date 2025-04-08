package com.nhom4.financial.repository;

import com.nhom4.financial.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByUserId(Long userId);
    long countByCategoryId(Long categoryId);
    @Query("SELECT t FROM Transaction t WHERE t.user.id = :userId AND t.date BETWEEN :startDate AND :endDate")
    List<Transaction> findByUserIdAndDateRange(@Param("userId") Long userId,
                                               @Param("startDate") Date startDate,
                                               @Param("endDate") Date endDate);

    @Query("SELECT t FROM Transaction t WHERE " +
            "t.user.id = :userId AND " +
            "t.date BETWEEN :startDate AND :endDate")
    List<Transaction> findByUserIdAndDateBetween(
            @Param("userId") Long userId,
            @Param("startDate") Date startDate,
            @Param("endDate") Date endDate);

    @Query("SELECT SUM(t.amount) FROM Transaction t WHERE " +
            "t.user.id = :userId AND " +
            "(:categoryId IS NULL OR t.category.id = :categoryId) AND " +
            "t.type = :type AND " +
            "t.date BETWEEN :startDate AND :endDate")
    Double sumAmountByUserAndCategoryAndTypeAndDateBetween(
            @Param("userId") Long userId,
            @Param("categoryId") Long categoryId,
            @Param("type") String type,
            @Param("startDate") Date startDate,
            @Param("endDate") Date endDate);
}
