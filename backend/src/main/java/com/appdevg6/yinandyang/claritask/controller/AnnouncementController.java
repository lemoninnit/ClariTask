package com.appdevg6.yinandyang.claritask.controller;

import com.appdevg6.yinandyang.claritask.dto.AnnouncementDto;
import com.appdevg6.yinandyang.claritask.dto.DtoMapper;
import com.appdevg6.yinandyang.claritask.entity.Announcement;
import com.appdevg6.yinandyang.claritask.entity.Task;
import com.appdevg6.yinandyang.claritask.entity.User;
import com.appdevg6.yinandyang.claritask.repository.AnnouncementRepository;
import com.appdevg6.yinandyang.claritask.repository.TaskRepository;
import com.appdevg6.yinandyang.claritask.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/announcements")
public class AnnouncementController {
    private final AnnouncementRepository repo;
    private final UserRepository users;
    private final TaskRepository tasks;

    public AnnouncementController(AnnouncementRepository repo, UserRepository users, TaskRepository tasks) {
        this.repo = repo;
        this.users = users;
        this.tasks = tasks;
    }

    @GetMapping
    public List<AnnouncementDto> all(@RequestParam Long userId) {
        return repo.findByUserUserIdOrderByCreatedAtDesc(userId).stream()
                .map(DtoMapper::toDto)
                .collect(Collectors.toList());
    }

    @PostMapping
    public ResponseEntity<AnnouncementDto> create(
            @RequestParam Long userId,
            @RequestParam(required = false) Long taskId,
            @RequestBody Announcement a
    ) {
        User u = users.findById(userId).orElseThrow();
        a.setUser(u);
        if (taskId != null) {
            Optional<Task> tOpt = tasks.findById(taskId);
            tOpt.ifPresent(a::setTask);
            if (tOpt.isPresent() && (a.getTitle() == null || a.getTitle().isBlank())) {
                a.setTitle("Update for: " + tOpt.get().getTitle());
            }
        }
        Announcement saved = repo.save(a);
        return ResponseEntity.ok(DtoMapper.toDto(saved));
    }

    @PutMapping("/{id}")
    public ResponseEntity<AnnouncementDto> update(@PathVariable Long id, @RequestBody Announcement a) {
        return repo.findById(id).map(existing -> {
            existing.setTitle(a.getTitle());
            existing.setContent(a.getContent());
            existing.setUser(a.getUser());
            Announcement saved = repo.save(existing);
            return ResponseEntity.ok(DtoMapper.toDto(saved));
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!repo.existsById(id)) return ResponseEntity.notFound().build();
        repo.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
