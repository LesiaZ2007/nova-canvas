import { useSettings } from '@/lib/useSettings';
import { getTheme } from '@/lib/themes';
import { Wordmark } from '@/components/Wordmark';

export function Popup() {
  const { settings, patch, loaded } = useSettings();
  if (!loaded) return <div style={{ width: 300, padding: 18 }}>…</div>;

  const theme = getTheme(settings.themeId);

  return (
    <div style={{ width: 300, padding: 18 }}>
      <Wordmark size={20} />

      <div className="nv-card" style={{ marginTop: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontWeight: 600, fontSize: 14 }}>{settings.enabled ? 'Active' : 'Paused'}</div>
          <div className="nv-hint">on Canvas</div>
        </div>
        <input
          type="checkbox"
          className="nv-switch"
          checked={settings.enabled}
          onChange={(e) => patch({ enabled: e.target.checked })}
          aria-label="Enable Nova Canvas"
        />
      </div>

      <div className="nv-card" style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 18 }}>{theme.emoji}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="nv-hint" style={{ fontSize: 11 }}>Current theme</div>
          <div style={{ fontWeight: 600, fontSize: 14 }}>{theme.name}</div>
        </div>
      </div>

      <button className="nv-cta" style={{ marginTop: 14 }} onClick={() => browser.runtime.openOptionsPage()}>
        Customize themes & colors →
      </button>
    </div>
  );
}
