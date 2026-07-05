"use client";

import { useScrolled } from "@/lib/useScrolled";
import type { ReactNode, Ref } from "react";
import * as styles from "./FixedTopBar.css";

type Variant = "accent" | "solid";

interface FixedTopBarProps {
  // accent: hero 위 투명 바 → 스크롤 시 hero 그라데이션. solid: 흰 배경 헤더.
  variant?: Variant;
  children: ReactNode;
  // 고정으로 흐름에서 빠진 높이를 spacer로 확보해야 하는 경우 측정용.
  ref?: Ref<HTMLDivElement>;
}

export function FixedTopBar({
  variant = "accent",
  children,
  ref,
}: FixedTopBarProps) {
  const scrolled = useScrolled();
  return (
    <div
      ref={ref}
      className={`${styles.bar[variant]} ${scrolled ? styles.scrolled[variant] : ""}`}
    >
      {children}
    </div>
  );
}
