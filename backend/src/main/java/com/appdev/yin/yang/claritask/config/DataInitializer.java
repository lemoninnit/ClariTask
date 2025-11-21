package com.appdev.yin.yang.claritask.config;

import com.appdev.yin.yang.claritask.model.Category;
import com.appdev.yin.yang.claritask.model.Task;
import com.appdev.yin.yang.claritask.model.User;
import com.appdev.yin.yang.claritask.repository.CategoryRepository;
import com.appdev.yin.yang.claritask.repository.TaskRepository;
import com.appdev.yin.yang.claritask.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.util.List;

@Configuration
public class DataInitializer {
    @Bean
    CommandLineRunner seedData(UserRepository users, CategoryRepository categories, TaskRepository tasks) {
        return args -> {
            users.findByEmail("demo@claritask.local").orElseGet(() -> {
                User u = new User();
                u.setName("Demo Student");
                u.setEmail("demo@claritask.local");
                u.setPassword("password");
                u.setRole("student");
                return users.save(u);
            });

            if (categories.count() == 0) {
                List<String> names = List.of("History","Math","Group Projects","PE","General");
                names.forEach(n -> { Category c = new Category(); c.setName(n); categories.save(c); });
            }

            if (tasks.count() == 0) {
                User demo = users.findByEmail("demo@claritask.local").get();
                Task t1 = new Task();
                t1.setTitle("MATH Homework #2");
                t1.setDescription("Complete problems 1-10");
                t1.setDueDate(LocalDate.now().plusDays(3));
                t1.setStatus("pending");
                t1.setUser(demo);
                tasks.save(t1);

                Task t2 = new Task();
                t2.setTitle("Project Outline");
                t2.setDescription("Prepare outline for group project");
                t2.setDueDate(LocalDate.now().plusDays(7));
                t2.setStatus("in_progress");
                t2.setUser(demo);
                tasks.save(t2);
            }
        };
    }
}