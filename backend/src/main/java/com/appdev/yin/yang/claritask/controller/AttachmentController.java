package com.appdev.yin.yang.claritask.controller;

import com.appdev.yin.yang.claritask.model.Attachment;
import com.appdev.yin.yang.claritask.repository.AttachmentRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/attachments")
public class AttachmentController {
    private final AttachmentRepository repo;
    public AttachmentController(AttachmentRepository repo) { this.repo = repo; }

    @GetMapping
    public List<Attachment> all() { return repo.findAll(); }

    @PostMapping
    public ResponseEntity<Attachment> create(@RequestBody Attachment a) { return ResponseEntity.ok(repo.save(a)); }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!repo.existsById(id)) return ResponseEntity.notFound().build();
        repo.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}