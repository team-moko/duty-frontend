"use server";

import {
  isComboResponse,
  type ComboResponse,
  type RecommendCombosRequest,
} from "@/api/recommend";

// 서버 액션으로 백엔드를 서버에서 직접 호출한다 — 브라우저 fetch가 아니므로
// CORS가 발생하지 않고, API_BASE_URL도 클라이언트 번들에 노출되지 않는다.
export async function postRecommendCombos(
  body: RecommendCombosRequest,
): Promise<ComboResponse> {
  const apiBaseUrl = process.env.API_BASE_URL;
  if (!apiBaseUrl) {
    throw new Error("API_BASE_URL 환경변수가 설정되지 않았습니다.");
  }

  const response = await fetch(
    `${apiBaseUrl.replace(/\/$/, "")}/recommend/combos`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    },
  );
  const data: unknown = await response.json();

  if (!response.ok) {
    throw new Error(
      "추천 결과를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.",
    );
  }
  if (!isComboResponse(data)) {
    throw new Error("추천 결과 형식이 올바르지 않습니다.");
  }

  return data;
}
