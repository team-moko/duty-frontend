import "server-only";

import { postRecommendCombosOnServer } from "@/api/recommend.server";
import {
  decodeRecommendForm,
  RECOMMEND_FORM_COOKIE,
} from "@/lib/recommend-form";
import { cookies } from "next/headers";

export async function getRecommendResult() {
  const cookieStore = await cookies();
  const request = decodeRecommendForm(
    cookieStore.get(RECOMMEND_FORM_COOKIE)?.value,
  );

  if (!request) return null;

  return postRecommendCombosOnServer(request);
}
