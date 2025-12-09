package com.appdevg6.yinandyang.claritask.repository;

import com.appdevg6.yinandyang.claritask.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    List<Category> findByUserUserId(Long userId);
    
    // Explicit query to ensure we're checking by user_id and name (case-insensitive)
    @Query("SELECT c FROM Category c WHERE c.user.userId = :userId AND LOWER(c.name) = LOWER(:name)")
    Optional<Category> findByUserAndNameIgnoreCase(@Param("userId") Long userId, @Param("name") String name);
}
