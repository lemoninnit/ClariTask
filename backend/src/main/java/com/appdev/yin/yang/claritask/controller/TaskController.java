package com.appdev.yin.yang.claritask.controller;

import com.appdev.yin.yang.claritask.model.Task;
import com.appdev.yin.yang.claritask.repository.TaskRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    private final TaskRepository repo;
    public TaskController(TaskRepository repo) { this.repo = repo; }

    @GetMapping
    public List<Task> all() { return repo.findAll(); }

    @PostMapping
    public ResponseEntity<Task> create(@RequestBody Task t) { return ResponseEntity.ok(repo.save(t)); }

    @GetMapping("/{id}")
    public ResponseEntity<Task> get(@PathVariable Long id) {
        return repo.findById(id).map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> update(@PathVariable Long id, @RequestBody Task t) {
        return repo.findById(id).map(existing -> {
            existing.setTitle(t.getTitle());
            existing.setDescription(t.getDescription());
            existing.setDueDate(t.getDueDate());
            existing.setStatus(t.getStatus());
            existing.setCategory(t.getCategory());
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