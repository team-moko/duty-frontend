// theme.jsx — shared design tokens + UI primitives for the 절세 service mockup
// Exports to window: TT (tokens), AppBar, CTAButton, AccountChip, FieldRow,
// InputBox, RadioPill, CheckRow, won, RankBadge

const TT = {
  // brand
  blue:      '#2F6BF0',
  blueDeep:  '#1D52C9',
  blueWeak:  '#EAF1FE',
  blueWeak2: '#F4F8FF',
  green:     '#12B886',
  greenDeep: '#0CA678',
  greenWeak: '#E6F8F1',
  // neutrals (cool-tinted, Toss-ish)
  ink:    '#191F28',
  ink2:   '#4E5968',
  ink3:   '#8B95A1',
  ink4:   '#B0B8C1',
  line:   '#E5E8EB',
  line2:  '#F2F4F6',
  fill:   '#F2F4F6',
  fieldBg:'#F7F8FA',
  appBg:  '#F2F4F6',
  white:  '#FFFFFF',
  // type
  font: '"Pretendard Variable", Pretendard, -apple-system, system-ui, sans-serif',
  // shadow
  card:  '0 1px 2px rgba(25,31,40,0.04), 0 6px 20px rgba(25,31,40,0.05)',
  cardHi:'0 2px 4px rgba(25,31,40,0.05), 0 12px 32px rgba(47,107,240,0.12)',
};

// number → "1,234"
function won(n) { return n.toLocaleString('ko-KR'); }

// Top app bar (custom, not iOS native)
function AppBar({ title, step, totalSteps, onlyTitle = false, accent = false, web = false, home = false, bare = false }) {
  return (
    <div style={{
      position: 'sticky', top: 0, zIndex: accent ? 6 : 9,
      background: accent ? 'transparent' : (bare ? 'transparent' : 'rgba(255,255,255,0.86)'),
      backdropFilter: (accent || bare) ? 'none' : 'saturate(180%) blur(12px)',
      WebkitBackdropFilter: (accent || bare) ? 'none' : 'saturate(180%) blur(12px)',
      paddingTop: web ? 6 : 54,
    }}>
      <div style={{
        height: 52, display: 'flex', alignItems: 'center', gap: 6,
        padding: home ? '0 12px 0 20px' : '0 8px 0 12px',
      }}>
        {!home && (
        <button style={{
          width: 40, height: 40, border: 'none', background: 'transparent',
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        }}>
          <svg width="11" height="20" viewBox="0 0 11 20" fill="none">
            <path d="M9.5 2L2 10l7.5 8" stroke={accent ? '#fff' : TT.ink} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        )}
        <div style={{
          flex: 1, fontFamily: TT.font, fontSize: home ? 19 : 16, fontWeight: home ? 800 : 700,
          color: accent ? '#fff' : TT.ink, letterSpacing: '-0.02em',
          textAlign: onlyTitle ? 'left' : 'left',
        }}>{title}</div>
        {step != null && (
          <div style={{
            fontFamily: TT.font, fontSize: 13, fontWeight: 600,
            color: TT.ink3, paddingRight: 12,
          }}>
            <span style={{ color: TT.blue }}>{step}</span> / {totalSteps}
          </div>
        )}
      </div>
    </div>
  );
}

// Primary CTA, pinned-feeling
function CTAButton({ children, sub, disabled = false, variant = 'blue' }) {
  const bg = disabled ? TT.line : (variant === 'green' ? TT.green : TT.blue);
  return (
    <button style={{
      width: '100%', border: 'none', cursor: 'pointer',
      background: bg, color: disabled ? TT.ink4 : '#fff',
      height: sub ? 60 : 56, borderRadius: 16,
      fontFamily: TT.font, fontSize: 17, fontWeight: 700, letterSpacing: '-0.02em',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2,
      boxShadow: disabled ? 'none' : '0 6px 18px rgba(47,107,240,0.28)',
    }}>
      <span>{children}</span>
      {sub && <span style={{ fontSize: 12, fontWeight: 600, opacity: 0.85 }}>{sub}</span>}
    </button>
  );
}

// account pill chip
function AccountChip({ label, tone = 'blue', size = 'sm' }) {
  const map = {
    blue:  [TT.blueWeak, TT.blueDeep],
    green: [TT.greenWeak, TT.greenDeep],
    gray:  [TT.fill, TT.ink2],
  };
  const [bg, fg] = map[tone];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      background: bg, color: fg, borderRadius: 8,
      padding: size === 'sm' ? '5px 9px' : '7px 12px',
      fontFamily: TT.font, fontSize: size === 'sm' ? 12.5 : 14, fontWeight: 700,
      letterSpacing: '-0.02em', whiteSpace: 'nowrap',
    }}>{label}</span>
  );
}

// labeled field wrapper
function FieldRow({ label, hint, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
        <span style={{ fontFamily: TT.font, fontSize: 15, fontWeight: 700, color: TT.ink, letterSpacing: '-0.02em' }}>{label}</span>
        {hint && <span style={{ fontFamily: TT.font, fontSize: 12.5, fontWeight: 500, color: TT.ink3 }}>{hint}</span>}
      </div>
      {children}
    </div>
  );
}

// text input box with optional suffix unit
function InputBox({ value, placeholder, suffix, align = 'left', strong = false }) {
  const empty = value == null || value === '';
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8,
      background: TT.fieldBg, border: `1px solid ${TT.line}`, borderRadius: 14,
      height: 56, padding: '0 16px',
    }}>
      <span style={{
        flex: 1, fontFamily: TT.font, fontSize: 17, fontWeight: strong ? 700 : 600,
        color: empty ? TT.ink4 : TT.ink, textAlign: align, letterSpacing: '-0.02em',
      }}>{empty ? placeholder : (align === 'right' ? won(value) : value)}</span>
      {suffix && <span style={{ fontFamily: TT.font, fontSize: 16, fontWeight: 600, color: TT.ink2 }}>{suffix}</span>}
    </div>
  );
}

// radio pill group (segmented)
function RadioPill({ options, value }) {
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      {options.map(opt => {
        const on = opt === value;
        return (
          <div key={opt} style={{
            flex: 1, height: 52, borderRadius: 14,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: on ? TT.blueWeak : TT.fieldBg,
            border: `1.5px solid ${on ? TT.blue : TT.line}`,
            fontFamily: TT.font, fontSize: 16, fontWeight: 700,
            color: on ? TT.blueDeep : TT.ink2, letterSpacing: '-0.02em',
          }}>{opt}</div>
        );
      })}
    </div>
  );
}

// check row (checkbox + label) — used standalone or in a list
function CheckRow({ label, sub, checked = false, compact = false }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: compact ? '0' : '14px 16px',
      background: compact ? 'transparent' : (checked ? TT.blueWeak2 : TT.fieldBg),
      border: compact ? 'none' : `1.5px solid ${checked ? TT.blue : TT.line}`,
      borderRadius: 14,
    }}>
      <div style={{
        width: 24, height: 24, borderRadius: 8, flexShrink: 0,
        background: checked ? TT.blue : '#fff',
        border: `1.5px solid ${checked ? TT.blue : TT.line}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {checked && (
          <svg width="13" height="10" viewBox="0 0 13 10" fill="none">
            <path d="M1.5 5l3.2 3.2L11.5 1.5" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <span style={{ fontFamily: TT.font, fontSize: 15.5, fontWeight: 600, color: TT.ink, letterSpacing: '-0.02em' }}>{label}</span>
        {sub && <span style={{ fontFamily: TT.font, fontSize: 12.5, fontWeight: 500, color: TT.ink3 }}>{sub}</span>}
      </div>
    </div>
  );
}

// rank badge (1~5)
function RankBadge({ n, top = false }) {
  return (
    <div style={{
      width: 30, height: 30, borderRadius: 10, flexShrink: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: top ? TT.blue : TT.fill,
      color: top ? '#fff' : TT.ink2,
      fontFamily: TT.font, fontSize: 15, fontWeight: 800,
      boxShadow: top ? '0 4px 10px rgba(47,107,240,0.3)' : 'none',
    }}>{n}</div>
  );
}

// Desktop top navigation bar — logo mark + service name
function TopNav({ maxWidth = 1120 }) {
  return (
    <div style={{
      position: 'sticky', top: 0, zIndex: 50, background: 'rgba(255,255,255,0.9)',
      backdropFilter: 'saturate(180%) blur(12px)', WebkitBackdropFilter: 'saturate(180%) blur(12px)',
      borderBottom: `1px solid ${TT.line}`,
    }}>
      <div style={{
        maxWidth, margin: '0 auto', height: 64, padding: '0 32px',
        display: 'flex', alignItems: 'center', gap: 11,
      }}>
        <div style={{
          width: 32, height: 32, borderRadius: 9, flexShrink: 0,
          background: `linear-gradient(150deg, ${TT.blue}, ${TT.blueDeep})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 3px 8px rgba(47,107,240,0.3)',
        }}>
          <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
            <circle cx="4.5" cy="4.5" r="2.3" stroke="#fff" strokeWidth="1.6"/>
            <circle cx="12.5" cy="12.5" r="2.3" stroke="#fff" strokeWidth="1.6"/>
            <path d="M3 14L14 3" stroke="#fff" strokeWidth="1.7" strokeLinecap="round"/>
          </svg>
        </div>
        <span style={{ fontFamily: TT.font, fontSize: 18, fontWeight: 800, color: TT.ink, letterSpacing: '-0.03em' }}>절세</span>
        <span style={{ fontFamily: TT.font, fontSize: 14, fontWeight: 600, color: TT.ink3, letterSpacing: '-0.02em', paddingTop: 1 }}>내 절세 전략 추천</span>
      </div>
    </div>
  );
}

Object.assign(window, {
  TT, won, AppBar, TopNav, CTAButton, AccountChip, FieldRow, InputBox, RadioPill, CheckRow, RankBadge,
});
