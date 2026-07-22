// screen-landing.jsx — 서비스 진입 랜딩. 간편함을 강조하고 "내 절세 전략 찾기"로 STEP 1 유입.
// Exports: ScreenLanding

const LAND_FEATURES = [
  { title: '30초면 충분해요', desc: '나이·연봉 몇 가지만 고르면 끝. 복잡한 서류도, 로그인도 필요 없어요.',
    icon: (c) => (<><circle cx="12" cy="12.5" r="8" stroke={c} strokeWidth="1.8"/><path d="M12 8.5v4l2.6 1.8" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 3.2h6" stroke={c} strokeWidth="1.8" strokeLinecap="round"/></>) },
  { title: '내 조건에 딱 맞게', desc: '내 소득 구간에서 가장 유리한 절세 계좌 조합만 골라서 추천해요.',
    icon: (c) => (<><circle cx="12" cy="12" r="8.2" stroke={c} strokeWidth="1.8"/><circle cx="12" cy="12" r="4.4" stroke={c} strokeWidth="1.8"/><circle cx="12" cy="12" r="1.1" fill={c}/></>) },
  { title: '환급액까지 숫자로', desc: '얼마를 더 돌려받을 수 있는지 예상 금액과 환급률로 바로 보여드려요.',
    icon: (c) => (<><path d="M4 19V9m5 10V5m5 14v-7m5 7V8" stroke={c} strokeWidth="1.8" strokeLinecap="round"/></>) },
];

const LAND_STEPS = [
  { n: '01', t: '기본 정보 입력', d: '나이·연봉·투자 현황' },
  { n: '02', t: '맞춤 분석', d: '유리한 계좌 조합 계산' },
  { n: '03', t: '전략 확인', d: '예상 환급액·추천 순위' },
];

function FeatureIcon({ draw }) {
  return (
    <div style={{
      width: 46, height: 46, borderRadius: 14, flexShrink: 0,
      background: TT.blueWeak, display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">{draw(TT.blue)}</svg>
    </div>
  );
}

function ScreenLanding({ web = false }) {
  return (
    <div style={{
      minHeight: '100%', fontFamily: TT.font, display: 'flex', flexDirection: 'column',
      background: TT.white,
    }}>
      <AppBar title="절세" bare web={web} home />

      {/* 히어로 */}
      <div style={{
        padding: '20px 24px 40px',
        background: `radial-gradient(130% 70% at 50% -6%, ${TT.blueWeak} 0%, ${TT.blueWeak2} 40%, #fff 78%)`,
      }}>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          background: '#fff', border: `1px solid ${TT.line}`, boxShadow: TT.card,
          borderRadius: 999, padding: '7px 13px 7px 11px',
          fontSize: 13, fontWeight: 700, color: TT.blueDeep, letterSpacing: '-0.02em',
        }}>
          <span style={{ width: 7, height: 7, borderRadius: 999, background: TT.green }} />
          가입 없이 · 무료로
        </span>

        <h1 style={{
          margin: '20px 0 0', fontFamily: TT.font, fontSize: 32, fontWeight: 800,
          color: TT.ink, lineHeight: 1.28, letterSpacing: '-0.035em',
        }}>
          몰라서 못 받던 세금,<br /><span style={{ color: TT.blue }}>30초</span>면 찾아드려요
        </h1>
        <p style={{
          margin: '16px 0 0', fontSize: 16, fontWeight: 500, color: TT.ink2,
          lineHeight: 1.6, letterSpacing: '-0.02em', textWrap: 'pretty',
        }}>
          복잡한 절세, 이제 계산기 두드리지 마세요. 몇 가지만 고르면 내게 가장 유리한 전략을 바로 알려드려요.
        </p>

        {/* 미리보기 스탯 카드 */}
        <div style={{
          marginTop: 26, background: '#fff', borderRadius: 20, padding: '18px 20px',
          boxShadow: TT.cardHi, display: 'flex', alignItems: 'center', gap: 16,
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12.5, fontWeight: 600, color: TT.ink3, letterSpacing: '-0.02em' }}>예상 추가 환급액</div>
            <div style={{ marginTop: 3, fontSize: 27, fontWeight: 800, color: TT.ink, letterSpacing: '-0.03em' }}>
              +84<span style={{ fontSize: 17 }}>만원</span>
            </div>
          </div>
          <div style={{ width: 1, height: 40, background: TT.line }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12.5, fontWeight: 600, color: TT.ink3, letterSpacing: '-0.02em' }}>추천 계좌 조합</div>
            <div style={{ marginTop: 6, display: 'flex', gap: 5, flexWrap: 'wrap' }}>
              <AccountChip label="연금저축" size="sm" />
              <AccountChip label="IRP" size="sm" />
            </div>
          </div>
        </div>
      </div>

      {/* 특징 */}
      <div style={{ padding: '10px 24px 8px', display: 'flex', flexDirection: 'column', gap: 20 }}>
        {LAND_FEATURES.map(f => (
          <div key={f.title} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
            <FeatureIcon draw={f.icon} />
            <div style={{ paddingTop: 2 }}>
              <div style={{ fontSize: 17, fontWeight: 700, color: TT.ink, letterSpacing: '-0.02em' }}>{f.title}</div>
              <div style={{ marginTop: 4, fontSize: 14, fontWeight: 500, color: TT.ink2, lineHeight: 1.55, letterSpacing: '-0.02em', textWrap: 'pretty' }}>{f.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* 진행 방식 3스텝 */}
      <div style={{ padding: '28px 24px 8px' }}>
        <div style={{
          background: TT.fieldBg, borderRadius: 20, padding: '22px 22px 8px',
        }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: TT.ink3, letterSpacing: '-0.02em', marginBottom: 16 }}>이렇게 진행돼요</div>
          {LAND_STEPS.map((s, i) => (
            <div key={s.n} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', paddingBottom: i === LAND_STEPS.length - 1 ? 14 : 0 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                <div style={{
                  width: 30, height: 30, borderRadius: 999, background: TT.blue, color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12.5, fontWeight: 800, letterSpacing: '-0.02em',
                }}>{s.n}</div>
                {i < LAND_STEPS.length - 1 && <div style={{ width: 2, flex: 1, minHeight: 22, background: TT.line, margin: '4px 0' }} />}
              </div>
              <div style={{ paddingTop: 4, paddingBottom: 14 }}>
                <div style={{ fontSize: 15.5, fontWeight: 700, color: TT.ink, letterSpacing: '-0.02em' }}>{s.t}</div>
                <div style={{ marginTop: 2, fontSize: 13.5, fontWeight: 500, color: TT.ink3, letterSpacing: '-0.02em' }}>{s.d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 신뢰 라인 */}
      <div style={{ padding: '18px 24px 130px', textAlign: 'center' }}>
        <p style={{ margin: 0, fontSize: 13, fontWeight: 500, color: TT.ink3, lineHeight: 1.6, letterSpacing: '-0.02em' }}>
          입력한 정보는 저장되지 않아요. 계산에만 쓰이고 바로 사라집니다.
        </p>
      </div>

      {/* 하단 고정 CTA */}
      <div style={{
        position: 'sticky', bottom: 0, padding: '14px 20px 30px',
        background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, #fff 24%)',
      }}>
        <CTAButton sub="30초면 끝나요 · 가입 불필요">내 절세 전략 찾기</CTAButton>
      </div>
    </div>
  );
}

Object.assign(window, { ScreenLanding });
