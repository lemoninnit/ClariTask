package com.appdevg6.yinandyang.claritask.controller;

import com.appdevg6.yinandyang.claritask.dto.AttachmentDto;
import com.appdevg6.yinandyang.claritask.dto.DtoMapper;
import com.appdevg6.yinandyang.claritask.entity.Attachment;
import com.appdevg6.yinandyang.claritask.repository.AttachmentRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/attachments")
public class AttachmentController {
    private final AttachmentRepository repo;
    public AttachmentController(AttachmentRepository repo) { this.repo = repo; }

    @GetMapping
    public List<AttachmentDto> all() { return repo.findAll().stream().map(DtoMapper::toDto).collect(Collectors.toList()); }

    @PostMapping
    public ResponseEntity<AttachmentDto> create(@RequestBody Attachment a) { Attachment saved = repo.save(a); return ResponseEntity.ok(DtoMapper.toDto(saved)); }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!repo.existsById(id)) return ResponseEntity.notFound().build();
        repo.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
