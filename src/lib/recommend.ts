import {
  isComboResponse,
  type ComboResponse,
} from "@/api/recommend";

const RECOMMEND_RESULT_STORAGE_KEY = "recommend-result";

const RECOMMEND_RESULT_EVENT = "recommend-result-change";
let cachedStoredValue: string | null | undefined;
let cachedResult: ComboResponse | null = null;

export function saveRecommendResult(result: ComboResponse) {
  const storedValue = JSON.stringify(result);
  sessionStorage.setItem(RECOMMEND_RESULT_STORAGE_KEY, storedValue);
  cachedStoredValue = storedValue;
  cachedResult = result;
  window.dispatchEvent(new Event(RECOMMEND_RESULT_EVENT));
}

export function getRecommendResultSnapshot(): ComboResponse | null {
  try {
    const stored = sessionStorage.getItem(RECOMMEND_RESULT_STORAGE_KEY);
    if (stored === cachedStoredValue) return cachedResult;

    cachedStoredValue = stored;
    const parsed: unknown = stored ? JSON.parse(stored) : null;
    cachedResult = isComboResponse(parsed) ? parsed : null;
    return cachedResult;
  } catch {
    cachedStoredValue = undefined;
    cachedResult = null;
    return null;
  }
}

export function getServerRecommendResultSnapshot(): null {
  return null;
}

export function subscribeRecommendResult(onStoreChange: () => void) {
  const handleChange = () => {
    cachedStoredValue = undefined;
    onStoreChange();
  };

  window.addEventListener("storage", handleChange);
  window.addEventListener(RECOMMEND_RESULT_EVENT, handleChange);
  return () => {
    window.removeEventListener("storage", handleChange);
    window.removeEventListener(RECOMMEND_RESULT_EVENT, handleChange);
  };
}

export function formatExpectedBenefit(value: number | null): string {
  if (value === null) return "개별 확인 필요";
  if (value >= 10_000)
    return `약 ${Math.round(value / 10_000).toLocaleString("ko-KR")}만원`;
  return `${value.toLocaleString("ko-KR")}원`;
}
