import { AccountChip, RankBadge, ChevronRightIcon } from "@/components";
import { won } from "@/lib/format";
import type { Combo } from "@/data/combos";
import * as styles from "./ComboCard.css";

interface ComboCardProps {
  combo: Combo;
  onClick?: () => void;
}

export function ComboCard({ combo, onClick }: ComboCardProps) {
  const top = combo.n === 1;
  const variant = top ? "top" : "normal";

  return (
    <button type="button" className={`${styles.card[variant]}`} onClick={onClick}>
      {top && <span className={styles.bestBadge}>BEST 추천</span>}

      <div className={styles.topRow}>
        <RankBadge n={combo.n} top={top} />
        <div className={styles.chips}>
          {combo.chips.map((c) => (
            <AccountChip key={c} label={c} tone={top ? "blue" : "gray"} />
          ))}
        </div>
        <span className={styles.chevron}>
          <ChevronRightIcon color="#B0B8C1" />
        </span>
      </div>

      <div className={styles.metricRow}>
        <div className={styles.metricLeft}>
          <span className={styles.metricLabel}>예상 환급률</span>
          <div className={styles.rateWrap}>
            <span className={`${styles.rateBaseClass} ${styles.rate[variant]}`}>{combo.rate}</span>
            <span className={`${styles.pctBaseClass} ${styles.pct[variant]}`}>%</span>
          </div>
        </div>
        <div className={styles.metricRight}>
          <span className={styles.refundLabel}>연 환급 예상</span>
          <span className={styles.refundValue}>약 {won(combo.refund)}만원</span>
        </div>
      </div>

      <div className={`${styles.reasonBaseClass} ${styles.reason[variant]}`}>
        <span className={styles.reasonEmoji}>💡</span>
        <span className={styles.reasonText}>{combo.reason}</span>
      </div>
    </button>
  );
}
