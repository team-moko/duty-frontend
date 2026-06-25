"use client";

import * as styles from "./RadioPill.css";

interface RadioPillProps<T extends string> {
  options: readonly T[];
  value: T;
  onChange?: (value: T) => void;
}

export function RadioPill<T extends string>({ options, value, onChange }: RadioPillProps<T>) {
  return (
    <div className={styles.group} role="radiogroup">
      {options.map((opt) => {
        const on = opt === value;
        return (
          <button
            key={opt}
            type="button"
            role="radio"
            aria-checked={on}
            className={`${styles.option} ${on ? styles.state.on : styles.state.off}`}
            onClick={() => onChange?.(opt)}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}
