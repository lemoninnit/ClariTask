package com.appdevg6.yinandyang.claritask.service;

import com.appdevg6.yinandyang.claritask.repository.AnnouncementRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class NotificationCleanupService {
    private final AnnouncementRepository announcementRepository;

    public NotificationCleanupService(AnnouncementRepository announcementRepository) {
        this.announcementRepository = announcementRepository;
    }

    @Scheduled(fixedRate = 3600000) // Run every hour
    @Transactional
    public void cleanupExpiredNotifications() {
        try {
            LocalDateTime now = LocalDateTime.now();
            announcementRepository.deleteExpiredNotifications(now);
        } catch (Exception e) {
            // Log error but don't crash the application
            System.err.println("Error cleaning up expired notifications: " + e.getMessage());
        }
    }
}

