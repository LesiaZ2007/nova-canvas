import { useSettings } from '@/lib/useSettings';
import { THEMES } from '@/lib/themes';
import { Wordmark } from '@/components/Wordmark';

export function Popup() {
  const { settings, patch, loaded } = useSettings();
  if (!loaded) return <div style={{ width: 300, padding: 18 }}>…</div>;

  return (
    <div style={{ width: 300, padding: 16 }}>
      <Wordmark size={20} />

      <div className="nv-card" style={{ marginTop: 14 }}>
        <div className="nv-row">
          <div>
            <label>Nova Canvas</label>
            <div className="nv-hint">{settings.enabled ? 'Active on Canvas' : 'Paused'}</div>
          </div>
          <input
            type="checkbox"
            className="nv-switch"
            checked={settings.enabled}
            onChange={(e) => patch({ enabled: e.target.checked })}
          />
        </div>
      </div>

      <div style={{ margin: '14px 2px 8px', fontSize: 12, color: 'var(--nv-text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
        Theme
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {THEMES.map((th) => {
          const active = settings.themeId === th.id;
          const tk = th.tokens;
          return (
            <button
              key={th.id}
              onClick={() => patch({ themeId: th.id })}
              title={th.blurb}
              style={{
                textAlign: 'left',
                padding: 8,
                borderRadius: 10,
                cursor: 'pointer',
                background: 'var(--nv-surface-2)',
                border: active ? '2px solid var(--nv-accent)' : '2px solid transparent',
              }}
            >
              <div style={{ display: 'flex', gap: 4, marginBottom: 6 }}>
                <Swatch c={tk.sidebarBg} />
                <Swatch c={tk.accent} />
                <Swatch c={tk.surface} />
                <Swatch c={tk.bg} />
              </div>
              <div style={{ fontSize: 12, fontWeight: 600 }}>
                {th.emoji} {th.name}
              </div>
            </button>
          );
        })}
      </div>

      <div className="nv-card" style={{ marginTop: 14 }}>
        <div className="nv-row">
          <label>Full reskin</label>
          <input type="checkbox" className="nv-switch" checked={settings.fullReskin} onChange={(e) => patch({ fullReskin: e.target.checked })} />
        </div>
        <div className="nv-row">
          <label>Greeting banner</label>
          <input type="checkbox" className="nv-switch" checked={settings.showGreeting} onChange={(e) => patch({ showGreeting: e.target.checked })} />
        </div>
      </div>

      <div style={{ marginTop: 14, textAlign: 'center' }}>
        <a className="nv-link" onClick={() => browser.runtime.openOptionsPage()}>
          Customize everything →
        </a>
      </div>
    </div>
  );
}

function Swatch({ c }: { c: string }) {
  return <span style={{ width: 14, height: 14, borderRadius: 4, background: c, border: '1px solid rgba(0,0,0,0.15)' }} />;
}
