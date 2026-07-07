export interface RecommendCombosRequest {
  age: number;
  annual_salary: number;
  income_type: "employee" | "freelancer" | "none";
  invest_types: Array<
    | "domestic_stock"
    | "foreign_stock"
    | "etf_domestic"
    | "etf_foreign"
    | "fund"
    | "deposit"
    | "bond"
    | "reit"
  >;
  monthly_invest: number;
  has_isa: boolean;
  has_pension: boolean;
  has_irp: boolean;
  pension_contribution?: number;
  irp_contribution?: number;
  financial_income?: number;
  risk_tolerance: "low" | "medium" | "high";
  has_spouse?: boolean;
  has_children?: boolean;
  has_minor_children?: boolean;
  foreign_stock_unrealized_profit?: number;
  dividend_income?: number;
  holds_high_dividend?: boolean;
}

interface ComboProduct {
  rule_id: string;
  product: string;
}

interface ComboDetailItem extends ComboProduct {
  category: string;
  priority: number;
  priority_hint: string;
  expected_benefit_krw: number | null;
  recommended_contribution_krw: number | null;
  annual_limit_krw: number | null;
  tax_rate_percent: number | null;
  reason: string;
  action: string;
  warning: string | null;
}

interface LongTermProjection {
  gain_krw: number;
  breakdown: {
    cumulative_refund_krw: number;
    isa_tax_saving_krw: number;
    pension_tax_saving_krw: number;
  };
  assumptions: {
    horizon_years: number;
    assumed_return_rate_percent: number;
    normal_tax_rate_percent: number;
    isa_separate_tax_rate_percent: number;
    note: string;
  };
}

export interface Combo {
  rank: number;
  label: string | null;
  products: ComboProduct[];
  refund_rate_percent: number | null;
  refund_rate_note: string | null;
  expected_annual_refund_krw: number;
  recommended_contribution_krw: number;
  short_strategy: string;
  justifications: string[];
  long_term_projection: LongTermProjection;
  details: ComboDetailItem[];
}

export interface ComboResponse {
  combos: Combo[];
  header: {
    max_refund_rate_percent: number | null;
    max_refund_rate_note: string | null;
    max_annual_refund_krw: number;
    applicable_combo_count: number;
  };
  profile_summary: string;
}

export function isComboResponse(value: unknown): value is ComboResponse {
  if (!value || typeof value !== "object") return false;

  const response = value as Partial<ComboResponse>;
  return (
    Array.isArray(response.combos) &&
    !!response.header &&
    typeof response.header === "object" &&
    typeof response.profile_summary === "string"
  );
}
