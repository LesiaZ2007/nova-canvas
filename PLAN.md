<div align="center">

# 🌟 Nova Canvas — Plan & Roadmap

**A cross-browser extension that makes Canvas LMS beautiful, friendly, and yours.**

Edge + Chrome · Manifest V3 · No account required

</div>

---

## 🎯 Vision

Canvas works, but it's visually dated, cluttered, and one-size-fits-all. **Nova Canvas** is a
content-script extension that re-skins Canvas with a modern, friendly design system and layers
on power-user customization — without replacing Canvas or needing the user's credentials on any
server. Everything is local (`chrome.storage`), opt-in, and reversible.

Differentiator vs. *Better Canvas*: we lead with **deep UI restyling + theming/customization**
first (their weak spot), then add quality-of-life features.

---

## 🏗 Proposed Tech Stack *(needs your sign-off — see open questions)*

| Concern | Proposal | Why |
|:--|:--|:--|
| Build framework | **WXT** (`wxt.dev`) | Purpose-built for MV3 cross-browser; HMR for content scripts; one codebase → Edge/Chrome/Firefox zips |
| Language | **TypeScript** | Catches Canvas-DOM/messaging mistakes early |
| UI (popup/options) | **React + Vite** (bundled by WXT) | Matches your luminae familiarity |
| Styling | **CSS variables + injected stylesheet** | Theming engine driven by CSS custom properties; users tweak vars live |
| Storage | `chrome.storage.sync` (settings) + `local` (cache) | Syncs prefs across devices, no backend |
| Icons | **Lucide** | Same as luminae |

> Alternative if you'd rather stay closer to luminae: **Vite + CRXJS + React**. WXT is the more
> modern/lower-friction choice for extensions specifically.

---

## ✨ Feature Backlog

Legend: 🅐 = Claude's idea · 🅛 = Lesia's idea (to fill in) · priority P0 (MVP) → P3 (later)

### 🎨 Theming & Appearance — *the core differentiator*
- 🅐 **P0 — Theme engine**: light / dark / OLED-black / custom; drives all colors via CSS vars
- 🅐 **P0 — Accent color picker**: presets + custom hex; recolors nav, buttons, links
- 🅐 **P0 — Modern card redesign**: dashboard course cards, assignment lists, modules → rounded, spaced, friendlier typography
- 🅐 **P1 — Custom course colors & images/banners** per course
- 🅐 **P1 — Font controls**: font family, base size, line-height, "dyslexia-friendly" option
- 🅐 **P1 — Density toggle**: comfortable / compact layouts
- 🅐 **P2 — Custom CSS box** for power users (with safe presets)
- 🅐 **P2 — Background / wallpaper** behind the dashboard
- 🅐 **P2 — Hide/rearrange global nav items** & sidebar widgets

### 📊 Dashboard & Navigation
- 🅐 **P0 — Redesigned dashboard** with cleaner course grid
- 🅐 **P1 — Customizable course card order** (drag to reorder, pin favorites)
- 🅐 **P1 — Quick-jump command palette** (`Ctrl+K`) to courses/pages
- 🅐 **P2 — Collapsible/grouped courses** (by term, by folder)
- 🅐 **P2 — Hide concluded/unwanted courses** from the card view

### ✅ Assignments, Grades & Productivity
- 🅐 **P1 — Better assignment list**: due-soon highlighting, status chips, clearer dates
- 🅐 **P1 — Grade hider / "focus mode"** (hide grades to reduce anxiety, toggle to reveal)
- 🅐 **P2 — "What-if" GPA / grade calculator** overlay on the grades page
- 🅐 **P2 — Assignment checklist / mark-done** overlay (local, doesn't touch Canvas)
- 🅐 **P3 — Due-date dashboard widget** aggregating upcoming work

### 🧭 Quality of Life
- 🅐 **P1 — Auto dark mode** by system / by schedule
- 🅐 **P2 — Better file/PDF preview** sizing
- 🅐 **P2 — Keyboard shortcuts** for common actions
- 🅐 **P2 — Reduce-motion / clean-up** (kill noisy banners, "to-do" clutter)
- 🅐 **P3 — Per-institution profiles** (auto-detect Canvas host, apply matching theme)

### ⚙️ Extension Plumbing (foundational)
- 🅐 **P0 — Content-script injection** scoped to Canvas hosts (`*.instructure.com` + custom host allowlist)
- 🅐 **P0 — Options/settings page** (React) with live preview
- 🅐 **P0 — Popup** for quick toggles (theme, accent, enable/disable on this site)
- 🅐 **P0 — Settings persistence** via `chrome.storage.sync` + import/export JSON
- 🅐 **P1 — Custom-host onboarding** (user pastes their school's Canvas URL, we request permission)
- 🅐 **P1 — Graceful degradation** when Canvas changes its DOM (feature flags, safe selectors)

### 🅛 Lesia's additions
- _(add yours here — anything from Better Canvas you liked or hated, or wishlist items)_

---

## 🗺 Milestones

1. **M0 — Scaffold**: WXT + TS + React project, manifest, content script injects on Canvas, popup + options shell, storage + theme-var plumbing. *(no visible Canvas changes yet beyond a test banner)*
2. **M1 — Theme engine (P0)**: dark/light/accent restyle of dashboard + nav, live in popup/options.
3. **M2 — Dashboard redesign + card customization (P0/P1)**.
4. **M3 — Assignments/grades QoL (P1)**.
5. **M4 — Power-user (custom CSS, command palette, profiles)**.
6. **M5 — Polish, store listings, screenshots, publish to Edge Add-ons + Chrome Web Store**.

---

## ❓ Open Questions (for Lesia)

1. **Stack:** WXT + TS + React (recommended) or stay Vite+CRXJS / plain JS like luminae?
2. **Which Canvas host(s)** do you actually use? (e.g. `littletonps.instructure.com`?) — drives the
   default content-script match + lets me test against your real layout.
3. **Screenshots:** please drop a few of your real Canvas — dashboard, a course page, the
   assignments list, and the grades page — so the redesign targets the actual DOM.
4. **Priorities:** which 2–3 features matter most to you for the first usable version?
5. **Scope vs. luminae:** anything here that overlaps with luminae-vigila you'd rather *not*
   duplicate (e.g. GPA calc, due-date aggregation)?
