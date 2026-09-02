# Playwright Portfolio Automation Framework

[![Playwright Tests](https://github.com/YOUR_USERNAME/playwright-portfolio-framework/actions/workflows/playwright.yml/badge.svg)](https://github.com/YOUR_USERNAME/playwright-portfolio-framework/actions/workflows/playwright.yml)
[![Live Report](https://img.shields.io/badge/Live%20Report-View%20Here-brightgreen)](https://YOUR_USERNAME.github.io/playwright-portfolio-framework/)

A production-style **end-to-end and API test automation framework** built with **Playwright + TypeScript**. It demonstrates the Page Object Model, data-driven and fixture-based testing, cross-browser execution, and a CI/CD pipeline that automatically publishes a live, shareable HTML report.

**🔗 [View the live test report](https://YOUR_USERNAME.github.io/playwright-portfolio-framework/)** — updated on every push to `main`.

---

## Why this project exists

This is a portfolio piece showing how I structure real-world test automation: readable specs, reusable page objects, isolated test data, parallel/cross-browser execution, and a pipeline that reports results without anyone having to run anything locally.

## What it tests

- **UI (SauceDemo)** — login (valid/invalid/locked-out/required-field), adding/removing cart items, price sorting, and a full checkout flow from cart to order confirmation.
- **API (reqres.in)** — GET/POST/DELETE request contracts, status codes, and response shape assertions using Playwright's built-in `request` context (no separate HTTP client needed).

## Architecture

```
├── pages/              # Page Object Model — one class per UI page/component
│   ├── BasePage.ts      #   shared navigation & assertion helpers
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
├── fixtures/            # Custom Playwright fixtures (dependency injection for tests)
│   └── pageFixtures.ts  #   wires page objects + a pre-authenticated session fixture
├── data/                # Test data kept out of spec files
│   ├── users.ts
│   └── checkout.ts
├── utils/                # Pure helper functions (sorting checks, formatting, etc.)
├── tests/
│   ├── e2e/              # UI specs (login, cart, checkout)
│   └── api/               # API contract specs
├── .github/workflows/     # CI pipeline: run tests → publish HTML report to GitHub Pages
└── playwright.config.ts   # Multi-browser, multi-reporter, CI-aware config
```

**Design choices worth noting in an interview:**
- Tests import `test` from `fixtures/pageFixtures.ts`, not directly from `@playwright/test` — this is what makes page objects and an `authenticatedPage` (skips repeating the login UI flow) available to every spec with zero setup code.
- Tags (`@smoke`, `@regression`, `@edge-case`) in test titles let CI or a developer run a subset via `--grep @smoke` without maintaining separate test files.
- The API project in `playwright.config.ts` runs against a different `baseURL` than the UI projects, so one config serves both without duplication.

## Tech stack

TypeScript · Playwright Test · GitHub Actions · HTML/JSON/JUnit reporters

## Running it locally

```bash
npm install
npx playwright install --with-deps   # downloads browser binaries
npm test                              # run everything, all browsers
npm run test:e2e                      # UI tests only
npm run test:api                      # API tests only
npm run test:chromium                 # single browser
npm run test:ui                       # Playwright's interactive UI mode
npm run report                        # open the last HTML report
```

Run a tagged subset:
```bash
npx playwright test --grep @smoke
```

## CI/CD

Every push to `main` triggers `.github/workflows/playwright.yml`, which:
1. Installs dependencies and browsers on a clean GitHub-hosted runner.
2. Runs the full suite across Chromium, Firefox, WebKit, and a mobile viewport.
3. Uploads the HTML report as a build artifact.
4. Publishes that HTML report to **GitHub Pages** — giving anyone (like a recruiter) a live, clickable link to the latest results, including screenshots, videos, and traces for any failure.

## Getting your own live link

This repo is ready to deploy as-is. See [`SETUP.md`](./SETUP.md) for the exact steps (create repo → push → enable Pages) — takes about five minutes.

## License

MIT
