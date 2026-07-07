import type { ComboResponse } from "@/api/recommend";
import { AppBar } from "@/components/AppBar/AppBar";
import { FixedTopBar } from "@/components/FixedTopBar/FixedTopBar";
import { formatExpectedBenefit } from "@/lib/recommend";
import { ComboCard } from "./ComboCard";
import * as styles from "./ScreenResult.css";
import { ScreenResultEmpty } from "./ScreenResultEmpty";

export function ScreenResult({ result }: { result: ComboResponse }) {
  // 적용 가능한 조합이 하나도 없을 때만 폴백 화면.
  // 환급률 null은 "납입 없는 절세 전략"(손익통산 등)일 수 있어 계산 실패로 단정하면 안 된다.
  if (result.header.applicable_combo_count === 0) {
    return <ScreenResultEmpty />;
  }

  // 납입이 없는 전략은 환급률(%) 개념이 성립하지 않아 절세액(원) 중심으로 보여준다.
  const noContribution = result.header.max_refund_rate_percent === null;
  // 절세액까지 0이면 수치화 불가한 안내형 전략(종합과세 관리 등) — 관리 포인트 중심으로 보여준다.
  const advisory = noContribution && result.header.max_annual_refund_krw === 0;
  const advisoryPointCount = result.combos[0]?.details.length ?? 0;

  return (
    <div className={styles.screen}>
      <FixedTopBar variant="accent">
        <AppBar title="추천 결과" accent />
      </FixedTopBar>
      <div className={styles.hero}>
        <div className={styles.heroBody}>
          <p className={styles.persona}>{result.profile_summary}</p>
          {advisory ? (
            <>
              <p className={styles.lead}>세금이 늘어나기 전에</p>
              <div className={styles.bigRateWrap}>
                <span className={styles.bigRate}>{advisoryPointCount}</span>
                <span className={styles.bigPct}>개</span>
              </div>
              <p className={styles.heroSub}>관리 포인트를 확인하세요</p>
              <div className={styles.pill}>
                <span className={styles.pillStrong}>납입 없이 관리 가능</span>
                <span className={styles.pillDot} />
                <span className={styles.pillMuted}>
                  {result.header.applicable_combo_count}개 조합
                </span>
              </div>
            </>
          ) : noContribution ? (
            <>
              <p className={styles.lead}>지금 실행하면 연 최대</p>
              <div className={styles.bigRateWrap}>
                <span className={styles.bigAmount}>
                  {formatExpectedBenefit(result.header.max_annual_refund_krw)}
                </span>
              </div>
              <p className={styles.heroSub}>절세할 수 있어요</p>
              <div className={styles.pill}>
                <span className={styles.pillStrong}>납입 없이 실행 가능</span>
                <span className={styles.pillDot} />
                <span className={styles.pillMuted}>
                  {result.header.applicable_combo_count}개 조합
                </span>
              </div>
            </>
          ) : (
            <>
              <p className={styles.lead}>지금 가입하면 최대</p>
              <div className={styles.bigRateWrap}>
                <span className={styles.bigRate}>
                  {result.header.max_refund_rate_percent}
                </span>
                <span className={styles.bigPct}>%</span>
              </div>
              <p className={styles.heroSub}>환급받을 수 있어요</p>
              <div className={styles.pill}>
                <span className={styles.pillStrong}>
                  연 최대{" "}
                  {formatExpectedBenefit(result.header.max_annual_refund_krw)}
                </span>
                <span className={styles.pillDot} />
                <span className={styles.pillMuted}>
                  가입 가능 {result.header.applicable_combo_count}개 조합
                </span>
              </div>
            </>
          )}
        </div>
      </div>

      <div className={styles.list}>
        <div className={styles.listHeader}>
          <h2 className={styles.listTitle}>유리한 조합 순위</h2>
          <span className={styles.listHint}>
            {advisory
              ? "추천 순"
              : noContribution
                ? "절세액 높은 순"
                : "환급률 높은 순"}
          </span>
        </div>
        {result.combos.map((combo, i) => (
          <div
            key={combo.rank}
            className={styles.reveal}
            style={{
              animationDelay: `${Math.min(i * 80, 240)}ms`,
            }}
          >
            <ComboCard combo={combo} href={`/result/${combo.rank}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
