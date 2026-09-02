# Getting your live link (5 minutes)

This turns the framework into a real, hosted link you can put on your resume — a GitHub Pages
URL that shows your latest Playwright HTML test report, refreshed automatically every time you push.

## 1. Create the GitHub repo

- Go to github.com → **New repository** → name it e.g. `playwright-portfolio-framework` → **Public** → Create (don't initialize with a README, you already have one).

## 2. Push this project

From inside this project folder:
```bash
git init
git add .
git commit -m "Initial commit: Playwright portfolio framework"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/playwright-portfolio-framework.git
git push -u origin main
```

## 3. Enable GitHub Pages

- In your repo on GitHub: **Settings → Pages**.
- Under "Build and deployment", set **Source** to **"Deploy from a branch"**.
- Set **Branch** to `gh-pages` / `root` (this branch is created automatically the first time the workflow runs — see step 4).
- Save.

## 4. Trigger the workflow

- Go to the **Actions** tab in your repo. The `Playwright Tests` workflow should already be running from your push in step 2 (or trigger it manually via "Run workflow").
- Wait for it to finish (a few minutes — it installs browsers and runs the full cross-browser suite).
- This creates a `gh-pages` branch with the published HTML report.
- Go back to **Settings → Pages** — refresh — you should now see: *"Your site is live at `https://YOUR_USERNAME.github.io/playwright-portfolio-framework/`"*.

## 5. Update the links

Replace `YOUR_USERNAME` in `README.md` (badge URLs and the live report link) with your actual GitHub username, commit, and push again.

## That's it

Put this in your resume:
```
Playwright Portfolio Automation Framework — github.com/YOUR_USERNAME/playwright-portfolio-framework
Live test report: https://YOUR_USERNAME.github.io/playwright-portfolio-framework/
```

Every time you push new tests, the report at that link updates automatically — a recruiter can click it any time and see current, real results, including screenshots and traces of any failures.

## Troubleshooting

- **Pages shows 404**: the `gh-pages` branch only exists after the workflow's first successful run — check the Actions tab first.
- **Workflow fails on "Install Playwright browsers"**: this step needs internet access, which GitHub-hosted runners have by default — no action needed on your part.
- **Want a permanent link that updates even without waiting on Pages' cache**: GitHub Pages URLs are stable and don't need re-registering; each new workflow run overwrites the same URL's content.
