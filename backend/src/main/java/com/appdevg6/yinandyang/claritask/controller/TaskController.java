package com.appdevg6.yinandyang.claritask.controller;

import com.appdevg6.yinandyang.claritask.dto.TaskDto;
import com.appdevg6.yinandyang.claritask.dto.DtoMapper;
import com.appdevg6.yinandyang.claritask.entity.Task;
import com.appdevg6.yinandyang.claritask.entity.User;
import com.appdevg6.yinandyang.claritask.entity.Announcement;
import com.appdevg6.yinandyang.claritask.repository.UserRepository;
import com.appdevg6.yinandyang.claritask.repository.CategoryRepository;
import com.appdevg6.yinandyang.claritask.repository.AnnouncementRepository;
import com.appdevg6.yinandyang.claritask.service.TaskService;
import com.appdevg6.yinandyang.claritask.util.SecurityUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.Set;
import java.util.Locale;
import java.util.Objects;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    private final TaskService service;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final AnnouncementRepository announcementRepository;

    public TaskController(TaskService service, UserRepository userRepository, CategoryRepository categoryRepository, AnnouncementRepository announcementRepository) {
        this.service = service;
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
        this.announcementRepository = announcementRepository;
    }

    @GetMapping
    public List<TaskDto> all() {
        Long userId = SecurityUtil.getCurrentUserId();
        return service.byUser(userId)
                .stream()
                .map(DtoMapper::toDto)
                .collect(Collectors.toList());
    }

    @PostMapping
    public ResponseEntity<TaskDto> create(@RequestBody TaskDto taskDto) {
        Long userId = Objects.requireNonNull(SecurityUtil.getCurrentUserId(), "User must be authenticated");
        User user = userRepository.findById(userId).orElseThrow();
        
        Task task = new Task();
        task.setTitle(taskDto.getTitle());
        task.setDescription(taskDto.getDescription());
        task.setDueDate(taskDto.getDueDate());
        task.setStatus(taskDto.getStatus() != null ? taskDto.getStatus() : "pending");
        task.setUser(user);
        
        Long categoryId = taskDto.getCategoryId();
        if (categoryId != null && categoryId > 0) {
            categoryRepository.findById(categoryId)
                    .ifPresent(task::setCategory);
        } else {
            task.setCategory(null);
        }
        
        Task saved = service.create(task);
        
        // Create notification for task creation
        Announcement notification = new Announcement();
        notification.setTitle("New Task Created");
        notification.setContent("Task \"" + saved.getTitle() + "\" has been created.");
        notification.setUser(user);
        notification.setTask(saved);
        notification.setNotificationType("task_created");
        announcementRepository.save(notification);
        
        return ResponseEntity.ok(DtoMapper.toDto(saved));
    }

    @GetMapping("/{id}")
    public ResponseEntity<TaskDto> get(@PathVariable Long id) {
        Long userId = Objects.requireNonNull(SecurityUtil.getCurrentUserId(), "User must be authenticated");
        return service.get(id)
                .filter(task -> task.getUser().getUserId().equals(userId))
                .map(entity -> ResponseEntity.ok(DtoMapper.toDto(entity)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<TaskDto> update(@PathVariable Long id, @RequestBody TaskDto taskDto) {
        Long userId = Objects.requireNonNull(SecurityUtil.getCurrentUserId(), "User must be authenticated");
        return service.get(id)
                .filter(task -> task.getUser().getUserId().equals(userId))
                .map(existing -> {
                    existing.setTitle(taskDto.getTitle());
                    existing.setDescription(taskDto.getDescription());
                    existing.setDueDate(taskDto.getDueDate());
                    existing.setStatus(taskDto.getStatus());
                    
                    Long categoryId = taskDto.getCategoryId();
                    if (categoryId != null) {
                        categoryRepository.findById(categoryId)
                                .ifPresent(existing::setCategory);
                    } else {
                        existing.setCategory(null);
                    }
                    
                    Task saved = service.update(existing);
                    
                    // Create notification for task update
                    Announcement notification = new Announcement();
                    notification.setTitle("Task Updated");
                    notification.setContent("Task \"" + saved.getTitle() + "\" has been updated.");
                    notification.setUser(userRepository.findById(userId).orElseThrow());
                    notification.setTask(saved);
                    notification.setNotificationType("task_updated");
                    announcementRepository.save(notification);
                    
                    return ResponseEntity.ok(DtoMapper.toDto(saved));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        Long userId = Objects.requireNonNull(SecurityUtil.getCurrentUserId(), "User must be authenticated");
        return service.get(id)
                .filter(task -> task.getUser().getUserId().equals(userId))
                .map(task -> {
                    try {
                        String taskTitle = task.getTitle();
                        
                        // Delete all announcements related to this task first
                        List<Announcement> taskAnnouncements = announcementRepository.findByTaskId(id);
                        taskAnnouncements.forEach(announcementRepository::delete);
                        
                        // Delete the task (attachments will be cascade deleted)
                        service.delete(id);
                        
                        // Create notification for task deletion
                        Announcement notification = new Announcement();
                        notification.setTitle("Task Deleted");
                        notification.setContent("Task \"" + taskTitle + "\" has been deleted.");
                        notification.setUser(userRepository.findById(userId).orElseThrow());
                        notification.setNotificationType("task_deleted");
                        announcementRepository.save(notification);
                        
                        return ResponseEntity.noContent().<Void>build();
                    } catch (Exception e) {
                        System.err.println("Error deleting task: " + e.getMessage());
                        e.printStackTrace();
                        return ResponseEntity.status(500).build();
                    }
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PatchMapping("/{id}/complete")
    public ResponseEntity<TaskDto> complete(@PathVariable Long id) {
        Long userId = Objects.requireNonNull(SecurityUtil.getCurrentUserId(), "User must be authenticated");
        return service.get(id)
                .filter(task -> task.getUser().getUserId().equals(userId))
                .map(existing -> {
                    existing.setStatus("completed");
                    Task saved = service.update(existing);
                    
                    // Create notification for task completion (expires in 7 days)
                    Announcement notification = new Announcement();
                    notification.setTitle("Task Completed ✓");
                    notification.setContent("Task \"" + saved.getTitle() + "\" has been completed!");
                    notification.setUser(userRepository.findById(userId).orElseThrow());
                    notification.setTask(saved);
                    notification.setNotificationType("task_completed");
                    notification.setExpiresAt(LocalDateTime.now().plusDays(7));
                    announcementRepository.save(notification);
                    
                    return ResponseEntity.ok(DtoMapper.toDto(saved));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestBody Map<String, String> payload) {
        Long userId = Objects.requireNonNull(SecurityUtil.getCurrentUserId(), "User must be authenticated");
        if (payload == null || !payload.containsKey("status")) {
            return ResponseEntity.badRequest().body(Map.of("message", "Status is required"));
        }

        String requested = payload.get("status");
        if (requested == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "Status is required"));
        }

        String normalized = requested.trim().toLowerCase(Locale.ROOT);
        Set<String> allowed = Set.of("pending", "in_progress", "completed");
        if (!allowed.contains(normalized)) {
            return ResponseEntity.badRequest().body(Map.of("message", "Invalid status value"));
        }

        return service.get(id)
                .filter(task -> task.getUser().getUserId().equals(userId))
                .map(task -> {
                    String current = task.getStatus() == null ? "pending" : task.getStatus();
                    boolean validTransition =
                            (current.equals("pending") && normalized.equals("in_progress")) ||
                            (current.equals("in_progress") && normalized.equals("completed"));

                    if (!validTransition) {
                        return ResponseEntity.badRequest().body(
                                Map.of("message", "Invalid status transition")
                        );
                    }

                    task.setStatus(normalized);
                    Task saved = service.update(task);

                    // Notification for status change
                    Announcement notification = new Announcement();
                    notification.setTitle("Task Status Updated");
                    notification.setContent("Task \"" + saved.getTitle() + "\" is now " + normalized.replace('_', ' '));
                    notification.setUser(userRepository.findById(userId).orElseThrow());
                    notification.setTask(saved);
                    notification.setNotificationType("task_status_updated");
                    notification.setExpiresAt(LocalDateTime.now().plusDays(7));
                    announcementRepository.save(notification);

                    return ResponseEntity.ok(DtoMapper.toDto(saved));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
