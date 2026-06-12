import { Sparkles } from 'lucide-react';
import { useSettings } from '@/lib/useSettings';
import { DEFAULT_SETTINGS, type ThemeMode, type Density } from '@/lib/settings';

const THEMES: { value: ThemeMode; label: string }[] = [
  { value: 'system', label: 'Auto' },
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'oled', label: 'OLED' },
];
const DENSITIES: { value: Density; label: string }[] = [
  { value: 'comfortable', label: 'Comfortable' },
  { value: 'compact', label: 'Compact' },
];

export function Options() {
  const { settings, patch, loaded } = useSettings();
  if (!loaded) return null;

  return (
    <div style={{ maxWidth: 640, margin: '0 auto', padding: '32px 20px' }}>
      <div className="nv-brand" style={{ fontSize: 22, marginBottom: 4 }}>
        <Sparkles size={22} className="nv-star" /> Nova&nbsp;Canvas
      </div>
      <p className="nv-hint" style={{ marginTop: 0, marginBottom: 24 }}>
        A friendlier Canvas, your way. Changes apply live to open Canvas tabs.
      </p>

      <div className="nv-card" style={{ marginBottom: 16 }}>
        <div className="nv-row">
          <div>
            <label>Enable Nova Canvas</label>
            <div className="nv-hint">Master switch — turn off to see vanilla Canvas instantly.</div>
          </div>
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
              <button key={t.value} aria-pressed={settings.theme === t.value} onClick={() => patch({ theme: t.value })}>
                {t.label}
              </button>
            ))}
          </div>
        </div>
        <div className="nv-row">
          <label>Accent color</label>
          <input type="color" value={settings.accent} onChange={(e) => patch({ accent: e.target.value })} />
        </div>
        <div className="nv-row">
          <label>Density</label>
          <div className="nv-seg">
            {DENSITIES.map((d) => (
              <button key={d.value} aria-pressed={settings.density === d.value} onClick={() => patch({ density: d.value })}>
                {d.label}
              </button>
            ))}
          </div>
        </div>
        <div className="nv-row">
          <div>
            <label>Modern course cards</label>
            <div className="nv-hint">Rounded, elevated dashboard cards with hover lift.</div>
          </div>
          <input
            type="checkbox"
            className="nv-switch"
            checked={settings.redesignCards}
            onChange={(e) => patch({ redesignCards: e.target.checked })}
          />
        </div>
      </div>

      <div className="nv-card" style={{ marginBottom: 16 }}>
        <label style={{ display: 'block', marginBottom: 8 }}>Custom CSS</label>
        <div className="nv-hint" style={{ marginBottom: 8 }}>
          Power-user override, injected last so it always wins. Uses Nova variables like{' '}
          <code>var(--nova-accent)</code>.
        </div>
        <textarea
          value={settings.customCss}
          onChange={(e) => patch({ customCss: e.target.value })}
          spellCheck={false}
          rows={8}
          style={{ width: '100%', fontFamily: 'monospace', resize: 'vertical' }}
          placeholder={'/* e.g. */\n#menu { background: var(--nova-accent) !important; }'}
        />
      </div>

      <div style={{ display: 'flex', gap: 12 }}>
        <ExportImport />
        <a className="nv-link" style={{ marginLeft: 'auto', alignSelf: 'center' }} onClick={() => patch({ ...DEFAULT_SETTINGS })}>
          Reset to defaults
        </a>
      </div>
    </div>
  );
}

function ExportImport() {
  const { settings, patch } = useSettings();

  const doExport = () => {
    const blob = new Blob([JSON.stringify(settings, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'nova-canvas-settings.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const doImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;
      try {
        patch(JSON.parse(await file.text()));
      } catch {
        alert('Could not read that settings file.');
      }
    };
    input.click();
  };

  return (
    <>
      <a className="nv-link" onClick={doExport}>Export settings</a>
      <a className="nv-link" onClick={doImport}>Import settings</a>
    </>
  );
}
