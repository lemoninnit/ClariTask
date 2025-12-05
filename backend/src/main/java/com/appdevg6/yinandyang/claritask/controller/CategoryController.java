package com.appdevg6.yinandyang.claritask.controller;

import com.appdevg6.yinandyang.claritask.dto.CategoryDto;
import com.appdevg6.yinandyang.claritask.dto.DtoMapper;
import com.appdevg6.yinandyang.claritask.entity.Category;
import com.appdevg6.yinandyang.claritask.entity.User;
import com.appdevg6.yinandyang.claritask.entity.Announcement;
import com.appdevg6.yinandyang.claritask.service.CategoryService;
import com.appdevg6.yinandyang.claritask.repository.UserRepository;
import com.appdevg6.yinandyang.claritask.repository.AnnouncementRepository;
import com.appdevg6.yinandyang.claritask.util.SecurityUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {
    private final CategoryService service;
    private final UserRepository users;
    private final AnnouncementRepository announcementRepository;
    
    public CategoryController(CategoryService service, UserRepository users, AnnouncementRepository announcementRepository) {
        this.service = service;
        this.users = users;
        this.announcementRepository = announcementRepository;
    }

    @GetMapping
    public List<CategoryDto> all() {
        Long userId = SecurityUtil.getCurrentUserId();
        return service.byUser(userId).stream().map(DtoMapper::toDto).collect(Collectors.toList());
    }

    @PostMapping
    public ResponseEntity<CategoryDto> create(@RequestBody CategoryDto categoryDto) {
        Long userId = SecurityUtil.getCurrentUserId();
        User u = users.findById(userId).orElseThrow();
        Category c = new Category();
        c.setName(categoryDto.getName());
        c.setUser(u);
        Category saved = service.create(c);
        
        // Create notification for category creation
        Announcement notification = new Announcement();
        notification.setTitle("New Category Created");
        notification.setContent("Category \"" + saved.getName() + "\" has been created.");
        notification.setUser(u);
        notification.setNotificationType("category_created");
        announcementRepository.save(notification);
        
        return ResponseEntity.ok(DtoMapper.toDto(saved));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CategoryDto> update(@PathVariable Long id, @RequestBody CategoryDto categoryDto) {
        Long userId = SecurityUtil.getCurrentUserId();
        return service.get(id)
                .filter(c -> c.getUser() != null && c.getUser().getUserId().equals(userId))
                .map(existing -> {
                    existing.setName(categoryDto.getName());
                    Category saved = service.update(existing);
                    return ResponseEntity.ok(DtoMapper.toDto(saved));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        Long userId = SecurityUtil.getCurrentUserId();
        return service.get(id)
                .filter(c -> c.getUser() != null && c.getUser().getUserId().equals(userId))
                .map(c -> {
                    String categoryName = c.getName();
                    service.delete(id);
                    
                    // Create notification for category deletion
                    Announcement notification = new Announcement();
                    notification.setTitle("Category Deleted");
                    notification.setContent("Category \"" + categoryName + "\" has been deleted.");
                    notification.setUser(users.findById(userId).orElseThrow());
                    notification.setNotificationType("category_deleted");
                    announcementRepository.save(notification);
                    
                    return ResponseEntity.noContent().<Void>build();
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
