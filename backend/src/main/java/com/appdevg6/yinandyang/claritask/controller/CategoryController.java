// package com.appdevg6.yinandyang.claritask.controller;

// import com.appdevg6.yinandyang.claritask.dto.CategoryDto;
// import com.appdevg6.yinandyang.claritask.dto.DtoMapper;
// import com.appdevg6.yinandyang.claritask.entity.Category;
// import com.appdevg6.yinandyang.claritask.entity.User;
// import com.appdevg6.yinandyang.claritask.entity.Announcement;
// import com.appdevg6.yinandyang.claritask.service.CategoryService;
// import com.appdevg6.yinandyang.claritask.repository.UserRepository;
// import com.appdevg6.yinandyang.claritask.repository.AnnouncementRepository;
// import com.appdevg6.yinandyang.claritask.util.SecurityUtil;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;
// import java.util.List;
// import java.util.stream.Collectors;

// @RestController
// @RequestMapping("/api/categories")
// public class CategoryController {
//     private final CategoryService service;
//     private final UserRepository users;
//     private final AnnouncementRepository announcementRepository;
    
//     public CategoryController(CategoryService service, UserRepository users, AnnouncementRepository announcementRepository) {
//         this.service = service;
//         this.users = users;
//         this.announcementRepository = announcementRepository;
//     }

//     @GetMapping
//     public List<CategoryDto> all() {
//         Long userId = SecurityUtil.getCurrentUserId();
//         return service.byUser(userId).stream().map(DtoMapper::toDto).collect(Collectors.toList());
//     }

//     @PostMapping
//     public ResponseEntity<CategoryDto> create(@RequestBody CategoryDto categoryDto) {
//         Long userId = SecurityUtil.getCurrentUserId();
//         User u = users.findById(userId).orElseThrow();
//         Category c = new Category();
//         c.setName(categoryDto.getName());
//         c.setUser(u);
//         Category saved = service.create(c);
        
//         // Create notification for category creation
//         Announcement notification = new Announcement();
//         notification.setTitle("New Category Created");
//         notification.setContent("Category \"" + saved.getName() + "\" has been created.");
//         notification.setUser(u);
//         notification.setNotificationType("category_created");
//         announcementRepository.save(notification);
        
//         return ResponseEntity.ok(DtoMapper.toDto(saved));
//     }

//     @PutMapping("/{id}")
//     public ResponseEntity<CategoryDto> update(@PathVariable Long id, @RequestBody CategoryDto categoryDto) {
//         Long userId = SecurityUtil.getCurrentUserId();
//         return service.get(id)
//                 .filter(c -> c.getUser() != null && c.getUser().getUserId().equals(userId))
//                 .map(existing -> {
//                     existing.setName(categoryDto.getName());
//                     Category saved = service.update(existing);
//                     return ResponseEntity.ok(DtoMapper.toDto(saved));
//                 })
//                 .orElseGet(() -> ResponseEntity.notFound().build());
//     }

//     @DeleteMapping("/{id}")
//     public ResponseEntity<Void> delete(@PathVariable Long id) {
//         Long userId = SecurityUtil.getCurrentUserId();
//         return service.get(id)
//                 .filter(c -> c.getUser() != null && c.getUser().getUserId().equals(userId))
//                 .map(c -> {
//                     String categoryName = c.getName();
//                     service.delete(id);
                    
//                     // Create notification for category deletion
//                     Announcement notification = new Announcement();
//                     notification.setTitle("Category Deleted");
//                     notification.setContent("Category \"" + categoryName + "\" has been deleted.");
//                     notification.setUser(users.findById(userId).orElseThrow());
//                     notification.setNotificationType("category_deleted");
//                     announcementRepository.save(notification);
                    
//                     return ResponseEntity.noContent().<Void>build();
//                 })
//                 .orElseGet(() -> ResponseEntity.notFound().build());
//     }
// }

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
import org.springframework.dao.DataIntegrityViolationException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
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
    public ResponseEntity<?> create(@RequestBody CategoryDto categoryDto) {
        Long userId = SecurityUtil.getCurrentUserId();
        User u = users.findById(userId).orElseThrow();
        
        // Validate category name
        if (categoryDto.getName() == null || categoryDto.getName().trim().isEmpty()) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Category name cannot be empty.");
            return ResponseEntity.status(400).body(errorResponse);
        }
        
        String categoryName = categoryDto.getName().trim();
        
        // Check if category with same name already exists for THIS USER ONLY (case-insensitive)
        // This ensures different users can have categories with the same name
        // The explicit query in the repository ensures we only check categories for the current user
        Optional<Category> existing = service.findByUserAndNameIgnoreCase(userId, categoryName);
        if (existing.isPresent()) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Category with the name '" + categoryName + "' already exists.");
            return ResponseEntity.status(409).body(errorResponse);
        }
        
        // Double-check: also verify the user object is properly set
        if (u == null || u.getUserId() == null) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Invalid user session. Please log in again.");
            return ResponseEntity.status(401).body(errorResponse);
        }
        
        Category c = new Category();
        c.setName(categoryName);
        c.setUser(u);  // Ensure user is set before saving
        
        try {
            Category saved = service.create(c);
            
            // Create notification for category creation
            Announcement notification = new Announcement();
            notification.setTitle("New Category Created");
            notification.setContent("Category \"" + saved.getName() + "\" has been created.");
            notification.setUser(u);
            notification.setNotificationType("category_created");
            announcementRepository.save(notification);
            
            return ResponseEntity.ok(DtoMapper.toDto(saved));
        } catch (DataIntegrityViolationException ex) {
            // Database constraint violation - this usually means:
            // 1. The database still has the old global unique constraint on 'name'
            // 2. There's a race condition (unlikely)
            // 3. Case sensitivity mismatch (unlikely with our check)
            
            // Re-check to see if it was created by another request (race condition)
            Optional<Category> recheck = service.findByUserAndNameIgnoreCase(userId, categoryName);
            if (recheck.isPresent()) {
                Map<String, String> errorResponse = new HashMap<>();
                errorResponse.put("message", "Category with the name '" + categoryName + "' already exists.");
                return ResponseEntity.status(409).body(errorResponse);
            }
            
            // If recheck fails, the database constraint is likely wrong
            // Log the error for debugging
            System.err.println("DataIntegrityViolationException for userId: " + userId + ", categoryName: " + categoryName);
            System.err.println("Exception: " + ex.getMessage());
            
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Category creation failed. The database may need to be updated. Please contact support or run the database migration script.");
            return ResponseEntity.status(500).body(errorResponse);
        } catch (Exception ex) {
            // Catch any other unexpected errors
            System.err.println("Unexpected error creating category: " + ex.getMessage());
            ex.printStackTrace();
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "An unexpected error occurred while creating the category.");
            return ResponseEntity.status(500).body(errorResponse);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody CategoryDto categoryDto) {
        Long userId = SecurityUtil.getCurrentUserId();
        
        // Validate category name
        if (categoryDto.getName() == null || categoryDto.getName().trim().isEmpty()) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Category name cannot be empty.");
            return ResponseEntity.status(400).body(errorResponse);
        }
        
        String categoryName = categoryDto.getName().trim();
        
        Optional<Category> existingOpt = service.get(id)
                .filter(c -> c.getUser() != null && c.getUser().getUserId().equals(userId));
        
        if (!existingOpt.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        
        Category existing = existingOpt.get();
        
        // Check if the new name conflicts with another category (excluding current one)
        Optional<Category> duplicate = service.findByUserAndNameIgnoreCase(userId, categoryName);
        if (duplicate.isPresent() && !duplicate.get().getCategoryId().equals(id)) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Category with the name '" + categoryName + "' already exists.");
            return ResponseEntity.status(409).body(errorResponse);
        }
        
        existing.setName(categoryName);
        Category saved = service.update(existing);
        return ResponseEntity.ok(DtoMapper.toDto(saved));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        Long userId = SecurityUtil.getCurrentUserId();
        return service.get(id)
                .filter(c -> c.getUser() != null && c.getUser().getUserId().equals(userId))
                .map(c -> {
                    try {
                        String categoryName = c.getName();
                        
                        // Set category to null for all tasks that reference this category
                        // This prevents foreign key constraint violations
                        service.removeCategoryFromTasks(id);
                        
                        // Now delete the category
                        service.delete(id);
                        
                        // Create notification for category deletion
                        Announcement notification = new Announcement();
                        notification.setTitle("Category Deleted");
                        notification.setContent("Category \"" + categoryName + "\" has been deleted.");
                        notification.setUser(users.findById(userId).orElseThrow());
                        notification.setNotificationType("category_deleted");
                        announcementRepository.save(notification);
                        
                        return ResponseEntity.noContent().<Void>build();
                    } catch (Exception e) {
                        System.err.println("Error deleting category: " + e.getMessage());
                        e.printStackTrace();
                        Map<String, String> errorResponse = new HashMap<>();
                        errorResponse.put("message", "Failed to delete category: " + e.getMessage());
                        return ResponseEntity.status(500).body(errorResponse);
                    }
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
