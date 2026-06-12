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
export type BackgroundPattern = 'none' | 'grid' | 'ruled' | 'dots' | 'gradient' | 'paper';
export type CardStyle = 'flat' | 'outlined' | 'elevated' | 'glass' | 'gradient-border';
export type SidebarStyle = 'pills' | 'plain' | 'icons-only';
export type Density = 'comfortable' | 'compact';

export interface ThemeTokens {
  /** Hint for native form controls / scrollbars. */
  scheme: ColorScheme;

  // Core palette
  accent: string;
  accent2: string; // secondary accent — used for gradients, glows, badges
  bg: string;
  bg2: string; // second background stop (for gradient page backgrounds)
  surface: string;
  surface2: string;
  border: string;
  text: string;
  textMuted: string;
  heading: string; // heading / title color (often the accent)

  // Sidebar (global left nav) — restyled heavily in full-reskin mode
  sidebarBg: string;
  sidebarBg2: string; // gradient end for the sidebar
  sidebarText: string;
  sidebarActiveBg: string;
  sidebarActiveText: string;

  // Shape & spacing
  radius: number; // px
  gap: number; // px
  borderWidth: number; // px
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

  // Flair (booleans)
  sidebarGradient: boolean; // diagonal gradient sidebar
  glow: boolean; // accent glow on active/hover elements
  animations: boolean; // entrance + hover motion
  cardImageTint: boolean; // tint course-card hero images with the accent
}

export const FONT_STACKS: Record<string, string> = {
  System: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
  Inter: "'Inter', system-ui, sans-serif",
  Rounded: "'Nunito', 'Quicksand', system-ui, sans-serif",
  Serif: "'Iowan Old Style', Georgia, 'Times New Roman', serif",
  Mono: "'JetBrains Mono', 'SFMono-Regular', 'Consolas', monospace",
};

/** Map resolved tokens → CSS custom properties read by content-style.css. */
export function tokensToVars(t: ThemeTokens): Record<string, string> {
  return {
    '--nova-accent': t.accent,
    '--nova-accent-2': t.accent2,
    '--nova-bg': t.bg,
    '--nova-bg-2': t.bg2,
    '--nova-surface': t.surface,
    '--nova-surface-2': t.surface2,
    '--nova-border': t.border,
    '--nova-text': t.text,
    '--nova-text-muted': t.textMuted,
    '--nova-heading': t.heading,
    '--nova-sidebar-bg': t.sidebarBg,
    '--nova-sidebar-bg-2': t.sidebarBg2,
    '--nova-sidebar-text': t.sidebarText,
    '--nova-sidebar-active-bg': t.sidebarActiveBg,
    '--nova-sidebar-active-text': t.sidebarActiveText,
    '--nova-radius': `${t.radius}px`,
    '--nova-gap': `${t.gap}px`,
    '--nova-border-width': `${t.borderWidth}px`,
    '--nova-font': FONT_STACKS[t.fontFamily] ?? t.fontFamily,
    '--nova-heading-font': FONT_STACKS[t.headingFamily] ?? t.headingFamily,
    '--nova-font-scale': String(t.fontScale),
    '--nova-pattern-color': t.patternColor,
  };
}

/** String data-attributes that switch structural CSS. */
export function tokensToAttrs(t: ThemeTokens): Record<string, string> {
  return {
    'data-nova-scheme': t.scheme,
    'data-nova-bg': t.background,
    'data-nova-card': t.cardStyle,
    'data-nova-sidebar': t.sidebarStyle,
    'data-nova-density': t.density,
  };
}

/** Boolean data-attributes (present when true). */
export function tokensToFlags(t: ThemeTokens): Record<string, boolean> {
  return {
    'data-nova-sidebar-gradient': t.sidebarGradient,
    'data-nova-glow': t.glow,
    'data-nova-anim': t.animations,
    'data-nova-tint': t.cardImageTint,
  };
}
