package com.appdevg6.yinandyang.claritask.service;

import com.appdevg6.yinandyang.claritask.entity.User;
import com.appdevg6.yinandyang.claritask.repository.UserRepository;
import com.appdevg6.yinandyang.claritask.repository.TaskRepository;
import com.appdevg6.yinandyang.claritask.repository.CategoryRepository;
import com.appdevg6.yinandyang.claritask.repository.AnnouncementRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class UserService implements UserDetailsService {
    private final UserRepository users;
    private final TaskRepository taskRepository;
    private final CategoryRepository categoryRepository;
    private final AnnouncementRepository announcementRepository;
    
    public UserService(UserRepository users, TaskRepository taskRepository, 
                      CategoryRepository categoryRepository, AnnouncementRepository announcementRepository) {
        this.users = users;
        this.taskRepository = taskRepository;
        this.categoryRepository = categoryRepository;
        this.announcementRepository = announcementRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return users.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
    }

    public List<User> all() { return users.findAll(); }
    public Optional<User> get(Long id) { return users.findById(id); }
    public User create(User u) { return users.save(u); }
    public User update(User u) { return users.save(u); }
    
    @Transactional
    public void delete(Long id) {
        Optional<User> userOpt = users.findById(id);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            
            // Delete all announcements for this user
            announcementRepository.findByUserUserIdOrderByCreatedAtDesc(id)
                    .forEach(announcementRepository::delete);
            
            // Delete all tasks for this user (cascade will handle attachments)
            taskRepository.findByUserUserId(id)
                    .forEach(taskRepository::delete);
            
            // Delete all categories for this user
            categoryRepository.findByUserUserId(id)
                    .forEach(categoryRepository::delete);
            
            // Finally delete the user
            users.deleteById(id);
        }
    }
}
