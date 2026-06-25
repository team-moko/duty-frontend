import type { ReactNode } from "react";
import { ShareIcon } from "../icons";
import * as styles from "./BottomBar.css";

interface BottomBarProps {
  children: ReactNode;
  /** 그라데이션 페이드 배경색 (흰 화면: white / 회색 화면: app) */
  tone?: "white" | "app";
  /** 좌측 공유 아이콘 버튼 노출 */
  onShare?: () => void;
}

export function BottomBar({ children, tone = "white", onShare }: BottomBarProps) {
  return (
    <div className={`${styles.bar} ${styles.tone[tone]}`}>
      {onShare && (
        <button type="button" className={styles.shareBtn} aria-label="공유하기" onClick={onShare}>
          <ShareIcon />
        </button>
      )}
      <div className={styles.cta}>{children}</div>
    </div>
  );
}
