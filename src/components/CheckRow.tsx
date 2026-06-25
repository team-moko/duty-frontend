"use client";

import { CheckIcon } from "./icons";
import * as styles from "./CheckRow.css";

interface CheckRowProps {
  label: string;
  sub?: string;
  checked: boolean;
  onChange?: (checked: boolean) => void;
  /** 테두리·배경 없는 인라인 체크 (기본 false) */
  compact?: boolean;
}

export function CheckRow({ label, sub, checked, onChange, compact = false }: CheckRowProps) {
  const variantClass = compact ? styles.variant.compact : styles.variant.boxed;
  const stateClass = compact ? "" : checked ? styles.state.on : styles.state.off;
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      className={`${styles.row} ${variantClass} ${stateClass}`}
      onClick={() => onChange?.(!checked)}
    >
      <span className={`${styles.box} ${checked ? styles.boxState.on : styles.boxState.off}`}>
        {checked && <CheckIcon />}
      </span>
      <span className={styles.texts}>
        <span className={styles.label}>{label}</span>
        {sub && <span className={styles.sub}>{sub}</span>}
      </span>
    </button>
  );
}
