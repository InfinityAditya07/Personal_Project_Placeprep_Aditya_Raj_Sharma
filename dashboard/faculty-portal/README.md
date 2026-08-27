# Faculty Portal

This is the Faculty Portal for PlacePrep, designed to track industry trends, curriculum gaps, and student session requests.

## Pages
- `/` - **Dashboard Home**: KPI overview, gap matrix preview, and live insights feed.
- `/requests` - **Session Requests**: View, confirm, or propose new times for student mock interviews.
- `/doubts` - **Doubts & Questions**: Answer student doubts organized by topic tags.
- `/curriculum` - **Curriculum Gap Matrix**: Heatmap visualization of syllabus coverage against industry demand.
- `/trends` - **Industry Trends**: Charting topic frequency and a feed of recent hiring trends.
- `/rankings` - **Company Rankings**: Sortable table of companies ranked by curriculum alignment.
- `/reports` - **Export Reports**: Generate and download PDF exports of the dashboard analytics.

## Data Layer
Shared client-side logic lives in `lib/`:
- `types.ts` - Shared TypeScript interfaces.
- `api.ts` - Fetch wrappers for the faculty API routes.
- `context/FacultyContext.tsx` - Current-faculty state, shared across pages.
- `utils.ts` - Formatting and misc helpers.

Some views (curriculum gap matrix, trends) are still partly on mock data pending full backend wiring — see the root README's Status section.

## Running Locally
The portal runs on port `3001` (if run concurrently with the student portal which uses `3000`).
```bash
npm run dev --workspace=faculty-portal
```

## Implementation Notes
- The **Session Requests** (`/requests`) and **Doubts & Questions** (`/doubts`) share the same data models and UI patterns as the Student Portal equivalents (`dashboard/student-portal/app/(app)/sessions/page.tsx` and `doubts/page.tsx`) by design — students and faculty are looking at two sides of the same data.
