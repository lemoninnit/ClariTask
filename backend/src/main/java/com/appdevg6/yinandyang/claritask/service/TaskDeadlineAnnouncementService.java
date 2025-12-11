package com.appdevg6.yinandyang.claritask.service;

import com.appdevg6.yinandyang.claritask.entity.Announcement;
import com.appdevg6.yinandyang.claritask.entity.Task;
import com.appdevg6.yinandyang.claritask.repository.AnnouncementRepository;
import com.appdevg6.yinandyang.claritask.repository.TaskRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class TaskDeadlineAnnouncementService {
    private static final DateTimeFormatter DATE_TIME_FMT = DateTimeFormatter.ofPattern("MMM d, yyyy 'at' HH:mm");

    private final TaskRepository taskRepository;
    private final AnnouncementRepository announcementRepository;

    public TaskDeadlineAnnouncementService(TaskRepository taskRepository, AnnouncementRepository announcementRepository) {
        this.taskRepository = taskRepository;
        this.announcementRepository = announcementRepository;
    }

    /**
     * Runs hourly to post deadline reminders:
     * - 7 days before: "1 week left"
     * - 1 day before: "1 day left"
     * - Within last 24h window: pop every 4h until done/expired
     * - Past due: "missed the deadline"
     */
    @Scheduled(fixedRate = 3600000) // every hour
    @Transactional
    public void postDeadlineAnnouncements() {
        LocalDateTime now = LocalDateTime.now();
        List<Task> tasks = taskRepository.findAll();

        for (Task task : tasks) {
            if (task.getDueDate() == null) continue;
            if ("completed".equalsIgnoreCase(task.getStatus())) continue;

            LocalDateTime due = task.getDueDate();
            long daysUntil = ChronoUnit.DAYS.between(now.toLocalDate(), due.toLocalDate());
            boolean isOverdue = due.isBefore(now);

            if (isOverdue) {
                createIfAbsent(task, "task_overdue",
                        String.format("Task \"%s\" missed its deadline on %s.", task.getTitle(), format(due)),
                        now.plusDays(7));
                continue;
            }

            if (daysUntil == 7) {
                createIfAbsent(task, "task_due_week",
                        String.format("Task \"%s\" is due in 1 week on %s.", task.getTitle(), format(due)),
                        due.plusDays(1));
            } else if (daysUntil == 1) {
                createIfAbsent(task, "task_due_day",
                        String.format("Task \"%s\" is due tomorrow (%s).", task.getTitle(), format(due)),
                        due.plusDays(1));
            } else if (isWithin24Hours(now, due)) {
                createEveryFourHours(task, now, due);
            }
        }
    }

    private boolean isWithin24Hours(LocalDateTime now, LocalDateTime due) {
        return !due.isBefore(now) && ChronoUnit.HOURS.between(now, due) <= 24;
    }

    private void createIfAbsent(Task task, String type, String content, LocalDateTime expiresAt) {
        Long taskId = task.getTaskId();
        if (taskId == null) return;

        boolean alreadyNotified = !announcementRepository
                .findByTaskTaskIdAndNotificationType(taskId, type)
                .isEmpty();
        if (alreadyNotified) return;

        Announcement a = new Announcement();
        a.setTitle(buildTitle(type));
        a.setContent(content);
        a.setUser(task.getUser());
        a.setTask(task);
        a.setNotificationType(type);
        a.setExpiresAt(expiresAt);

        announcementRepository.save(a);
    }

    /**
     * For the last 24 hours before due, post a reminder every 4 hours.
     * Avoid spamming by checking the last announcement timestamp for this type.
     */
    private void createEveryFourHours(Task task, LocalDateTime now, LocalDateTime due) {
        Long taskId = task.getTaskId();
        if (taskId == null) return;

        List<Announcement> existing = announcementRepository
                .findByTaskTaskIdAndNotificationType(taskId, "task_due_24h_window");

        boolean shouldCreate = existing.isEmpty() ||
                existing.stream()
                        .map(Announcement::getCreatedAt)
                        .max(LocalDateTime::compareTo)
                        .map(last -> last.plusHours(4).isBefore(now) || last.plusHours(4).isEqual(now))
                        .orElse(true);

        if (!shouldCreate) return;

        long hoursLeft = Math.max(1, ChronoUnit.HOURS.between(now, due));
        Announcement a = new Announcement();
        a.setTitle("Task due soon (24h)");
        a.setContent(String.format("Task \"%s\" is due in %d hour%s on %s.",
                task.getTitle(),
                hoursLeft,
                hoursLeft == 1 ? "" : "s",
                format(due)));
        a.setUser(task.getUser());
        a.setTask(task);
        a.setNotificationType("task_due_24h_window");
        a.setExpiresAt(due.plusDays(1));

        announcementRepository.save(a);
    }

    private String buildTitle(String type) {
        return switch (type) {
            case "task_due_week" -> "Task due in 1 week";
            case "task_due_day" -> "Task due tomorrow";
            case "task_overdue" -> "Task deadline missed";
            default -> "Task reminder";
        };
    }

    private String format(LocalDateTime dt) {
        return dt.format(DATE_TIME_FMT);
    }
}

