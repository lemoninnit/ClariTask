# ClariTask

**School Task & Announcement Manager** – A full-stack web application for managing tasks, deadlines, and announcements.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Java 17+
- MySQL Server 8+

### Setup

1. **Configure Database**
   - Edit `backend/src/main/resources/application.properties`
   - Update MySQL credentials (username/password)

2. **Start Backend**
   ```bash
   cd backend
   ./mvnw spring-boot:run
   ```
   Runs on `http://localhost:8080`

3. **Start Frontend**
   ```bash
   cd frontend
   npm install
   npm start
   ```
   Runs on `http://localhost:3000`

4. **Access App**
   - Open `http://localhost:3000`
   - Sign up to create an account
   - Database is created automatically on first run

## ✨ Features

- **Task Management** – Create, edit, delete, and track tasks with due dates
- **Calendar View** – Visual calendar with task deadlines and time tracking
- **Categories** – Organize tasks with custom categories
- **Notification Center** – Real-time notifications for task events and system updates
- **Announcements** – Create and manage announcements
- **User Profiles** – Manage account settings and preferences
- **Secure Authentication** – JWT-based login system

## 📁 Project Structure

```
ClariTask/
├── backend/          # Spring Boot API (Java)
└── frontend/         # React App (JavaScript)
```

## 🔧 Configuration

**Database:** Edit `backend/src/main/resources/application.properties`
- Database name: `claritask` (auto-created)
- Default port: `3306`
- Tables are created automatically

## 🐛 Troubleshooting

- **Port 8080 in use:** Kill the process or change port in `application.properties`
- **MySQL connection failed:** Verify credentials and ensure MySQL is running
- **Frontend won't start:** Run `npm install` in `frontend/` directory


## Recent ClariTask — Feature list
# Authentication & user management
- User registration (name, email, password, role)
- User login with JWT authentication
- Secure password hashing (BCrypt)
- User profile management
-- View profile information
-- Update name and email
-- Delete account
- Role-based system (student/teacher) with unified privileges
- Protected routes (authentication required)
- JWT token-based session management
# Task management
- Create tasks
-- Title, description
-- Due date and time (LocalDateTime)
-- Status (pending, in_progress, completed)
-- Category assignment
- Edit tasks
- Delete tasks
- Mark tasks as complete
- View all tasks
- Task status tracking
-- Pending
-- In Progress
-- Completed
- Task filtering by category
- Task search functionality
# Category management
- Create custom categories
- Edit category names
- Delete categories (with trash icon)
- Assign categories to tasks
- Filter tasks by category
- Visual category chips with colors
- Category-based task organization
# Calendar view
- Monthly calendar display
- Task deadlines shown on calendar dates
- Time display for each task
- Click date to view tasks for that day
- Navigate between months
- Color-coded task status indicators
- Today highlighting
- Task details sidebar when date is selected
- Full-width responsive layout
# Notification center
- Real-time notification system
- Automatic notifications for:
-- Task created
-- Task updated
-- Task completed (expires after 7 days)
-- Task deleted
-- Category created
-- Category deleted
-- Task overdue (automatic detection)
-- Task due soon (within 24 hours)
- Manual announcements
- Color-coded notification types
- Icon-based notification display
- Relative timestamps (e.g., "2h ago", "3d ago")
- Auto-cleanup of expired notifications (7-day expiration)
- Sorted by most recent
- Notification refresh every 60 seconds
# Dashboard
- Welcome card with personalized greeting
- Statistics cards showing:
-- Total tasks
-- Completed tasks
-- Pending tasks
-- In Progress tasks
- Today's tasks display
- Category sidebar with filtering
- Quick task overview
- Quick action buttons
# Announcements
- Create announcements (all users)
- View all announcements
- Edit own announcements
- Delete own announcements
- Link announcements to tasks
- Notification center integration
# UI/UX features
- Responsive design (desktop, tablet, mobile)
- Modern UI with animations
-- Smooth transitions
-- Hover effects
-- Fade-in animations
-- Scale animations
- Consistent color theme (green-based)
- Soft shadows and depth
- Clean, professional layout
- Landing page with feature highlights
- Sidebar navigation
- Header with user info
- Loading states
- Error handling and user feedback
# Backend features
- RESTful API architecture
- Spring Boot backend
- MySQL database integration
- JPA/Hibernate ORM
- Spring Security with JWT
- CORS configuration
- Automatic database schema creation
- Scheduled tasks (notification cleanup)
- File upload support (attachments)
- Data validation
- Error handling
# Security features
- JWT token authentication
- Password encryption (BCrypt)
- Secure API endpoints
- User-specific data isolation
- Protected routes
- CORS protection
- Input validation
# Data management
- Persistent data storage (MySQL)
- Automatic database migrations
- User-specific data (tasks, categories, announcements)
- Data relationships (User → Tasks, Categories, Announcements)
- Soft delete capabilities
- Data filtering and querying
# Additional features
- Landing page with app introduction
- Footer with links and information
- Responsive navigation
- Real-time data updates
- Auto-refresh functionality
- Task time tracking
- Status-based color coding
- Category-based organization
- Search and filter capabilities