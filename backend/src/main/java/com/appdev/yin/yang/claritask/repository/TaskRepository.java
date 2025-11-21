package com.appdev.yin.yang.claritask.repository;

import com.appdev.yin.yang.claritask.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {}