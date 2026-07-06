// 공유 링크(/s) 파라미터 정규화 헬퍼.
// page.tsx(RSC)와 OG 이미지 라우트(og/route.tsx)가 동일한 기본값·정규화 로직을 공유한다.
// 개인정보(이름·금액·나이·연봉)는 다루지 않는다 — 환급률·계좌 조합·전략 문구만.

export const DEFAULT_COMBOS = ["연금저축", "IRP", "청년형 ISA"];
export const DEFAULT_RATE = 16.5;
export const DEFAULT_STRATEGY =
  "세액공제 16.5% 구간 + 청년 비과세 혜택까지 모두 챙기는 조합이에요";

export interface ShareParams {
  rate: number;
  combos: string[];
  strategy: string;
}

/** 원시 쿼리 값을 받아 안전한 기본값으로 정규화한다. */
export function normalizeShareParams(raw: {
  rate?: string;
  combos?: string;
  strategy?: string;
}): ShareParams {
  const parsedRate = Number(raw.rate);
  const safeRate =
    Number.isFinite(parsedRate) && parsedRate > 0 ? parsedRate : DEFAULT_RATE;

  const parsedCombos = raw.combos
    ? raw.combos
        .split(",")
        .map((combo) => combo.trim())
        .filter(Boolean)
    : DEFAULT_COMBOS;

  const safeStrategy = raw.strategy?.trim() || DEFAULT_STRATEGY;

  return {
    rate: safeRate,
    combos: parsedCombos.length > 0 ? parsedCombos : DEFAULT_COMBOS,
    strategy: safeStrategy,
  };
}
