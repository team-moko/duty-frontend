import * as styles from "./RankBadge.css";

interface RankBadgeProps {
  n: number;
  top?: boolean;
}

export function RankBadge({ n, top = false }: RankBadgeProps) {
  return (
    <div className={`${styles.badge} ${top ? styles.variant.top : styles.variant.normal}`}>
      {n}
    </div>
  );
}
