import type { ButtonHTMLAttributes, ReactNode } from "react";
import * as styles from "./CTAButton.css";

interface CTAButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  /** 버튼 하단 보조 문구 (높이 60px로 확장) */
  sub?: string;
  variant?: "blue" | "green";
}

export function CTAButton({
  children,
  sub,
  variant = "blue",
  disabled = false,
  type = "button",
  ...rest
}: CTAButtonProps) {
  const variantClass = disabled ? styles.variant.disabled : styles.variant[variant];
  const sizeClass = sub ? styles.size.withSub : styles.size.normal;
  return (
    <button
      type={type}
      disabled={disabled}
      className={`${styles.button} ${variantClass} ${sizeClass}`}
      {...rest}
    >
      <span>{children}</span>
      {sub && <span className={styles.sub}>{sub}</span>}
    </button>
  );
}
