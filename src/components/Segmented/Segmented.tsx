"use client";

import * as styles from "./Segmented.css";

interface SegmentedProps<T extends string> {
  options: readonly T[];
  value: T;
  onChange?: (value: T) => void;
}

export function Segmented<T extends string>({ options, value, onChange }: SegmentedProps<T>) {
  return (
    <div className={styles.track} role="tablist">
      {options.map((opt) => {
        const on = opt === value;
        return (
          <button
            key={opt}
            type="button"
            role="tab"
            aria-selected={on}
            className={`${styles.tab} ${on ? styles.state.on : styles.state.off}`}
            onClick={() => onChange?.(opt)}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}
