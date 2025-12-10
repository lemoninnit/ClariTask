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


## Feature List

### Frontend Features

| Feature | Progress |
|---------|----------|
| **Authentication & User Management** | |
| Login Page | ✅ Complete |
| Signup Page | ✅ Complete |
| JWT Token Management | ✅ Complete |
| Protected Routes | ✅ Complete |
| User Profile Page | ✅ Complete |
| Account Deletion UI | ✅ Complete |
| **Task Management** | |
| Task Creation Form | ✅ Complete |
| Task Edit Form | ✅ Complete |
| Task Delete Functionality | ✅ Complete |
| Task Complete Button | ✅ Complete |
| Task List Display | ✅ Complete |
| Task Status Display | ✅ Complete |
| Task Filtering by Category | ✅ Complete |
| Task Due Date & Time Input | ✅ Complete |
| **Category Management** | |
| Category Creation | ✅ Complete |
| Category Edit | ✅ Complete |
| Category Delete with Trash Icon | ✅ Complete |
| Category Assignment to Tasks | ✅ Complete |
| Category Filtering | ✅ Complete |
| Category Chips Display | ✅ Complete |
| **Calendar View** | |
| Monthly Calendar Component | ✅ Complete |
| Task Deadlines on Calendar | ✅ Complete |
| Date Navigation | ✅ Complete |
| Task Details Sidebar | ✅ Complete |
| Full-width Responsive Layout | ✅ Complete |
| **Notification Center** | |
| Notification Display Page | ✅ Complete |
| Real-time Notification Updates | ✅ Complete |
| Notification Icons & Colors | ✅ Complete |
| Manual Announcement Creation | ✅ Complete |
| Notification Timestamps | ✅ Complete |
| **Dashboard** | |
| Welcome Card Component | ✅ Complete |
| Statistics Cards (Completed, Pending, In Progress, Total) | ✅ Complete |
| Today's Tasks Display | ✅ Complete |
| Category Sidebar | ✅ Complete |
| Task Overview Cards | ✅ Complete |
| **UI/UX** | |
| Responsive Design (Mobile, Tablet, Desktop) | ✅ Complete |
| Modern CSS Animations | ✅ Complete |
| Hover Effects & Transitions | ✅ Complete |
| Consistent Color Theme | ✅ Complete |
| Loading States | ✅ Complete |
| Error Handling & User Feedback | ✅ Complete |
| Landing Page | ✅ Complete |
| Sidebar Navigation | ✅ Complete |
| Header with User Info | ✅ Complete |

### Backend Features

| Feature | Progress |
|---------|----------|
| **Authentication & Security** | |
| User Registration API | ✅ Complete |
| JWT Login API | ✅ Complete |
| Password Encryption (BCrypt) | ✅ Complete |
| Spring Security Configuration | ✅ Complete |
| JWT Token Generation & Validation | ✅ Complete |
| User Authentication Filter | ✅ Complete |
| **Task Management API** | |
| Create Task Endpoint | ✅ Complete |
| Update Task Endpoint | ✅ Complete |
| Delete Task Endpoint | ✅ Complete |
| Get Tasks by User | ✅ Complete |
| Complete Task Endpoint | ✅ Complete |
| Task Status Management | ✅ Complete |
| LocalDateTime Handling | ✅ Complete |
| Task-Category Relationship | ✅ Complete |
| **Category Management API** | |
| Create Category Endpoint | ✅ Complete |
| Update Category Endpoint | ✅ Complete |
| Delete Category Endpoint | ✅ Complete |
| Get Categories by User | ✅ Complete |
| Category Validation | ✅ Complete |
| Foreign Key Constraint Handling | ✅ Complete |
| **User Management API** | |
| Get Current User | ✅ Complete |
| Update User Profile | ✅ Complete |
| Delete User Account | ✅ Complete |
| Cascading Delete for User Data | ✅ Complete |
| **Notification System** | |
| Automatic Notification Creation | ✅ Complete |
| Notification Types (task_created, task_completed, etc.) | ✅ Complete |
| Notification Expiration (7-day cleanup) | ✅ Complete |
| Scheduled Notification Cleanup | ✅ Complete |
| Manual Announcement API | ✅ Complete |
| **Database & Data Management** | |
| MySQL Database Integration | ✅ Complete |
| JPA/Hibernate ORM | ✅ Complete |
| Entity Relationships | ✅ Complete |
| Foreign Key Management | ✅ Complete |
| Cascade Delete Configuration | ✅ Complete |
| Transaction Management | ✅ Complete |
| **API Architecture** | |
| RESTful API Design | ✅ Complete |
| CORS Configuration | ✅ Complete |
| Error Handling | ✅ Complete |
| Data Validation | ✅ Complete |
| DTO Mapping | ✅ Complete |
| Repository Pattern | ✅ Complete |