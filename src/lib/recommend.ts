export function formatExpectedBenefit(value: number | null): string {
  if (value === null) return "개별 확인 필요";
  if (value >= 10_000)
    return `약 ${Math.round(value / 10_000).toLocaleString("ko-KR")}만원`;
  return `${value.toLocaleString("ko-KR")}원`;
}
