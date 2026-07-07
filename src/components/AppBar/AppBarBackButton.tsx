"use client";

import { useRouter } from "next/navigation";
import { ChevronLeftIcon } from "../icons";
import * as styles from "./AppBar.css";

interface AppBarBackButtonProps {
  accent: boolean;
  onBack?: () => void;
}

export function AppBarBackButton({ accent, onBack }: AppBarBackButtonProps) {
  const router = useRouter();

  return (
    <button
      type="button"
      className={styles.backBtn}
      aria-label="뒤로가기"
      onClick={onBack ?? (() => router.back())}
    >
      <ChevronLeftIcon color={accent ? "#fff" : "#191F28"} />
    </button>
  );
}
