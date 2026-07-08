import type { RecommendCombosRequest } from "@/api/recommend";

export const RECOMMEND_FORM_COOKIE = "recommend-form";

const INCOME_TYPES = ["employee", "freelancer", "none"] as const;
const INVEST_TYPES = [
  "domestic_stock",
  "foreign_stock",
  "etf_domestic",
  "etf_foreign",
  "fund",
  "deposit",
  "bond",
  "reit",
] as const;
const RISK_TOLERANCES = ["low", "medium", "high"] as const;

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object";
}

function isNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

function isOptionalNumber(value: unknown): value is number | undefined {
  return value === undefined || isNumber(value);
}

function isOptionalBoolean(value: unknown): value is boolean | undefined {
  return value === undefined || typeof value === "boolean";
}

function includes<const T extends readonly string[]>(
  values: T,
  value: unknown,
): value is T[number] {
  return typeof value === "string" && values.includes(value);
}

export function isRecommendCombosRequest(
  value: unknown,
): value is RecommendCombosRequest {
  if (!isRecord(value)) return false;

  return (
    isNumber(value.age) &&
    isNumber(value.annual_salary) &&
    includes(INCOME_TYPES, value.income_type) &&
    Array.isArray(value.invest_types) &&
    value.invest_types.every((type) => includes(INVEST_TYPES, type)) &&
    isNumber(value.monthly_invest) &&
    typeof value.has_isa === "boolean" &&
    typeof value.has_pension === "boolean" &&
    typeof value.has_irp === "boolean" &&
    isOptionalNumber(value.pension_contribution) &&
    isOptionalNumber(value.irp_contribution) &&
    isOptionalNumber(value.financial_income) &&
    includes(RISK_TOLERANCES, value.risk_tolerance) &&
    isOptionalBoolean(value.has_spouse) &&
    isOptionalBoolean(value.has_children) &&
    isOptionalBoolean(value.has_minor_children) &&
    isOptionalNumber(value.foreign_stock_unrealized_profit) &&
    isOptionalNumber(value.dividend_income) &&
    isOptionalBoolean(value.holds_high_dividend)
  );
}

export function encodeRecommendForm(request: RecommendCombosRequest): string {
  return encodeURIComponent(JSON.stringify(request));
}

export function decodeRecommendForm(
  value: string | undefined,
): RecommendCombosRequest | null {
  if (!value) return null;

  try {
    const parsed: unknown = JSON.parse(decodeURIComponent(value));
    return isRecommendCombosRequest(parsed) ? parsed : null;
  } catch {
    return null;
  }
}
