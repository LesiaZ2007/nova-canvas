import { getSettings, settingsStore, resolveTokens, type NovaSettings } from '@/lib/settings';
import { tokensToVars, tokensToAttrs, tokensToFlags } from '@/lib/tokens';
import { NAV_ITEMS } from '@/lib/navItems';
import './content-style.css';

// content-style.css is bundled into the manifest's content_scripts.css by WXT,
// so it's injected straight into the Canvas page. Here we just toggle attributes
// and CSS variables on <html>; the stylesheet does the visual work.
export default defineContentScript({
  matches: ['*://*.instructure.com/*'],
  runAt: 'document_start',
  async main(ctx) {
    apply(await getSettings());
    const unwatch = settingsStore.watch((next) => apply(next ?? undefined));
    ctx.onInvalidated(() => unwatch());

    // Nav icons need the nav in the DOM; re-apply on ready.
    const onReady = () => applyNavIcons(latest);
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', onReady, { once: true });
    else onReady();
  },
});

const CUSTOM_ID = 'nova-canvas-custom-css';
let latest: NovaSettings | undefined;

function apply(settings: NovaSettings | undefined) {
  latest = settings;
  const root = document.documentElement;

  if (!settings || !settings.enabled) {
    for (const a of [...root.attributes].map((x) => x.name).filter((n) => n.startsWith('data-nova'))) {
      root.removeAttribute(a);
    }
    document.getElementById(CUSTOM_ID)?.remove();
    applyNavIcons(undefined);
    return;
  }

  const tokens = resolveTokens(settings);
  root.setAttribute('data-nova', 'on');
  root.setAttribute('data-nova-theme-id', settings.themeId);
  root.toggleAttribute('data-nova-reskin', settings.fullReskin);
  for (const [k, v] of Object.entries(tokensToAttrs(tokens))) root.setAttribute(k, v);
  for (const [k, on] of Object.entries(tokensToFlags(tokens))) root.toggleAttribute(k, on);
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

  applyNavIcons(settings);
}

/** Replace global-nav icons with the user's chosen emoji/character. */
function applyNavIcons(settings: NovaSettings | undefined) {
  const map = settings?.enabled ? settings.navIcons ?? {} : {};
  for (const item of NAV_ITEMS) {
    const link = document.querySelector(item.selector);
    if (!link) continue;
    const container = link.querySelector('.menu-item-icon-container');
    link.querySelector('.nova-nav-emoji')?.remove();
    container?.removeAttribute('data-nova-hide');

    const emoji = map[item.key];
    if (emoji && container) {
      container.setAttribute('data-nova-hide', '');
      const span = document.createElement('span');
      span.className = 'nova-nav-emoji';
      span.textContent = emoji;
      container.parentElement?.insertBefore(span, container);
    }
  }
}
