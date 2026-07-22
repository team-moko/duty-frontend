import { AppBar } from "@/components/AppBar/AppBar";
import { BottomBar } from "@/components/BottomBar/BottomBar";
import { CTAButton } from "@/components/CTAButton/CTAButton";
import { FixedTopBar } from "@/components/FixedTopBar/FixedTopBar";
import * as styles from "./ScreenResultEmpty.css";

// 확인이 필요한 항목 — 디자인 핸드오프의 REQUIRED_FIELDS 라벨을 그대로 사용.
// rate가 null인 이유를 특정할 수 없으므로 모든 항목을 재확인 대상으로 노출한다.
const CHECK_FIELDS = [
  { key: "salary", label: "연봉", hint: "세전 총급여 기준" },
  { key: "birth", label: "태어난 해", hint: "청년 혜택 판별에 필요" },
  { key: "assets", label: "보유 자산", hint: "저축·투자 금액" },
  { key: "family", label: "부양가족 수", hint: "기본공제 대상" },
];

export function ScreenResultEmpty() {
  return (
    <div className={styles.screen}>
      <FixedTopBar variant="solid">
        <AppBar title="추천 결과" showBack />
      </FixedTopBar>
      <div className={styles.headerSpacer} aria-hidden />

      <div className={styles.body}>
        <div className={styles.hero}>
          <div className={styles.heroIcon}>
            <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
              <circle
                cx="17"
                cy="17"
                r="13"
                stroke="#B0B8C1"
                strokeWidth="2.4"
              />
              <path
                d="M17 11v7"
                stroke="#2F6BF0"
                strokeWidth="2.6"
                strokeLinecap="round"
              />
              <circle cx="17" cy="23" r="1.5" fill="#2F6BF0" />
            </svg>
          </div>
          <h2 className={styles.heroTitle}>
            아직 환급률을
            <br />
            계산할 수 없어요
          </h2>
          <p className={styles.heroDesc}>
            입력하신 정보가 일부 비어 있거나
            <br />
            정확하지 않아 추천 결과를 만들지 못했어요.
          </p>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHead}>
            <span className={styles.cardTitle}>확인이 필요한 항목</span>
            <span className={styles.badge}>{CHECK_FIELDS.length}개</span>
          </div>
          <p className={styles.cardSub}>
            아래 항목을 채우면 바로 결과를 볼 수 있어요.
          </p>
          <div className={styles.list}>
            {CHECK_FIELDS.map((field) => (
              <div key={field.key} className={styles.row}>
                <div className={styles.statusDot}>
                  <span className={styles.dot} />
                </div>
                <div className={styles.rowText}>
                  <span className={styles.rowLabel}>{field.label}</span>
                  <span className={styles.rowHint}>{field.hint}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.notice}>
          <span className={styles.noticeIcon}>ⓘ</span>
          <span className={styles.noticeText}>
            연봉이 0이거나 태어난 해가 비어 있으면 세율·청년 혜택을 판별할 수
            없어 환급률이 계산되지 않아요.
          </span>
        </div>
      </div>

      <BottomBar tone="app">
        <CTAButton href="/start">정보 다시 입력하기</CTAButton>
      </BottomBar>
    </div>
  );
}
