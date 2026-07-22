"use client";

import { FieldRow, InputBox, Segmented } from "@/components";
import { digitsOnly, won } from "@/lib/format";
import type {
  RecommendCombosFormValues,
  RecommendCombosRequest,
} from "@/lib/recommend-form";
import { memo } from "react";
import { Controller, useFormState, type Control } from "react-hook-form";
import * as styles from "./ScreenInput.css";

const INCOME_TYPES = ["직장인", "사업자", "기타"] as const;
type IncomeType = (typeof INCOME_TYPES)[number];

const INCOME_TYPE_VALUES: Record<
  IncomeType,
  RecommendCombosFormValues["income_type"]
> = {
  직장인: "employee",
  사업자: "freelancer",
  기타: "none",
};

const INCOME_TYPE_LABELS: Record<
  RecommendCombosFormValues["income_type"],
  IncomeType
> = {
  employee: "직장인",
  freelancer: "사업자",
  none: "기타",
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

const AgeField = memo(function AgeField({ control }: { control: FormControl }) {
  const { errors } = useFormState({ control, name: "age" });

  return (
    <FieldRow label="나이" hint="만 나이 기준" required>
      <Controller
        name="age"
        control={control}
        render={({ field }) => (
          <>
            <InputBox
              value={field.value}
              onChange={(v) => field.onChange(digitsOnly(v).slice(0, 3))}
              placeholder="0"
              suffix="세"
              align="right"
              inputMode="numeric"
            />
            <FieldError message={errors.age?.message} />
          </>
        )}
      />
    </FieldRow>
  );
});

const AnnualSalaryField = memo(function AnnualSalaryField({
  control,
}: {
  control: FormControl;
}) {
  const { errors } = useFormState({ control, name: "annual_salary" });

  return (
    <FieldRow label="연봉" hint="세전 총급여 기준" required>
      <Controller
        name="annual_salary"
        control={control}
        render={({ field }) => (
          <>
            <InputBox
              value={moneyInputValue(field.value)}
              onChange={(v) => field.onChange(digitsOnly(v))}
              placeholder="0"
              suffix="만원"
              align="right"
              strong
              inputMode="numeric"
            />
            <FieldError message={errors.annual_salary?.message} />
          </>
        )}
      />
    </FieldRow>
  );
});

const IncomeTypeField = memo(function IncomeTypeField({
  control,
}: {
  control: FormControl;
}) {
  return (
    <FieldRow label="소득 유형" required>
      <Controller
        name="income_type"
        control={control}
        render={({ field }) => (
          <Segmented
            options={INCOME_TYPES}
            value={INCOME_TYPE_LABELS[field.value]}
            onChange={(value) => field.onChange(INCOME_TYPE_VALUES[value])}
          />
        )}
      />
    </FieldRow>
  );
});

interface BasicStepProps {
  control: FormControl;
}

export const BasicStep = memo(function BasicStep({ control }: BasicStepProps) {
  return (
    <div className={styles.stepCol}>
      <AgeField control={control} />
      <AnnualSalaryField control={control} />
      <IncomeTypeField control={control} />
    </div>
  );
});
