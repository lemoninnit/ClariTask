package com.appdevg6.yinandyang.claritask.service;

import com.appdevg6.yinandyang.claritask.entity.Announcement;
import com.appdevg6.yinandyang.claritask.repository.AnnouncementRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AnnouncementService {
    private final AnnouncementRepository announcements;
    public AnnouncementService(AnnouncementRepository announcements) { this.announcements = announcements; }

    public List<Announcement> all() { return announcements.findAll(); }
    public Optional<Announcement> get(Long id) { return announcements.findById(id); }
    public Announcement create(Announcement a) { return announcements.save(a); }
    public Announcement update(Announcement a) { return announcements.save(a); }
    public void delete(Long id) { announcements.deleteById(id); }
}
