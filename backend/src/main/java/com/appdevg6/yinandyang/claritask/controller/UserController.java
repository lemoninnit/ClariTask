package com.appdevg6.yinandyang.claritask.controller;

import com.appdevg6.yinandyang.claritask.dto.UserDto;
import com.appdevg6.yinandyang.claritask.dto.DtoMapper;
import com.appdevg6.yinandyang.claritask.entity.User;
import com.appdevg6.yinandyang.claritask.service.UserService;
import com.appdevg6.yinandyang.claritask.util.SecurityUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService service;
    private final PasswordEncoder passwordEncoder;

    public UserController(UserService service, PasswordEncoder passwordEncoder) {
        this.service = service;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping("/me")
    public ResponseEntity<UserDto> getCurrentUser() {
        Long userId = SecurityUtil.getCurrentUserId();
        return service.get(userId)
                .map(DtoMapper::toDto)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/me")
    public ResponseEntity<UserDto> updateCurrentUser(@RequestBody UserDto userDto) {
        Long userId = SecurityUtil.getCurrentUserId();
        return service.get(userId).map(existing -> {
            if (userDto.getName() != null) existing.setName(userDto.getName());
            if (userDto.getEmail() != null) existing.setEmail(userDto.getEmail());
            User saved = service.update(existing);
            return ResponseEntity.ok(DtoMapper.toDto(saved));
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/me")
    public ResponseEntity<Void> deleteCurrentUser() {
        Long userId = SecurityUtil.getCurrentUserId();
        if (service.get(userId).isEmpty()) return ResponseEntity.notFound().build();
        service.delete(userId);
        return ResponseEntity.noContent().build();
    }
}
