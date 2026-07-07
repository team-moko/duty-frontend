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
import { ScreenResultEmpty } from "./ScreenResultEmpty";
import * as styles from "./ScreenResult.css";

export function ScreenResult() {
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
