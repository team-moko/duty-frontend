// 절세 유형 시스템 — 예상 환급률(%) 하나로 4개 구간을 나눈다.
// 프레이밍 원칙: 낮은 %도 부정적으로 두지 않는다.
//   낮을수록 "이미 잘 챙기는 고수", 높을수록 "아직 챙길 게 많은 기회" — 모든 유형이 기분 좋게.

export interface TaxType {
  /** 이 구간의 최소 환급률(%). rate >= min 인 첫 유형이 선택된다. */
  min: number;
  emoji: string;
  name: string;
  tagline: string;
  keywords: string[];
}

// 모든 환급률을 포괄하는 최종 폴백 유형 (min: 0).
export const FALLBACK_TAX_TYPE: TaxType = {
  min: 0,
  emoji: "🏆",
  name: "이미 절세 고수형",
  tagline: "웬만한 혜택은 이미 챙기고 계셔요",
  keywords: ["#공제_거의만렙", "#빈틈없음", "#절세_마스터"],
};

// 납입 없는 절세 전략(손익통산·분산매도 등) 전용 유형 — 환급률 구간과 무관하게 사용.
export const NO_CONTRIBUTION_TAX_TYPE: TaxType = {
  min: 0,
  emoji: "🧭",
  name: "실행형 절세 전략가",
  tagline: "납입 없이 매도 전략만으로 세금을 줄여요",
  keywords: ["#손익통산", "#분산매도", "#납입없이"],
};

export const TAX_TYPES: TaxType[] = [
  {
    min: 15,
    emoji: "🚀",
    name: "환급 떡상 잠재력형",
    tagline: "아직 안 챙긴 혜택이 이렇게나! 지금이 기회예요",
    keywords: ["#숨은환급_발굴", "#최대치도전", "#지금이기회"],
  },
  {
    min: 13,
    emoji: "🧩",
    name: "빈틈없는 균형형",
    tagline: "받을 수 있는 혜택은 하나도 안 놓쳐요",
    keywords: ["#세액공제_맥스", "#비과세_알뜰", "#장기전략가"],
  },
  {
    min: 11,
    emoji: "🌱",
    name: "알뜰 실속형",
    tagline: "굴리는 맛까지 챙기면서 기본까지 딱",
    keywords: ["#유동성_중시", "#실속파", "#균형감각"],
  },
  FALLBACK_TAX_TYPE,
];

export function getTaxType(rate: number): TaxType {
  return TAX_TYPES.find((type) => rate >= type.min) ?? FALLBACK_TAX_TYPE;
}
