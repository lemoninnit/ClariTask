package com.appdevg6.yinandyang.claritask.repository;

import com.appdevg6.yinandyang.claritask.entity.Announcement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;

public interface AnnouncementRepository extends JpaRepository<Announcement, Long> {
    List<Announcement> findByUserUserIdOrderByCreatedAtDesc(Long userId);
    List<Announcement> findAllByOrderByCreatedAtDesc();
    
    @Query("SELECT a FROM Announcement a WHERE a.expiresAt IS NULL OR a.expiresAt > :now ORDER BY a.createdAt DESC")
    List<Announcement> findActiveNotifications(@Param("now") LocalDateTime now);
    
    @Modifying
    @Transactional
    @Query("DELETE FROM Announcement a WHERE a.expiresAt IS NOT NULL AND a.expiresAt <= :now")
    void deleteExpiredNotifications(@Param("now") LocalDateTime now);
}
