package com.appdevg6.yinandyang.claritask.service;

import com.appdevg6.yinandyang.claritask.entity.Category;
import com.appdevg6.yinandyang.claritask.entity.Task;
import com.appdevg6.yinandyang.claritask.repository.CategoryRepository;
import com.appdevg6.yinandyang.claritask.repository.TaskRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {
    private final CategoryRepository categories;
    private final TaskRepository taskRepository;
    
    public CategoryService(CategoryRepository categories, TaskRepository taskRepository) {
        this.categories = categories;
        this.taskRepository = taskRepository;
    }

    public List<Category> all() { return categories.findAll(); }
    public List<Category> byUser(Long userId) { return categories.findByUserUserId(userId); }
    public Optional<Category> get(Long id) { return categories.findById(id); }
    public Optional<Category> findByUserAndNameIgnoreCase(Long userId, String name) {
        return categories.findByUserAndNameIgnoreCase(userId, name);
    }
    public Category create(Category c) { return categories.save(c); }
    public Category update(Category c) { return categories.save(c); }
    
    @Transactional
    public void removeCategoryFromTasks(Long categoryId) {
        // Find all tasks with this category and set category to null
        List<Task> tasksWithCategory = taskRepository.findAll().stream()
                .filter(task -> task.getCategory() != null && task.getCategory().getCategoryId().equals(categoryId))
                .toList();
        
        for (Task task : tasksWithCategory) {
            task.setCategory(null);
            taskRepository.save(task);
        }
    }
    
    public void delete(Long id) { categories.deleteById(id); }
}
