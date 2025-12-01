package com.appdevg6.yinandyang.claritask.repository;

import com.appdevg6.yinandyang.claritask.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    List<Category> findByUserUserId(Long userId);
}
