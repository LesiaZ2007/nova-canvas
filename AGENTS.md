# Nova Canvas — Agent Guide

Nova Canvas is a **cross-browser extension** (Chrome + Edge, Manifest V3) that restyles and
extends the Canvas LMS UI to be friendlier and fully customizable. This is **not** a Next.js
web app — the block below is the user's standard workflow ruleset; apply the *workflow* parts
(branches, commits, README updates, sub-agents, flagging manual actions) and ignore the parts
that only make sense for a Next.js/Vercel deployment (dev server restart, `node_modules/next`
docs, SQL/Vercel env vars) unless they ever become relevant.

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

When making any changes, update README to reflect the additions. Remember to style and brand in the style of the app

When making changes, make sure to work in the appropriate branch and create commits for changes you make with the appropriate description

Restart the dev server so I can see changes locally when you change things.

Your goal is to give me the highest quality work while conserving usage and tokens. When possible, create agents to work in separate branches and you, as the superior model, have to oversee and check their work

If you are adding things that need to have action on my end, such as SQL queries or env vars in Vercel you must let me know so I can do those and double check that I do
<!-- END:nextjs-agent-rules -->

## Nova Canvas specifics (extension context)

- **Platform:** Manifest V3 extension. Primary target MS Edge; must also load in Chrome
  (both Chromium). Keep Firefox in mind but don't block on it.
- **"Restart the dev server" → for this project means:** rebuild the extension and tell the
  user to reload it at `edge://extensions` / `chrome://extensions` (or, if using a watch/HMR
  dev build, confirm the watcher is running). Never assume a localhost server.
- **No backend by default.** Settings live in `chrome.storage.sync`/`local`. If a feature ever
  needs a server or API key, flag it explicitly (this is the equivalent of the "SQL/Vercel"
  rule above) so the user can set it up.
- **Branding:** Nova Canvas — electric indigo (`#6d5efc`) accent, "nova" star motif. Keep the
  Canvas-native layout recognizable; restyle, don't rebuild blindly.
- **Branches & commits:** feature branches (`feat/…`, `fix/…`), conventional commit messages.
  Update `README.md` and this file when features land.
- **Sub-agents:** spin up agents on separate branches for parallel feature work; review their
  diffs before merging.

See `PLAN.md` for the feature roadmap.
