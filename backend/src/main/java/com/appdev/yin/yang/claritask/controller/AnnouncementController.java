package com.appdev.yin.yang.claritask.controller;

import com.appdev.yin.yang.claritask.model.Announcement;
import com.appdev.yin.yang.claritask.repository.AnnouncementRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/announcements")
public class AnnouncementController {
    private final AnnouncementRepository repo;
    public AnnouncementController(AnnouncementRepository repo) { this.repo = repo; }

    @GetMapping
    public List<Announcement> all() { return repo.findAll(); }

    @PostMapping
    public ResponseEntity<Announcement> create(@RequestBody Announcement a) { return ResponseEntity.ok(repo.save(a)); }

    @PutMapping("/{id}")
    public ResponseEntity<Announcement> update(@PathVariable Long id, @RequestBody Announcement a) {
        return repo.findById(id).map(existing -> {
            existing.setTitle(a.getTitle());
            existing.setContent(a.getContent());
            existing.setUser(a.getUser());
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