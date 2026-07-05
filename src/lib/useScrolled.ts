"use client";

import { useEffect, useState } from "react";

// 윈도우가 threshold(px) 이상 스크롤됐는지 여부. 상단 고정 헤더의 그림자 토글에 사용.
export function useScrolled(threshold = 4): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}
