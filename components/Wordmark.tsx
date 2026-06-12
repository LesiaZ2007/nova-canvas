/**
 * Nova Canvas wordmark — a scholarly, personal lockup (serif name + a guiding
 * star/compass mark). Deliberately not generic: feels like a crest, not a SaaS logo.
 */
export function Wordmark({ size = 22 }: { size?: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <NovaMark size={size + 8} />
      <span
        style={{
          fontFamily: "'Iowan Old Style', Georgia, 'Times New Roman', serif",
          fontSize: size,
          fontWeight: 600,
          letterSpacing: '0.01em',
          color: 'var(--nv-text)',
          lineHeight: 1,
        }}
      >
        Nova<span style={{ color: 'var(--nv-accent)' }}>Canvas</span>
      </span>
    </div>
  );
}

/** A four-point guiding star inside a thin ring — scholarly "north star" motif. */
export function NovaMark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden>
      <circle cx="16" cy="16" r="14.5" stroke="var(--nv-accent)" strokeWidth="1.5" opacity="0.5" />
      <path
        d="M16 4 L18.4 13.6 L28 16 L18.4 18.4 L16 28 L13.6 18.4 L4 16 L13.6 13.6 Z"
        fill="var(--nv-accent)"
      />
    </svg>
  );
}
