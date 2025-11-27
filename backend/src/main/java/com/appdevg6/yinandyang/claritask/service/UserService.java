package com.appdevg6.yinandyang.claritask.service;

import com.appdevg6.yinandyang.claritask.entity.User;
import com.appdevg6.yinandyang.claritask.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository users;
    public UserService(UserRepository users) { this.users = users; }

    public List<User> all() { return users.findAll(); }
    public Optional<User> get(Long id) { return users.findById(id); }
    public User create(User u) { return users.save(u); }
    public User update(User u) { return users.save(u); }
    public void delete(Long id) { users.deleteById(id); }
}
