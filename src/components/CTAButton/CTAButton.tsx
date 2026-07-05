import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import * as styles from "./CTAButton.css";

interface CTAButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  /** 버튼 하단 보조 문구 (높이 60px로 확장) */
  sub?: string;
  variant?: "blue" | "green";
  /** 지정 시 <button> 대신 <Link>로 렌더 — 서버 컴포넌트에서 네비게이션용 */
  href?: string;
}

export function CTAButton({
  children,
  sub,
  variant = "blue",
  disabled = false,
  type = "button",
  href,
  ...rest
}: CTAButtonProps) {
  const variantClass = disabled ? styles.variant.disabled : styles.variant[variant];
  const sizeClass = sub ? styles.size.withSub : styles.size.normal;
  const className = `${styles.button} ${variantClass} ${sizeClass}`;
  const inner = (
    <>
      <span>{children}</span>
      {sub && <span className={styles.sub}>{sub}</span>}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={className}>
        {inner}
      </Link>
    );
  }

  return (
    <button type={type} disabled={disabled} className={className} {...rest}>
      {inner}
    </button>
  );
}
