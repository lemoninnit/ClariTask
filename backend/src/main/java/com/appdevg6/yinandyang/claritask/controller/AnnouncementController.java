package com.appdevg6.yinandyang.claritask.controller;

import com.appdevg6.yinandyang.claritask.dto.AnnouncementDto;
import com.appdevg6.yinandyang.claritask.dto.DtoMapper;
import com.appdevg6.yinandyang.claritask.entity.Announcement;
import com.appdevg6.yinandyang.claritask.repository.AnnouncementRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/announcements")
public class AnnouncementController {
    private final AnnouncementRepository repo;
    public AnnouncementController(AnnouncementRepository repo) { this.repo = repo; }

    @GetMapping
    public List<AnnouncementDto> all() { return repo.findAll().stream().map(DtoMapper::toDto).collect(Collectors.toList()); }

    @PostMapping
    public ResponseEntity<AnnouncementDto> create(@RequestBody Announcement a) { Announcement saved = repo.save(a); return ResponseEntity.ok(DtoMapper.toDto(saved)); }

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
