# ClariTask – Run Guide

This project is a full-stack application:
- Backend: Spring Boot + MySQL (`backend/`)
- Frontend: React + Vite (`frontend/`)

## Prerequisites
- Node.js 18+
- Java 17+
- MySQL Server 8+
- PowerShell (Windows)

## Database Setup
1. Ensure MySQL Server is running locally.
2. Verify credentials in `backend/src/main/resources/application.properties`:
   - `spring.datasource.url=jdbc:mysql://localhost:3306/claritask?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC`
   - `spring.datasource.username=<your-username>`
   - `spring.datasource.password=<your-password>`
   - `spring.jpa.hibernate.ddl-auto=update`
3. The schema `claritask` and tables will be created automatically on backend start.

## Start Backend (Spring Boot)
In an IDE, run `ClariTaskApplication` (`@SpringBootApplication`). Or from terminal:
```
cd backend
./mvnw spring-boot:run
```
- Runs on `http://localhost:8080/`
- Example endpoints:
  - `GET http://localhost:8080/api/users`
  - `POST http://localhost:8080/api/users` (JSON body: `{ "name": "John", "email": "john@example.com", "password": "pass1234", "role": "student" }`)

### Common Issue: Port 8080 in Use
If startup fails with “Port 8080 was already in use”, stop the process:
```
Get-Process -Id (Get-NetTCPConnection -LocalPort 8080 | Select-Object -First 1).OwningProcess | Stop-Process -Force
```
Then rerun the backend command.

## Start Frontend (React + Vite)
```
cd frontend
npm install
npm start
```
- Open `http://localhost:5173/`
- Pages: `/` (Landing), `/signup`, `/login`

## Verify End-to-End
1. Start backend and frontend.
2. Create a user via the Signup page.
3. Check `http://localhost:8080/api/users` to see saved users.
4. In MySQL Workbench: refresh schemas → `claritask` → `users` table should contain the new row.

## Lint
Frontend:
```
cd frontend
npm run lint
```

## Project Structure
- `backend/` Spring Boot app (package `com.appdev.yin.yang.claritask`)
- `frontend/` React app with pages, components, and layouts