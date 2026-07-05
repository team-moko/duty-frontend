// screen-input2.jsx — STEP 1 (개선안 v2): 확장된 정보 입력 폼
// 더 나은 UI 제안: 타일형 다중선택 · 세그먼트 컨트롤 · 조건부 인라인 노출 · 섹션 카드
// Exports: WebInput2

/* ── building blocks ───────────────────────────── */

// numbered section card
function SectionCard({ n, title, sub, children }) {
  return (
    <div style={{ background: '#fff', borderRadius: 20, padding: '22px 20px', boxShadow: TT.card, display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
        <div style={{
          width: 26, height: 26, borderRadius: 9, flexShrink: 0,
          background: TT.blueWeak, color: TT.blueDeep,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: TT.font, fontSize: 13, fontWeight: 800,
        }}>{n}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <span style={{ fontFamily: TT.font, fontSize: 16.5, fontWeight: 800, color: TT.ink, letterSpacing: '-0.03em' }}>{title}</span>
          {sub && <span style={{ fontFamily: TT.font, fontSize: 12.5, fontWeight: 500, color: TT.ink3, letterSpacing: '-0.02em' }}>{sub}</span>}
        </div>
      </div>
      {children}
    </div>
  );
}

// segmented control (handles 2~4 options)
function Segmented({ options, value }) {
  return (
    <div style={{ display: 'flex', gap: 6, background: TT.fieldBg, border: `1px solid ${TT.line}`, borderRadius: 14, padding: 4 }}>
      {options.map(opt => {
        const on = opt === value;
        return (
          <div key={opt} style={{
            flex: 1, height: 44, borderRadius: 10,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: on ? '#fff' : 'transparent',
            boxShadow: on ? '0 1px 3px rgba(25,31,40,0.12)' : 'none',
            fontFamily: TT.font, fontSize: 14.5, fontWeight: 700,
            color: on ? TT.blueDeep : TT.ink3, letterSpacing: '-0.02em', cursor: 'pointer',
          }}>{opt}</div>
        );
      })}
    </div>
  );
}

// tappable tile for multi-select (2-col)
function Tile({ label, on, full = false }) {
  return (
    <div style={{
      gridColumn: full ? '1 / -1' : 'auto',
      display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer',
      background: on ? TT.blueWeak2 : TT.fieldBg,
      border: `1.5px solid ${on ? TT.blue : TT.line}`,
      borderRadius: 13, padding: '13px 14px', minHeight: 52,
    }}>
      <div style={{
        width: 21, height: 21, borderRadius: 7, flexShrink: 0,
        background: on ? TT.blue : '#fff', border: `1.5px solid ${on ? TT.blue : TT.line}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {on && <svg width="11" height="9" viewBox="0 0 13 10" fill="none"><path d="M1.5 5l3.2 3.2L11.5 1.5" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg>}
      </div>
      <span style={{ fontFamily: TT.font, fontSize: 14, fontWeight: on ? 700 : 600, color: on ? TT.ink : TT.ink2, letterSpacing: '-0.02em', lineHeight: 1.25 }}>{label}</span>
    </div>
  );
}

// account hold toggle row (with optional revealed body)
function AccountToggle({ label, on, children }) {
  return (
    <div style={{
      background: on ? TT.blueWeak2 : TT.fieldBg,
      border: `1.5px solid ${on ? TT.blue : TT.line}`, borderRadius: 14,
      overflow: 'hidden',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '15px 16px', cursor: 'pointer' }}>
        <div style={{
          width: 22, height: 22, borderRadius: 7, flexShrink: 0,
          background: on ? TT.blue : '#fff', border: `1.5px solid ${on ? TT.blue : TT.line}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {on && <svg width="12" height="9" viewBox="0 0 13 10" fill="none"><path d="M1.5 5l3.2 3.2L11.5 1.5" stroke="#fff" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"/></svg>}
        </div>
        <span style={{ flex: 1, fontFamily: TT.font, fontSize: 15.5, fontWeight: 700, color: TT.ink, letterSpacing: '-0.02em' }}>{label}</span>
      </div>
      {on && children && (
        <div style={{ padding: '0 16px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ height: 1, background: 'rgba(47,107,240,0.14)', marginBottom: 6 }} />
          {children}
        </div>
      )}
    </div>
  );
}

// small label above an input inside a card
function MiniLabel({ children }) {
  return <span style={{ fontFamily: TT.font, fontSize: 13.5, fontWeight: 700, color: TT.ink2, letterSpacing: '-0.02em' }}>{children}</span>;
}

// styled select (dropdown) field — used where options are many/open
function SelectField({ value }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', background: TT.fieldBg,
      border: `1px solid ${TT.line}`, borderRadius: 14, height: 56, padding: '0 16px', cursor: 'pointer',
    }}>
      <span style={{ flex: 1, fontFamily: TT.font, fontSize: 17, fontWeight: 600, color: TT.ink, letterSpacing: '-0.02em' }}>{value}</span>
      <svg width="13" height="8" viewBox="0 0 13 8" fill="none"><path d="M1.5 1.5L6.5 6.5L11.5 1.5" stroke={TT.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
    </div>
  );
}

/* ── screen ───────────────────────────── */

const INVEST_TYPES = [
  { label: '국내 상장주식', on: true },
  { label: '해외주식 (미국 등)', on: true },
  { label: '국내주식형 ETF', on: false },
  { label: '국내 상장 해외지수 ETF', on: false },
  { label: '공모펀드', on: false },
  { label: '예·적금', on: false },
  { label: '채권', on: false },
  { label: '리츠', on: false },
];

function WebInput2() {
  return (
    <div style={{ minHeight: '100%', background: TT.appBg, fontFamily: TT.font, display: 'flex', flexDirection: 'column' }}>
      <AppBar title="내 절세 전략 찾기" step={1} totalSteps={2} web={true} home={true} />

      {/* intro */}
      <div style={{ padding: '18px 20px' }}>
        <h1 style={{ margin: 0, fontFamily: TT.font, fontSize: 24, fontWeight: 800, color: TT.ink, lineHeight: 1.34, letterSpacing: '-0.03em' }}>
          내 투자·소득 상황을<br/>알려주시면 절세 조합을<br/>정확하게 찾아드릴게요
        </h1>
        <p style={{ margin: '10px 0 0', fontSize: 14.5, fontWeight: 500, color: TT.ink3, lineHeight: 1.5, letterSpacing: '-0.02em' }}>
          입력한 정보는 계산에만 쓰이고 저장되지 않아요.
        </p>
      </div>

      {/* sections */}
      <div style={{ padding: '4px 16px 150px', display: 'flex', flexDirection: 'column', gap: 14 }}>

        {/* 1. 기본 정보 */}
        <SectionCard n="1" title="기본 정보">
          <FieldRow label="나이">
            <InputBox value="35" placeholder="0" suffix="세" align="right" />
          </FieldRow>
          <FieldRow label="연봉" hint="세전 총급여 기준">
            <InputBox value={6000} placeholder="0" suffix="만원" align="right" strong />
          </FieldRow>
          <FieldRow label="소득 유형">
            <Segmented options={['직장인', '사업자', '기타']} value="직장인" />
          </FieldRow>
        </SectionCard>

        {/* 2. 투자 현황 */}
        <SectionCard n="2" title="투자 현황">
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
        </SectionCard>

        {/* 3. 절세 계좌 보유 */}
        <SectionCard n="3" title="절세 계좌 보유" sub="이미 가입한 계좌가 있다면 알려주세요">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <AccountToggle label="연금저축 보유" on={true}>
              <MiniLabel>연금저축 연 납입액 (최대 600만원)</MiniLabel>
              <InputBox value="300" placeholder="0" suffix="만원" align="right" />
            </AccountToggle>
            <AccountToggle label="IRP 보유" on={false} />
            <AccountToggle label="ISA 보유" on={false} />
          </div>
        </SectionCard>

        {/* 4. 소득·가족 */}
        <SectionCard n="4" title="소득·가족">
          <FieldRow label="연 금융소득" hint="이자 + 배당 합산">
            <InputBox value="80" placeholder="0" suffix="만원" align="right" />
          </FieldRow>
          <FieldRow label="연 배당소득">
            <InputBox value="30" placeholder="0" suffix="만원" align="right" />
          </FieldRow>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <CheckRow label="고배당주 보유" checked={false} />
            <CheckRow label="배우자 있음" checked={true} />
            {/* 자녀 — 켜면 미성년 포함이 인라인으로 펼쳐짐 */}
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
        </SectionCard>
      </div>

      {/* pinned CTA */}
      <div style={{ position: 'sticky', bottom: 0, padding: '14px 20px 30px', background: 'linear-gradient(to top, ' + TT.appBg + ' 72%, rgba(242,244,246,0))' }}>
        <CTAButton>내 절세 전략 보기</CTAButton>
      </div>
    </div>
  );
}

window.WebInput2 = WebInput2;
Object.assign(window, { SectionCard, Segmented, Tile, AccountToggle, MiniLabel, SelectField, INVEST_TYPES });
