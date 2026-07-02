"use client";

import { motion } from "framer-motion";
import { useId } from "react";
import * as styles from "./Segmented.css";

interface SegmentedProps<T extends string> {
  options: readonly T[];
  value: T;
  onChange?: (value: T) => void;
}

export function Segmented<T extends string>({ options, value, onChange }: SegmentedProps<T>) {
  const pillId = useId();

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
            {on && (
              <motion.span
                layoutId={pillId}
                className={styles.pill}
                transition={{ type: "spring", bounce: 0.25, duration: 0.45 }}
              />
            )}
            <span className={styles.label}>{opt}</span>
          </button>
        );
      })}
    </div>
  );
}
