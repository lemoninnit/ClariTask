# ClariTask – Setup and Run

Full‑stack app with a Spring Boot backend and a React (Webpack) frontend.

## Prerequisites
- Node.js 18+
- Java 17+
- MySQL Server 8+
- PowerShell (Windows)

## Quick Start
1. Configure database credentials in `backend/src/main/resources/application.properties`.
2. Start the backend:
   ```
   cd backend
   mvnw spring-boot:run
   ```
   Backend runs on `http://localhost:8080/`.
3. Start the frontend:
   ```
   cd frontend
   npm install
   npm start
   ```
   Frontend runs on `http://localhost:3000/`.
4. Sign up a user on the frontend, then verify via `http://localhost:8080/api/users` and in MySQL Workbench (`claritask` schema).

## Backend (Spring Boot)
- App entry: `ClariTaskApplication` (`@SpringBootApplication`).
- API base: `http://localhost:8080/api`.
- Example endpoints:
  - `GET /api/users`
  - `POST /api/users` (JSON body: `{ "name": "John", "email": "john@example.com", "password": "pass1234", "role": "student" }`)
- Configuration: edit `spring.datasource.*` values in `backend/src/main/resources/application.properties`.
- Common port issue (8080 in use):
  ```
  Get-Process -Id (Get-NetTCPConnection -LocalPort 8080 | Select-Object -First 1).OwningProcess | Stop-Process -Force
  ```

## Frontend (React + Webpack)
- Dev server: `npm start` (Webpack Dev Server).
- Open `http://localhost:3000/`.
- Pages: `/` (Landing), `/signup`, `/login`, `/dashboard`.
- Lint:
  ```
  cd frontend
  npm run lint
  ```

## Database Setup
1. Ensure MySQL is running locally.
2. Set credentials in `application.properties`:
   - `spring.datasource.url=jdbc:mysql://localhost:3306/claritask?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC`
   - `spring.datasource.username=<your-username>`
   - `spring.datasource.password=<your-password>`
   - `spring.jpa.hibernate.ddl-auto=update`
3. On first run, the `claritask` schema and tables are created automatically.

## Project Structure
- `backend/` Spring Boot app (package `com.appdevg6.yinandyang.claritask`)
- `frontend/` React app with `src/` pages, components, and layouts

## Troubleshooting
- MySQL connection errors: verify credentials and that port 3306 is open.
- Node version issues: ensure Node 18+ (`node -v`).
- If the frontend doesn’t build, run `npm install` inside `frontend/` and retry.
