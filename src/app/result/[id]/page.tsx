import type { Viewport } from "next";
import { getRecommendResult } from "@/lib/recommend-result.server";
import { notFound } from "next/navigation";
import { ComboDetail } from "./ComboDetail";

// 상단이 파란 히어로라 상태바 영역도 같은 색으로 틴트한다. (루트 기본값 appBg 덮어쓰기)
export const viewport: Viewport = {
  themeColor: "#2F6BF0",
};

export default async function ComboDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const rank = Number(id);
  if (!Number.isInteger(rank) || rank < 1 || rank > 5) notFound();

  const result = await getRecommendResult().catch(() => null);
  const combo = result?.combos.find((item) => item.rank === rank) ?? null;

  return <ComboDetail combo={combo} />;
}
