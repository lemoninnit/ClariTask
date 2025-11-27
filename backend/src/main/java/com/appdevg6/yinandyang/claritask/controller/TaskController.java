package com.appdevg6.yinandyang.claritask.controller;

import com.appdevg6.yinandyang.claritask.dto.TaskDto;
import com.appdevg6.yinandyang.claritask.dto.DtoMapper;
import com.appdevg6.yinandyang.claritask.entity.Task;
import com.appdevg6.yinandyang.claritask.service.TaskService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    private final TaskService service;
    public TaskController(TaskService service) { this.service = service; }

    @GetMapping
    public List<TaskDto> all() { return service.all().stream().map(DtoMapper::toDto).collect(Collectors.toList()); }

    @PostMapping
    public ResponseEntity<TaskDto> create(@RequestBody Task t) {
        Task saved = service.create(t);
        return ResponseEntity.ok(DtoMapper.toDto(saved));
    }

    @GetMapping("/{id}")
    public ResponseEntity<TaskDto> get(@PathVariable Long id) {
        return service.get(id).map(entity -> ResponseEntity.ok(DtoMapper.toDto(entity))).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<TaskDto> update(@PathVariable Long id, @RequestBody Task t) {
        return service.get(id).map(existing -> {
            existing.setTitle(t.getTitle());
            existing.setDescription(t.getDescription());
            existing.setDueDate(t.getDueDate());
            existing.setStatus(t.getStatus());
            existing.setCategory(t.getCategory());
            Task saved = service.update(existing);
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
