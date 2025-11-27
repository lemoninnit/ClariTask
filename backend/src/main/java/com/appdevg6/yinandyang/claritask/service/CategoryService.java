package com.appdevg6.yinandyang.claritask.service;

import com.appdevg6.yinandyang.claritask.entity.Category;
import com.appdevg6.yinandyang.claritask.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {
    private final CategoryRepository categories;
    public CategoryService(CategoryRepository categories) { this.categories = categories; }

    public List<Category> all() { return categories.findAll(); }
    public Optional<Category> get(Long id) { return categories.findById(id); }
    public Category create(Category c) { return categories.save(c); }
    public Category update(Category c) { return categories.save(c); }
    public void delete(Long id) { categories.deleteById(id); }
}
