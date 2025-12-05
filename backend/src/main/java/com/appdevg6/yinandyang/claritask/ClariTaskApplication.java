package com.appdevg6.yinandyang.claritask;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class ClariTaskApplication {
    public static void main(String[] args) {
        SpringApplication.run(ClariTaskApplication.class, args);
    }
}
