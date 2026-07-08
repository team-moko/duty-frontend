import "server-only";

import {
  isComboResponse,
  type ComboResponse,
  type RecommendCombosRequest,
} from "@/api/recommend";

export async function postRecommendCombosOnServer(
  body: RecommendCombosRequest,
): Promise<ComboResponse> {
  const apiBaseUrl = process.env.API_BASE_URL;
  if (!apiBaseUrl) {
    throw new Error("API_BASE_URL 환경변수가 설정되지 않았습니다.");
  }

  let response: Response;
  try {
    response = await fetch(
      `${apiBaseUrl.replace(/\/$/, "")}/recommend/combos`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        cache: "no-store",
      },
    );
  } catch {
    throw new Error(
      "추천 서버에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.",
    );
  }

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
