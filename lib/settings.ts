import { storage } from 'wxt/storage';
import type { ThemeTokens } from './tokens';
import { getTheme, DEFAULT_THEME_ID } from './themes';

export interface NovaSettings {
  /** Master switch — when false the content script makes no changes. */
  enabled: boolean;
  /** Selected bundled theme id (the customization baseline). */
  themeId: string;
  /** Per-token customizations layered on top of the selected theme. */
  overrides: Partial<ThemeTokens>;
  /** Full structural reskin (sidebar pills, greeting hero, rebuilt cards). */
  fullReskin: boolean;
  /** Show the "Good evening, <name>" greeting hero on the dashboard. */
  showGreeting: boolean;
  /** Power-user CSS, injected last so it always wins. */
  customCss: string;
}

export const DEFAULT_SETTINGS: NovaSettings = {
  enabled: true,
  themeId: DEFAULT_THEME_ID,
  overrides: {},
  fullReskin: true,
  showGreeting: true,
  customCss: '',
};

export const settingsStore = storage.defineItem<NovaSettings>('sync:settings', {
  fallback: DEFAULT_SETTINGS,
  version: 2,
  migrations: {
    // v1 used flat theme/accent/density fields — drop them, start fresh on tokens.
    2: () => DEFAULT_SETTINGS,
  },
});

export async function getSettings(): Promise<NovaSettings> {
  const stored = await settingsStore.getValue();
  return { ...DEFAULT_SETTINGS, ...stored };
}

/** Resolve the effective tokens: bundled theme + user overrides. */
export function resolveTokens(settings: NovaSettings): ThemeTokens {
  return { ...getTheme(settings.themeId).tokens, ...settings.overrides };
}
