# Plushie Passport

Plushie Passport is a Vercel-ready Next.js PWA prototype for account onboarding and profile management. It uses an atomic-design component structure, includes a local-first authentication journey for rapid iteration, and ships with linting, strict TypeScript, unit coverage gates, Playwright coverage, and CI automation.

## Recommended low-cost production stack

- **Hosting:** Vercel Hobby
- **Auth / Database / Storage:** Supabase free tier
- **Push notifications:** Browser Web Push with Vercel serverless routes and stored subscriptions in Supabase
- **Email fallback:** Resend free tier for password reset and notification digests

## Local development

```bash
npm install
npm run dev
```

## Quality checks

```bash
npm run lint
npm run typecheck
npm test
npm run test:e2e
```

## Included journeys

- Landing page with installability guidance and budget-friendly stack recommendations
- Sign up, login, forgot password, and logout flows
- Authenticated dashboard and profile management experience
- Notification preference management and connected account controls
- PWA manifest and service worker registration for installability

## Storybook component library

```bash
npm run storybook
npm run build-storybook
```

Storybook documents the atomic-design component library with reusable examples and copyable source snippets. The static build is emitted to `storybook-static/`, which keeps it compatible with later deployment to a dedicated documentation subdomain.
