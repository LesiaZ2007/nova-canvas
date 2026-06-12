<div align="center">

# ✦ Nova Canvas

**A friendlier Canvas, your way.**
A cross-browser extension that reskins and customizes the Canvas LMS — beautiful themes,
full control over colors, fonts, and layout, all stored locally on your device.

Edge · Chrome · Manifest V3 · No account, no servers

</div>

---

## ✨ What it does

Canvas works, but it's dated and one-size-fits-all. Nova Canvas layers a modern, scholarly
design system on top — and then lets you make it *yours*.

- **🎨 Curated theme catalog** — Blueprint (graph-paper + Georgia Tech navy/gold), Luminae Blue,
  Midnight, OLED Black, Sky, Notebook, GT Buzz, Forest, Sunset, and Mono.
- **🛠 Full customization** — override every color, pick body/heading fonts, scale text, set
  corner radius, spacing, card style (flat / outlined / elevated / glass), background pattern
  (grid / ruled / dots / gradient), and sidebar style.
- **🪄 Full reskin mode** — rounded icon + label sidebar pills, a friendly greeting hero on the
  dashboard, and rebuilt course cards with hover lift.
- **🌗 Light & dark** built into every theme.
- **💾 Local & private** — settings live in `chrome.storage.sync`; nothing leaves your device.
  Export / import your theme as a JSON file.
- **⚡ Live updates** — changes apply instantly to open Canvas tabs.
- **🔌 Instant off switch** — one toggle returns Canvas to vanilla.

---

## 🛠 Tech Stack

| | |
|:--|:--|
| Framework | [WXT](https://wxt.dev) — Manifest V3, cross-browser |
| Language | TypeScript |
| UI | React 18 (popup + options) |
| Theming | CSS custom properties driven by a design-token engine |
| Icons | [Lucide](https://lucide.dev) |
| Storage | `chrome.storage.sync` |

---

## 🚀 Develop locally

```bash
npm install
npm run dev          # launches a dev browser with HMR (Chrome/Edge)
npm run dev:firefox  # Firefox dev
```

Then load the extension manually if needed:

1. Build: `npm run build`
2. Open `edge://extensions` (or `chrome://extensions`), enable **Developer mode**
3. **Load unpacked** → select `.output/chrome-mv3`
4. Open any `*.instructure.com` Canvas page

### Build & package

```bash
npm run build         # production build → .output/chrome-mv3
npm run zip           # zipped store artifact (Chrome/Edge)
npm run zip:firefox   # Firefox artifact
npm run compile       # type-check only
```

---

## 🗺 Status

Early development. Theme engine, theme catalog, full-reskin dashboard, and the customization
options page are in place. Assignment/grade quality-of-life features and a command palette are
next.

---

<div align="center">

Built by [Lesia](https://github.com/LesiaZ2007) · ✦ Nova Canvas

</div>
