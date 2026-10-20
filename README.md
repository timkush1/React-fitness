# React Fitness Tracker

A full-stack workout tracker. Users sign up, log workouts (activity, duration, date, notes), and see their training history on a dashboard with a progress chart.

## Features

- **Authentication** – sign up / log in with bcrypt-hashed passwords and JWT sessions (1h expiry)
- **Workout log** – create, edit and delete workouts; each user only sees their own entries
- **Dashboard** – workout history plus a Chart.js line chart of activity over time

## Tech Stack

| Layer    | Technology                                   |
|----------|----------------------------------------------|
| Frontend | Next.js 14, React 18, Tailwind CSS, Chart.js |
| Backend  | Node.js, Express, JWT auth middleware        |
| Database | MongoDB with Mongoose                        |

## Project Structure

```
backend/      Express API (routes, models, auth middleware)
components/   React components (auth forms, dashboard, layout, UI)
pages/        Next.js pages
services/     API client helpers
util/         Auth context and data processing
```

## Getting Started

**Prerequisites:** Node.js 18+ and a MongoDB instance (local or Atlas).

```bash
# 1. Backend
cd backend
cp .env.example .env      # set MONGODB_URI and JWT_SECRET
npm install
npm run dev               # http://localhost:5000

# 2. Frontend (new terminal, repo root)
npm install
npm run dev               # http://localhost:3000
```

## API

All `/api/expenses` routes require an `Authorization: Bearer <token>` header.

| Method | Endpoint             | Description             |
|--------|----------------------|-------------------------|
| POST   | `/api/auth/register` | Create an account       |
| POST   | `/api/auth/login`    | Log in, returns a JWT   |
| GET    | `/api/expenses`      | List the user's workouts |
| POST   | `/api/expenses`      | Add a workout           |
| PUT    | `/api/expenses/:id`  | Update a workout        |
| DELETE | `/api/expenses/:id`  | Delete a workout        |
