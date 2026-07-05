// screen-share.jsx — 공유 링크로 들어온 사람이 보는 원페이지 랜딩
// 앱 화면 틀(블루 히어로+흰 시트)에서 벗어나, 공유받은 "카드/티켓" 느낌의 독립 레이아웃.
// 목표: 추천 전략을 매력적으로 보여주고 → "내 절세 전략 보러가기"로 서비스 유입
// Exports: ScreenShare

const SHARE_BENEFITS = [
  { emoji: '⏱️', title: '30초면 끝', desc: '나이·연봉만 입력하면 바로 결과가 나와요' },
  { emoji: '🎯', title: '내 조건에 딱 맞게', desc: '내 소득 구간에 유리한 계좌 조합만 추천' },
  { emoji: '💸', title: '연 환급액까지 계산', desc: '얼마를 돌려받을 수 있는지 금액으로 확인' },
];

// 심리테스트 결과처럼 붙는 "절세 유형" — 예상 환급률(%) 하나로 나눈다.
// 낮을수록 이미 잘 챙기는 "고수", 높을수로 안 챙긴 혜택이 많은 "기회" — 양쪽 모두 긍정적으로.
const TAX_TYPES = [
  { min: 15, emoji: '🚀', name: '환급 떡상 잠재력형', tagline: '아직 안 챙긴 혜택이 이렇게나! 지금이 기회예요',
    keywords: ['#숨은환급_발굴', '#최대치도전', '#지금이기회'] },
  { min: 13, emoji: '🧩', name: '빈틈없는 균형형', tagline: '받을 수 있는 혜택은 하나도 안 놓쳐요',
    keywords: ['#세액공제_맥스', '#비과세_알뜰', '#장기전략가'] },
  { min: 11, emoji: '🌱', name: '알뜰 실속형', tagline: '굴리는 맛까지 챙기면서 기본까지 딱',
    keywords: ['#유동성_중시', '#실속파', '#균형감각'] },
  { min: 0,  emoji: '🏆', name: '이미 절세 고수형', tagline: '웬만한 혜택은 이미 챙기고 계셔요',
    keywords: ['#공제_거의만렙', '#빈틈없음', '#절세_마스터'] },
];

function getTaxType(rate) {
  return TAX_TYPES.find(t => rate >= t.min) || TAX_TYPES[TAX_TYPES.length - 1];
}

function ScreenShare({ web = false, name = '지훈', rate = 16.5 }) {
  const type = getTaxType(rate);
  return (
    <div style={{
      minHeight: '100%', fontFamily: TT.font, display: 'flex', flexDirection: 'column',
      background: `radial-gradient(120% 60% at 50% 0%, ${TT.blueWeak} 0%, ${TT.appBg} 46%)`,
    }}>
      <AppBar title="" bare web={web} home />

      {/* 상단 발신 라인 */}
      <div style={{ padding: '2px 24px 0', display: 'flex', alignItems: 'center', gap: 9 }}>
        <div style={{
          width: 30, height: 30, borderRadius: 999, flexShrink: 0,
          background: `linear-gradient(150deg, ${TT.blue}, ${TT.blueDeep})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 13, fontWeight: 800, color: '#fff',
        }}>{name.slice(0, 1)}</div>
        <span style={{ fontSize: 14.5, fontWeight: 600, color: TT.ink2, letterSpacing: '-0.02em' }}>
          <b style={{ fontWeight: 800, color: TT.ink }}>{name}</b>님이 절세 전략을 공유했어요
        </span>
      </div>

      {/* 공유 카드 (티켓 메타포) */}
      <div style={{ padding: '18px 20px 4px' }}>
        <div style={{
          background: '#fff', borderRadius: 24, overflow: 'hidden',
          boxShadow: '0 12px 40px rgba(29,82,201,0.14), 0 2px 6px rgba(25,31,40,0.05)',
        }}>
          {/* 카드 상단 — 절세 유형 (심리테스트 결과 느낌) */}
          <div style={{ padding: '28px 26px 24px', textAlign: 'center', background: `linear-gradient(180deg, ${TT.blueWeak2} 0%, #fff 100%)` }}>
            <span style={{
              display: 'inline-block', background: TT.blue, color: '#fff',
              borderRadius: 999, padding: '6px 13px', fontSize: 12.5, fontWeight: 800, letterSpacing: '-0.01em',
            }}>{name}님의 절세 유형</span>
            <div style={{ fontSize: 56, lineHeight: 1, margin: '18px 0 12px' }}>{type.emoji}</div>
            <p style={{ margin: 0, fontSize: 26, fontWeight: 800, color: TT.ink, letterSpacing: '-0.035em', lineHeight: 1.2 }}>
              {type.name}
            </p>
            <p style={{ margin: '8px 0 0', fontSize: 14.5, fontWeight: 600, color: TT.ink2, letterSpacing: '-0.02em' }}>
              “{type.tagline}”
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 6, marginTop: 16 }}>
              {type.keywords.map(k => (
                <span key={k} style={{
                  background: '#fff', border: `1px solid ${TT.line}`, color: TT.ink2,
                  borderRadius: 999, padding: '5px 11px', fontSize: 12, fontWeight: 700, letterSpacing: '-0.01em',
                }}>{k}</span>
              ))}
            </div>
          </div>

          {/* 티켓 perforation */}
          <div style={{ position: 'relative', height: 1 }}>
            <div style={{ position: 'absolute', left: -8, top: -8, width: 16, height: 16, borderRadius: 999, background: TT.appBg }} />
            <div style={{ position: 'absolute', right: -8, top: -8, width: 16, height: 16, borderRadius: 999, background: TT.appBg }} />
            <div style={{ position: 'absolute', left: 16, right: 16, top: 0, borderTop: `2px dashed ${TT.line}` }} />
          </div>

          {/* 카드 중단 — 지표 */}
          <div style={{ padding: '26px 26px 22px', textAlign: 'center' }}>
            <p style={{ margin: 0, fontSize: 15.5, fontWeight: 600, color: TT.ink3, letterSpacing: '-0.02em' }}>
              계좌를 잘 조합하면
            </p>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 5, marginTop: 4 }}>
              <span style={{ fontSize: 72, fontWeight: 800, letterSpacing: '-0.05em', lineHeight: 0.9, color: TT.blue }}>{rate}</span>
              <span style={{ fontSize: 36, fontWeight: 800, color: TT.blue }}>%</span>
            </div>
            <p style={{ margin: '8px 0 0', fontSize: 16.5, fontWeight: 700, color: TT.ink, letterSpacing: '-0.02em' }}>
              까지 돌려받을 수 있어요
            </p>
            <p style={{ margin: '4px 0 0', fontSize: 12.5, fontWeight: 500, color: TT.ink4 }}>
              납입액 대비 예상 환급률 기준
            </p>
          </div>

          {/* 카드 하단 — 조합 */}
          <div style={{ padding: '24px 26px 28px' }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: TT.ink3, letterSpacing: '-0.02em' }}>추천받은 계좌 조합</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, margin: '12px 0 16px' }}>
              {['연금저축', 'IRP', '청년형 ISA'].map(c => (
                <AccountChip key={c} label={c} tone="blue" size="md" />
              ))}
            </div>
            <div style={{
              background: TT.blueWeak2, borderRadius: 12, padding: '13px 15px',
              display: 'flex', gap: 9, alignItems: 'flex-start',
            }}>
              <span style={{ fontSize: 14, lineHeight: 1.4 }}>💡</span>
              <span style={{ fontSize: 13.5, fontWeight: 600, color: TT.ink2, lineHeight: 1.5, letterSpacing: '-0.02em' }}>
                세액공제 16.5% 구간 + 청년 비과세 혜택까지 모두 챙기는 조합이에요
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 전환 훅 */}
      <div style={{ padding: '24px 24px 4px', textAlign: 'center' }}>
        <p style={{ margin: 0, fontSize: 23, fontWeight: 800, color: TT.ink, letterSpacing: '-0.03em', lineHeight: 1.4 }}>
          그럼 <span style={{ color: TT.blue }}>나는</span> 얼마나<br/>돌려받을 수 있을까요?
        </p>
        <p style={{ margin: '10px 0 0', fontSize: 14.5, fontWeight: 500, color: TT.ink3, lineHeight: 1.55, letterSpacing: '-0.02em' }}>
          사람마다 유리한 전략이 달라요.<br/>내 조건으로 30초 만에 확인해보세요.
        </p>
      </div>

      {/* 혜택 3줄 */}
      <div style={{ padding: '20px 20px 0' }}>
        <div style={{ background: '#fff', borderRadius: 20, padding: '10px 20px', boxShadow: TT.card }}>
          {SHARE_BENEFITS.map((b, i) => (
            <div key={b.title} style={{
              display: 'flex', alignItems: 'center', gap: 14, padding: '15px 0',
              borderTop: i === 0 ? 'none' : `1px solid ${TT.line2}`,
            }}>
              <div style={{
                width: 42, height: 42, borderRadius: 12, flexShrink: 0, background: TT.fieldBg,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
              }}>{b.emoji}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <span style={{ fontSize: 15.5, fontWeight: 800, color: TT.ink, letterSpacing: '-0.02em' }}>{b.title}</span>
                <span style={{ fontSize: 13, fontWeight: 500, color: TT.ink3, letterSpacing: '-0.02em' }}>{b.desc}</span>
              </div>
            </div>
          ))}
        </div>
        <p style={{ margin: '14px 0 0', textAlign: 'center', fontSize: 12, fontWeight: 500, color: TT.ink4, lineHeight: 1.5 }}>
          가입·로그인 없이 바로 결과를 볼 수 있어요
        </p>
      </div>

      <div style={{ flex: 1, minHeight: 24 }} />

      {/* pinned CTA — 유입 버튼 */}
      <div style={{
        position: 'sticky', bottom: 0, padding: '14px 20px 30px',
        background: 'linear-gradient(to top, ' + TT.appBg + ' 72%, rgba(242,244,246,0))',
      }}>
        <CTAButton sub="30초면 충분해요">내 절세 전략 보러가기</CTAButton>
      </div>
    </div>
  );
}

// 유형 카드만 단독으로 — 유형 비교/공유 이미지용
function ShareTypeCard({ name = '지훈', rate = 16.5 }) {
  const type = getTaxType(rate);
  return (
    <div style={{
      fontFamily: TT.font, background: `linear-gradient(180deg, ${TT.blueWeak2} 0%, #fff 100%)`,
      borderRadius: 24, padding: '30px 26px 34px', textAlign: 'center',
      boxShadow: '0 12px 40px rgba(29,82,201,0.14), 0 2px 6px rgba(25,31,40,0.05)',
    }}>
      <span style={{
        display: 'inline-block', background: TT.blue, color: '#fff',
        borderRadius: 999, padding: '7px 15px', fontSize: 13, fontWeight: 800, letterSpacing: '-0.01em',
      }}>{name}님의 절세 유형</span>
      <div style={{ fontSize: 62, lineHeight: 1, margin: '20px 0 14px' }}>{type.emoji}</div>
      <p style={{ margin: 0, fontSize: 28, fontWeight: 800, color: TT.ink, letterSpacing: '-0.035em', lineHeight: 1.2 }}>
        {type.name}
      </p>
      <p style={{ margin: '10px 0 0', fontSize: 15, fontWeight: 600, color: TT.ink2, letterSpacing: '-0.02em', lineHeight: 1.45 }}>
        “{type.tagline}”
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 7, marginTop: 18 }}>
        {type.keywords.map(k => (
          <span key={k} style={{
            background: '#fff', border: `1px solid ${TT.line}`, color: TT.ink2,
            borderRadius: 999, padding: '6px 12px', fontSize: 12.5, fontWeight: 700, letterSpacing: '-0.01em',
          }}>{k}</span>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { ScreenShare, ShareTypeCard, SHARE_BENEFITS, TAX_TYPES, getTaxType });
