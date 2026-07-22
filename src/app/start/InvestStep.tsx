"use client";

import { FieldRow, InputBox, Segmented } from "@/components";
import { digitsOnly, won } from "@/lib/format";
import type {
  RecommendCombosFormValues,
  RecommendCombosRequest,
} from "@/lib/recommend-form";
import { memo } from "react";
import {
  Controller,
  useFormState,
  type Control,
  type UseFormClearErrors,
  type UseFormGetValues,
  type UseFormSetValue,
} from "react-hook-form";
import { InvestTypeField } from "./InvestTypeField";
import * as styles from "./ScreenInput.css";

const RISK_PROFILES = ["안정형", "중립형", "공격형"] as const;
type RiskProfile = (typeof RISK_PROFILES)[number];

const RISK_PROFILE_VALUES: Record<
  RiskProfile,
  RecommendCombosFormValues["risk_tolerance"]
> = {
  안정형: "low",
  중립형: "medium",
  공격형: "high",
};

const RISK_PROFILE_LABELS: Record<
  RecommendCombosFormValues["risk_tolerance"],
  RiskProfile
> = {
  low: "안정형",
  medium: "중립형",
  high: "공격형",
};

type FormControl = Control<
  RecommendCombosFormValues,
  unknown,
  RecommendCombosRequest
>;

function moneyInputValue(value: string) {
  return value === "" ? "" : won(value);
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;

  return (
    <p className={styles.fieldError} role="alert">
      {message}
    </p>
  );
}

const MonthlyInvestField = memo(function MonthlyInvestField({
  control,
}: {
  control: FormControl;
}) {
  const { errors } = useFormState({ control, name: "monthly_invest" });

  return (
    <FieldRow label="월 투자 가능액" required>
      <Controller
        name="monthly_invest"
        control={control}
        render={({ field }) => (
          <>
            <InputBox
              value={moneyInputValue(field.value)}
              onChange={(v) => field.onChange(digitsOnly(v))}
              placeholder="0"
              suffix="만원"
              align="right"
              inputMode="numeric"
            />
            <FieldError message={errors.monthly_invest?.message} />
          </>
        )}
      />
    </FieldRow>
  );
});

const RiskToleranceField = memo(function RiskToleranceField({
  control,
}: {
  control: FormControl;
}) {
  return (
    <FieldRow label="투자 성향" required>
      <Controller
        name="risk_tolerance"
        control={control}
        render={({ field }) => (
          <Segmented
            options={RISK_PROFILES}
            value={RISK_PROFILE_LABELS[field.value]}
            onChange={(value) => field.onChange(RISK_PROFILE_VALUES[value])}
          />
        )}
      />
    </FieldRow>
  );
});

const ForeignStockProfitField = memo(function ForeignStockProfitField({
  control,
}: {
  control: FormControl;
}) {
  const { errors } = useFormState({
    control,
    name: "foreign_stock_unrealized_profit",
  });

  return (
    <FieldRow label="해외주식 미실현 수익" hint="양도소득세 절세 판단에 쓰여요">
      <Controller
        name="foreign_stock_unrealized_profit"
        control={control}
        render={({ field }) => (
          <>
            <InputBox
              value={moneyInputValue(field.value)}
              onChange={(v) => field.onChange(digitsOnly(v))}
              placeholder="0"
              suffix="만원"
              align="right"
              inputMode="numeric"
            />
            <FieldError
              message={errors.foreign_stock_unrealized_profit?.message}
            />
          </>
        )}
      />
    </FieldRow>
  );
});

interface InvestStepProps {
  control: FormControl;
  getValues: UseFormGetValues<RecommendCombosFormValues>;
  setValue: UseFormSetValue<RecommendCombosFormValues>;
  clearErrors: UseFormClearErrors<RecommendCombosFormValues>;
}

export const InvestStep = memo(function InvestStep({
  control,
  getValues,
  setValue,
  clearErrors,
}: InvestStepProps) {
  return (
    <div className={styles.stepCol}>
      <InvestTypeField
        control={control}
        getValues={getValues}
        setValue={setValue}
        clearErrors={clearErrors}
      />
      <MonthlyInvestField control={control} />
      <RiskToleranceField control={control} />
      <ForeignStockProfitField control={control} />
    </div>
  );
});
