# Data Sources

The seed dataset bundled in this repo (`companies.json`, `questions.json` — 678 companies,
20,372 questions) was imported via `backend/src/scripts/import-json.ts`. Every question record
carries a `source` field identifying where it came from. As of this snapshot, the full dataset
is drawn from two public GitHub compilations of company-wise LeetCode interview questions:

| Source | Records | What it is |
|---|---|---|
| `github/snehasishroy-leetcode-companywise` | 13,335 | Community-maintained compilation of LeetCode questions tagged by the company that asked them |
| `github/krishnadey30-leetcode-companywise` | 7,037 | Same category — a second, independently maintained company-wise question compilation |

Company metadata (name, category, hiring status, topic frequency) was derived from the same
question set plus manual curation.

## Why this file exists

The `scrapers/` and `pipeline/` directories originally planned for this project (35+ scraper
targets, a Python ETL pipeline, Claude API classification) were never built — see the project
history for context. The dataset that actually ships is simpler: two existing public compilations,
imported directly. This file documents that honestly rather than implying a scraping pipeline
that doesn't exist.

## If you extend this dataset

- Preserve the `source` and `sourceUrl` fields on every new record you add.
- Check the license/terms of any new source before bulk-importing it — "publicly visible" is not
  the same as "redistributable."
- If you're using this project as a portfolio piece, consider whether shipping the full 20k-row
  dump is necessary, or whether a smaller demonstration subset makes the repo easier to review.
