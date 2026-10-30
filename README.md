# IGNRoast — Universal Roast & Aura Auditor

A lightweight, multi-file, static website designed for Cloudflare Pages. It has no backend, no API keys, and a local roast engine so the core experience works without third-party APIs.

## Project structure

```text
ignroast-project/
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── config.js
│   ├── roast-engine.js
│   ├── api.js
│   ├── card.js
│   └── app.js
├── assets/
│   └── favicon.svg
├── image.jpeg       # optional: add creator photo
├── image.png        # optional fallback creator photo
├── _headers
└── _redirects
```

## Deploy to Cloudflare Pages (free static hosting)

1. Create a GitHub repository, for example `ignroast`.
2. Upload the contents of this folder to the repository root (not the containing folder).
3. In Cloudflare Dashboard, open **Workers & Pages → Create → Pages → Connect to Git**.
4. Select the repository.
5. Framework preset: **None**. Build command: leave blank. Build output directory: `/` (or `.` if the UI requests it).
6. Deploy. Your project will receive a `*.pages.dev` address.
7. To use `ignroast.pages.dev`, the subdomain must be available in your Cloudflare account.

## Local preview

Because this project uses ordinary browser JavaScript, run a local static server from this folder, for example:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Configuration

Edit `js/config.js`:

- `BUY_ME_A_COFFEE_URL`: creator support link.
- `ENABLE_ADS`: remains `false` by default. Set to `true` to reveal reserved ad containers. Add compliant ad-provider code only after approval and review of that provider's policies.
- `API_TIMEOUT_MS`: maximum wait for optional public endpoints.
- API feature flags: enable/disable GitHub, Minecraft, and Advice Slip lookups.

## Optional public API behavior

- GitHub public profile: type a handle beginning with `@` (for example `@octocat`) to try the public GitHub user endpoint.
- Minecraft: choose **Gamer**, then enter a Minecraft username. The Mojang endpoint may not return a profile for every name.
- DiceBear avatar: generated remotely from the entered name. If the service is unavailable, the avatar may not load; the roast text still works.
- Advice Slip: optional random advice text. Failure is ignored.

These third-party services are best-effort, have their own availability and rate limits, and are not guaranteed forever. The site itself does not depend on them for roast generation.

## Creator image

Put `image.jpeg` in the project root. If it is missing or fails to load, the page tries `image.png`, then uses a built-in vector fallback.

## Important notes

- This is an entertainment toy, not a real personality, skill, or identity assessment.
- The local engine uses composable phrase pools to produce 500+ combinations; it is not a database of 500 hand-written jokes.
- Do not use the app to target people with threats, slurs, protected-trait insults, or sustained harassment.
- There is no server-side storage or analytics in this project.
- PNG export uses a browser canvas. If the remote avatar cannot be read because of cross-origin restrictions, the export still works with a simple placeholder.
