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
   
   Backend (from `backend` folder):
```bash
   npm run start:dev
```
   Runs on http://localhost:3001
   
   Frontend (from `frontend` folder, in a new terminal):
```bash
   npm run dev
```
   Runs on http://localhost:3000
