// screen-result.jsx — STEP 2: 추천 결과 페이지
// Exports: ScreenResult, COMBOS (shared data)

const COMBOS = [
  {
    n: 1, rate: 16.5, refund: 148,
    chips: ['연금저축', 'IRP', '청년형 ISA'],
    reason: '세액공제 16.5% 구간 + 청년 비과세까지 모두 활용',
  },
  {
    n: 2, rate: 14.2, refund: 121,
    chips: ['IRP', '청년형 ISA'],
    reason: '세액공제를 IRP로 몰아 받고 ISA 비과세 병행',
  },
  {
    n: 3, rate: 13.1, refund: 104,
    chips: ['연금저축', '청년형 ISA'],
    reason: '중도 유동성을 살리면서 세액공제를 챙기는 조합',
  },
  {
    n: 4, rate: 11.3, refund: 92,
    chips: ['국민성장펀드', '연금저축'],
    reason: '신규 소득공제 한도를 먼저 활용하는 전략',
  },
  {
    n: 5, rate: 9.4, refund: 71,
    chips: ['청년형 ISA'],
    reason: '가장 단순하게, 비과세 한도만 채우는 입문 조합',
  },
];

function ComboChips({ chips, tone = 'blue' }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
      {chips.map((c, i) => (
        <AccountChip key={c} label={c} tone={i === 0 && tone === 'blue' ? 'blue' : (tone === 'best' ? 'blue' : 'gray')} />
      ))}
    </div>
  );
}

function ComboCard({ c }) {
  const top = c.n === 1;
  return (
    <div style={{
      background: '#fff', borderRadius: 20, padding: '18px 18px 16px',
      border: top ? `1.5px solid ${TT.blue}` : `1px solid ${TT.line}`,
      boxShadow: top ? TT.cardHi : TT.card,
      display: 'flex', flexDirection: 'column', gap: 14, position: 'relative',
    }}>
      {top && (
        <div style={{
          position: 'absolute', top: -11, left: 18,
          background: TT.blue, color: '#fff', borderRadius: 8,
          padding: '4px 10px', fontFamily: TT.font, fontSize: 11.5, fontWeight: 800,
          letterSpacing: '0.04em', boxShadow: '0 4px 10px rgba(47,107,240,0.35)',
        }}>BEST 추천</div>
      )}

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 11 }}>
        <RankBadge n={c.n} top={top} />
        <div style={{ flex: 1, paddingTop: 1 }}>
          <ComboChips chips={c.chips} tone={top ? 'best' : 'plain'} />
        </div>
        <svg width="8" height="14" viewBox="0 0 8 14" style={{ marginTop: 9, flexShrink: 0 }}>
          <path d="M1 1l6 6-6 6" stroke={TT.ink4} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* metric row */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span style={{ fontFamily: TT.font, fontSize: 12.5, fontWeight: 700, color: TT.ink3 }}>예상 환급률</span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 3 }}>
            <span style={{ fontFamily: TT.font, fontSize: 36, fontWeight: 800, color: top ? TT.blue : TT.ink, letterSpacing: '-0.04em', lineHeight: 1 }}>{c.rate}</span>
            <span style={{ fontFamily: TT.font, fontSize: 19, fontWeight: 800, color: top ? TT.blue : TT.ink2 }}>%</span>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span style={{ fontFamily: TT.font, fontSize: 12.5, fontWeight: 700, color: TT.ink3, display: 'block' }}>연 환급 예상</span>
          <span style={{ fontFamily: TT.font, fontSize: 18, fontWeight: 800, color: TT.ink, letterSpacing: '-0.02em' }}>약 {won(c.refund)}만원</span>
        </div>
      </div>

      <div style={{
        background: top ? TT.blueWeak2 : TT.fieldBg, borderRadius: 12,
        padding: '11px 13px', display: 'flex', gap: 8, alignItems: 'flex-start',
      }}>
        <span style={{ fontSize: 13, lineHeight: 1.4 }}>💡</span>
        <span style={{ fontFamily: TT.font, fontSize: 13, fontWeight: 600, color: TT.ink2, lineHeight: 1.45, letterSpacing: '-0.02em' }}>{c.reason}</span>
      </div>
    </div>
  );
}

function ScreenResult({ web = false }) {
  return (
    <div style={{ minHeight: '100%', background: TT.appBg, fontFamily: TT.font, display: 'flex', flexDirection: 'column' }}>
      {/* hero — blue, big % */}
      <div style={{ background: `linear-gradient(160deg, ${TT.blue} 0%, ${TT.blueDeep} 100%)`, color: '#fff' }}>
        <AppBar title="추천 결과" accent web={web} />
        <div style={{ padding: '6px 24px 32px' }}>
          <p style={{ margin: 0, fontSize: 15.5, fontWeight: 600, color: 'rgba(255,255,255,0.82)', letterSpacing: '-0.02em' }}>
            29세 · 연봉 4,200만원 기준
          </p>
          <p style={{ margin: '16px 0 0', fontSize: 18, fontWeight: 600, color: 'rgba(255,255,255,0.95)', letterSpacing: '-0.02em' }}>
            지금 가입하면 최대
          </p>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 4 }}>
            <span style={{ fontSize: 72, fontWeight: 800, letterSpacing: '-0.05em', lineHeight: 0.95 }}>16.5</span>
            <span style={{ fontSize: 40, fontWeight: 800 }}>%</span>
          </div>
          <p style={{ margin: '8px 0 0', fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em' }}>
            환급받을 수 있어요
          </p>
          <div style={{
            marginTop: 18, display: 'inline-flex', alignItems: 'center', gap: 7,
            background: 'rgba(255,255,255,0.16)', borderRadius: 999, padding: '8px 14px',
          }}>
            <span style={{ fontSize: 14, fontWeight: 700 }}>연 최대 약 148만원</span>
            <span style={{ width: 3, height: 3, borderRadius: 999, background: 'rgba(255,255,255,0.6)' }} />
            <span style={{ fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.85)' }}>가입 가능 5개 조합</span>
          </div>
        </div>
      </div>

      {/* combos */}
      <div style={{
        background: TT.appBg, borderRadius: '24px 24px 0 0', marginTop: -16,
        padding: '24px 18px 40px', flex: 1, display: 'flex', flexDirection: 'column', gap: 18,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 2px' }}>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: TT.ink, letterSpacing: '-0.03em' }}>유리한 조합 순위</h2>
          <span style={{ fontSize: 13, fontWeight: 600, color: TT.ink3 }}>환급률 높은 순</span>
        </div>
        {COMBOS.map(c => <ComboCard key={c.n} c={c} />)}
      </div>
    </div>
  );
}

Object.assign(window, { ScreenResult, COMBOS, ComboCard, ComboChips });

// ─────────────────────────────────────────────────────────────
// 폴백: 환급률(rate)이 null일 때 추천 결과 대신 보여주는 화면
// 입력값이 비었거나 부정확해 계산이 불가능한 상태.
const REQUIRED_FIELDS = [
  { key: 'salary',  label: '연봉',        hint: '세전 총급여 기준', done: false },
  { key: 'birth',   label: '태어난 해',    hint: '청년 혜택 판별에 필요', done: false },
  { key: 'assets',  label: '보유 자산',    hint: '저축·투자 금액', done: true },
  { key: 'family',  label: '부양가족 수',  hint: '기본공제 대상', done: true },
];

function ScreenResultEmpty({ web = false, fields = REQUIRED_FIELDS }) {
  const missing = fields.filter(f => !f.done);
  return (
    <div style={{ minHeight: '100%', background: TT.appBg, fontFamily: TT.font, display: 'flex', flexDirection: 'column' }}>
      <AppBar title="추천 결과" web={web} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '20px 20px 24px' }}>
        {/* hero message */}
        <div style={{ padding: '36px 4px 28px', textAlign: 'center' }}>
          <div style={{
            width: 76, height: 76, borderRadius: 999, margin: '0 auto 22px',
            background: '#fff', border: `1px solid ${TT.line}`, boxShadow: TT.card,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
              <circle cx="17" cy="17" r="13" stroke={TT.ink4} strokeWidth="2.4"/>
              <path d="M17 11v7" stroke={TT.blue} strokeWidth="2.6" strokeLinecap="round"/>
              <circle cx="17" cy="23" r="1.5" fill={TT.blue}/>
            </svg>
          </div>
          <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: TT.ink, letterSpacing: '-0.03em', lineHeight: 1.35 }}>
            아직 환급률을<br/>계산할 수 없어요
          </h2>
          <p style={{ margin: '12px 0 0', fontSize: 14.5, fontWeight: 500, color: TT.ink3, lineHeight: 1.6, letterSpacing: '-0.02em' }}>
            입력하신 정보가 일부 비어 있거나<br/>정확하지 않아 추천 결과를 만들지 못했어요.
          </p>
        </div>

        {/* 확인이 필요한 항목 */}
        <div style={{ background: '#fff', borderRadius: 20, padding: '20px', boxShadow: TT.card }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 4 }}>
            <span style={{ fontSize: 15, fontWeight: 800, color: TT.ink, letterSpacing: '-0.02em' }}>확인이 필요한 항목</span>
            {missing.length > 0 && (
              <span style={{
                background: TT.blueWeak, color: TT.blueDeep, borderRadius: 999,
                padding: '2px 8px', fontSize: 12, fontWeight: 800,
              }}>{missing.length}개</span>
            )}
          </div>
          <p style={{ margin: '0 0 14px', fontSize: 12.5, fontWeight: 500, color: TT.ink3 }}>
            아래 항목을 채우면 바로 결과를 볼 수 있어요.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {fields.map((f, i) => (
              <div key={f.key} style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '13px 0',
                borderTop: i === 0 ? 'none' : `1px solid ${TT.line2}`,
              }}>
                <div style={{
                  width: 26, height: 26, borderRadius: 999, flexShrink: 0,
                  background: f.done ? TT.greenWeak : TT.fill,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {f.done ? (
                    <svg width="13" height="10" viewBox="0 0 13 10" fill="none">
                      <path d="M1.5 5l3.2 3.2L11.5 1.5" stroke={TT.greenDeep} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : (
                    <span style={{ width: 6, height: 6, borderRadius: 999, background: TT.ink4 }} />
                  )}
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <span style={{ fontSize: 15, fontWeight: 700, color: f.done ? TT.ink3 : TT.ink, letterSpacing: '-0.02em' }}>{f.label}</span>
                  <span style={{ fontSize: 12, fontWeight: 500, color: TT.ink4 }}>{f.hint}</span>
                </div>
                {!f.done && (
                  <span style={{ fontSize: 12.5, fontWeight: 800, color: TT.blue }}>입력 필요</span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 14, background: TT.fieldBg, borderRadius: 12, padding: '12px 14px', display: 'flex', gap: 8 }}>
          <span style={{ fontSize: 13 }}>ⓘ</span>
          <span style={{ fontSize: 12, fontWeight: 500, color: TT.ink3, lineHeight: 1.5 }}>
            연봉이 0이거나 태어난 해가 비어 있으면 세율·청년 혜택을 판별할 수 없어 환급률이 계산되지 않아요.
          </span>
        </div>
      </div>

      {/* pinned CTA */}
      <div style={{
        position: 'sticky', bottom: 0, padding: '14px 20px 30px',
        background: 'linear-gradient(to top, ' + TT.appBg + ' 72%, rgba(242,244,246,0))',
      }}>
        <CTAButton>정보 다시 입력하기</CTAButton>
      </div>
    </div>
  );
}

Object.assign(window, { ScreenResultEmpty, REQUIRED_FIELDS });
