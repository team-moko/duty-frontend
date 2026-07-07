import type { Combo } from "@/api/recommend";

// 공유 랜딩(/s) URL을 만든다.
// 개인정보(이름·금액·나이·연봉)는 절대 담지 않고, 예상 환급률(%)·계좌 조합·전략 문구만 전달한다.
export function buildShareUrl(combo: Combo): string {
  const origin = typeof location !== "undefined" ? location.origin : "";
  const params = new URLSearchParams();
  if (combo.refund_rate_percent !== null) {
    params.set("rate", String(combo.refund_rate_percent));
  } else {
    // 납입 없는 전략 — rate 생략이 아니라 명시적 플래그로 전달해야
    // /s가 기본 환급률(16.5%)로 잘못 폴백하지 않는다.
    params.set("norate", "1");
  }
  params.set("combos", combo.details.map((detail) => detail.product).join(","));
  params.set("strategy", combo.short_strategy);
  return `${origin}/s?${params.toString()}`;
}
