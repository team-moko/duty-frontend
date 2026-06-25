"use client";

import { useRouter } from "next/navigation";
import { AppBar, CTAButton, BottomBar } from "@/components";
import { won } from "@/lib/format";
import { COMBOS, MAX_RATE, MAX_REFUND } from "@/data/combos";
import { ComboCard } from "./ComboCard";
import * as styles from "./result.css";

export default function ScreenResult() {
  const router = useRouter();

  // TODO(공유): 카카오톡 공유 SDK 연동 예정. 현재는 Web Share API 폴백.
  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      navigator.share({ title: "내 절세 전략", text: "내 절세 전략을 확인해 보세요." }).catch(() => {});
    }
  };

  return (
    <div className={styles.screen}>
      <div className={styles.hero}>
        <AppBar title="추천 결과" accent />
        <div className={styles.heroBody}>
          <p className={styles.persona}>29세 · 연봉 4,200만원 기준</p>
          <p className={styles.lead}>지금 가입하면 최대</p>
          <div className={styles.bigRateWrap}>
            <span className={styles.bigRate}>{MAX_RATE}</span>
            <span className={styles.bigPct}>%</span>
          </div>
          <p className={styles.heroSub}>환급받을 수 있어요</p>
          <div className={styles.pill}>
            <span className={styles.pillStrong}>연 최대 약 {won(MAX_REFUND)}만원</span>
            <span className={styles.pillDot} />
            <span className={styles.pillMuted}>가입 가능 {COMBOS.length}개 조합</span>
          </div>
        </div>
      </div>

      <div className={styles.list}>
        <div className={styles.listHeader}>
          <h2 className={styles.listTitle}>유리한 조합 순위</h2>
          <span className={styles.listHint}>환급률 높은 순</span>
        </div>
        {COMBOS.map((combo) => (
          <ComboCard
            key={combo.n}
            combo={combo}
            onClick={() => router.push(`/result/${combo.n}`)}
          />
        ))}
      </div>

      <BottomBar tone="app" onShare={handleShare}>
        <CTAButton onClick={handleShare}>내 절세 전략 공유하기</CTAButton>
      </BottomBar>
    </div>
  );
}
