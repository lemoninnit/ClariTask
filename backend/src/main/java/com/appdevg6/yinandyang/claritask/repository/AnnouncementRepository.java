package com.appdevg6.yinandyang.claritask.repository;

import com.appdevg6.yinandyang.claritask.entity.Announcement;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AnnouncementRepository extends JpaRepository<Announcement, Long> {
    List<Announcement> findByUserUserIdOrderByCreatedAtDesc(Long userId);
}
