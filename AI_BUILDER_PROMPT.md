# MASTER AI BUILDER PROMPT — IGNRoast

Build **IGNRoast — Universal Roast & Aura Auditor**, a polished, funny, mobile-first static web app for Cloudflare Pages. Generate a complete multi-file project, not a single HTML file.

## Non-negotiable technical constraints
- 100% static frontend; no server, database, paid APIs, API keys, build dependency, or paid hosting.
- Must deploy to Cloudflare Pages as a static site.
- Separate `index.html`, `css/styles.css`, and modular files in `js/` (`config.js`, `roast-engine.js`, `api.js`, `card.js`, `app.js`).
- Use vanilla HTML/CSS/JavaScript. No framework is required.
- The core roast flow must work offline. Optional public APIs must have short timeouts, graceful error handling, and never block the local fallback.
- Do not claim any API is guaranteed, unlimited, or permanently free. Respect public endpoint rate limits and terms.
- Never expose secrets. Do not collect, transmit, or persist entered names.

## Product experience
Create an approachable, playful experience that a first-time visitor can understand instantly:
- Dark navy background `#0a0f1d`, cyan `#00f0ff`, electric blue `#3b82f6`, subtle glassmorphism, neon borders, readable typography and restrained motion.
- Responsive design, large touch targets, keyboard support, visible focus states, semantic labels, accessible contrast, reduced-motion support.
- Hero headline: “YOUR NAME. OUR VERDICT.”
- One large input for username, gamer tag, real name or random word.
- Buttons: `🎮 Gamer`, `📰 Uncle News Mode`, `🎲 Random Chaos`, and a surprise/randomizer action.
- One obvious `ROAST ME` action.
- Show a short staged loading sequence, then reveal a trading-card report.
- Card includes generated avatar, subject name, playful aura title, score out of 100, three stat meters, and exactly three short roast lines.
- Keep humor light and non-targeted. No slurs, threats, protected-class insults, appearance/body shaming, sexual content, or humiliating claims. Make clear this is entertainment, not a factual assessment.

## Roast engine
- Implement a client-side phrase-combination engine with enough combinations to exceed 500 outputs.
- Deterministic or semi-random selection is acceptable, but repeat scans should have variation.
- Include gamer, uncle/news-forwarding, and general modes.
- Validate blank and overly long input.
- Never allow API failure to break the roast.

## Optional APIs
- GitHub: if a user enters `@handle`, optionally query `https://api.github.com/users/{handle}` and use only public profile fields such as public repository count and follower count. Escape/render all data as text; never inject API strings as HTML.
- Minecraft: in Gamer mode, optionally query Mojang's public username profile endpoint. Handle not-found, network failure, and rate limits.
- DiceBear: create a deterministic avatar URL from the entered name. If it fails, show a local placeholder.
- Advice Slip: optionally fetch a short advice item, but treat it as an optional flourish and skip it on failure.
- Use AbortController timeouts and safe fallbacks. Do not make multiple unnecessary requests.

## Roast trading card
- Design a high-quality neon holographic card with a clear visual hierarchy.
- Implement real PNG download using Canvas; don't just rename an HTML file.
- Provide native share where supported, with copy-to-clipboard fallback.
- Add copy-verdict and roast-again controls.
- If remote avatar CORS blocks canvas export, use a local placeholder and still export a valid PNG.

## Creator section
- Include a collapsible “Meet the Creator” section for Arbin Sharma.
- Bio text: young web developer, cybersecurity researcher/bug hunter, AI builder and digital creator; projects include Arbin AI, AIFail, Stream Movie and Rosy.
- Load `./image.jpeg`, fall back to `./image.png`, then use an inline vector avatar.
- Do not invent credentials, awards, employment, or biographical details.

## Monetization layout
- Add `☕ Support Arbin` buttons linking to `https://www.buymeacoffee.com/ArbinSharma`, below results and in footer.
- Add reserved responsive ad slots: top banner, in-feed, sticky footer.
- Put ad visibility behind a top-level `CONFIG.ENABLE_ADS` flag set to `false`.
- Do not insert fake ads or ad scripts. Explain that ad-provider approval and policy compliance are required before activation.

## Quality and delivery
- Include `README.md` with exact Cloudflare Pages deployment steps, local preview instructions, config notes, and API caveats.
- Include `_headers` and `_redirects` suitable for a static Cloudflare Pages project.
- Test mobile layout, empty input, long input, API offline behavior, creator image fallback, PNG export, copy/share fallback, and `ENABLE_ADS=false`.
- Return the complete source tree with every file's contents. Do not omit files, use placeholders for core functionality, or claim tests were run unless they were actually run.
