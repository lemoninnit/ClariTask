package com.appdevg6.yinandyang.claritask.service;

import com.appdevg6.yinandyang.claritask.entity.Task;
import com.appdevg6.yinandyang.claritask.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {
    private final TaskRepository tasks;
    public TaskService(TaskRepository tasks) { this.tasks = tasks; }

    public List<Task> all() { return tasks.findAll(); }
    public Optional<Task> get(Long id) { return tasks.findById(id); }
    public Task create(Task t) { return tasks.save(t); }
    public Task update(Task t) { return tasks.save(t); }
    public void delete(Long id) { tasks.deleteById(id); }
}
