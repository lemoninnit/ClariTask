package com.appdevg6.yinandyang.claritask.config;

import com.appdevg6.yinandyang.claritask.repository.CategoryRepository;
import com.appdevg6.yinandyang.claritask.repository.TaskRepository;
import com.appdevg6.yinandyang.claritask.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataInitializer {
    @Value("${claritask.seed.enabled:false}")
    private boolean seedEnabled;

    @Bean
    CommandLineRunner seedData(UserRepository users, CategoryRepository categories, TaskRepository tasks) {
        return args -> {
            if (!seedEnabled) {
                return;
            }
            // Seeding is disabled by default. When enabled via property, add seed logic here.
        };
    }
}
