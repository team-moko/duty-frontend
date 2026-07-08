"use client";

import { saveRecommendFormAction } from "@/app/recommend.actions";
import { AppBar, CTAButton, FixedTopBar } from "@/components";
import {
  RECOMMEND_FORM_DEFAULT_VALUES,
  recommendCombosFormSchema,
  type RecommendCombosFormValues,
  type RecommendCombosRequest,
} from "@/lib/recommend-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { type FieldPath, useForm } from "react-hook-form";
import { AccountStep } from "./AccountStep";
import { BasicStep } from "./BasicStep";
import { FamilyStep } from "./FamilyStep";
import { InvestStep } from "./InvestStep";
import * as styles from "./ScreenInput.css";

const STEPS = [
  { key: "basic", label: "기본 정보", title: "기본 정보를\n알려주세요" },
  { key: "invest", label: "투자 현황", title: "투자는 어떻게\n하고 계세요?" },
  {
    key: "account",
    label: "절세 계좌",
    title: "절세 계좌,\n이미 가지고 있나요?",
  },
  {
    key: "family",
    label: "소득·가족",
    title: "소득과 가족\n정보를 알려주세요",
  },
] as const;

const STEP_FIELDS = [
  ["age", "annual_salary", "income_type"],
  [
    "invest_types",
    "no_invest",
    "monthly_invest",
    "risk_tolerance",
    "foreign_stock_unrealized_profit",
  ],
  [
    "has_pension",
    "pension_contribution",
    "has_irp",
    "irp_contribution",
    "has_isa",
  ],
  [
    "financial_income",
    "dividend_income",
    "holds_high_dividend",
    "has_spouse",
    "has_children",
    "has_minor_children",
  ],
] as const satisfies readonly (readonly FieldPath<RecommendCombosFormValues>[])[];

export function ScreenInput() {
  const router = useRouter();
  const [idx, setIdx] = useState(0);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    control,
    clearErrors,
    getValues,
    handleSubmit,
    setValue,
    trigger,
    formState: { isSubmitting },
  } = useForm<RecommendCombosFormValues, unknown, RecommendCombosRequest>({
    resolver: zodResolver(recommendCombosFormSchema),
    defaultValues: RECOMMEND_FORM_DEFAULT_VALUES,
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  // 고정 헤더가 흐름에서 빠지므로 그 높이만큼 하단 콘텐츠에 여백을 확보한다.
  const topFixedRef = useRef<HTMLDivElement>(null);
  const [topFixedH, setTopFixedH] = useState(0);
  useEffect(() => {
    const el = topFixedRef.current;
    if (!el) return;
    setTopFixedH(el.offsetHeight);
    const observer = new ResizeObserver(() => setTopFixedH(el.offsetHeight));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const current = STEPS[idx]!;
  const last = idx === STEPS.length - 1;

  const submitRecommend = handleSubmit(async (body) => {
    setSubmitError(null);

    try {
      await saveRecommendFormAction(body);
      router.push("/result");
    } catch {
      setSubmitError(
        "추천 결과를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.",
      );
    }
  });

  const goNext = async () => {
    setSubmitError(null);
    if (last) {
      await submitRecommend();
      return;
    }

    const stepValid = await trigger([...STEP_FIELDS[idx]!], {
      shouldFocus: true,
    });
    if (!stepValid) return;

    setIdx((i) => i + 1);
  };

  const goPrev = () => {
    setSubmitError(null);
    setIdx((i) => Math.max(0, i - 1));
  };

  return (
    <div className={styles.screen}>
      <FixedTopBar variant="solid" ref={topFixedRef}>
        <AppBar title="내 절세 전략 찾기" showBack={idx > 0} onBack={goPrev} />
        <div className={styles.progress}>
          <div className={styles.progressBars}>
            {STEPS.map((s, i) => (
              <div key={s.key} className={styles.barTrack}>
                <motion.div
                  className={styles.barFill}
                  initial={false}
                  animate={{ scaleX: i <= idx ? 1 : 0 }}
                  transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                />
              </div>
            ))}
          </div>
          <div className={styles.progressMeta}>
            <span className={styles.progressLabel}>{current.label}</span>
            <span className={styles.progressCount}>
              <span className={styles.progressCurrent}>{idx + 1}</span> /{" "}
              {STEPS.length}
            </span>
          </div>
        </div>
      </FixedTopBar>

      <div
        className={styles.topSpacer}
        style={{ height: topFixedH }}
        aria-hidden
      />

      <div className={styles.header}>
        <h1 className={styles.title}>{current.title}</h1>
      </div>

      <div className={styles.formCard}>
        {idx === 0 && <BasicStep control={control} />}

        {idx === 1 && (
          <InvestStep
            control={control}
            getValues={getValues}
            setValue={setValue}
            clearErrors={clearErrors}
          />
        )}

        {idx === 2 && (
          <AccountStep control={control} clearErrors={clearErrors} />
        )}

        {idx === 3 && (
          <FamilyStep
            control={control}
            setValue={setValue}
            clearErrors={clearErrors}
          />
        )}
      </div>

      <div className={styles.nav}>
        {submitError && (
          <p className={styles.submitError} role="alert">
            {submitError}
          </p>
        )}
        {last ? (
          <CTAButton onClick={goNext} disabled={isSubmitting}>
            {isSubmitting ? "추천 결과 불러오는 중..." : "내 절세 전략 보기"}
          </CTAButton>
        ) : (
          <div className={styles.navRow}>
            {idx > 0 && (
              <button type="button" className={styles.prevBtn} onClick={goPrev}>
                이전
              </button>
            )}
            <div className={styles.nextWrap}>
              <CTAButton onClick={goNext}>다음</CTAButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
