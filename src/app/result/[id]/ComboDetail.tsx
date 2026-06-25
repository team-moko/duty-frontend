"use client";

import { AppBar, CTAButton, AccountChip, BottomBar } from "@/components";
import { won } from "@/lib/format";
import type { Combo, ComboDetail as ComboDetailData } from "@/data/combos";
import * as styles from "./detail.css";

function SectionTitle({ children, sub }: { children: string; sub?: string }) {
  return (
    <div className={styles.sectionTitle}>
      <h3 className={styles.sectionHeading}>{children}</h3>
      {sub && <span className={styles.sectionSub}>{sub}</span>}
    </div>
  );
}

function PriorityList({ detail }: { detail: ComboDetailData }) {
  return (
    <div className={styles.card + " " + styles.cardFirst}>
      <SectionTitle sub="이 순서대로 채우면 환급이 가장 커요">납입 우선순위</SectionTitle>
      <div className={styles.priorityList}>
        {detail.priority.map((item, i) => {
          const last = i === detail.priority.length - 1;
          return (
            <div key={item.acc} className={styles.step}>
              <div className={styles.rail}>
                <div className={styles.railDot}>{i + 1}</div>
                {!last && <div className={styles.railLine} />}
              </div>
              <div className={`${styles.stepBody} ${last ? "" : styles.stepBodyGap}`}>
                <div className={styles.stepHead}>
                  <span className={styles.stepAcc}>{item.acc}</span>
                  <span className={styles.stepAmt}>{item.amt}</span>
                </div>
                <p className={styles.stepDesc}>{item.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function EffectCard({ detail }: { detail: ComboDetailData }) {
  return (
    <div className={styles.card}>
      <SectionTitle sub="이 조합으로 받는 혜택을 나눠봤어요">절세 효과</SectionTitle>
      <div className={styles.effectCol}>
        {detail.effect.map((e) => (
          <div key={e.label} className={`${styles.effectBoxBaseClass} ${styles.effectBox[e.tone]}`}>
            <div className={styles.effectHead}>
              <span className={styles.effectLabel}>{e.label}</span>
              <span className={`${styles.effectValueBaseClass} ${styles.effectValue[e.tone]}`}>
                {e.value}
              </span>
            </div>
            <span className={styles.effectNote}>{e.note}</span>
          </div>
        ))}
      </div>
      <div className={styles.afterTax}>
        <div className={styles.afterTaxLeft}>
          <span className={styles.afterTaxLabel}>10년 세후 기대수익</span>
          <span className={styles.afterTaxNote}>{detail.afterTax.note}</span>
        </div>
        <span className={styles.afterTaxValue}>{detail.afterTax.value}</span>
      </div>
    </div>
  );
}

function ReasonsCard({ detail }: { detail: ComboDetailData }) {
  return (
    <div className={styles.card}>
      <SectionTitle>왜 이 조합이 유리할까요?</SectionTitle>
      <div className={styles.reasonList}>
        {detail.reasons.map((r, i) => (
          <div key={i} className={styles.reasonItem}>
            <div className={styles.reasonNum}>{i + 1}</div>
            <p className={styles.reasonText}>{r}</p>
          </div>
        ))}
      </div>
      <div className={styles.disclaimer}>
        <span className={styles.disclaimerIcon}>ⓘ</span>
        <span className={styles.disclaimerText}>{detail.disclaimer}</span>
      </div>
    </div>
  );
}

export function ComboDetail({ combo }: { combo: Combo }) {
  const top = combo.n === 1;
  const detail = combo.detail;

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      navigator.share({ title: "내 절세 전략", text: "내 절세 전략을 확인해 보세요." }).catch(() => {});
    }
  };

  return (
    <div className={styles.screen}>
      <div className={styles.hero}>
        <AppBar accent />
        <div className={styles.heroBody}>
          <span className={styles.rankPill}>
            {combo.n}위{top ? " · BEST 추천" : ""}
          </span>
          <div className={styles.heroChips}>
            {combo.chips.map((c) => (
              <AccountChip key={c} label={c} tone="onHero" size="md" />
            ))}
          </div>
          <div className={styles.heroMetric}>
            <div>
              <span className={styles.heroMetricLabel}>예상 환급률</span>
              <div className={styles.heroRateWrap}>
                <span className={styles.heroRate}>{combo.rate}</span>
                <span className={styles.heroPct}>%</span>
              </div>
            </div>
            <div className={styles.heroRefundCol}>
              <span className={styles.heroMetricLabel}>연 환급 예상</span>
              <span className={styles.heroRefund}>약 {won(combo.refund)}만원</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.body}>
        {detail ? (
          <>
            <PriorityList detail={detail} />
            <EffectCard detail={detail} />
            <ReasonsCard detail={detail} />
          </>
        ) : (
          <div className={styles.card + " " + styles.cardFirst}>
            <SectionTitle sub="선택한 조합의 상세 분석은 준비 중이에요">조합 상세</SectionTitle>
            <p className={styles.stepDesc}>{combo.reason}</p>
          </div>
        )}
      </div>

      <BottomBar tone="app" onShare={handleShare}>
        <CTAButton variant="blue" onClick={handleShare}>
          이 전략으로 시작하기
        </CTAButton>
      </BottomBar>
    </div>
  );
}
