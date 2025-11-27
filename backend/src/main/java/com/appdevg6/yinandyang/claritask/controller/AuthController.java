package com.appdevg6.yinandyang.claritask.controller;

import com.appdevg6.yinandyang.claritask.dto.LoginRequest;
import com.appdevg6.yinandyang.claritask.dto.RegisterRequest;
import com.appdevg6.yinandyang.claritask.dto.UserDto;
import com.appdevg6.yinandyang.claritask.dto.DtoMapper;
import com.appdevg6.yinandyang.claritask.entity.User;
import com.appdevg6.yinandyang.claritask.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

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
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        boolean ok = false;
        if (u.getPassword() != null && u.getPassword().startsWith("$2")) {
            ok = encoder.matches(req.getPassword(), u.getPassword());
        } else {
            ok = req.getPassword().equals(u.getPassword());
            if (ok) { u.setPassword(encoder.encode(u.getPassword())); users.save(u); }
        }
        if (!ok) return ResponseEntity.status(401).body("Invalid credentials");
        UserDto dto = DtoMapper.toDto(u);
        return ResponseEntity.ok(dto);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest req) {
        if (users.findByEmail(req.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email already registered");
        }
        User u = new User();
        u.setName(req.getName());
        u.setEmail(req.getEmail());
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        u.setPassword(encoder.encode(req.getPassword()));
        u.setRole((req.getRole() == null || req.getRole().isBlank()) ? "student" : req.getRole());
        User saved = users.save(u);
        return ResponseEntity.ok(DtoMapper.toDto(saved));
    }
}
