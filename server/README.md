# Kree API

Express + TypeScript + Prisma → Supabase Postgres.

## Setup

1. Copy `.env.example` → `.env` and set `DATABASE_URL` / `DIRECT_URL` / `JWT_SECRET`
2. `npm install`
3. `npm run db:push` (or `npm run db:migrate`)
4. `npm run dev` → `http://localhost:4000`

## Auth (propriétaire)

| Method | Path | Auth |
| --- | --- | --- |
| POST | `/api/auth/signup` | public |
| POST | `/api/auth/signin` | public |
| GET | `/api/auth/me` | Bearer JWT |
| PATCH | `/api/auth/me` | Bearer JWT |
| GET | `/api/health` | public |
