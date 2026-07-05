"use client";

import type { Combo } from "@/api/recommend";
import { AccountChip, AppBar, BottomBar, CTAButton, ShareIcon } from "@/components";
import { buildShareUrl } from "@/lib/share";
import {
  formatExpectedBenefit,
  getRecommendResultSnapshot,
  getServerRecommendResultSnapshot,
  subscribeRecommendResult,
} from "@/lib/recommend";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useSyncExternalStore, type ReactNode } from "react";
import * as styles from "./detail.css";

function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: [0.32, 0.72, 0, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

function SectionTitle({ children, sub }: { children: string; sub?: string }) {
  return (
    <div className={styles.sectionTitle}>
      <h3 className={styles.sectionHeading}>{children}</h3>
      {sub && <span className={styles.sectionSub}>{sub}</span>}
    </div>
  );
}

function formatContribution(value: number | null): string {
  if (value === null) return "금액 확인 필요";
  return `연 ${Math.round(value / 10_000).toLocaleString("ko-KR")}만원`;
}

function PriorityList({ combo }: { combo: Combo }) {
  const details = [...combo.details].sort((a, b) => a.priority - b.priority);

  return (
    <div className={`${styles.card} ${styles.cardFirst}`}>
      <SectionTitle sub="이 순서대로 채우면 환급이 가장 커요">
        납입 우선순위
      </SectionTitle>
      <div className={styles.priorityList}>
        {details.map((item, index) => {
          const last = index === details.length - 1;
          return (
            <div key={item.rule_id} className={styles.step}>
              <div className={styles.rail}>
                <div className={styles.railDot}>{item.priority}</div>
                {!last && <div className={styles.railLine} />}
              </div>
              <div
                className={`${styles.stepBody} ${last ? "" : styles.stepBodyGap}`}
              >
                <div className={styles.stepHead}>
                  <span className={styles.stepAcc}>{item.product}</span>
                  <span className={styles.stepAmt}>
                    {formatContribution(item.recommended_contribution_krw)}
                  </span>
                </div>
                <p className={styles.stepDesc}>{item.priority_hint}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function EffectCard({ combo }: { combo: Combo }) {
  const { assumptions } = combo.long_term_projection;

  return (
    <div className={styles.card}>
      <SectionTitle sub="이 조합으로 받는 혜택을 나눠봤어요">
        절세 효과
      </SectionTitle>
      <div className={styles.effectCol}>
        {combo.details.map((item) => {
          const tone = item.category === "세액공제" ? "blue" : "green";
          return (
            <div
              key={item.rule_id}
              className={`${styles.effectBoxBaseClass} ${styles.effectBox[tone]}`}
            >
              <div className={styles.effectHead}>
                <span className={styles.effectLabel}>{item.product}</span>
                <span
                  className={`${styles.effectValueBaseClass} ${styles.effectValue[tone]}`}
                >
                  {formatExpectedBenefit(item.expected_benefit_krw)}
                </span>
              </div>
              <span className={styles.effectNote}>{item.action}</span>
            </div>
          );
        })}
      </div>
      <div className={styles.afterTax}>
        <div className={styles.afterTaxLeft}>
          <span className={styles.afterTaxLabel}>
            {assumptions.horizon_years}년 세후 기대수익
          </span>
          <span className={styles.afterTaxNote}>
            연 {assumptions.assumed_return_rate_percent}% 수익률 가정
          </span>
        </div>
        <span className={styles.afterTaxValue}>
          {formatExpectedBenefit(combo.long_term_projection.gain_krw)}
        </span>
      </div>
    </div>
  );
}

function ReasonsCard({ combo }: { combo: Combo }) {
  const warnings = combo.details
    .map((item) => item.warning)
    .filter((warning) => warning !== null);

  return (
    <div className={styles.card}>
      <SectionTitle>왜 이 조합이 유리할까요?</SectionTitle>
      <div className={styles.reasonList}>
        {combo.justifications.map((reason, index) => (
          <div key={reason} className={styles.reasonItem}>
            <div className={styles.reasonNum}>{index + 1}</div>
            <p className={styles.reasonText}>{reason}</p>
          </div>
        ))}
      </div>
      {warnings.map((warning) => (
        <div key={warning} className={styles.disclaimer}>
          <span className={styles.disclaimerIcon}>ⓘ</span>
          <span className={styles.disclaimerText}>{warning}</span>
        </div>
      ))}
      <div className={styles.disclaimer}>
        <span className={styles.disclaimerIcon}>ⓘ</span>
        <span className={styles.disclaimerText}>
          {combo.long_term_projection.assumptions.note}
        </span>
      </div>
    </div>
  );
}

export function ComboDetail({ rank }: { rank: number }) {
  const router = useRouter();
  const result = useSyncExternalStore(
    subscribeRecommendResult,
    getRecommendResultSnapshot,
    getServerRecommendResultSnapshot,
  );
  const combo = result?.combos.find((combo) => combo.rank === rank) ?? null;

  // TODO(공유): 카카오톡 공유 SDK 연동 예정. 현재는 Web Share API 폴백.
  // text는 넘기지 않는다 — 일부 공유 대상이 url 뒤에 text를 이어붙여
  // 랜딩 URL의 combos 파라미터를 오염시키기 때문. 링크(url)만 공유한다.
  const handleShare = () => {
    if (!combo || typeof navigator === "undefined" || !navigator.share) return;
    navigator
      .share({
        title: "내 절세 전략",
        url: buildShareUrl(combo),
      })
      .catch(() => {});
  };

  if (!combo) {
    return (
      <div className={styles.screen}>
        <AppBar accent />
        <div className={`${styles.card} ${styles.cardFirst}`}>
          <SectionTitle>추천 결과를 찾을 수 없어요</SectionTitle>
          <CTAButton onClick={() => router.replace("/result")}>
            추천 결과로 돌아가기
          </CTAButton>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.screen}>
      <div className={styles.hero}>
        <AppBar accent />
        <div className={styles.heroBody}>
          <span className={styles.rankPill}>
            {combo.rank}위{combo.label ? ` · ${combo.label}` : ""}
          </span>
          <div className={styles.heroChips}>
            {combo.products.map((product) => (
              <AccountChip
                key={product.rule_id}
                label={product.product}
                tone="onHero"
                size="md"
              />
            ))}
          </div>
          <div className={styles.heroMetric}>
            <div>
              <span className={styles.heroMetricLabel}>예상 환급률</span>
              <div className={styles.heroRateWrap}>
                <span className={styles.heroRate}>
                  {combo.refund_rate_percent ?? "-"}
                </span>
                {combo.refund_rate_percent !== null && (
                  <span className={styles.heroPct}>%</span>
                )}
              </div>
            </div>
            <div className={styles.heroRefundCol}>
              <span className={styles.heroMetricLabel}>연 환급 예상</span>
              <span className={styles.heroRefund}>
                {formatExpectedBenefit(combo.expected_annual_refund_krw)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.body}>
        <Reveal>
          <PriorityList combo={combo} />
        </Reveal>
        <Reveal delay={0.08}>
          <EffectCard combo={combo} />
        </Reveal>
        <Reveal delay={0.16}>
          <ReasonsCard combo={combo} />
        </Reveal>
      </div>

      <BottomBar tone="app">
        <button
          type="button"
          className={styles.shareButton}
          onClick={handleShare}
        >
          <ShareIcon color="#4E5968" />
          공유하기
        </button>
      </BottomBar>
    </div>
  );
}
