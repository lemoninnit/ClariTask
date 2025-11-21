package com.appdev.yin.yang.claritask.repository;

import com.appdev.yin.yang.claritask.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {}