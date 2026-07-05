"use client";

import { AccountChip, AppBar, CTAButton } from "@/components";
import { getTaxType } from "@/lib/taxType";
import { useRouter } from "next/navigation";
import * as styles from "./share.css";

const SHARE_BENEFITS = [
  {
    emoji: "⏱️",
    title: "30초면 끝",
    desc: "나이·연봉만 입력하면 바로 결과가 나와요",
  },
  {
    emoji: "🎯",
    title: "내 조건에 딱 맞게",
    desc: "내 소득 구간에 유리한 계좌 조합만 추천",
  },
  {
    emoji: "💸",
    title: "연 환급액까지 계산",
    desc: "얼마를 돌려받을 수 있는지 금액으로 확인",
  },
];

interface ScreenShareProps {
  rate: number;
  combos: string[];
  strategy: string;
}

export function ScreenShare({ rate, combos, strategy }: ScreenShareProps) {
  const router = useRouter();
  const type = getTaxType(rate);

  return (
    <div className={styles.screen}>
      {/* 공유 카드 (티켓 메타포) */}
      <div className={styles.cardWrap}>
        <div className={styles.card}>
          {/* 상단 — 절세 유형 */}
          <div className={styles.typeSection}>
            <div className={styles.typeEmoji}>{type.emoji}</div>
            <p className={styles.typeName}>{type.name}</p>
            <p className={styles.typeTagline}>“{type.tagline}”</p>
            <div className={styles.keywords}>
              {type.keywords.map((keyword) => (
                <span key={keyword} className={styles.keyword}>
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          {/* 티켓 절취선 */}
          <div className={styles.perforation}>
            <div className={styles.notchLeft} />
            <div className={styles.notchRight} />
            <div className={styles.dash} />
          </div>

          {/* 중단 — 지표 */}
          <div className={styles.metricSection}>
            <p className={styles.metricLead}>계좌를 잘 조합하면</p>
            <div className={styles.rateWrap}>
              <span className={styles.rate}>{rate}</span>
              <span className={styles.ratePct}>%</span>
            </div>
            <p className={styles.metricTail}>까지 돌려받을 수 있어요</p>
            <p className={styles.metricCaption}>납입액 대비 예상 환급률 기준</p>
          </div>

          {/* 하단 — 조합 */}
          <div className={styles.comboSection}>
            <span className={styles.comboLabel}>추천받은 계좌 조합</span>
            <div className={styles.comboChips}>
              {combos.map((combo) => (
                <AccountChip key={combo} label={combo} tone="blue" size="md" />
              ))}
            </div>
            <div className={styles.insight}>
              <span className={styles.insightIcon}>💡</span>
              <span className={styles.insightText}>{strategy}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 전환 훅 */}
      <div className={styles.hook}>
        <p className={styles.hookTitle}>
          그럼 <span className={styles.hookAccent}>나는</span> 얼마나
          <br />
          돌려받을 수 있을까요?
        </p>
        <p className={styles.hookSub}>
          사람마다 유리한 전략이 달라요.
          <br />내 조건으로 30초 만에 확인해보세요.
        </p>
      </div>

      {/* 혜택 3줄 */}
      <div className={styles.benefitsWrap}>
        <div className={styles.benefits}>
          {SHARE_BENEFITS.map((benefit) => (
            <div key={benefit.title} className={styles.benefitRow}>
              <div className={styles.benefitIcon}>{benefit.emoji}</div>
              <div className={styles.benefitBody}>
                <span className={styles.benefitTitle}>{benefit.title}</span>
                <span className={styles.benefitDesc}>{benefit.desc}</span>
              </div>
            </div>
          ))}
        </div>
        <p className={styles.benefitCaption}>
          가입·로그인 없이 바로 결과를 볼 수 있어요
        </p>
      </div>

      <div className={styles.spacer} />

      {/* 고정 CTA — 유입 진입점 */}
      <div className={styles.ctaBar}>
        <CTAButton sub="30초면 충분해요" onClick={() => router.push("/")}>
          내 절세 전략 보러가기
        </CTAButton>
      </div>
    </div>
  );
}
