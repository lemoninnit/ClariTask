package com.appdevg6.yinandyang.claritask.controller;

import com.appdevg6.yinandyang.claritask.dto.AttachmentDto;
import com.appdevg6.yinandyang.claritask.dto.DtoMapper;
import com.appdevg6.yinandyang.claritask.entity.Attachment;
import com.appdevg6.yinandyang.claritask.repository.AttachmentRepository;
import com.appdevg6.yinandyang.claritask.entity.Task;
import com.appdevg6.yinandyang.claritask.repository.TaskRepository;
import com.appdevg6.yinandyang.claritask.util.SecurityUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.Optional;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@RestController
@RequestMapping("/api/attachments")
public class AttachmentController {
    private final AttachmentRepository repo;
    private final TaskRepository tasks;
    
    public AttachmentController(AttachmentRepository repo, TaskRepository tasks) {
        this.repo = repo;
        this.tasks = tasks;
    }

    @PostMapping("/upload")
    public ResponseEntity<AttachmentDto> upload(@RequestParam("taskId") Long taskId, @RequestParam("file") MultipartFile file) {
        Long userId = SecurityUtil.getCurrentUserId();
        Optional<Task> taskOpt = tasks.findById(taskId);
        
        if (taskOpt.isEmpty() || !taskOpt.get().getUser().getUserId().equals(userId)) {
            return ResponseEntity.notFound().build();
        }
        
        try {
            Path uploadDir = Paths.get("uploads");
            if (!Files.exists(uploadDir)) {
                Files.createDirectories(uploadDir);
            }
            String original = file.getOriginalFilename();
            String baseName = (original == null || original.isBlank()) ? "file" : original.replaceAll("[\\\\/]+", "_");
            String stored = UUID.randomUUID().toString() + "_" + baseName;
            Path target = uploadDir.resolve(stored);
            Files.copy(file.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);

            Attachment a = new Attachment();
            a.setTask(taskOpt.get());
            a.setFilename(stored);
            Attachment saved = repo.save(a);
            return ResponseEntity.ok(DtoMapper.toDto(saved));
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        Long userId = SecurityUtil.getCurrentUserId();
        Optional<Attachment> aOpt = repo.findById(id);
        
        if (aOpt.isEmpty()) return ResponseEntity.notFound().build();
        
        Attachment a = aOpt.get();
        if (!a.getTask().getUser().getUserId().equals(userId)) {
            return ResponseEntity.status(403).build();
        }
        
        try {
            Path uploadDir = Paths.get("uploads");
            Path target = uploadDir.resolve(a.getFilename());
            if (Files.exists(target)) {
                Files.delete(target);
            }
        } catch (Exception ignored) {}
        repo.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
