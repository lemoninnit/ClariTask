package com.appdev.yin.yang.claritask.repository;

import com.appdev.yin.yang.claritask.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}