import type { Combo } from "@/api/recommend";
import { AccountChip, ChevronRightIcon, RankBadge } from "@/components";
import { formatExpectedBenefit } from "@/lib/recommend";
import * as styles from "./ComboCard.css";

interface ComboCardProps {
  combo: Combo;
  onClick?: () => void;
}

export function ComboCard({ combo, onClick }: ComboCardProps) {
  const top = combo.rank === 1;
  const variant = top ? "top" : "normal";

  return (
    <button
      type="button"
      className={`${styles.card[variant]}`}
      onClick={onClick}
    >
      {top && (
        <span className={styles.bestBadge}>{combo.label ?? "BEST 추천"}</span>
      )}

      <div className={styles.topRow}>
        <RankBadge n={combo.rank} top={top} />
        <div className={styles.chips}>
          {combo.products.map((product) => (
            <AccountChip
              key={product.rule_id}
              label={product.product}
              tone={top ? "blue" : "gray"}
            />
          ))}
        </div>
        <span className={styles.chevron}>
          <ChevronRightIcon color="#B0B8C1" />
        </span>
      </div>

      <div className={styles.metricRow}>
        {combo.refund_rate_percent === null ? (
          <>
            <div className={styles.metricLeft}>
              <span className={styles.metricLabel}>예상 절세액</span>
              <span
                className={`${styles.amountBaseClass} ${styles.amount[variant]}`}
              >
                {formatExpectedBenefit(combo.expected_annual_refund_krw)}
              </span>
            </div>
            <div className={styles.metricRight}>
              <span className={styles.noContribBadge}>납입 없음</span>
            </div>
          </>
        ) : (
          <>
            <div className={styles.metricLeft}>
              <span className={styles.metricLabel}>예상 환급률</span>
              <div className={styles.rateWrap}>
                <span
                  className={`${styles.rateBaseClass} ${styles.rate[variant]}`}
                >
                  {combo.refund_rate_percent}
                </span>
                <span
                  className={`${styles.pctBaseClass} ${styles.pct[variant]}`}
                >
                  %
                </span>
              </div>
            </div>
            <div className={styles.metricRight}>
              <span className={styles.refundLabel}>연 환급 예상</span>
              <span className={styles.refundValue}>
                {formatExpectedBenefit(combo.expected_annual_refund_krw)}
              </span>
            </div>
          </>
        )}
      </div>

      <div className={`${styles.reasonBaseClass} ${styles.reason[variant]}`}>
        <span className={styles.reasonEmoji}>💡</span>
        <span className={styles.reasonText}>{combo.short_strategy}</span>
      </div>
    </button>
  );
}
