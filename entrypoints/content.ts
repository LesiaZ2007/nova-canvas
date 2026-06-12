import { getSettings, settingsStore, resolveTokens, type NovaSettings } from '@/lib/settings';
import { tokensToVars, tokensToAttrs } from '@/lib/tokens';
import './content-style.css';

// content-style.css is bundled into the manifest's content_scripts.css by WXT,
// so it's injected straight into the Canvas page. Here we toggle attributes and
// CSS variables on <html>, and inject the greeting hero when full-reskin is on.
export default defineContentScript({
  matches: ['*://*.instructure.com/*'],
  runAt: 'document_start',
  async main(ctx) {
    apply(await getSettings());
    const unwatch = settingsStore.watch((next) => apply(next ?? undefined));
    ctx.onInvalidated(() => unwatch());

    // Greeting hero needs the DOM ready and re-checks on SPA navigation.
    const onReady = () => maybeInjectGreeting();
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', onReady, { once: true });
    } else {
      onReady();
    }
  },
});

const CUSTOM_ID = 'nova-canvas-custom-css';
let lastSettings: NovaSettings | undefined;

function apply(settings: NovaSettings | undefined) {
  lastSettings = settings;
  const root = document.documentElement;

  if (!settings || !settings.enabled) {
    for (const a of [...root.attributes].map((x) => x.name).filter((n) => n.startsWith('data-nova'))) {
      root.removeAttribute(a);
    }
    document.getElementById(CUSTOM_ID)?.remove();
    document.getElementById('nova-greeting')?.remove();
    return;
  }

  const tokens = resolveTokens(settings);
  root.setAttribute('data-nova', 'on');
  root.toggleAttribute('data-nova-reskin', settings.fullReskin);
  for (const [k, v] of Object.entries(tokensToAttrs(tokens))) root.setAttribute(k, v);
  for (const [k, v] of Object.entries(tokensToVars(tokens))) root.style.setProperty(k, v);

  // Custom CSS injected last so it always wins.
  let custom = document.getElementById(CUSTOM_ID) as HTMLStyleElement | null;
  if (settings.customCss.trim()) {
    if (!custom) {
      custom = document.createElement('style');
      custom.id = CUSTOM_ID;
      (document.head ?? root).appendChild(custom);
    }
    custom.textContent = settings.customCss;
  } else {
    custom?.remove();
  }

  maybeInjectGreeting();
}

function timeGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 18) return 'Good afternoon';
  return 'Good evening';
}

/** Inject a friendly greeting hero at the top of the dashboard (full reskin only). */
function maybeInjectGreeting() {
  const s = lastSettings;
  const onDashboard = location.pathname === '/' || location.pathname.startsWith('/?');
  if (!s?.enabled || !s.fullReskin || !s.showGreeting || !onDashboard) {
    document.getElementById('nova-greeting')?.remove();
    return;
  }
  if (document.getElementById('nova-greeting')) return;

  const content = document.querySelector('#content, #dashboard, .ic-Dashboard-header');
  if (!content) return;

  // Best-effort first name from the global nav avatar / profile link.
  const nameEl = document.querySelector('[data-testid="logged-in-user"], .ic-user-name, #global_nav_profile_link .menu-item__text');
  const name = (nameEl?.textContent || '').trim().split(/\s+/)[0] || '';

  const hero = document.createElement('div');
  hero.id = 'nova-greeting';
  hero.innerHTML = `
    <div class="nova-greeting-inner">
      <h1>${timeGreeting()}${name ? `, ${name}` : ''} <span class="nova-star">✦</span></h1>
      <p>Here's your day. Make it count.</p>
    </div>`;
  content.prepend(hero);
}
