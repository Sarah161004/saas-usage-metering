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

Typical structure:

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

- Node.js and npm (or pnpm/yarn) installed.
- PostgreSQL running locally and a database created for this project.
- Git installed.

### 1. Clone the repository
```bash
git clone https://github.com/Sarah161004/saas-usage-metring.git
cd saas-usage-metring
```

### 2. Environment variables

Create a `.env` file in the backend (and frontend if required) with values like:

**Backend `.env`:**
```
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/saas_usage_dashboard"
PORT=3001
# Add any other secrets here (JWT secrets, API keys, etc.)
```

**Frontend `.env.local` (if needed):**
```
NEXT_PUBLIC_API_URL=http://localhost:3001
```



### 3. Install dependencies

Backend:
```bash
cd backend
npm install
```

Frontend:
```bash
cd ../frontend
npm install
```

### 4. Run migrations

In the backend folder:
```bash
npx prisma migrate dev
npx prisma generate
```

### 5. Run the apps

Backend:
```bash
cd backend
npm run start:dev
```

The backend will run on **http://localhost:3001**

Frontend (in a new terminal):
```bash
cd frontend
npm run dev
```

The frontend will run on **http://localhost:3000**

### 6. Access the application

- **Frontend Dashboard:** http://localhost:3000
- **Backend API:** http://localhost:3001

## Testing

- Use Postman (or similar) to send requests to secured endpoints at `http://localhost:3001` with `x-api-key` header and confirm new rows appear in `UsageLog` in PostgreSQL.
- Verify the dashboard at `http://localhost:3000` shows updated usage and estimated billing values after calls.

## Status & Next Steps

**Current:**

- End-to-end demo works: API-key based access, metered usage logging, and basic dashboard views.

**Planned improvements:**

- Better aggregation and billing logic per plan.
- Alerts when users approach or exceed plan limits.
- Polished admin UI and charts for usage trends over time.
