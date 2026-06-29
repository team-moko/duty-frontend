import { notFound } from "next/navigation";
import { ComboDetail } from "./ComboDetail";

export default async function ComboDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const rank = Number(id);
  if (!Number.isInteger(rank) || rank < 1 || rank > 5) notFound();

  return <ComboDetail rank={rank} />;
}
