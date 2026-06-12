import { getSettings, settingsStore, type NovaSettings } from '@/lib/settings';
import { resolveTheme, themeVars } from '@/lib/theme';
import './content-style.css';

// content-style.css is bundled into the manifest's content_scripts.css by WXT,
// so it's injected straight into the Canvas page. We only toggle attributes and
// CSS variables on <html> here — the stylesheet does the rest.
export default defineContentScript({
  matches: ['*://*.instructure.com/*'],
  runAt: 'document_start',
  async main(ctx) {
    apply(await getSettings());

    // Live updates whenever the user changes a setting in the popup/options.
    const unwatch = settingsStore.watch((next) => apply(next ?? undefined));
    ctx.onInvalidated(() => unwatch());
  },
});

const CUSTOM_ID = 'nova-canvas-custom-css';

function apply(settings: NovaSettings | undefined) {
  const root = document.documentElement;
  if (!settings || !settings.enabled) {
    root.removeAttribute('data-nova');
    root.removeAttribute('data-nova-theme');
    root.removeAttribute('data-nova-density');
    root.removeAttribute('data-nova-cards');
    document.getElementById(CUSTOM_ID)?.remove();
    return;
  }

  root.setAttribute('data-nova', 'on');
  root.setAttribute('data-nova-theme', resolveTheme(settings.theme));
  root.setAttribute('data-nova-density', settings.density);
  root.toggleAttribute('data-nova-cards', settings.redesignCards);

  const vars = themeVars(settings);
  for (const [k, v] of Object.entries(vars)) root.style.setProperty(k, v);

  // Custom CSS injected last so it always wins.
  let custom = document.getElementById(CUSTOM_ID) as HTMLStyleElement | null;
  if (settings.customCss.trim()) {
    if (!custom) {
      custom = document.createElement('style');
      custom.id = CUSTOM_ID;
      (document.head ?? document.documentElement).appendChild(custom);
    }
    custom.textContent = settings.customCss;
  } else {
    custom?.remove();
  }
}
