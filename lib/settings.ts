import { storage } from 'wxt/storage';

/** A Nova Canvas theme preset. */
export type ThemeMode = 'system' | 'light' | 'dark' | 'oled';

/** Layout density. */
export type Density = 'comfortable' | 'compact';

export interface NovaSettings {
  /** Master switch — when false the content script makes no changes. */
  enabled: boolean;
  theme: ThemeMode;
  /** Accent color as a hex string, drives links/buttons/nav. */
  accent: string;
  density: Density;
  /** Modernized dashboard course cards. */
  redesignCards: boolean;
  /** User-supplied custom CSS injected last (power users). */
  customCss: string;
}

export const DEFAULT_SETTINGS: NovaSettings = {
  enabled: true,
  theme: 'system',
  accent: '#6d5efc',
  density: 'comfortable',
  redesignCards: true,
  customCss: '',
};

/** Synced across the user's devices. */
export const settingsStore = storage.defineItem<NovaSettings>('sync:settings', {
  fallback: DEFAULT_SETTINGS,
  version: 1,
});

export async function getSettings(): Promise<NovaSettings> {
  const stored = await settingsStore.getValue();
  return { ...DEFAULT_SETTINGS, ...stored };
}

export function patchSettings(patch: Partial<NovaSettings>) {
  return getSettings().then((s) => settingsStore.setValue({ ...s, ...patch }));
}
