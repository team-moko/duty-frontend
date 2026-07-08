import { z } from "zod";

export const RECOMMEND_FORM_COOKIE = "recommend-form";

export const incomeTypeSchema = z.enum(["employee", "freelancer", "none"]);
export const investTypeSchema = z.enum([
  "domestic_stock",
  "foreign_stock",
  "etf_domestic",
  "etf_foreign",
  "fund",
  "deposit",
  "bond",
  "reit",
]);
export const riskToleranceSchema = z.enum(["low", "medium", "high"]);

const integerAmountSchema = z.number().int().min(0);

export const recommendCombosRequestSchema = z
  .object({
    age: z.number().int().min(19).max(80),
    annual_salary: integerAmountSchema,
    income_type: incomeTypeSchema,
    invest_types: z.array(investTypeSchema).max(20),
    monthly_invest: integerAmountSchema,
    has_isa: z.boolean(),
    has_pension: z.boolean(),
    has_irp: z.boolean(),
    pension_contribution: integerAmountSchema.max(600).default(0),
    irp_contribution: integerAmountSchema.max(300).default(0),
    financial_income: integerAmountSchema.default(0),
    risk_tolerance: riskToleranceSchema,
    has_spouse: z.boolean().default(false),
    has_children: z.boolean().default(false),
    has_minor_children: z.boolean().default(false),
    foreign_stock_unrealized_profit: integerAmountSchema.default(0),
    dividend_income: integerAmountSchema.default(0),
    holds_high_dividend: z.boolean().default(false),
  })
  .transform((value) => ({
    ...value,
    pension_contribution: value.has_pension ? value.pension_contribution : 0,
    irp_contribution: value.has_irp ? value.irp_contribution : 0,
    has_minor_children: value.has_children && value.has_minor_children,
  }));

export type RecommendCombosRequest = z.output<
  typeof recommendCombosRequestSchema
>;

function requiredIntegerInput(requiredMessage: string) {
  return z
    .string()
    .trim()
    .refine((value) => value.length > 0, { message: requiredMessage })
    .refine((value) => /^\d+$/.test(value), {
      message: "숫자만 입력해주세요.",
    })
    .transform((value) => Number(value));
}

function optionalIntegerInput() {
  return z
    .string()
    .trim()
    .refine((value) => value === "" || /^\d+$/.test(value), {
      message: "숫자만 입력해주세요.",
    })
    .transform((value) => (value === "" ? 0 : Number(value)))
    .pipe(z.number().int().min(0, { message: "0 이상 입력해주세요." }));
}

export const recommendCombosFormSchema = z
  .object({
    age: requiredIntegerInput("나이를 입력해주세요.").pipe(
      z
        .number()
        .int()
        .min(19, { message: "만 19세 이상 입력해주세요." })
        .max(80, { message: "만 80세 이하 입력해주세요." }),
    ),
    annual_salary: requiredIntegerInput("연봉을 입력해주세요.").pipe(
      z.number().int().min(0, { message: "0 이상 입력해주세요." }),
    ),
    income_type: incomeTypeSchema,
    invest_types: z.array(investTypeSchema).max(20),
    no_invest: z.boolean(),
    monthly_invest: requiredIntegerInput("월 투자 가능액을 입력해주세요.").pipe(
      z.number().int().min(0, { message: "0 이상 입력해주세요." }),
    ),
    risk_tolerance: riskToleranceSchema,
    foreign_stock_unrealized_profit: optionalIntegerInput(),
    has_pension: z.boolean(),
    pension_contribution: optionalIntegerInput(),
    has_irp: z.boolean(),
    irp_contribution: optionalIntegerInput(),
    has_isa: z.boolean(),
    financial_income: optionalIntegerInput(),
    dividend_income: optionalIntegerInput(),
    holds_high_dividend: z.boolean(),
    has_spouse: z.boolean(),
    has_children: z.boolean(),
    has_minor_children: z.boolean(),
  })
  .superRefine((value, ctx) => {
    if (!value.no_invest && value.invest_types.length === 0) {
      ctx.addIssue({
        code: "custom",
        path: ["invest_types"],
        message: "투자 유형을 선택하거나 해당 없음을 선택해주세요.",
      });
    }

    if (value.has_pension && value.pension_contribution > 600) {
      ctx.addIssue({
        code: "custom",
        path: ["pension_contribution"],
        message: "연금저축 납입액은 최대 600만원까지 입력해주세요.",
      });
    }

    if (value.has_irp && value.irp_contribution > 300) {
      ctx.addIssue({
        code: "custom",
        path: ["irp_contribution"],
        message: "IRP 납입액은 최대 300만원까지 입력해주세요.",
      });
    }
  })
  .transform(
    (value): RecommendCombosRequest => ({
      age: value.age,
      annual_salary: value.annual_salary,
      income_type: value.income_type,
      invest_types: value.no_invest ? [] : value.invest_types,
      monthly_invest: value.monthly_invest,
      has_isa: value.has_isa,
      has_pension: value.has_pension,
      has_irp: value.has_irp,
      pension_contribution: value.has_pension ? value.pension_contribution : 0,
      irp_contribution: value.has_irp ? value.irp_contribution : 0,
      financial_income: value.financial_income,
      risk_tolerance: value.risk_tolerance,
      has_spouse: value.has_spouse,
      has_children: value.has_children,
      has_minor_children: value.has_children && value.has_minor_children,
      foreign_stock_unrealized_profit: value.foreign_stock_unrealized_profit,
      dividend_income: value.dividend_income,
      holds_high_dividend: value.holds_high_dividend,
    }),
  );

export type RecommendCombosFormValues = z.input<
  typeof recommendCombosFormSchema
>;

export const RECOMMEND_FORM_DEFAULT_VALUES: RecommendCombosFormValues = {
  age: "",
  annual_salary: "",
  income_type: "employee",
  invest_types: [],
  no_invest: false,
  monthly_invest: "",
  risk_tolerance: "low",
  foreign_stock_unrealized_profit: "",
  has_pension: false,
  pension_contribution: "",
  has_irp: false,
  irp_contribution: "",
  has_isa: false,
  financial_income: "",
  dividend_income: "",
  holds_high_dividend: false,
  has_spouse: false,
  has_children: false,
  has_minor_children: false,
};

export function isRecommendCombosRequest(
  value: unknown,
): value is RecommendCombosRequest {
  return recommendCombosRequestSchema.safeParse(value).success;
}

export function encodeRecommendForm(request: RecommendCombosRequest): string {
  return encodeURIComponent(
    JSON.stringify(recommendCombosRequestSchema.parse(request)),
  );
}

export function decodeRecommendForm(
  value: string | undefined,
): RecommendCombosRequest | null {
  if (!value) return null;

  try {
    const parsed: unknown = JSON.parse(decodeURIComponent(value));
    const result = recommendCombosRequestSchema.safeParse(parsed);
    return result.success ? result.data : null;
  } catch {
    return null;
  }
}
