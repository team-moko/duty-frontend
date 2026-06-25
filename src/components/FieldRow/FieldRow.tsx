import type { ReactNode } from "react";
import * as styles from "./FieldRow.css";

interface FieldRowProps {
  label: string;
  hint?: string;
  children: ReactNode;
}

export function FieldRow({ label, hint, children }: FieldRowProps) {
  return (
    <div className={styles.row}>
      <div className={styles.head}>
        <span className={styles.label}>{label}</span>
        {hint && <span className={styles.hint}>{hint}</span>}
      </div>
      {children}
    </div>
  );
}
