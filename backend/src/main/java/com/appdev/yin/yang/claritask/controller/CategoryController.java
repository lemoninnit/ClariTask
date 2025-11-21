package com.appdev.yin.yang.claritask.controller;

import com.appdev.yin.yang.claritask.model.Category;
import com.appdev.yin.yang.claritask.repository.CategoryRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {
    private final CategoryRepository repo;
    public CategoryController(CategoryRepository repo) { this.repo = repo; }

    @GetMapping
    public List<Category> all() { return repo.findAll(); }

    @PostMapping
    public ResponseEntity<Category> create(@RequestBody Category c) { return ResponseEntity.ok(repo.save(c)); }

    @PutMapping("/{id}")
    public ResponseEntity<Category> update(@PathVariable Long id, @RequestBody Category c) {
        return repo.findById(id).map(existing -> {
            existing.setName(c.getName());
            return ResponseEntity.ok(repo.save(existing));
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!repo.existsById(id)) return ResponseEntity.notFound().build();
        repo.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}