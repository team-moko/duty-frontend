"use client";

import { AppBar, BottomBar, CTAButton } from "@/components";
import {
  formatExpectedBenefit,
  getRecommendResultSnapshot,
  getServerRecommendResultSnapshot,
  subscribeRecommendResult,
} from "@/lib/recommend";
import { useRouter } from "next/navigation";
import { useSyncExternalStore } from "react";
import { ComboCard } from "./ComboCard";
import * as styles from "./result.css";

export default function ScreenResult() {
  const router = useRouter();
  const result = useSyncExternalStore(
    subscribeRecommendResult,
    getRecommendResultSnapshot,
    getServerRecommendResultSnapshot,
  );

  // TODO(공유): 카카오톡 공유 SDK 연동 예정. 현재는 Web Share API 폴백.
  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      navigator
        .share({ title: "내 절세 전략", text: "내 절세 전략을 확인해 보세요." })
        .catch(() => {});
    }
  };

  if (!result) {
    return (
      <div className={styles.screen}>
        <AppBar title="추천 결과" accent />
        <div className={styles.empty}>
          <p className={styles.loading}>저장된 추천 결과가 없어요.</p>
          <CTAButton onClick={() => router.replace("/")}>
            정보 입력하러 가기
          </CTAButton>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.screen}>
      <div className={styles.hero}>
        <AppBar title="추천 결과" accent />
        <div className={styles.heroBody}>
          <p className={styles.persona}>{result.profile_summary}</p>
          <p className={styles.lead}>지금 가입하면 최대</p>
          <div className={styles.bigRateWrap}>
            <span className={styles.bigRate}>
              {result.header.max_refund_rate_percent ?? "-"}
            </span>
            {result.header.max_refund_rate_percent !== null && (
              <span className={styles.bigPct}>%</span>
            )}
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
        </div>
      </div>

      <div className={styles.list}>
        <div className={styles.listHeader}>
          <h2 className={styles.listTitle}>유리한 조합 순위</h2>
          <span className={styles.listHint}>환급률 높은 순</span>
        </div>
        {result.combos.map((combo) => (
          <ComboCard
            key={combo.rank}
            combo={combo}
            onClick={() => router.push(`/result/${combo.rank}`)}
          />
        ))}
      </div>

      <BottomBar tone="app" onShare={handleShare}>
        <CTAButton onClick={handleShare}>내 절세 전략 공유하기</CTAButton>
      </BottomBar>
    </div>
  );
}
