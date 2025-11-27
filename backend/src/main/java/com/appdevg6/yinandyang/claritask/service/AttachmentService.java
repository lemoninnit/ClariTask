package com.appdevg6.yinandyang.claritask.service;

import com.appdevg6.yinandyang.claritask.entity.Attachment;
import com.appdevg6.yinandyang.claritask.repository.AttachmentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AttachmentService {
    private final AttachmentRepository attachments;
    public AttachmentService(AttachmentRepository attachments) { this.attachments = attachments; }

    public List<Attachment> all() { return attachments.findAll(); }
    public Optional<Attachment> get(Long id) { return attachments.findById(id); }
    public Attachment create(Attachment a) { return attachments.save(a); }
    public void delete(Long id) { attachments.deleteById(id); }
}
