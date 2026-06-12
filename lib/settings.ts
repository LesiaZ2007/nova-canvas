import { storage } from 'wxt/storage';
import type { ThemeTokens } from './tokens';
import { THEMES, getTheme, DEFAULT_THEME_ID, type ThemePreset } from './themes';

export interface NovaSettings {
  /** Master switch — when false the content script makes no changes. */
  enabled: boolean;
  /** Selected theme id (bundled or custom — the customization baseline). */
  themeId: string;
  /** Per-token customizations layered on top of the selected theme. */
  overrides: Partial<ThemeTokens>;
  /** User-saved themes (full token sets), shown in the gallery alongside built-ins. */
  customThemes: ThemePreset[];
  /** Full structural reskin (sidebar pills, rebuilt cards). */
  fullReskin: boolean;
  /** Power-user CSS, injected last so it always wins. */
  customCss: string;
}

export const DEFAULT_SETTINGS: NovaSettings = {
  enabled: true,
  themeId: DEFAULT_THEME_ID,
  overrides: {},
  customThemes: [],
  fullReskin: true,
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

/** All selectable themes: bundled first, then the user's saved ones. */
export function allThemes(settings: NovaSettings): ThemePreset[] {
  return [...THEMES, ...(settings.customThemes ?? [])];
}

/** The currently-active preset (bundled or custom). */
export function getActiveTheme(settings: NovaSettings): ThemePreset {
  return allThemes(settings).find((p) => p.id === settings.themeId) ?? getTheme(settings.themeId);
}

/** Resolve the effective tokens: active theme + user overrides. */
export function resolveTokens(settings: NovaSettings): ThemeTokens {
  return { ...getActiveTheme(settings).tokens, ...settings.overrides };
}
