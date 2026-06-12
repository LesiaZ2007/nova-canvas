import { getSettings, settingsStore, resolveTokens, type NovaSettings } from '@/lib/settings';
import { tokensToVars, tokensToAttrs, tokensToFlags } from '@/lib/tokens';
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
  },
});

const CUSTOM_ID = 'nova-canvas-custom-css';

function apply(settings: NovaSettings | undefined) {
  const root = document.documentElement;

  if (!settings || !settings.enabled) {
    for (const a of [...root.attributes].map((x) => x.name).filter((n) => n.startsWith('data-nova'))) {
      root.removeAttribute(a);
    }
    document.getElementById(CUSTOM_ID)?.remove();
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
}
