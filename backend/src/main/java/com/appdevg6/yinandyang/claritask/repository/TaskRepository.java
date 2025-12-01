package com.appdevg6.yinandyang.claritask.repository;

import com.appdevg6.yinandyang.claritask.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByUserUserId(Long userId);
}
