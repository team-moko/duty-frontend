import * as styles from "./AccountChip.css";

export type ChipTone = "blue" | "green" | "gray" | "onHero";
export type ChipSize = "sm" | "md";

interface AccountChipProps {
  label: string;
  tone?: ChipTone;
  size?: ChipSize;
}

export function AccountChip({ label, tone = "blue", size = "sm" }: AccountChipProps) {
  return (
    <span className={`${styles.chip} ${styles.tone[tone]} ${styles.size[size]}`}>
      {label}
    </span>
  );
}
