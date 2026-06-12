import { useSettings } from '@/lib/useSettings';
import { DEFAULT_SETTINGS, allThemes } from '@/lib/settings';
import { FONT_STACKS, type ThemeTokens } from '@/lib/tokens';
import { Wordmark } from '@/components/Wordmark';

const FONTS = Object.keys(FONT_STACKS);
const BACKGROUNDS: ThemeTokens['background'][] = ['none', 'grid', 'ruled', 'dots', 'gradient', 'paper'];
const CARDS: ThemeTokens['cardStyle'][] = ['flat', 'outlined', 'elevated', 'glass', 'gradient-border'];
const SIDEBARS: ThemeTokens['sidebarStyle'][] = ['pills', 'plain', 'icons-only'];

export function Options() {
  const { settings, tokens, patch, setToken, saveTheme, deleteTheme, loaded } = useSettings();
  if (!loaded) return null;
  const themes = allThemes(settings);
  const onSave = () => {
    const name = window.prompt('Name this theme:', 'My theme');
    if (name) saveTheme(name);
  };

  return (
    <div style={{ maxWidth: 760, margin: '0 auto', padding: '40px 22px 80px' }}>
      <header style={{ marginBottom: 8 }}>
        <Wordmark size={26} />
      </header>
      <p className="nv-hint" style={{ margin: '6px 0 28px', fontStyle: 'italic' }}>
        Make Canvas yours. Every change applies live to open Canvas tabs.
      </p>

      {/* ---------- Theme gallery ---------- */}
      <Section title="Themes" subtitle="Start from a curated theme, customize below, then save your own.">
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 10 }}>
          <a className="nv-link" onClick={onSave}>＋ Save current as theme</a>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(150px,1fr))', gap: 12 }}>
          {themes.map((th) => {
            const active = settings.themeId === th.id;
            const isCustom = th.id.startsWith('custom-');
            return (
              <button
                key={th.id}
                onClick={() => patch({ themeId: th.id, overrides: {} })}
                title={th.blurb}
                className="nv-theme-card"
                style={{ position: 'relative', border: active ? '2px solid var(--nv-accent)' : '2px solid var(--nv-border)' }}
              >
                {isCustom && (
                  <span
                    onClick={(e) => { e.stopPropagation(); deleteTheme(th.id); }}
                    title="Delete theme"
                    style={{ position: 'absolute', top: -8, right: -8, width: 20, height: 20, borderRadius: '50%', background: '#e0573e', color: '#fff', fontSize: 14, lineHeight: '20px', textAlign: 'center' }}
                  >
                    ×
                  </span>
                )}
                <div className="nv-theme-preview" style={{ background: th.tokens.bg }}>
                  <span style={{ background: th.tokens.sidebarBg }} />
                  <div>
                    <i style={{ background: th.tokens.accent }} />
                    <i style={{ background: th.tokens.surface }} />
                  </div>
                </div>
                <div style={{ fontWeight: 600, fontSize: 13, marginTop: 6 }}>{th.emoji} {th.name}</div>
                <div className="nv-hint" style={{ fontSize: 11 }}>{th.blurb}</div>
              </button>
            );
          })}
        </div>
      </Section>

      {/* ---------- Layout & structure ---------- */}
      <Section title="Layout & structure">
        <Toggle label="Enable Nova Canvas" hint="Master switch — off shows vanilla Canvas." checked={settings.enabled} onChange={(v) => patch({ enabled: v })} />
        <Toggle label="Full reskin" hint="Widened labeled sidebar + rebuilt cards." checked={settings.fullReskin} onChange={(v) => patch({ fullReskin: v })} />
        <Seg label="Sidebar style" value={tokens.sidebarStyle} options={SIDEBARS} onChange={(v) => setToken('sidebarStyle', v)} />
        <Seg label="Card style" value={tokens.cardStyle} options={CARDS} onChange={(v) => setToken('cardStyle', v)} />
        <Seg label="Background" value={tokens.background} options={BACKGROUNDS} onChange={(v) => setToken('background', v)} />
        <Seg label="Density" value={tokens.density} options={['comfortable', 'compact']} onChange={(v) => setToken('density', v as ThemeTokens['density'])} />
      </Section>

      {/* ---------- Flair ---------- */}
      <Section title="Flair" subtitle="The extras that make it pop.">
        <Toggle label="Gradient sidebar" hint="Diagonal gradient instead of a flat sidebar." checked={tokens.sidebarGradient} onChange={(v) => setToken('sidebarGradient', v)} />
        <Toggle label="Accent glow" hint="Glowing halo on active nav, cards, buttons." checked={tokens.glow} onChange={(v) => setToken('glow', v)} />
        <Toggle label="Animations" hint="Entrance + hover motion (respects reduce-motion)." checked={tokens.animations} onChange={(v) => setToken('animations', v)} />
        <Toggle label="Tint course images" hint="Wash course-card images in your accent." checked={tokens.cardImageTint} onChange={(v) => setToken('cardImageTint', v)} />
      </Section>

      {/* ---------- Colors ---------- */}
      <Section title="Colors" subtitle="Override any color. Reset a theme to discard changes.">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 24px' }}>
          <Color label="Accent" value={tokens.accent} onChange={(v) => setToken('accent', v)} />
          <Color label="Secondary accent" value={tokens.accent2} onChange={(v) => setToken('accent2', v)} />
          <Color label="Page background" value={tokens.bg} onChange={(v) => setToken('bg', v)} />
          <Color label="Background (gradient 2)" value={tokens.bg2} onChange={(v) => setToken('bg2', v)} />
          <Color label="Surface / cards" value={tokens.surface} onChange={(v) => setToken('surface', v)} />
          <Color label="Surface (alt)" value={tokens.surface2} onChange={(v) => setToken('surface2', v)} />
          <Color label="Border" value={tokens.border} onChange={(v) => setToken('border', v)} />
          <Color label="Text" value={tokens.text} onChange={(v) => setToken('text', v)} />
          <Color label="Muted text" value={tokens.textMuted} onChange={(v) => setToken('textMuted', v)} />
          <Color label="Headings" value={tokens.heading} onChange={(v) => setToken('heading', v)} />
          <Color label="Sidebar background" value={tokens.sidebarBg} onChange={(v) => setToken('sidebarBg', v)} />
          <Color label="Sidebar gradient end" value={tokens.sidebarBg2} onChange={(v) => setToken('sidebarBg2', v)} />
          <Color label="Sidebar text" value={tokens.sidebarText} onChange={(v) => setToken('sidebarText', v)} />
          <Color label="Sidebar active" value={tokens.sidebarActiveBg} onChange={(v) => setToken('sidebarActiveBg', v)} />
          <Color label="Sidebar active text" value={tokens.sidebarActiveText} onChange={(v) => setToken('sidebarActiveText', v)} />
          <Color label="Pattern lines" value={tokens.patternColor.startsWith('#') ? tokens.patternColor : '#cccccc'} onChange={(v) => setToken('patternColor', v)} />
        </div>
      </Section>

      {/* ---------- Typography & shape ---------- */}
      <Section title="Typography & shape">
        <Pick label="Body font" value={tokens.fontFamily} options={FONTS} onChange={(v) => setToken('fontFamily', v)} />
        <Pick label="Heading font" value={tokens.headingFamily} options={FONTS} onChange={(v) => setToken('headingFamily', v)} />
        <Range label="Font scale" min={0.85} max={1.3} step={0.05} value={tokens.fontScale} onChange={(v) => setToken('fontScale', v)} suffix="×" />
        <Range label="Corner radius" min={0} max={28} step={1} value={tokens.radius} onChange={(v) => setToken('radius', v)} suffix="px" />
        <Range label="Spacing" min={8} max={28} step={1} value={tokens.gap} onChange={(v) => setToken('gap', v)} suffix="px" />
        <Range label="Border width" min={0} max={4} step={1} value={tokens.borderWidth} onChange={(v) => setToken('borderWidth', v)} suffix="px" />
      </Section>

      {/* ---------- Custom CSS ---------- */}
      <Section title="Custom CSS" subtitle="Power-user override, injected last. Use vars like var(--nova-accent).">
        <textarea
          value={settings.customCss}
          onChange={(e) => patch({ customCss: e.target.value })}
          spellCheck={false}
          rows={7}
          style={{ width: '100%', fontFamily: 'monospace', resize: 'vertical' }}
          placeholder={'#right-side { box-shadow: none !important; }'}
        />
      </Section>

      <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginTop: 8 }}>
        <ExportImport />
        <a className="nv-link" onClick={() => patch({ overrides: {} })}>Reset customizations</a>
        <a className="nv-link" style={{ marginLeft: 'auto' }} onClick={() => patch({ ...DEFAULT_SETTINGS })}>Reset everything</a>
      </div>
    </div>
  );
}

/* ----------------------------- small controls ----------------------------- */
function Section({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 24 }}>
      <h2 style={{ fontFamily: "'Iowan Old Style', Georgia, serif", fontSize: 18, margin: '0 0 2px' }}>{title}</h2>
      {subtitle && <div className="nv-hint" style={{ marginBottom: 12 }}>{subtitle}</div>}
      <div className="nv-card">{children}</div>
    </section>
  );
}

function Toggle({ label, hint, checked, onChange }: { label: string; hint?: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="nv-row">
      <div>
        <label>{label}</label>
        {hint && <div className="nv-hint">{hint}</div>}
      </div>
      <input type="checkbox" className="nv-switch" checked={checked} onChange={(e) => onChange(e.target.checked)} />
    </div>
  );
}

function Seg<T extends string>({ label, value, options, onChange }: { label: string; value: T; options: readonly T[]; onChange: (v: T) => void }) {
  return (
    <div className="nv-row">
      <label>{label}</label>
      <div className="nv-seg">
        {options.map((o) => (
          <button key={o} aria-pressed={value === o} onClick={() => onChange(o)}>{o}</button>
        ))}
      </div>
    </div>
  );
}

function Pick({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  return (
    <div className="nv-row">
      <label>{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

function Color({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="nv-row">
      <label>{label}</label>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)} style={{ width: 90 }} />
        <input type="color" value={/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(value) ? value : '#000000'} onChange={(e) => onChange(e.target.value)} />
      </div>
    </div>
  );
}

function Range({ label, min, max, step, value, suffix, onChange }: { label: string; min: number; max: number; step: number; value: number; suffix?: string; onChange: (v: number) => void }) {
  return (
    <div className="nv-row">
      <label>{label}</label>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(parseFloat(e.target.value))} />
        <span style={{ width: 48, textAlign: 'right', color: 'var(--nv-text-muted)', fontSize: 13 }}>{value}{suffix}</span>
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
    a.download = 'nova-canvas-theme.json';
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
        alert('Could not read that theme file.');
      }
    };
    input.click();
  };
  return (
    <>
      <a className="nv-link" onClick={doExport}>Export theme</a>
      <a className="nv-link" onClick={doImport}>Import theme</a>
    </>
  );
}
