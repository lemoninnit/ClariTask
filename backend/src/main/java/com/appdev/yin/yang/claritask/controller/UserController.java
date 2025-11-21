package com.appdev.yin.yang.claritask.controller;

import com.appdev.yin.yang.claritask.model.User;
import com.appdev.yin.yang.claritask.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserRepository repo;
    public UserController(UserRepository repo) { this.repo = repo; }

    @GetMapping
    public List<User> all() { return repo.findAll(); }

    @PostMapping
    public ResponseEntity<User> create(@RequestBody User u) { return ResponseEntity.ok(repo.save(u)); }

    @PutMapping("/{id}")
    public ResponseEntity<User> update(@PathVariable Long id, @RequestBody User u) {
        return repo.findById(id).map(existing -> {
            existing.setName(u.getName());
            existing.setEmail(u.getEmail());
            existing.setPassword(u.getPassword());
            existing.setRole(u.getRole());
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