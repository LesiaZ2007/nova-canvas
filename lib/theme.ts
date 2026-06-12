import type { NovaSettings } from './settings';

/** Resolve "system" to a concrete light/dark based on the OS preference. */
export function resolveTheme(mode: NovaSettings['theme']): 'light' | 'dark' | 'oled' {
  if (mode !== 'system') return mode;
  const prefersDark =
    typeof matchMedia !== 'undefined' && matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
}

/** Lighten/darken a hex color by a -1..1 amount (negative = darker). */
function shade(hex: string, amount: number): string {
  const n = hex.replace('#', '');
  const full = n.length === 3 ? n.split('').map((c) => c + c).join('') : n;
  const num = parseInt(full, 16);
  const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v)));
  const r = clamp((num >> 16) + 255 * amount);
  const g = clamp(((num >> 8) & 0xff) + 255 * amount);
  const b = clamp((num & 0xff) + 255 * amount);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

/**
 * Produce the CSS custom properties Nova Canvas restyles Canvas with.
 * Everything downstream (injected stylesheet) reads these vars, so changing
 * a setting only updates variables — no re-injection needed.
 */
export function themeVars(settings: NovaSettings): Record<string, string> {
  const theme = resolveTheme(settings.theme);
  const dark = theme === 'dark' || theme === 'oled';
  const accent = settings.accent;

  return {
    '--nova-accent': accent,
    '--nova-accent-hover': shade(accent, dark ? 0.1 : -0.1),
    '--nova-bg': theme === 'oled' ? '#000000' : dark ? '#16181d' : '#f5f6fa',
    '--nova-surface': theme === 'oled' ? '#0c0d10' : dark ? '#1f222a' : '#ffffff',
    '--nova-border': dark ? '#2c2f38' : '#e3e6ee',
    '--nova-text': dark ? '#e7e9ef' : '#1c1e26',
    '--nova-text-muted': dark ? '#9aa0ad' : '#5b6171',
    '--nova-radius': settings.density === 'compact' ? '8px' : '14px',
    '--nova-gap': settings.density === 'compact' ? '8px' : '16px',
  };
}
