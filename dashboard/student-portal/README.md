# Student Portal

The primary user-facing app in PlacePrep — company-specific interview prep for NST students. See the [repo root README](../../README.md) for the full project overview, tech stack, and authorship note.

## What it does

An intelligent, structured guide that answers questions like:
- What topics does a given company typically test in its interviews?
- What's the typical interview format at a company like Amazon or Flipkart?
- Which problem categories come up most often for a specific company?
- Are there common system-design or behavioral questions for a particular role?

## Key views

- **Onboarding (4 steps)** — target domains, target company categories, self-rated skill confidence, prep timeline
- **Companies** — browse and filter the company catalog, drill into round structure, topic frequency, and difficulty distribution per company
- **Practice** — question bank filterable by topic, difficulty, round type, and company
- **Roadmap** — a week-by-week prep plan generated per target company, with progressively unlocked weeks
- **Dashboard** — readiness gauges, today's tasks, streaks, XP, and an activity heatmap
- **Doubts** — students post doubts tagged by topic; faculty respond from the Faculty Portal
- **Sessions** — book mentoring sessions with faculty
- **Interview experiences** — students submit and browse real interview write-ups
- **Leaderboard, profile, notifications, global search**

## Data

Company and question data is seeded from `companies.json` / `questions.json` at the repo root — see [DATA_SOURCES.md](../../DATA_SOURCES.md) for provenance. Some views are still on local mock data while backend wiring is in progress; check the root README's Status section for what's current.

## Running locally

```bash
npm run dev --workspace=student-portal
```

Runs on `http://localhost:3000`. Requires `MONGODB_URI` and the other variables in the repo root's `.env.example` to be set.

## License

MIT — see the [repo root LICENSE](../../LICENSE).
