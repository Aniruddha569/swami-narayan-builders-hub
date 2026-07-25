# Swami Narayan Builders Hub - TypeScript to JavaScript Conversion

## 📋 Overview

This document outlines the complete conversion from TypeScript to JavaScript while maintaining the existing UI/UX and separating the database layer.

## ✅ Completed Changes

### Frontend Conversion (TypeScript → JavaScript)

✅ **All `.tsx` files converted to `.jsx`:**
- `src/main.jsx` - React DOM entry point
- `src/App.jsx` - Main router and providers
- `src/hooks/useAuth.jsx` - Authentication hook
- `src/contexts/LanguageContext.jsx` - i18n context
- `src/lib/utils.js` - Utility functions
- `src/services/api.js` - API service layer

✅ **Type System Removed:**
- All TypeScript interfaces removed
- No type annotations needed
- Dynamic typing with JSDoc comments (optional)

✅ **Dependencies Updated:**
- Removed: `typescript`, `@types/*` packages
- Kept: `react`, `react-router-dom`, `tailwind`, `shadcn/ui`, etc.

### Backend Implementation (Node.js + Express)

✅ **Complete Backend Structure Created:**

```
server/
├── config/
│   └── database.js          # PostgreSQL connection
├── middleware/
│   └── auth.js              # JWT authentication
├── routes/
│   ├── projects.js          # Projects CRUD API
│   ├── reviews.js           # Reviews CRUD API
│   ├── enquiries.js         # Enquiries CRUD API
│   ├── flats.js             # Flats CRUD API
│   └── auth.js              # Authentication API
├── server.js                # Express app entry
├── package.json             # Node dependencies
├── .env.example             # Environment template
└── README.md                # API documentation
```

### Database Schema (PostgreSQL)

✅ **SQL Migration Files:**
- `database/migrations/001_init.sql` - Complete schema
- Tables: `projects`, `reviews`, `enquiries`, `flats`, `user_roles`
- Row Level Security (RLS) policies
- Automatic timestamps with triggers

### Documentation

✅ **Comprehensive Guides:**
- `server/README.md` - API documentation
- `database/README.md` - Database setup
- `.env.example` - Configuration template
- This file - Complete conversion guide

---

## 🚀 Getting Started

### Prerequisites

- Node.js v16+ ([Download](https://nodejs.org/))
- PostgreSQL v12+ ([Download](https://www.postgresql.org/))
- Git
- npm or yarn

### Quick Start (Development)

#### 1. Database Setup

```bash
# Create database
creatdb swami_narayan_builders

# Run migrations
psql swami_narayan_builders < database/migrations/001_init.sql

# Verify (connect to database)
psql swami_narayan_builders
\dt  # List tables
\q  # Quit
```

#### 2. Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your database credentials
# Example:
# DATABASE_URL=postgresql://username:password@localhost:5432/swami_narayan_builders
# JWT_SECRET=your-super-secret-key
# PORT=3000

# Start development server
npm run dev

# Server running at http://localhost:3000
```

#### 3. Frontend Setup

```bash
# Go back to root
cd ..

# Install frontend dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env
# VITE_API_URL=http://localhost:3000/api

# Start frontend development
npm run dev

# Frontend running at http://localhost:5173
```

---

## 📁 Project Structure

### Frontend (React)

```
src/
├── main.jsx                 # Entry point
├── App.jsx                  # Routes & providers
├── components/
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── Hero.jsx
│   ├── Gallery.jsx
│   ├── Admin.jsx
│   └── ...
├── pages/
│   ├── Home.jsx
│   ├── ProjectsPage.jsx
│   ├── AdminPage.jsx
│   └── ...
├── hooks/
│   └── useAuth.jsx          # Authentication
├── contexts/
│   └── LanguageContext.jsx   # i18n
├── services/
│   └── api.js               # API client
├── lib/
│   └── utils.js             # Utilities
└── index.css                # Tailwind CSS
```

### Backend (Express)

```
server/
├── server.js                # Main server
├── config/
│   └── database.js          # DB connection
├── middleware/
│   └── auth.js              # Auth middleware
├── routes/
│   ├── projects.js
│   ├── reviews.js
│   ├── enquiries.js
│   ├── flats.js
│   └── auth.js
├── package.json
└── README.md
```

### Database

```
database/
├── migrations/
│   └── 001_init.sql         # Schema
└── README.md                # DB docs
```

---

## 🔄 How It Works

### Data Flow

```
┌─────────────────────────────────────────────────────────┐
│          Frontend (React + JavaScript)                   │
│  ┌──────────────────────────────────────────────────┐   │
│  │  Components (Admin, Projects, Reviews, etc.)    │   │
│  │  - All .jsx files (no TypeScript)               │   │
│  │  - Uses useAuth() hook                          │   │
│  │  - useLanguage() for i18n                       │   │
│  └──────────────────────────────────────────────────┘   │
│           ↓ (HTTP requests via /api)                    │
└─────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│        Backend (Express.js + Node.js)                    │
│  ┌──────────────────────────────────────────────────┐   │
│  │  API Routes:                                    │   │
│  │  - /api/projects (GET, POST, PUT, DELETE)      │   │
│  │  - /api/reviews (GET, POST, PATCH, DELETE)     │   │
│  │  - /api/enquiries (GET, POST, PATCH, DELETE)   │   │
│  │  - /api/flats (GET, POST, PUT, DELETE)         │   │
│  │  - /api/auth (signin, signup, session)         │   │
│  └──────────────────────────────────────────────────┘   │
│           ↓ (SQL queries)                               │
└─────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│        Database (PostgreSQL)                             │
│  ┌──────────────────────────────────────────────────┐   │
│  │  Tables:                                        │   │
│  │  - projects       (Building projects)           │   │
│  │  - reviews        (Customer reviews)            │   │
│  │  - enquiries      (Customer inquiries)          │   │
│  │  - flats          (Property units)              │   │
│  │  - user_roles     (Permissions)                 │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

### Authentication Flow

```
1. User logs in (frontend)
   ↓
2. POST /api/auth/signin with email & password
   ↓
3. Backend validates and returns JWT token
   ↓
4. Frontend stores token in memory/localStorage
   ↓
5. Future requests include: Authorization: Bearer <token>
   ↓
6. Backend verifies token and processes request
```

---

## 🔌 API Endpoints

### Authentication

```
POST   /api/auth/signin           - Login
POST   /api/auth/signup           - Register
GET    /api/auth/session          - Get current session
POST   /api/auth/signout          - Logout
GET    /api/admin/check-role/:id  - Check if user is admin
```

### Projects

```
GET    /api/projects              - List all projects
GET    /api/projects/:id          - Get project details
POST   /api/projects              - Create project (admin)
PUT    /api/projects/:id          - Update project (admin)
DELETE /api/projects/:id          - Delete project (admin)
GET    /api/projects/:id/flats    - Get flats in project
```

### Reviews

```
GET    /api/reviews               - Get all reviews (with ?approved=true)
POST   /api/reviews               - Submit review
PATCH  /api/reviews/:id/approve   - Approve review (admin)
PATCH  /api/reviews/:id/reject    - Reject review (admin)
DELETE /api/reviews/:id           - Delete review (admin)
```

### Enquiries

```
POST   /api/enquiries             - Submit enquiry
GET    /api/enquiries             - Get all enquiries (admin)
PATCH  /api/enquiries/:id/read    - Mark as read (admin)
DELETE /api/enquiries/:id         - Delete enquiry (admin)
```

### Flats

```
GET    /api/flats                 - List all flats
GET    /api/flats/:id             - Get flat details
GET    /api/flats/project/:pid    - Get flats in project
POST   /api/flats                 - Create flat (admin)
PUT    /api/flats/:id             - Update flat (admin)
DELETE /api/flats/:id             - Delete flat (admin)
```

---

## 🔐 Admin Credentials (Development)

**Email:** `admin@swami.com`
**Password:** `admin123`

⚠️ **Change in production!**

---

## 📝 Key Differences from TypeScript Version

### Before (TypeScript)

```typescript
// src/App.tsx
import { FC } from 'react';
import { ProjectsPage } from './pages/ProjectsPage';

interface AppProps {}

const App: FC<AppProps> = () => {
  // ...
};
```

### After (JavaScript)

```javascript
// src/App.jsx
import ProjectsPage from './pages/ProjectsPage';

const App = () => {
  // ...
};
```

### Supabase to Backend API

**Before:**
```typescript
import { supabase } from "@/integrations/supabase/client";
const { data } = await supabase.from("projects").select("*");
```

**After:**
```javascript
import { projectsAPI } from "@/services/api";
const data = await projectsAPI.getAll();
```

---

## 🚢 Deployment

### Frontend (Vercel/Netlify)

```bash
# Build
npm run build

# Preview
npm run preview

# Deploy to Vercel
vercel
```

### Backend (Heroku/Railway/DigitalOcean)

```bash
cd server
npm install
npm start
```

**Environment variables needed:**
- `DATABASE_URL`
- `JWT_SECRET`
- `PORT`
- `NODE_ENV`
- `CORS_ORIGIN`

---

## 🐛 Troubleshooting

### Database Connection Error

```
Error: connect ECONNREFUSED 127.0.0.1:5432
```

**Solution:**
```bash
# Start PostgreSQL
sudo systemctl start postgresql

# Check connection string in .env
DATABASE_URL=postgresql://user:password@localhost:5432/swami_narayan_builders
```

### CORS Error

```
Access to XMLHttpRequest blocked by CORS policy
```

**Solution:** Update CORS origin in `server/server.js`:
```javascript
app.use(cors({ origin: 'http://localhost:5173' }));
```

### JWT Token Expired

**Solution:** Re-login or check token expiry in `server/routes/auth.js`

---

## 📚 Resources

- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)
- [JWT.io](https://jwt.io)
- [Tailwind CSS](https://tailwindcss.com)

---

## 📞 Support

For issues or questions:
1. Check this guide
2. Review API docs in `server/README.md`
3. Check database docs in `database/README.md`
4. Create a GitHub issue

---

## ✨ What's Next?

- [ ] Add unit tests (Jest)
- [ ] Add e2e tests (Cypress)
- [ ] Setup CI/CD (GitHub Actions)
- [ ] Add image upload to cloud storage
- [ ] Setup email notifications
- [ ] Add analytics
- [ ] Setup monitoring

---

## 📄 License

MIT License - See LICENSE file

---

**Created:** July 2026
**Version:** 1.0.0
**Status:** ✅ Complete
