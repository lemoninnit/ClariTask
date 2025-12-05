package com.appdevg6.yinandyang.claritask.dto;

import com.appdevg6.yinandyang.claritask.entity.*;

public class DtoMapper {
    public static UserDto toDto(User u) {
        UserDto d = new UserDto();
        d.setUserId(u.getUserId());
        d.setName(u.getName());
        d.setEmail(u.getEmail());
        d.setRole(u.getRole());
        return d;
    }

    public static TaskDto toDto(Task t) {
        TaskDto d = new TaskDto();
        d.setTaskId(t.getTaskId());
        d.setTitle(t.getTitle());
        d.setDescription(t.getDescription());
        d.setDueDate(t.getDueDate());
        d.setStatus(t.getStatus());
        d.setUserId(t.getUser() != null ? t.getUser().getUserId() : null);
        d.setCategoryId(t.getCategory() != null ? t.getCategory().getCategoryId() : null);
        d.setCategoryName(t.getCategory() != null ? t.getCategory().getName() : null);
        return d;
    }

    public static CategoryDto toDto(Category c) {
        CategoryDto d = new CategoryDto();
        d.setCategoryId(c.getCategoryId());
        d.setName(c.getName());
        return d;
    }

    public static AttachmentDto toDto(Attachment a) {
        AttachmentDto d = new AttachmentDto();
        d.setAttachmentId(a.getAttachmentId());
        d.setTaskId(a.getTask() != null ? a.getTask().getTaskId() : null);
        d.setFilename(a.getFilename());
        d.setUploadedAt(a.getUploadedAt());
        return d;
    }

    public static AnnouncementDto toDto(Announcement a) {
        AnnouncementDto d = new AnnouncementDto();
        d.setAnnouncementId(a.getAnnouncementId());
        d.setTitle(a.getTitle());
        d.setContent(a.getContent());
        d.setUserId(a.getUser() != null ? a.getUser().getUserId() : null);
        d.setCreatedAt(a.getCreatedAt());
        d.setNotificationType(a.getNotificationType());
        d.setExpiresAt(a.getExpiresAt());
        if (a.getTask() != null) {
            d.setTaskId(a.getTask().getTaskId());
            d.setTaskTitle(a.getTask().getTitle());
            d.setTaskDueAt(a.getTask().getDueDate());
            d.setTaskCategoryName(a.getTask().getCategory() != null ? a.getTask().getCategory().getName() : null);
        }
        return d;
    }
}
