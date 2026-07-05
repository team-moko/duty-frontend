import type { ReactNode } from "react";
import * as styles from "./FieldRow.css";

interface FieldRowProps {
  label: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
}

export function FieldRow({ label, hint, required, children }: FieldRowProps) {
  return (
    <div className={styles.row}>
      <div className={styles.head}>
        <span className={styles.label}>
          {label}
          {required && (
            <span className={styles.required} aria-label="필수 입력">
              *
            </span>
          )}
        </span>
        {hint && <span className={styles.hint}>{hint}</span>}
      </div>
      {children}
    </div>
  );
}
