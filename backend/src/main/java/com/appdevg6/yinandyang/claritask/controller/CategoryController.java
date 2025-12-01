package com.appdevg6.yinandyang.claritask.controller;

import com.appdevg6.yinandyang.claritask.dto.CategoryDto;
import com.appdevg6.yinandyang.claritask.dto.DtoMapper;
import com.appdevg6.yinandyang.claritask.entity.Category;
import com.appdevg6.yinandyang.claritask.entity.User;
import com.appdevg6.yinandyang.claritask.service.CategoryService;
import com.appdevg6.yinandyang.claritask.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {
    private final CategoryService service;
    private final UserRepository users;
    public CategoryController(CategoryService service, UserRepository users) {
        this.service = service;
        this.users = users;
    }

    @GetMapping
    public List<CategoryDto> all(@RequestParam Long userId) {
        return service.byUser(userId).stream().map(DtoMapper::toDto).collect(Collectors.toList());
    }

    @PostMapping
    public ResponseEntity<CategoryDto> create(@RequestParam Long userId, @RequestBody Category c) {
        User u = users.findById(userId).orElseThrow();
        c.setUser(u);
        Category saved = service.create(c);
        return ResponseEntity.ok(DtoMapper.toDto(saved));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CategoryDto> update(@PathVariable Long id, @RequestBody Category c) {
        return service.get(id).map(existing -> {
            existing.setName(c.getName());
            Category saved = service.update(existing);
            return ResponseEntity.ok(DtoMapper.toDto(saved));
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (service.get(id).isEmpty()) return ResponseEntity.notFound().build();
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
