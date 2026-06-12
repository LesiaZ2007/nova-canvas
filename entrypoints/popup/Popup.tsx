import { Sparkles, Settings as SettingsIcon } from 'lucide-react';
import { useSettings } from '@/lib/useSettings';
import type { ThemeMode } from '@/lib/settings';

const THEMES: { value: ThemeMode; label: string }[] = [
  { value: 'system', label: 'Auto' },
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'oled', label: 'OLED' },
];

const ACCENTS = ['#6d5efc', '#3a6fa8', '#10b981', '#f43f5e', '#f59e0b', '#8b5cf6'];

export function Popup() {
  const { settings, patch, loaded } = useSettings();
  if (!loaded) return <div style={{ width: 280, padding: 16 }}>…</div>;

  return (
    <div style={{ width: 280, padding: 14 }}>
      <div className="nv-brand" style={{ marginBottom: 12 }}>
        <Sparkles size={18} className="nv-star" /> Nova&nbsp;Canvas
      </div>

      <div className="nv-card">
        <div className="nv-row">
          <label>Enabled on Canvas</label>
          <input
            type="checkbox"
            className="nv-switch"
            checked={settings.enabled}
            onChange={(e) => patch({ enabled: e.target.checked })}
          />
        </div>

        <div className="nv-row">
          <label>Theme</label>
          <div className="nv-seg">
            {THEMES.map((t) => (
              <button
                key={t.value}
                aria-pressed={settings.theme === t.value}
                onClick={() => patch({ theme: t.value })}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="nv-row">
          <label>Accent</label>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            {ACCENTS.map((c) => (
              <button
                key={c}
                onClick={() => patch({ accent: c })}
                title={c}
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  background: c,
                  border: settings.accent === c ? '2px solid #fff' : '2px solid transparent',
                  cursor: 'pointer',
                }}
              />
            ))}
            <input
              type="color"
              value={settings.accent}
              onChange={(e) => patch({ accent: e.target.value })}
            />
          </div>
        </div>

        <div className="nv-row">
          <label>Modern course cards</label>
          <input
            type="checkbox"
            className="nv-switch"
            checked={settings.redesignCards}
            onChange={(e) => patch({ redesignCards: e.target.checked })}
          />
        </div>
      </div>

      <div style={{ marginTop: 12, textAlign: 'right' }}>
        <a className="nv-link" onClick={() => browser.runtime.openOptionsPage()}>
          <SettingsIcon size={12} style={{ verticalAlign: '-1px' }} /> All settings
        </a>
      </div>
    </div>
  );
}
