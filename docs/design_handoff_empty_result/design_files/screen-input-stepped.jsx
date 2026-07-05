// screen-input-stepped.jsx — STEP 1 입력을 4개 스텝으로 분할한 버전
// 상단 진행바 + 큰 스텝 타이틀 + 하단 다음/이전 내비. 블록은 screen-input2.jsx에서 재사용.
// Exports: StepScreen

const STEPS = [
  { key: 'basic',   label: '기본 정보',     title: '기본 정보를\n알려주세요' },
  { key: 'invest',  label: '투자 현황',     title: '투자는 어떻게\n하고 계세요?' },
  { key: 'account', label: '절세 계좌',     title: '절세 계좌,\n이미 가지고 있나요?' },
  { key: 'family',  label: '소득·가족',     title: '소득과 가족\n정보를 알려주세요' },
];

// top progress: 4 segment bars + n/total
function StepProgress({ idx }) {
  return (
    <div style={{ padding: '4px 20px 18px', background: 'transparent' }}>
      <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
        {STEPS.map((s, i) => (
          <div key={s.key} style={{
            flex: 1, height: 4, borderRadius: 999,
            background: i <= idx ? TT.blue : TT.line,
            transition: 'background .2s',
          }} />
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: TT.font, fontSize: 13, fontWeight: 700, color: TT.blue, letterSpacing: '-0.02em' }}>{STEPS[idx].label}</span>
        <span style={{ fontFamily: TT.font, fontSize: 13, fontWeight: 600, color: TT.ink3 }}>
          <span style={{ color: TT.ink }}>{idx + 1}</span> / {STEPS.length}
        </span>
      </div>
    </div>
  );
}

function StepHeader({ idx }) {
  return (
    <div style={{ padding: '14px 20px 22px' }}>
      <h1 style={{ margin: 0, fontFamily: TT.font, fontSize: 25, fontWeight: 800, color: TT.ink, lineHeight: 1.32, letterSpacing: '-0.03em', whiteSpace: 'pre-line' }}>
        {STEPS[idx].title}
      </h1>
    </div>
  );
}

/* ── per-step content ───────────────────────────── */

function StepBasic() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
      <FieldRow label="나이">
        <InputBox value="35" placeholder="0" suffix="세" align="right" />
      </FieldRow>
      <FieldRow label="연봉" hint="세전 총급여 기준">
        <InputBox value={6000} placeholder="0" suffix="만원" align="right" strong />
      </FieldRow>
      <FieldRow label="소득 유형">
        <Segmented options={['직장인', '사업자', '기타']} value="직장인" />
      </FieldRow>
    </div>
  );
}

function StepInvest() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
      <FieldRow label="보유 투자 유형" hint="해당하는 항목을 모두 선택하세요">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {INVEST_TYPES.map(t => <Tile key={t.label} label={t.label} on={t.on} />)}
          <Tile label="해당 없음 (투자 중인 종목이 없어요)" on={false} full />
        </div>
      </FieldRow>
      <FieldRow label="월 투자 가능액">
        <InputBox value="100" placeholder="0" suffix="만원" align="right" />
      </FieldRow>
      <FieldRow label="투자 성향">
        <Segmented options={['안정형', '중립형', '공격형']} value="공격형" />
      </FieldRow>
      <FieldRow label="해외주식 미실현 수익" hint="양도소득세 절세 판단에 쓰여요">
        <InputBox value="1500" placeholder="0" suffix="만원" align="right" />
      </FieldRow>
    </div>
  );
}

function StepAccount() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <p style={{ margin: '0 0 4px', fontFamily: TT.font, fontSize: 14, fontWeight: 500, color: TT.ink3, lineHeight: 1.5, letterSpacing: '-0.02em' }}>
        이미 가입한 계좌가 있다면 알려주세요. 남은 납입 한도를 계산에 반영해요.
      </p>
      <AccountToggle label="연금저축 보유" on={true}>
        <MiniLabel>연금저축 연 납입액 (최대 600만원)</MiniLabel>
        <InputBox value="300" placeholder="0" suffix="만원" align="right" />
      </AccountToggle>
      <AccountToggle label="IRP 보유" on={false} />
      <AccountToggle label="ISA 보유" on={false} />
    </div>
  );
}

function StepFamily() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
      <FieldRow label="연 금융소득" hint="이자 + 배당 합산">
        <InputBox value="80" placeholder="0" suffix="만원" align="right" />
      </FieldRow>
      <FieldRow label="연 배당소득">
        <InputBox value="30" placeholder="0" suffix="만원" align="right" />
      </FieldRow>
      <FieldRow label="해당사항">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <CheckRow label="고배당주 보유" checked={false} />
          <CheckRow label="배우자 있음" checked={true} />
          <div style={{ background: TT.blueWeak2, border: `1.5px solid ${TT.blue}`, borderRadius: 14, overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '15px 16px', cursor: 'pointer' }}>
              <div style={{ width: 22, height: 22, borderRadius: 7, flexShrink: 0, background: TT.blue, border: `1.5px solid ${TT.blue}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="12" height="9" viewBox="0 0 13 10" fill="none"><path d="M1.5 5l3.2 3.2L11.5 1.5" stroke="#fff" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <span style={{ flex: 1, fontFamily: TT.font, fontSize: 15.5, fontWeight: 700, color: TT.ink, letterSpacing: '-0.02em' }}>자녀 있음</span>
            </div>
            <div style={{ padding: '0 16px 14px 50px' }}>
              <CheckRow label="미성년 자녀 포함" checked={true} compact />
            </div>
          </div>
        </div>
      </FieldRow>
    </div>
  );
}

const STEP_BODY = [StepBasic, StepInvest, StepAccount, StepFamily];

function StepScreen({ idx }) {
  const Body = STEP_BODY[idx];
  const last = idx === STEPS.length - 1;
  return (
    <div style={{ minHeight: '100%', background: TT.appBg, fontFamily: TT.font, display: 'flex', flexDirection: 'column' }}>
      {/* header + progress on white */}
      <div style={{ background: '#fff', position: 'sticky', top: 0, zIndex: 10, boxShadow: '0 1px 0 ' + TT.line }}>
        <AppBar title="내 절세 전략 찾기" web={true} home={idx === 0} bare={true} />
        <StepProgress idx={idx} />
      </div>

      <StepHeader idx={idx} />

      {/* form area — white with rounded top, fills to bottom */}
      <div style={{ background: '#fff', borderRadius: '24px 24px 0 0', padding: '26px 20px 150px', flex: 1, boxShadow: '0 -1px 0 ' + TT.line }}>
        <Body />
      </div>

      {/* pinned nav */}
      <div style={{ position: 'sticky', bottom: 0, padding: '14px 20px 30px', background: '#fff' }}>
        {last ? (
          <CTAButton>내 절세 전략 보기</CTAButton>
        ) : (
          <div style={{ display: 'flex', gap: 10 }}>
            {idx > 0 && (
              <button style={{
                width: 92, height: 56, flexShrink: 0, borderRadius: 16, cursor: 'pointer',
                background: '#fff', border: `1px solid ${TT.line}`, boxShadow: TT.card,
                fontFamily: TT.font, fontSize: 16, fontWeight: 700, color: TT.ink2, letterSpacing: '-0.02em',
              }}>이전</button>
            )}
            <div style={{ flex: 1 }}><CTAButton>다음</CTAButton></div>
          </div>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { StepScreen, STEPS });
