import * as styles from "./AppBar.css";
import { AppBarBackButton } from "./AppBarBackButton";

interface AppBarProps {
  title?: string;
  /** 진행 단계 표시 (예: 1 / 2) */
  step?: number;
  totalSteps?: number;
  /** hero(파랑) 위에 얹는 투명 바 */
  accent?: boolean;
  /** 뒤로가기 버튼 노출 (홈에서는 false) */
  showBack?: boolean;
  /** 타이틀 크게 (기본: 뒤로가기 없을 때 크게) */
  large?: boolean;
  /** 뒤로가기 동작 커스텀 (미지정 시 router.back()) */
  onBack?: () => void;
}

export function AppBar({
  title = "",
  step,
  totalSteps,
  accent = false,
  showBack = true,
  large,
  onBack,
}: AppBarProps) {
  const kind = accent ? "accent" : "solid";
  const isLarge = large ?? !showBack;

  return (
    <div className={`${styles.barClass} ${styles.bar[kind]}`}>
      <div className={`${styles.inner} ${!showBack ? styles.innerNoBack : ""}`}>
        {showBack && <AppBarBackButton accent={accent} onBack={onBack} />}
        <div
          className={`${styles.title[kind]} ${
            isLarge ? styles.titleSize.large : styles.titleSize.small
          }`}
        >
          {title}
        </div>
        {step != null && totalSteps != null && (
          <div className={styles.step}>
            <span className={styles.stepCurrent}>{step}</span> / {totalSteps}
          </div>
        )}
      </div>
    </div>
  );
}
