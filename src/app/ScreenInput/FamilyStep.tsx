"use client";

import { AccountToggle, CheckRow, FieldRow, InputBox } from "@/components";
import { digitsOnly, won } from "@/lib/format";
import type {
  RecommendCombosFormValues,
  RecommendCombosRequest,
} from "@/lib/recommend-form";
import { memo } from "react";
import {
  Controller,
  useFormState,
  useWatch,
  type Control,
  type UseFormClearErrors,
  type UseFormSetValue,
} from "react-hook-form";
import * as styles from "./ScreenInput.css";

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

const FinancialIncomeField = memo(function FinancialIncomeField({
  control,
}: {
  control: FormControl;
}) {
  const { errors } = useFormState({ control, name: "financial_income" });

  return (
    <FieldRow label="연 금융소득" hint="이자 + 배당 합산">
      <Controller
        name="financial_income"
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
            <FieldError message={errors.financial_income?.message} />
          </>
        )}
      />
    </FieldRow>
  );
});

const DividendIncomeField = memo(function DividendIncomeField({
  control,
}: {
  control: FormControl;
}) {
  const { errors } = useFormState({ control, name: "dividend_income" });

  return (
    <FieldRow label="연 배당소득">
      <Controller
        name="dividend_income"
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
            <FieldError message={errors.dividend_income?.message} />
          </>
        )}
      />
    </FieldRow>
  );
});

const HoldsHighDividendCheck = memo(function HoldsHighDividendCheck({
  control,
}: {
  control: FormControl;
}) {
  return (
    <Controller
      name="holds_high_dividend"
      control={control}
      render={({ field }) => (
        <CheckRow
          label="고배당주 보유"
          checked={field.value}
          onChange={field.onChange}
        />
      )}
    />
  );
});

const HasSpouseCheck = memo(function HasSpouseCheck({
  control,
}: {
  control: FormControl;
}) {
  return (
    <Controller
      name="has_spouse"
      control={control}
      render={({ field }) => (
        <CheckRow
          label="배우자 있음"
          checked={field.value}
          onChange={field.onChange}
        />
      )}
    />
  );
});

const MinorChildrenCheck = memo(function MinorChildrenCheck({
  control,
}: {
  control: FormControl;
}) {
  const hasChild = useWatch({ control, name: "has_children" });

  return (
    <Controller
      name="has_minor_children"
      control={control}
      render={({ field }) => (
        <CheckRow
          label="미성년 자녀 포함"
          checked={hasChild && field.value}
          onChange={field.onChange}
          compact
        />
      )}
    />
  );
});

const HasChildrenField = memo(function HasChildrenField({
  control,
  setValue,
  clearErrors,
}: {
  control: FormControl;
  setValue: UseFormSetValue<RecommendCombosFormValues>;
  clearErrors: UseFormClearErrors<RecommendCombosFormValues>;
}) {
  return (
    <Controller
      name="has_children"
      control={control}
      render={({ field }) => (
        <AccountToggle
          label="자녀 있음"
          on={field.value}
          onToggle={() => {
            const next = !field.value;
            field.onChange(next);
            if (!next) {
              setValue("has_minor_children", false, {
                shouldDirty: true,
                shouldTouch: true,
              });
              clearErrors("has_minor_children");
            }
          }}
        >
          <MinorChildrenCheck control={control} />
        </AccountToggle>
      )}
    />
  );
});

interface FamilyStepProps {
  control: FormControl;
  setValue: UseFormSetValue<RecommendCombosFormValues>;
  clearErrors: UseFormClearErrors<RecommendCombosFormValues>;
}

export const FamilyStep = memo(function FamilyStep({
  control,
  setValue,
  clearErrors,
}: FamilyStepProps) {
  return (
    <div className={styles.stepCol}>
      <FinancialIncomeField control={control} />
      <DividendIncomeField control={control} />
      <FieldRow label="해당사항">
        <div className={styles.checkCol}>
          <HoldsHighDividendCheck control={control} />
          <HasSpouseCheck control={control} />
          <HasChildrenField
            control={control}
            setValue={setValue}
            clearErrors={clearErrors}
          />
        </div>
      </FieldRow>
    </div>
  );
});
