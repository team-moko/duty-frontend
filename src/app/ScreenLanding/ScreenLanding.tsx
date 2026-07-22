import { AccountChip, AppBar, BottomBar, CTAButton } from "@/components";
import { vars } from "@/styles/theme.css";
import type { ReactNode } from "react";
import * as styles from "./ScreenLanding.css";

const ICON_COLOR = vars.color.blue;

const FEATURES: { title: string; desc: string; icon: ReactNode }[] = [
  {
    title: "30초면 충분해요",
    desc: "나이·연봉 몇 가지만 고르면 끝. 복잡한 서류도, 로그인도 필요 없어요.",
    icon: (
      <>
        <circle cx="12" cy="12.5" r="8" stroke={ICON_COLOR} strokeWidth="1.8" />
        <path
          d="M12 8.5v4l2.6 1.8"
          stroke={ICON_COLOR}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M9 3.2h6" stroke={ICON_COLOR} strokeWidth="1.8" strokeLinecap="round" />
      </>
    ),
  },
  {
    title: "내 조건에 딱 맞게",
    desc: "내 소득 구간에서 가장 유리한 절세 계좌 조합만 골라서 추천해요.",
    icon: (
      <>
        <circle cx="12" cy="12" r="8.2" stroke={ICON_COLOR} strokeWidth="1.8" />
        <circle cx="12" cy="12" r="4.4" stroke={ICON_COLOR} strokeWidth="1.8" />
        <circle cx="12" cy="12" r="1.1" fill={ICON_COLOR} />
      </>
    ),
  },
  {
    title: "환급액까지 숫자로",
    desc: "얼마를 더 돌려받을 수 있는지 예상 금액과 환급률로 바로 보여드려요.",
    icon: (
      <path
        d="M4 19V9m5 10V5m5 14v-7m5 7V8"
        stroke={ICON_COLOR}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    ),
  },
];

const STEPS = [
  { n: "01", t: "기본 정보 입력", d: "나이·연봉·투자 현황" },
  { n: "02", t: "맞춤 분석", d: "유리한 계좌 조합 계산" },
  { n: "03", t: "전략 확인", d: "예상 환급액·추천 순위" },
];

export function ScreenLanding() {
  return (
    <div className={styles.screen}>
      <div className={styles.header}>
        <AppBar title="절세" showBack={false} />
      </div>

      {/* 히어로 */}
      <div className={styles.hero}>
        <span className={styles.badge}>
          <span className={styles.badgeDot} />
          가입 없이 · 무료로
        </span>

        <h1 className={styles.headline}>
          몰라서 못 받던 세금,
          <br />
          <span className={styles.headlineAccent}>30초</span>면 찾아드려요
        </h1>
        <p className={styles.subcopy}>
          복잡한 절세, 이제 계산기 두드리지 마세요. 몇 가지만 고르면 내게 가장 유리한 전략을
          바로 알려드려요.
        </p>

        {/* 미리보기 스탯 카드 */}
        <div className={styles.statCard}>
          <div className={styles.statCol}>
            <div className={styles.statCaption}>예상 추가 환급액</div>
            {/* +84만원은 개인 결과가 아닌 예시용 플레이스홀더 값이다. (README Content Notes) */}
            <div className={styles.statValue}>
              +84<span className={styles.statUnit}>만원</span>
            </div>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.statCol}>
            <div className={styles.statCaption}>추천 계좌 조합</div>
            <div className={styles.statChips}>
              <AccountChip label="연금저축" tone="blue" size="sm" />
              <AccountChip label="IRP" tone="blue" size="sm" />
            </div>
          </div>
        </div>
      </div>

      {/* 특징 3줄 */}
      <div className={styles.features}>
        {FEATURES.map((f) => (
          <div key={f.title} className={styles.featureRow}>
            <div className={styles.featureIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                {f.icon}
              </svg>
            </div>
            <div className={styles.featureBody}>
              <div className={styles.featureTitle}>{f.title}</div>
              <div className={styles.featureDesc}>{f.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* 진행 방식 3스텝 */}
      <div className={styles.steps}>
        <div className={styles.stepsCard}>
          <div className={styles.stepsLabel}>이렇게 진행돼요</div>
          {STEPS.map((s, i) => {
            const isLast = i === STEPS.length - 1;
            return (
              <div
                key={s.n}
                className={`${styles.stepRow} ${isLast ? styles.stepRowLast : ""}`}
              >
                <div className={styles.stepMarker}>
                  <div className={styles.stepNumber}>{s.n}</div>
                  {!isLast && <div className={styles.stepConnector} />}
                </div>
                <div className={styles.stepBody}>
                  <div className={styles.stepTitle}>{s.t}</div>
                  <div className={styles.stepDesc}>{s.d}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 신뢰 라인 */}
      <div className={styles.trust}>
        <p className={styles.trustText}>
          입력한 정보는 저장되지 않아요. 계산에만 쓰이고 바로 사라집니다.
        </p>
      </div>

      {/* 하단 고정 CTA — 뷰포트 하단 고정 */}
      <BottomBar tone="white">
        <CTAButton href="/start" sub="30초면 끝나요 · 가입 불필요">
          내 절세 전략 찾기
        </CTAButton>
      </BottomBar>
    </div>
  );
}
