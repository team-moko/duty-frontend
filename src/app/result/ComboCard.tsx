import type { Combo } from "@/api/recommend";
import { AccountChip } from "@/components/AccountChip/AccountChip";
import { ChevronRightIcon } from "@/components/icons";
import { RankBadge } from "@/components/RankBadge/RankBadge";
import { formatExpectedBenefit } from "@/lib/recommend";
import Link from "next/link";
import * as styles from "./ComboCard.css";

interface ComboCardProps {
  combo: Combo;
  href: string;
}

export function ComboCard({ combo, href }: ComboCardProps) {
  const top = combo.rank === 1;
  const variant = top ? "top" : "normal";

  return (
    <Link href={href} className={`${styles.card[variant]}`}>
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
              <span className={styles.metricLabel}>
                {combo.expected_annual_refund_krw > 0
                  ? "예상 절세액"
                  : "절세 효과"}
              </span>
              <span
                className={`${styles.amountBaseClass} ${styles.amount[variant]}`}
              >
                {combo.expected_annual_refund_krw > 0
                  ? formatExpectedBenefit(combo.expected_annual_refund_krw)
                  : "개별 확인 필요"}
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
    </Link>
  );
}
