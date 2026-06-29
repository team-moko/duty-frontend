"use client";

import type { ReactNode } from "react";
import { CheckIcon } from "../icons";
import * as styles from "./AccountToggle.css";

interface AccountToggleProps {
  label: string;
  on: boolean;
  onToggle?: () => void;
  /** on일 때만 펼쳐지는 하위 입력 영역 */
  children?: ReactNode;
}

export function AccountToggle({ label, on, onToggle, children }: AccountToggleProps) {
  const stateKey = on ? "on" : "off";
  return (
    <div className={`${styles.card} ${styles.state[stateKey]}`}>
      <button
        type="button"
        role="checkbox"
        aria-checked={on}
        onClick={onToggle}
        className={styles.header}
      >
        <span className={`${styles.box} ${styles.boxState[stateKey]}`}>
          {on && <CheckIcon />}
        </span>
        <span className={styles.label}>{label}</span>
      </button>
      {on && children && (
        <div className={styles.body}>
          <div className={styles.bodyDivider} />
          {children}
        </div>
      )}
    </div>
  );
}
