// screen-detail.jsx — 조합 상세 페이지 (1위 조합 클릭 시 전체 화면)
// Exports: ScreenDetail

const PRIORITY = [
  { acc: '연금저축', amt: '연 600만원', desc: '세액공제 한도를 가장 먼저 채워요', tag: '1순위 납입' },
  { acc: 'IRP',      amt: '연 300만원', desc: '연금저축과 합산해 공제 한도(900만원)를 마저 채워요', tag: '2순위 납입' },
  { acc: '청년형 ISA', amt: '연 2,000만원 한도', desc: '남는 여유자금은 비과세로 굴려요', tag: '3순위 납입' },
];

const EFFECT = [
  { label: '세액공제 환급', value: '148만원', tone: 'blue', note: '연금저축·IRP 납입 900만원 × 16.5%' },
  { label: 'ISA 비과세·분리과세', value: '9.9% 분리과세', tone: 'green', note: '일반과세 15.4% 대비 절약' },
];

const REASONS = [
  '현재 연봉 구간(총급여 5,500만원 이하)에서는 연금저축·IRP 세액공제율이 16.5%로 가장 높아요.',
  '청년형 ISA 가입 가능 기간이 약 6개월 남아, 자격이 있을 때 먼저 가입하는 게 유리해요.',
  '국민성장펀드보다 세액공제 효율이 높아, 같은 금액이라도 환급이 더 커요.',
];

function SectionTitle({ children, sub }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 3, marginBottom: 14 }}>
      <h3 style={{ margin: 0, fontFamily: TT.font, fontSize: 17, fontWeight: 800, color: TT.ink, letterSpacing: '-0.03em' }}>{children}</h3>
      {sub && <span style={{ fontFamily: TT.font, fontSize: 13, fontWeight: 500, color: TT.ink3, letterSpacing: '-0.02em' }}>{sub}</span>}
    </div>
  );
}

function PriorityStep({ item, idx, last }) {
  return (
    <div style={{ display: 'flex', gap: 14 }}>
      {/* rail */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 30 }}>
        <div style={{
          width: 30, height: 30, borderRadius: 999, flexShrink: 0,
          background: TT.blue, color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: TT.font, fontSize: 14, fontWeight: 800,
        }}>{idx + 1}</div>
        {!last && <div style={{ width: 2, flex: 1, background: TT.line, marginTop: 4, marginBottom: 4, minHeight: 28 }} />}
      </div>
      {/* body */}
      <div style={{ flex: 1, paddingBottom: last ? 0 : 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <span style={{ fontFamily: TT.font, fontSize: 16, fontWeight: 800, color: TT.ink, letterSpacing: '-0.02em' }}>{item.acc}</span>
          <span style={{ fontFamily: TT.font, fontSize: 13.5, fontWeight: 700, color: TT.blue }}>{item.amt}</span>
        </div>
        <p style={{ margin: 0, fontFamily: TT.font, fontSize: 13.5, fontWeight: 500, color: TT.ink2, lineHeight: 1.45, letterSpacing: '-0.02em' }}>{item.desc}</p>
      </div>
    </div>
  );
}

function ScreenDetail({ web = false }) {
  return (
    <div style={{ minHeight: '100%', background: TT.appBg, fontFamily: TT.font, display: 'flex', flexDirection: 'column' }}>
      {/* hero */}
      <div style={{ background: `linear-gradient(160deg, ${TT.blue} 0%, ${TT.blueDeep} 100%)`, color: '#fff' }}>
        <AppBar title="" accent web={web} />
        <div style={{ padding: '2px 24px 34px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.18)', borderRadius: 999, padding: '5px 12px', marginBottom: 14 }}>
            <span style={{ fontSize: 12.5, fontWeight: 800 }}>1위 · BEST 추천</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 18 }}>
            {['연금저축', 'IRP', '청년형 ISA'].map(c => (
              <span key={c} style={{
                background: 'rgba(255,255,255,0.18)', color: '#fff', borderRadius: 8,
                padding: '6px 11px', fontFamily: TT.font, fontSize: 13.5, fontWeight: 700, letterSpacing: '-0.02em',
              }}>{c}</span>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <div>
              <span style={{ fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.82)', display: 'block', marginBottom: 2 }}>예상 환급률</span>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                <span style={{ fontSize: 56, fontWeight: 800, letterSpacing: '-0.05em', lineHeight: 0.95 }}>16.5</span>
                <span style={{ fontSize: 30, fontWeight: 800 }}>%</span>
              </div>
            </div>
            <div style={{ textAlign: 'right', paddingBottom: 6 }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.82)', display: 'block', marginBottom: 2 }}>연 환급 예상</span>
              <span style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em' }}>약 148만원</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ background: TT.appBg, borderRadius: '24px 24px 0 0', marginTop: -16, padding: '8px 18px 140px', display: 'flex', flexDirection: 'column', gap: 14 }}>

        {/* 납입 우선순위 */}
        <div style={{ background: '#fff', borderRadius: 20, padding: '22px 20px', boxShadow: TT.card, marginTop: 12 }}>
          <SectionTitle sub="이 순서대로 채우면 환급이 가장 커요">납입 우선순위</SectionTitle>
          <div style={{ marginTop: 6 }}>
            {PRIORITY.map((item, i) => (
              <PriorityStep key={item.acc} item={item} idx={i} last={i === PRIORITY.length - 1} />
            ))}
          </div>
        </div>

        {/* 절세 효과 */}
        <div style={{ background: '#fff', borderRadius: 20, padding: '22px 20px', boxShadow: TT.card }}>
          <SectionTitle sub="이 조합으로 받는 혜택을 나눠봤어요">절세 효과</SectionTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {EFFECT.map(e => (
              <div key={e.label} style={{
                background: e.tone === 'green' ? TT.greenWeak : TT.blueWeak2, borderRadius: 14, padding: '15px 16px',
                display: 'flex', flexDirection: 'column', gap: 6,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: TT.font, fontSize: 14.5, fontWeight: 700, color: TT.ink }}>{e.label}</span>
                  <span style={{ fontFamily: TT.font, fontSize: 16, fontWeight: 800, color: e.tone === 'green' ? TT.greenDeep : TT.blueDeep, letterSpacing: '-0.02em' }}>{e.value}</span>
                </div>
                <span style={{ fontFamily: TT.font, fontSize: 12.5, fontWeight: 500, color: TT.ink3, lineHeight: 1.4 }}>{e.note}</span>
              </div>
            ))}
          </div>
          {/* 세후 기대수익 */}
          <div style={{ marginTop: 14, paddingTop: 16, borderTop: `1px dashed ${TT.line}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span style={{ fontFamily: TT.font, fontSize: 14.5, fontWeight: 700, color: TT.ink }}>10년 세후 기대수익</span>
              <span style={{ fontFamily: TT.font, fontSize: 12, fontWeight: 500, color: TT.ink3 }}>연 5% 수익률 가정 · 일반과세 대비</span>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontFamily: TT.font, fontSize: 20, fontWeight: 800, color: TT.green, letterSpacing: '-0.02em' }}>+1,840만원</span>
            </div>
          </div>
        </div>

        {/* 왜 유리한가 — 자연어 설명 */}
        <div style={{ background: '#fff', borderRadius: 20, padding: '22px 20px', boxShadow: TT.card }}>
          <SectionTitle>왜 이 조합이 유리할까요?</SectionTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {REASONS.map((r, i) => (
              <div key={i} style={{ display: 'flex', gap: 11 }}>
                <div style={{
                  width: 22, height: 22, borderRadius: 999, flexShrink: 0, marginTop: 1,
                  background: TT.blueWeak, color: TT.blueDeep,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: TT.font, fontSize: 12, fontWeight: 800,
                }}>{i + 1}</div>
                <p style={{ margin: 0, flex: 1, fontFamily: TT.font, fontSize: 14, fontWeight: 500, color: TT.ink2, lineHeight: 1.55, letterSpacing: '-0.02em' }}>{r}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 16, background: TT.fieldBg, borderRadius: 12, padding: '12px 14px', display: 'flex', gap: 8 }}>
            <span style={{ fontSize: 13 }}>ⓘ</span>
            <span style={{ fontFamily: TT.font, fontSize: 12, fontWeight: 500, color: TT.ink3, lineHeight: 1.45 }}>
              세법·상품 조건에 따라 실제 혜택은 달라질 수 있어요. 가입 전 상세 조건을 꼭 확인하세요.
            </span>
          </div>
        </div>
      </div>

      {/* pinned CTA */}
      <div style={{
        position: 'sticky', bottom: 0, padding: '14px 20px 30px',
        background: 'linear-gradient(to top, ' + TT.appBg + ' 72%, rgba(242,244,246,0))',
      }}>
        <button style={{
          width: '100%', height: 56, borderRadius: 16, cursor: 'pointer',
          background: '#fff', border: `1px solid ${TT.line}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          boxShadow: TT.card,
          fontFamily: TT.font, fontSize: 16, fontWeight: 800, color: TT.ink, letterSpacing: '-0.02em',
        }}>
          <svg width="20" height="20" viewBox="0 0 22 22" fill="none">
            <circle cx="5.5" cy="11" r="2.4" fill={TT.ink2}/>
            <circle cx="16" cy="5" r="2.4" fill={TT.ink2}/>
            <circle cx="16" cy="17" r="2.4" fill={TT.ink2}/>
            <path d="M7.6 9.8l6.4-3.6M7.6 12.2l6.4 3.6" stroke={TT.ink2} strokeWidth="1.6" strokeLinecap="round"/>
          </svg>
          공유하기
        </button>
      </div>
    </div>
  );
}

Object.assign(window, { ScreenDetail, PRIORITY, EFFECT, REASONS, SectionTitle, PriorityStep });
