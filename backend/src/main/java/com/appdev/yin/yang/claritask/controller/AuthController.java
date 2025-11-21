package com.appdev.yin.yang.claritask.controller;

import com.appdev.yin.yang.claritask.dto.LoginRequest;
import com.appdev.yin.yang.claritask.model.User;
import com.appdev.yin.yang.claritask.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final UserRepository users;
    public AuthController(UserRepository users) { this.users = users; }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        Optional<User> uOpt = users.findByEmail(req.getEmail());
        if (uOpt.isEmpty()) return ResponseEntity.status(401).body("Invalid credentials");
        User u = uOpt.get();
        if (!u.getPassword().equals(req.getPassword())) return ResponseEntity.status(401).body("Invalid credentials");
        return ResponseEntity.ok(u);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User u) {
        if (users.findByEmail(u.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email already registered");
        }
        if (u.getRole() == null || u.getRole().isBlank()) u.setRole("student");
        return ResponseEntity.ok(users.save(u));
    }
}