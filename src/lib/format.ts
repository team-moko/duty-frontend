// 숫자 → "1,234" (천 단위 콤마)
export function won(n: number | string): string {
  const num = typeof n === "string" ? Number(n.replace(/[^0-9.-]/g, "")) : n;
  if (Number.isNaN(num)) return "";
  return num.toLocaleString("ko-KR");
}

// 입력 문자열에서 숫자만 추출
export function digitsOnly(value: string): string {
  return value.replace(/[^0-9]/g, "");
}
