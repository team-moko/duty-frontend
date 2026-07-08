"use client";

import { FieldRow, Tile } from "@/components";
import type {
  RecommendCombosFormValues,
  RecommendCombosRequest,
} from "@/lib/recommend-form";
import { memo, useCallback } from "react";
import {
  type Control,
  type UseFormClearErrors,
  type UseFormGetValues,
  type UseFormSetValue,
  useFormState,
  useWatch,
} from "react-hook-form";
import * as styles from "./ScreenInput.css";

const INVEST_TYPE_OPTIONS = [
  { label: "국내 상장주식", value: "domestic_stock" },
  { label: "해외주식 (미국 등)", value: "foreign_stock" },
  { label: "국내주식형 ETF", value: "etf_domestic" },
  { label: "국내 상장 해외지수 ETF", value: "etf_foreign" },
  { label: "공모펀드", value: "fund" },
  { label: "예·적금", value: "deposit" },
  { label: "채권", value: "bond" },
  { label: "리츠", value: "reit" },
] as const satisfies readonly {
  label: string;
  value: RecommendCombosFormValues["invest_types"][number];
}[];

type InvestType = RecommendCombosFormValues["invest_types"][number];

interface InvestTypeOptionTileProps {
  label: string;
  value: InvestType;
  selected: boolean;
  onToggle: (value: InvestType) => void;
}

const InvestTypeOptionTile = memo(function InvestTypeOptionTile({
  label,
  value,
  selected,
  onToggle,
}: InvestTypeOptionTileProps) {
  return <Tile label={label} on={selected} onClick={() => onToggle(value)} />;
});

interface NoInvestTileProps {
  selected: boolean;
  onToggle: () => void;
}

const NoInvestTile = memo(function NoInvestTile({
  selected,
  onToggle,
}: NoInvestTileProps) {
  return (
    <Tile
      label="해당 없음 (투자 중인 종목이 없어요)"
      on={selected}
      onClick={onToggle}
      full
    />
  );
});

function FieldError({ message }: { message?: string }) {
  if (!message) return null;

  return (
    <p className={styles.fieldError} role="alert">
      {message}
    </p>
  );
}

interface InvestTypeFieldProps {
  control: Control<RecommendCombosFormValues, unknown, RecommendCombosRequest>;
  getValues: UseFormGetValues<RecommendCombosFormValues>;
  setValue: UseFormSetValue<RecommendCombosFormValues>;
  clearErrors: UseFormClearErrors<RecommendCombosFormValues>;
}

export function InvestTypeField({
  control,
  getValues,
  setValue,
  clearErrors,
}: InvestTypeFieldProps) {
  const investTypes = useWatch({ control, name: "invest_types" });
  const noInvest = useWatch({ control, name: "no_invest" });
  const { errors } = useFormState({ control, name: "invest_types" });

  const toggleInvestType = useCallback(
    (type: InvestType) => {
      const current = getValues("invest_types");
      const selected = current.includes(type);

      setValue(
        "invest_types",
        selected ? current.filter((item) => item !== type) : [...current, type],
        {
          shouldDirty: true,
          shouldTouch: true,
          shouldValidate: true,
        },
      );
      setValue("no_invest", false, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
    },
    [getValues, setValue],
  );

  const toggleNoInvest = useCallback(() => {
    const next = !getValues("no_invest");

    setValue("no_invest", next, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
    if (next) {
      setValue("invest_types", [], {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
      clearErrors("invest_types");
    }
  }, [clearErrors, getValues, setValue]);

  return (
    <FieldRow
      label="보유 투자 유형"
      hint="해당하는 항목을 모두 선택하세요"
      required
    >
      <div className={styles.investGrid}>
        {INVEST_TYPE_OPTIONS.map((option) => (
          <InvestTypeOptionTile
            key={option.value}
            label={option.label}
            value={option.value}
            selected={investTypes.includes(option.value)}
            onToggle={toggleInvestType}
          />
        ))}
        <NoInvestTile selected={noInvest} onToggle={toggleNoInvest} />
      </div>
      <FieldError message={errors.invest_types?.message} />
    </FieldRow>
  );
}
