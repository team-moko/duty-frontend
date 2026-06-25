"use client";

import type { InputHTMLAttributes } from "react";
import * as styles from "./InputBox.css";

interface InputBoxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
  value: string;
  onChange?: (value: string) => void;
  suffix?: string;
  align?: "left" | "right";
  strong?: boolean;
}

export function InputBox({
  value,
  onChange,
  suffix,
  align = "left",
  strong = false,
  inputMode = "text",
  ...rest
}: InputBoxProps) {
  return (
    <div className={styles.box}>
      <input
        className={`${styles.input} ${strong ? styles.weight.strong : styles.weight.normal} ${styles.align[align]}`}
        value={value}
        inputMode={inputMode}
        onChange={(e) => onChange?.(e.target.value)}
        {...rest}
      />
      {suffix && <span className={styles.suffix}>{suffix}</span>}
    </div>
  );
}
