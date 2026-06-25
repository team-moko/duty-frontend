// 절세 조합 예시 데이터 (29세·연봉 4,200만원 가상 페르소나).
// README 명시: 수치는 모두 placeholder이며 실제 절세 계산 로직으로 교체 대상.

export interface PriorityStep {
  acc: string;
  amt: string;
  desc: string;
}

export interface EffectItem {
  label: string;
  value: string;
  tone: "blue" | "green";
  note: string;
}

export interface ComboDetail {
  priority: PriorityStep[];
  effect: EffectItem[];
  afterTax: { value: string; note: string };
  reasons: string[];
  disclaimer: string;
}

export interface Combo {
  n: number;
  rate: number;
  refund: number;
  chips: string[];
  reason: string;
  detail?: ComboDetail;
}

export const COMBOS: Combo[] = [
  {
    n: 1,
    rate: 16.5,
    refund: 148,
    chips: ["연금저축", "IRP", "청년형 ISA"],
    reason: "세액공제 16.5% 구간 + 청년 비과세까지 모두 활용",
    detail: {
      priority: [
        { acc: "연금저축", amt: "연 600만원", desc: "세액공제 한도를 가장 먼저 채워요" },
        { acc: "IRP", amt: "연 300만원", desc: "연금저축과 합산해 공제 한도(900만원)를 마저 채워요" },
        { acc: "청년형 ISA", amt: "연 2,000만원 한도", desc: "남는 여유자금은 비과세로 굴려요" },
      ],
      effect: [
        {
          label: "세액공제 환급",
          value: "148만원",
          tone: "blue",
          note: "연금저축·IRP 납입 900만원 × 16.5%",
        },
        {
          label: "ISA 비과세·분리과세",
          value: "9.9% 분리과세",
          tone: "green",
          note: "일반과세 15.4% 대비 절약",
        },
      ],
      afterTax: { value: "+1,840만원", note: "연 5% 수익률 가정 · 일반과세 대비" },
      reasons: [
        "현재 연봉 구간(총급여 5,500만원 이하)에서는 연금저축·IRP 세액공제율이 16.5%로 가장 높아요.",
        "청년형 ISA 가입 가능 기간이 약 6개월 남아, 자격이 있을 때 먼저 가입하는 게 유리해요.",
        "국민성장펀드보다 세액공제 효율이 높아, 같은 금액이라도 환급이 더 커요.",
      ],
      disclaimer:
        "세법·상품 조건에 따라 실제 혜택은 달라질 수 있어요. 가입 전 상세 조건을 꼭 확인하세요.",
    },
  },
  {
    n: 2,
    rate: 14.2,
    refund: 121,
    chips: ["IRP", "청년형 ISA"],
    reason: "세액공제를 IRP로 몰아 받고 ISA 비과세 병행",
  },
  {
    n: 3,
    rate: 13.1,
    refund: 104,
    chips: ["연금저축", "청년형 ISA"],
    reason: "중도 유동성을 살리면서 세액공제를 챙기는 조합",
  },
  {
    n: 4,
    rate: 11.3,
    refund: 92,
    chips: ["국민성장펀드", "연금저축"],
    reason: "신규 소득공제 한도를 먼저 활용하는 전략",
  },
  {
    n: 5,
    rate: 9.4,
    refund: 71,
    chips: ["청년형 ISA"],
    reason: "가장 단순하게, 비과세 한도만 채우는 입문 조합",
  },
];

export const MAX_RATE = COMBOS[0]!.rate;
export const MAX_REFUND = COMBOS[0]!.refund;

export function getCombo(n: number): Combo | undefined {
  return COMBOS.find((c) => c.n === n);
}
