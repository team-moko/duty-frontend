// screen-input.jsx — STEP 1: 정보 입력 페이지
// Exports: ScreenInput

function AssetTabs() {
  const tabs = [
    { k: '저축', on: true,  v: 4000 },
    { k: '투자', on: false, v: 1000 },
    { k: '부동산', on: false, v: null },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', gap: 6, background: TT.fieldBg, border: `1px solid ${TT.line}`, borderRadius: 14, padding: 4 }}>
        {tabs.map(t => (
          <div key={t.k} style={{
            flex: 1, height: 40, borderRadius: 10,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: t.on ? '#fff' : 'transparent',
            boxShadow: t.on ? '0 1px 3px rgba(25,31,40,0.1)' : 'none',
            fontFamily: TT.font, fontSize: 14.5, fontWeight: 700,
            color: t.on ? TT.ink : TT.ink3, letterSpacing: '-0.02em',
          }}>{t.k}</div>
        ))}
      </div>
      <InputBox value={4000} placeholder="0" suffix="만원" align="right" strong />
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontFamily: TT.font, fontSize: 13, fontWeight: 600, color: TT.ink3 }}>입력한 자산</span>
        <div style={{ flex: 1, height: 1, background: TT.line2 }} />
        <span style={{ fontFamily: TT.font, fontSize: 14, fontWeight: 700, color: TT.ink2 }}>저축 4,000 · 투자 1,000만원</span>
      </div>
    </div>
  );
}

function ScreenInput({ web = false }) {
  return (
    <div style={{ minHeight: '100%', background: TT.appBg, fontFamily: TT.font, display: 'flex', flexDirection: 'column' }}>
      <AppBar title="내 절세 전략 찾기" step={1} totalSteps={2} web={web} home={web} />

      {/* intro */}
      <div style={{ padding: '18px 20px' }}>
        <h1 style={{
          margin: 0, fontFamily: TT.font, fontSize: 24, fontWeight: 800,
          color: TT.ink, lineHeight: 1.34, letterSpacing: '-0.03em',
        }}>내 상황을 알려주시면<br/>가장 유리한 절세 조합을<br/>찾아드릴게요</h1>
        <p style={{ margin: '10px 0 0', fontSize: 14.5, fontWeight: 500, color: TT.ink3, lineHeight: 1.5, letterSpacing: '-0.02em' }}>
          입력한 정보는 계산에만 쓰이고 저장되지 않아요.
        </p>
      </div>

      {/* form card */}
      <div style={{
        background: '#fff', borderRadius: '24px 24px 0 0', flex: 1,
        padding: '26px 20px 140px', display: 'flex', flexDirection: 'column', gap: 28,
        boxShadow: '0 -1px 0 ' + TT.line,
      }}>
        <FieldRow label="태어난 해" hint="만 나이로 청년 혜택을 판별해요">
          <InputBox value="1996" placeholder="예) 1996" suffix="년생" />
        </FieldRow>

        <FieldRow label="연봉" hint="세전 총급여 기준">
          <InputBox value={4200} placeholder="0" suffix="만원" align="right" strong />
        </FieldRow>

        <FieldRow label="보유 자산">
          <AssetTabs />
        </FieldRow>

        <div style={{ height: 1, background: TT.line2 }} />

        <FieldRow label="결혼 여부">
          <RadioPill options={['미혼', '기혼']} value="미혼" />
          <div style={{ height: 4 }} />
          <CheckRow label="신혼이에요" sub="혼인신고 후 3년 이하" checked={false} />
        </FieldRow>

        <FieldRow label="부양가족 수" hint="본인 제외, 기본공제 대상">
          <InputBox value="0" placeholder="0" suffix="명" align="right" />
        </FieldRow>

        <FieldRow label="해당사항" hint="추가 비과세 한도가 적용돼요">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <CheckRow label="장애인" checked={false} />
            <CheckRow label="국가유공자" checked={false} />
          </div>
        </FieldRow>
      </div>

      {/* pinned CTA */}
      <div style={{
        position: 'sticky', bottom: 0, padding: '14px 20px 30px',
        background: 'linear-gradient(to top, #fff 72%, rgba(255,255,255,0))',
      }}>
        <CTAButton>내 절세 전략 보기</CTAButton>
      </div>
    </div>
  );
}

window.ScreenInput = ScreenInput;
