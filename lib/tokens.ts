/**
 * Nova Canvas design tokens.
 *
 * A *theme* is just a complete set of these tokens. A *bundled theme* ships a
 * full set; the user's customizations are a Partial<ThemeTokens> layered on top.
 * The content script turns the resolved tokens into CSS custom properties +
 * data-attributes, and the injected stylesheet does the visual work. Adding a
 * new bundled theme is therefore just adding one more token object.
 */

export type ColorScheme = 'light' | 'dark';
export type BackgroundPattern = 'none' | 'grid' | 'ruled' | 'dots' | 'gradient';
export type CardStyle = 'flat' | 'outlined' | 'elevated' | 'glass';
export type SidebarStyle = 'pills' | 'plain' | 'icons-only';
export type Density = 'comfortable' | 'compact';

export interface ThemeTokens {
  /** Hint for native form controls / scrollbars. */
  scheme: ColorScheme;

  // Core palette
  accent: string;
  accent2: string; // secondary accent (badges, highlights)
  bg: string;
  surface: string;
  surface2: string;
  border: string;
  text: string;
  textMuted: string;

  // Sidebar (global left nav) — restyled heavily in full-reskin mode
  sidebarBg: string;
  sidebarText: string;
  sidebarActiveBg: string;
  sidebarActiveText: string;

  // Shape & spacing
  radius: number; // px
  gap: number; // px
  density: Density;

  // Typography
  fontFamily: string;
  headingFamily: string;
  fontScale: number; // 1 = default

  // Decoration
  background: BackgroundPattern;
  /** Color of the grid/rule lines when background is a pattern. */
  patternColor: string;
  cardStyle: CardStyle;
  sidebarStyle: SidebarStyle;
}

export const FONT_STACKS: Record<string, string> = {
  System: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
  Inter: "'Inter', system-ui, sans-serif",
  Rounded: "'Nunito', 'Quicksand', system-ui, sans-serif",
  Serif: "'Georgia', 'Iowan Old Style', serif",
  Mono: "'JetBrains Mono', 'Consolas', monospace",
};

/** Map resolved tokens → CSS custom properties read by content-style.css. */
export function tokensToVars(t: ThemeTokens): Record<string, string> {
  return {
    '--nova-accent': t.accent,
    '--nova-accent-2': t.accent2,
    '--nova-bg': t.bg,
    '--nova-surface': t.surface,
    '--nova-surface-2': t.surface2,
    '--nova-border': t.border,
    '--nova-text': t.text,
    '--nova-text-muted': t.textMuted,
    '--nova-sidebar-bg': t.sidebarBg,
    '--nova-sidebar-text': t.sidebarText,
    '--nova-sidebar-active-bg': t.sidebarActiveBg,
    '--nova-sidebar-active-text': t.sidebarActiveText,
    '--nova-radius': `${t.radius}px`,
    '--nova-gap': `${t.gap}px`,
    '--nova-font': FONT_STACKS[t.fontFamily] ?? t.fontFamily,
    '--nova-heading-font': FONT_STACKS[t.headingFamily] ?? t.headingFamily,
    '--nova-font-scale': String(t.fontScale),
    '--nova-pattern-color': t.patternColor,
  };
}

/** The data-attributes that switch structural CSS on/off. */
export function tokensToAttrs(t: ThemeTokens): Record<string, string> {
  return {
    'data-nova-scheme': t.scheme,
    'data-nova-bg': t.background,
    'data-nova-card': t.cardStyle,
    'data-nova-sidebar': t.sidebarStyle,
    'data-nova-density': t.density,
  };
}
