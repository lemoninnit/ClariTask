package com.appdevg6.yinandyang.claritask.dto;

import java.time.LocalDateTime;

public class AnnouncementDto {
    private Long announcementId;
    private String title;
    private String content;
    private Long userId;
    private LocalDateTime createdAt;
    private Long taskId;
    private String taskTitle;
    private LocalDateTime taskDueAt;
    private String taskCategoryName;
    private String notificationType;
    private LocalDateTime expiresAt;

    public Long getAnnouncementId() { return announcementId; }
    public void setAnnouncementId(Long announcementId) { this.announcementId = announcementId; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public Long getTaskId() { return taskId; }
    public void setTaskId(Long taskId) { this.taskId = taskId; }
    public String getTaskTitle() { return taskTitle; }
    public void setTaskTitle(String taskTitle) { this.taskTitle = taskTitle; }
    public LocalDateTime getTaskDueAt() { return taskDueAt; }
    public void setTaskDueAt(LocalDateTime taskDueAt) { this.taskDueAt = taskDueAt; }
    public String getTaskCategoryName() { return taskCategoryName; }
    public void setTaskCategoryName(String taskCategoryName) { this.taskCategoryName = taskCategoryName; }
    public String getNotificationType() { return notificationType; }
    public void setNotificationType(String notificationType) { this.notificationType = notificationType; }
    public LocalDateTime getExpiresAt() { return expiresAt; }
    public void setExpiresAt(LocalDateTime expiresAt) { this.expiresAt = expiresAt; }
}
