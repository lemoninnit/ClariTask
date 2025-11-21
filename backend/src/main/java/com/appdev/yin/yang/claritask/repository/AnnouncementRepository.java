package com.appdev.yin.yang.claritask.repository;

import com.appdev.yin.yang.claritask.model.Announcement;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnnouncementRepository extends JpaRepository<Announcement, Long> {}