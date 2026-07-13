"use client";

import { AccountToggle, FieldRow, InputBox } from "@/components";
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

const PensionContributionField = memo(function PensionContributionField({
  control,
}: {
  control: FormControl;
}) {
  const { errors } = useFormState({ control, name: "pension_contribution" });

  return (
    <FieldRow label="연금저축 연 납입액 (최대 600만원)">
      <Controller
        name="pension_contribution"
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
            <FieldError message={errors.pension_contribution?.message} />
          </>
        )}
      />
    </FieldRow>
  );
});

const PensionAccountField = memo(function PensionAccountField({
  control,
  clearErrors,
}: {
  control: FormControl;
  clearErrors: UseFormClearErrors<RecommendCombosFormValues>;
}) {
  return (
    <Controller
      name="has_pension"
      control={control}
      render={({ field }) => (
        <AccountToggle
          label="연금저축 보유"
          on={field.value}
          onToggle={() => {
            const next = !field.value;
            field.onChange(next);
            if (!next) clearErrors("pension_contribution");
          }}
        >
          <PensionContributionField control={control} />
        </AccountToggle>
      )}
    />
  );
});

const IrpContributionField = memo(function IrpContributionField({
  control,
}: {
  control: FormControl;
}) {
  const { errors } = useFormState({ control, name: "irp_contribution" });

  return (
    <FieldRow label="IRP 연 납입액 (최대 300만원)">
      <Controller
        name="irp_contribution"
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
            <FieldError message={errors.irp_contribution?.message} />
          </>
        )}
      />
    </FieldRow>
  );
});

const IrpAccountField = memo(function IrpAccountField({
  control,
  clearErrors,
}: {
  control: FormControl;
  clearErrors: UseFormClearErrors<RecommendCombosFormValues>;
}) {
  return (
    <Controller
      name="has_irp"
      control={control}
      render={({ field }) => (
        <AccountToggle
          label="IRP 보유"
          on={field.value}
          onToggle={() => {
            const next = !field.value;
            field.onChange(next);
            if (!next) clearErrors("irp_contribution");
          }}
        >
          <IrpContributionField control={control} />
        </AccountToggle>
      )}
    />
  );
});

const IsaAccountField = memo(function IsaAccountField({
  control,
}: {
  control: FormControl;
}) {
  return (
    <Controller
      name="has_isa"
      control={control}
      render={({ field }) => (
        <AccountToggle
          label="ISA 보유"
          on={field.value}
          onToggle={() => field.onChange(!field.value)}
        />
      )}
    />
  );
});

interface AccountStepProps {
  control: FormControl;
  clearErrors: UseFormClearErrors<RecommendCombosFormValues>;
}

export const AccountStep = memo(function AccountStep({
  control,
  clearErrors,
}: AccountStepProps) {
  return (
    <div className={styles.stepColTight}>
      <p className={styles.accountIntro}>
        이미 가입한 계좌가 있다면 알려주세요. 남은 납입 한도를 계산에 반영해요.
      </p>
      <PensionAccountField control={control} clearErrors={clearErrors} />
      <IrpAccountField control={control} clearErrors={clearErrors} />
      <IsaAccountField control={control} />
    </div>
  );
});
