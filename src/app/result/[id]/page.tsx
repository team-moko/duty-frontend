import { notFound } from "next/navigation";
import { getCombo } from "@/data/combos";
import { ComboDetail } from "./ComboDetail";

export default async function ComboDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const combo = getCombo(Number(id));
  if (!combo) notFound();

  return <ComboDetail combo={combo} />;
}
