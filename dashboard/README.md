# Dashboard

The three Next.js apps that make up PlacePrep's product layer. Each is an independent
workspace with its own `package.json`, deployed as its own Vercel project.

## Structure

```
dashboard/
├── student-portal/    # Student-facing app — companies, roadmap, practice, doubts, sessions
├── faculty-portal/     # Faculty-facing app — curriculum gap analysis, doubt resolution
└── admin-portal/       # Admin-facing app — platform overview, user management, analytics
```

Each portal reads and writes through Next.js API routes that call into the shared
service layer at `../backend/src` (models, repositories, services, validators — Mongoose
over MongoDB Atlas). There is no standalone API server; the backend logic runs inside
each portal's own API routes.

## Tech Stack

| Part | Technology |
|------|-----------|
| Frontend | Next.js 15/16 (App Router), TypeScript, Tailwind CSS |
| Charts | Recharts, Chart.js |
| Backend logic | Shared TypeScript service layer under `backend/src` |
| Database | MongoDB Atlas via Mongoose |
| Auth | JWT + per-portal cookie-based middleware |
| Deployment | Vercel — one project per portal |

## Getting Started

```bash
# From the repo root
npm install

npm run dev --workspace=student-portal    # :3000
npm run dev --workspace=faculty-portal    # :3001
npm run dev --workspace=admin-portal      # :3002

# or run all three at once:
npm run dev
```

See each portal's own README for its specific views and data layer, and the
[repo root README](../README.md) for the full project overview.
