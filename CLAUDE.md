# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Tu Oficio** is a Spanish-language marketplace platform connecting clients with service professionals (plumbers, electricians, etc.). Monorepo with npm workspaces:

- `backend/` — Backend API (TypeScript, Express, TypeORM, PostgreSQL)
- `frontend/` — Frontend app (React 18, Create React App)

## Commands

### From root (npm workspaces)

```bash
npm install                  # Install all dependencies (both projects)
npm run start:back           # Start backend
npm run start:front          # Start frontend
npm run build:back           # Build backend
npm run build:front          # Build frontend
npm run test:front           # Run frontend tests
```

### Backend (`backend/`)

```bash
npm start                    # ts-node src/index.ts
npm run build                # tsc
```

**Database:** PostgreSQL on localhost:5432, credentials: test/test/test (user/password/database). TypeORM with `synchronize: true` auto-creates schema.

### Frontend (`frontend/`)

```bash
npm start                    # Start dev server (port 3001, proxies to backend on 3000)
npm test                     # Run Jest tests
npm run build                # Production build
```

**Run a single test:**
```bash
npx jest --testPathPattern="Footer"    # Run tests matching a pattern
```

**Jest config:** `jest.config.js` — roots in `<rootDir>/src`, matches `*.test.js` and `*.spec.js` files.

## Architecture

### Backend — Service-Repository Pattern

```
backend/src/
├── index.ts              # Entry point: initializes DB, creates sample data
├── data-source.ts        # TypeORM DataSource (PostgreSQL config)
├── entities/             # TypeORM entities with decorators
│   ├── User.ts           # Base entity (id, name, email, dni, etc.)
│   ├── Admin.ts          # Extends User
│   ├── Client.ts         # Extends User
│   ├── Profesional.ts    # Extends User + registrationNumber, specialty, yearsOfExperience
│   └── ProfesionsEnum.ts # Enum: Client, Profesional, Admin
├── repositories/         # TypeORM custom repositories (Admin, Client, Profesional)
├── services/             # Business logic: CRUD + search + validation per entity
├── routes/routes.ts      # Express routes (stub — not yet wired)
└── server.ts             # Express server setup (minimal)
```

Services implement: `create()`, `delete()`, `getData()`, `list()`, `search()`, `update()` with Spanish-language error messages and field validation (duplicate dni/email checks).

**Note:** Routes/HTTP layer is not yet connected. Services exist but aren't exposed via Express endpoints yet.

### Frontend — Component Composition

```
frontend/src/
├── App.jsx               # React Router v6 routes
├── components/
│   ├── Home/             # Landing page: composes Navbar, Hero, Categories, Recommend, Testimonials, Footer
│   ├── Navbar/           # Responsive nav with hamburger menu (breakpoint: 1080px)
│   ├── Hero/             # Banner with search bar
│   ├── Categories/       # Service categories grid (Hogar, Salud, Comercio, etc.)
│   ├── Recommend/        # Featured professionals with tab filtering
│   ├── Testimonials/     # User reviews
│   ├── LoginForm/        # Dual login: client vs professional
│   ├── SignUpForm/        # Registration with conditional professional fields
│   ├── ProfileForm/      # Class component with image upload + react-modal
│   ├── SearchResults/    # Professional listings with ratings
│   ├── Footer/           # Site footer
│   └── ScrollToTop/      # Scroll-to-top button
└── tests/                # Footer.test.js, ScrollToTop.test.js
```

**Routes:** `/` (Home), `/login`, `/signup`, `/profile-settings`, `/searchResults`

**API calls:** Frontend uses `fetch()` to `http://localhost:3000` with POST JSON for login (`/login-client`, `/login-professional`) and registration (`/add-client`, `/add-professional`).

**Styling:** Mix of styled-components (primary) and CSS files (LoginForm.css, SignUpForm.css). Color palette: Orange #FF6922, Dark Blue #0E2E50, Cyan #48cae4.

## Key Technical Notes

- Backend uses deprecated `getCustomRepository` pattern (TypeORM 0.3.x prefers `DataSource.getRepository`)
- Frontend uses legacy `ReactDOM.render` instead of React 18's `createRoot`
- No global state management — all state is local via `useState` hooks
- No authentication token persistence — login responses aren't stored
- All user-facing text is in Spanish
