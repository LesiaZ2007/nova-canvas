import { useState } from 'react';
import { useSettings } from '@/lib/useSettings';
import { allThemes } from '@/lib/settings';
import type { ThemeTokens } from '@/lib/tokens';

const KEY_COLORS: [keyof ThemeTokens, string][] = [
  ['accent', 'Accent'],
  ['accent2', 'Secondary'],
  ['bg', 'Background'],
  ['surface', 'Cards'],
  ['text', 'Text'],
  ['heading', 'Headings'],
  ['sidebarBg', 'Sidebar'],
  ['sidebarActiveBg', 'Active'],
];

const FLAGS: [keyof ThemeTokens, string][] = [
  ['sidebarGradient', 'Gradient sidebar'],
  ['glow', 'Accent glow'],
  ['animations', 'Animations'],
  ['cardImageTint', 'Tint images'],
];

const hexOnly = (v: string) => (/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(v) ? v : '#888888');

export function Panel() {
  const { settings, tokens, patch, setToken, saveTheme, deleteTheme, loaded } = useSettings();
  const [open, setOpen] = useState(false);
  if (!loaded) return null;

  const themes = allThemes(settings);
  const onSave = () => {
    const name = window.prompt('Name this theme:', 'My theme');
    if (name) saveTheme(name);
  };

  const rootStyle = {
    '--np-accent': tokens.accent,
    '--np-accent2': tokens.accent2,
    '--np-surface': tokens.scheme === 'dark' ? '#171a26' : '#ffffff',
    '--np-surface2': tokens.scheme === 'dark' ? '#1e2333' : '#f0f2f8',
    '--np-text': tokens.scheme === 'dark' ? '#e9ebf5' : '#1c1e26',
    '--np-muted': tokens.scheme === 'dark' ? '#9aa1bd' : '#5b6171',
    '--np-border': tokens.scheme === 'dark' ? '#2a3047' : '#e3e6ee',
  } as React.CSSProperties;

  return (
    <div className="nova-root" style={rootStyle}>
      <button className="nova-fab" onClick={() => setOpen((o) => !o)} aria-label="Nova Canvas theme panel" title="Nova Canvas">
        <Star />
      </button>

      {open && <div className="nova-scrim" onClick={() => setOpen(false)} />}

      <aside className={'nova-drawer' + (open ? ' open' : '')}>
        <header className="nova-head">
          <span className="nova-title"><Star /> Nova Canvas</span>
          <button className="nova-x" onClick={() => setOpen(false)} aria-label="Close">×</button>
        </header>

        <div className="nova-body">
          <div className="nova-rowbar">
            <span>Enabled on Canvas</span>
            <input type="checkbox" className="nova-switch" checked={settings.enabled} onChange={(e) => patch({ enabled: e.target.checked })} />
          </div>

          <h4 className="nova-h4">Theme <button className="nova-save" onClick={onSave}>＋ Save current</button></h4>
          <div className="nova-themes">
            {themes.map((th) => {
              const isCustom = th.id.startsWith('custom-');
              return (
                <button
                  key={th.id}
                  className={'nova-theme' + (settings.themeId === th.id ? ' active' : '')}
                  title={th.blurb}
                  onClick={() => patch({ themeId: th.id, overrides: {} })}
                >
                  {isCustom && (
                    <span
                      className="nova-theme-del"
                      title="Delete theme"
                      onClick={(e) => { e.stopPropagation(); deleteTheme(th.id); }}
                    >
                      ×
                    </span>
                  )}
                  <span className="nova-theme-pv">
                    <i style={{ background: th.tokens.sidebarBg }} />
                    <i style={{ background: th.tokens.accent }} />
                    <i style={{ background: th.tokens.surface }} />
                  </span>
                  <span className="nova-theme-name">{th.emoji} {th.name}</span>
                </button>
              );
            })}
          </div>

          <h4 className="nova-h4">Colors <small>(type a hex code)</small></h4>
          <div className="nova-colors">
            {KEY_COLORS.map(([key, label]) => {
              const val = tokens[key] as string;
              return (
                <label key={key} className="nova-color">
                  <span className="nova-color-label">{label}</span>
                  <span className="nova-color-inputs">
                    <input type="color" value={hexOnly(val)} onChange={(e) => setToken(key, e.target.value as never)} />
                    <input type="text" value={val} spellCheck={false} onChange={(e) => setToken(key, e.target.value as never)} />
                  </span>
                </label>
              );
            })}
          </div>

          <h4 className="nova-h4">Flair</h4>
          <div className="nova-flags">
            {FLAGS.map(([key, label]) => (
              <label key={key} className="nova-flag">
                <input type="checkbox" checked={tokens[key] as boolean} onChange={(e) => setToken(key, e.target.checked as never)} />
                <span>{label}</span>
              </label>
            ))}
          </div>

          <div className="nova-foot">
            <button className="nova-reset" onClick={() => patch({ overrides: {} })}>Reset colors</button>
            <button className="nova-reset" onClick={() => browser.runtime.openOptionsPage()}>All settings →</button>
          </div>
        </div>
      </aside>
    </div>
  );
}

function Star() {
  return (
    <svg width="22" height="22" viewBox="0 0 32 32" fill="none" aria-hidden>
      <path d="M16 3 L18.7 13.3 L29 16 L18.7 18.7 L16 29 L13.3 18.7 L3 16 L13.3 13.3 Z" fill="currentColor" />
    </svg>
  );
}
