# Worklog AI Frontend

React frontend for Worklog AI, a developer-focused application that turns
repository activity into structured daily worklogs.

## Requirements

- Node.js 24.21.0 (Node 24.15.0 or newer in the Node 24 line is supported)
- npm 12.0.2

Using `nvm`:

```sh
nvm use
```

## Setup

```sh
npm install
cp .env.example .env.local
npm run dev
```

`VITE_API_BASE_URL` must contain the backend origin without a trailing slash.
`SERVER_API_KEY` is sent by the shared API client as the `x-api-key` header.
Vite explicitly exposes both values to browser code, so `SERVER_API_KEY` is a
public client identifier even though `.env.local` is ignored by Git. Replace
the placeholder locally, and never store privileged secrets or provider tokens
in frontend environment variables.

## Commands

```sh
npm run dev          # Start the development server
npm run lint         # Run ESLint
npm run typecheck    # Check TypeScript
npm run test         # Run Vitest tests once
npm run test:watch   # Run Vitest in watch mode
npm run test:e2e     # Run Playwright tests
npm run format:check # Check Prettier formatting
npm run build        # Create a production build
npm run preview      # Preview the production build
```

Architecture and engineering rules live in `AGENTS.md`. Backend and OAuth
contracts must be verified before product feature work begins.
