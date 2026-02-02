# SaaS Usage Metering & Billing Dashboard

A small demo SaaS usage metering and billing system that tracks how many API requests each customer makes and helps estimate how much they should be billed at the end of the month.  
It focuses on API-key based access, metered usage logs, and a dashboard that shows usage and estimated billing per user.

## Features

- API key management: generate and manage API keys for each user to secure access to the backend APIs.
- Secured endpoints: protect routes with an `x-api-key` header and a NestJS guard that validates keys before allowing access.
- Usage logging: every valid API call is recorded in a `UsageLog` table in PostgreSQL via Prisma.
- Plans & limits (WIP): models for plans and limits to support soft/hard usage caps per user.
- Usage & billing dashboard: Next.js dashboard pages to see users, usage, and estimated billing information.

## Tech Stack

**Frontend**

- Next.js (App Router) for the dashboard UI.
- React + TypeScript.
- Tailwind CSS for styling.

**Backend**

- NestJS for the API server.
- Prisma as ORM.
- PostgreSQL as the database.
- API key guard and usage logging services.

## Project Structure (high-level)

Typical structure (may vary slightly in this repo):

- `frontend/` – Next.js app for dashboard, login, users, usage and billing pages.
- `backend/` – NestJS app exposing secured endpoints and handling usage logging.
- `prisma/` – Prisma schema and migrations for User, ApiKey, UsageLog, Plan, Invoice, etc.
- `README.md` – this file.

## Core Flow

1. An API key is created for a user in the backend (and stored in the database).
2. A client calls a secured endpoint with `x-api-key: <key>`.
3. NestJS guard validates the key and attaches the user/key to the request.
4. The endpoint records a usage event in `UsageLog` through Prisma.
5. Usage data is aggregated per user/month to support usage-based billing.
6. The Next.js dashboard reads this data and shows usage and estimated billing.

## Getting Started (Local Development)

### Prerequisites

- Node.js and npm installed
- PostgreSQL installed and running
- Git installed

### Setup Steps

1. **Clone the repository**
```bash
   git clone https://github.com/Sarah161004/saas-usage-metring.git
   cd saas-usage-metring
```

2. **Set up PostgreSQL database**
   - Create a database named `saas_usage_dashboard` in PostgreSQL

3. **Configure Backend**
```bash
   cd backend
```
   - Create a `.env` file with:
```
     DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/saas_usage_dashboard"
     PORT=3001
```
   - Install dependencies:
```bash
     npm install
```
   - Run migrations:
```bash
     npx prisma migrate dev
     npx prisma generate
```

4. **Configure Frontend**
```bash
   cd ../frontend
   npm install
```
   - Create `.env.local` file (if needed for API URL):
```
     NEXT_PUBLIC_API_URL=http://localhost:3001
```

5. **Run the applications**
   
   **Backend** (from `backend` folder):
```bash
   npm run start:dev
```
   Runs on http://localhost:3001
   
   **Frontend** (from `frontend` folder, in a new terminal):
```bash
   npm run dev
```
   Runs on http://localhost:3000

## Testing

- Use Postman or any API client to send requests to `http://localhost:3001` with `x-api-key` header
- Verify that new usage logs appear in the PostgreSQL `UsageLog` table
- Open http://localhost:3000 and verify the dashboard displays usage and billing information

## Troubleshooting

**Database connection errors:**
- Verify PostgreSQL is running
- Check your `DATABASE_URL` credentials in `backend/.env`
- Ensure the database `saas_usage_dashboard` exists

**Port already in use:**
- Frontend: Run on different port with `npm run dev -- -p 3002`
- Backend: Update `PORT` in `backend/.env`

**Prisma errors:**
- Run `npx prisma generate` in the backend folder
- Try `npx prisma migrate reset` to reset the database (deletes all data)

## Status & Next Steps

**Current:**

- End-to-end demo works: API-key based access, metered usage logging, and basic dashboard views.

**Planned improvements:**

- Better aggregation and billing logic per plan.
- Alerts when users approach or exceed plan limits.
- Polished admin UI and charts for usage trends over time.
