"use client";

import { AppBar, CTAButton, FixedTopBar } from "@/components";
import {
  formatExpectedBenefit,
  getRecommendResultSnapshot,
  getServerRecommendResultSnapshot,
  subscribeRecommendResult,
} from "@/lib/recommend";
import { motion } from "framer-motion";
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
      <FixedTopBar variant="accent">
        <AppBar title="추천 결과" accent />
      </FixedTopBar>
      <div className={styles.hero}>
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
        {result.combos.map((combo, i) => (
          <motion.div
            key={combo.rank}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: 0.55,
              ease: [0.32, 0.72, 0, 1],
              delay: Math.min(i * 0.08, 0.24),
            }}
          >
            <ComboCard
              combo={combo}
              onClick={() => router.push(`/result/${combo.rank}`)}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
