import { ScreenShare } from "./ScreenShare";

const DEFAULT_COMBOS = ["연금저축", "IRP", "청년형 ISA"];
const DEFAULT_RATE = 16.5;
const DEFAULT_STRATEGY =
  "세액공제 16.5% 구간 + 청년 비과세 혜택까지 모두 챙기는 조합이에요";

// 공유 링크 랜딩: jeolse.kr/s
// 개인정보(이름·금액·나이·연봉)는 받지 않고, 예상 환급률(%)·계좌 조합·전략 문구만 파라미터로 렌더한다.
export default async function SharePage({
  searchParams,
}: {
  searchParams: Promise<{ rate?: string; combos?: string; strategy?: string }>;
}) {
  const { rate, combos, strategy } = await searchParams;

  const parsedRate = Number(rate);
  const safeRate =
    Number.isFinite(parsedRate) && parsedRate > 0 ? parsedRate : DEFAULT_RATE;

  const parsedCombos = combos
    ? combos
        .split(",")
        .map((combo) => combo.trim())
        .filter(Boolean)
    : DEFAULT_COMBOS;

  const safeStrategy = strategy?.trim() || DEFAULT_STRATEGY;

  return (
    <ScreenShare
      rate={safeRate}
      combos={parsedCombos.length > 0 ? parsedCombos : DEFAULT_COMBOS}
      strategy={safeStrategy}
    />
  );
}
