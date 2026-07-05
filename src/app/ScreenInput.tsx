"use client";

import {
  postRecommendCombos,
  type RecommendCombosRequest,
} from "@/api/recommend";
import {
  AccountToggle,
  AppBar,
  CheckRow,
  CTAButton,
  FieldRow,
  FixedTopBar,
  InputBox,
  Segmented,
  Tile,
} from "@/components";
import { digitsOnly, won } from "@/lib/format";
import { motion } from "framer-motion";
import { saveRecommendResult } from "@/lib/recommend";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
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

const INCOME_TYPES = ["직장인", "사업자", "기타"] as const;
type IncomeType = (typeof INCOME_TYPES)[number];

const RISK_PROFILES = ["안정형", "중립형", "공격형"] as const;
type RiskProfile = (typeof RISK_PROFILES)[number];

const INVEST_TYPES = [
  "국내 상장주식",
  "해외주식 (미국 등)",
  "국내주식형 ETF",
  "국내 상장 해외지수 ETF",
  "공모펀드",
  "예·적금",
  "채권",
  "리츠",
] as const;
type InvestType = (typeof INVEST_TYPES)[number];

const INCOME_TYPE_VALUES: Record<
  IncomeType,
  RecommendCombosRequest["income_type"]
> = {
  직장인: "employee",
  사업자: "freelancer",
  기타: "none",
};

const INVEST_TYPE_VALUES: Record<
  InvestType,
  RecommendCombosRequest["invest_types"][number]
> = {
  "국내 상장주식": "domestic_stock",
  "해외주식 (미국 등)": "foreign_stock",
  "국내주식형 ETF": "etf_domestic",
  "국내 상장 해외지수 ETF": "etf_foreign",
  공모펀드: "fund",
  "예·적금": "deposit",
  채권: "bond",
  리츠: "reit",
};

const RISK_PROFILE_VALUES: Record<
  RiskProfile,
  RecommendCombosRequest["risk_tolerance"]
> = {
  안정형: "low",
  중립형: "medium",
  공격형: "high",
};

export function ScreenInput() {
  const router = useRouter();
  const [idx, setIdx] = useState(0);

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

  // 기본 정보
  const [age, setAge] = useState("");
  const [salary, setSalary] = useState("");
  const [incomeType, setIncomeType] = useState<IncomeType>("직장인");

  // 투자 현황
  const [investTypes, setInvestTypes] = useState<InvestType[]>([]);
  const [noInvest, setNoInvest] = useState(false);
  const [monthlyInvest, setMonthlyInvest] = useState("");
  const [risk, setRisk] = useState<RiskProfile>("안정형");
  const [overseasGain, setOverseasGain] = useState("");

  // 절세 계좌
  const [hasPension, setHasPension] = useState(false);
  const [pensionAnnual, setPensionAnnual] = useState("");
  const [hasIRP, setHasIRP] = useState(false);
  const [irpAnnual, setIrpAnnual] = useState("");
  const [hasISA, setHasISA] = useState(false);

  // 소득·가족
  const [financialIncome, setFinancialIncome] = useState("");
  const [dividendIncome, setDividendIncome] = useState("");
  const [hasHighDividend, setHasHighDividend] = useState(false);
  const [hasSpouse, setHasSpouse] = useState(false);
  const [hasChild, setHasChild] = useState(false);
  const [hasMinorChild, setHasMinorChild] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const current = STEPS[idx]!;
  const last = idx === STEPS.length - 1;

  const toggleInvestType = (type: InvestType) => {
    setNoInvest(false);
    setInvestTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  };

  // "해당 없음"은 개별 유형과 상호 배타 — 켜면 선택된 유형을 모두 비운다.
  const toggleNoInvest = () => {
    setNoInvest((prev) => {
      const next = !prev;
      if (next) setInvestTypes([]);
      return next;
    });
  };

  const submitRecommend = async () => {
    const body: RecommendCombosRequest = {
      age: Number(age),
      annual_salary: Number(salary || 0),
      income_type: INCOME_TYPE_VALUES[incomeType],
      invest_types: noInvest
        ? []
        : investTypes.map((type) => INVEST_TYPE_VALUES[type]),
      monthly_invest: Number(monthlyInvest || 0),
      has_isa: hasISA,
      has_pension: hasPension,
      has_irp: hasIRP,
      pension_contribution: hasPension ? Number(pensionAnnual || 0) : 0,
      irp_contribution: hasIRP ? Number(irpAnnual || 0) : 0,
      financial_income: Number(financialIncome || 0),
      risk_tolerance: RISK_PROFILE_VALUES[risk],
      has_spouse: hasSpouse,
      has_children: hasChild,
      has_minor_children: hasChild && hasMinorChild,
      foreign_stock_unrealized_profit: Number(overseasGain || 0),
      dividend_income: Number(dividendIncome || 0),
      holds_high_dividend: hasHighDividend,
    };

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const data = await postRecommendCombos(body);
      saveRecommendResult(data);
      router.push("/result");
    } catch {
      setSubmitError(
        "추천 결과를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const goNext = () => {
    setSubmitError(null);
    if (last) {
      submitRecommend();
      return;
    }
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
        {idx === 0 && (
          <div className={styles.stepCol}>
            <FieldRow label="나이" required>
              <InputBox
                value={age}
                onChange={(v) => setAge(digitsOnly(v).slice(0, 3))}
                placeholder="0"
                suffix="세"
                align="right"
                inputMode="numeric"
              />
            </FieldRow>
            <FieldRow label="연봉" hint="세전 총급여 기준" required>
              <InputBox
                value={salary === "" ? "" : won(salary)}
                onChange={(v) => setSalary(digitsOnly(v))}
                placeholder="0"
                suffix="만원"
                align="right"
                strong
                inputMode="numeric"
              />
            </FieldRow>
            <FieldRow label="소득 유형" required>
              <Segmented
                options={INCOME_TYPES}
                value={incomeType}
                onChange={setIncomeType}
              />
            </FieldRow>
          </div>
        )}

        {idx === 1 && (
          <div className={styles.stepCol}>
            <FieldRow
              label="보유 투자 유형"
              hint="해당하는 항목을 모두 선택하세요"
              required
            >
              <div className={styles.investGrid}>
                {INVEST_TYPES.map((type) => (
                  <Tile
                    key={type}
                    label={type}
                    on={investTypes.includes(type)}
                    onClick={() => toggleInvestType(type)}
                  />
                ))}
                <Tile
                  label="해당 없음 (투자 중인 종목이 없어요)"
                  on={noInvest}
                  onClick={toggleNoInvest}
                  full
                />
              </div>
            </FieldRow>
            <FieldRow label="월 투자 가능액" required>
              <InputBox
                value={monthlyInvest === "" ? "" : won(monthlyInvest)}
                onChange={(v) => setMonthlyInvest(digitsOnly(v))}
                placeholder="0"
                suffix="만원"
                align="right"
                inputMode="numeric"
              />
            </FieldRow>
            <FieldRow label="투자 성향" required>
              <Segmented
                options={RISK_PROFILES}
                value={risk}
                onChange={setRisk}
              />
            </FieldRow>
            <FieldRow
              label="해외주식 미실현 수익"
              hint="양도소득세 절세 판단에 쓰여요"
            >
              <InputBox
                value={overseasGain === "" ? "" : won(overseasGain)}
                onChange={(v) => setOverseasGain(digitsOnly(v))}
                placeholder="0"
                suffix="만원"
                align="right"
                inputMode="numeric"
              />
            </FieldRow>
          </div>
        )}

        {idx === 2 && (
          <div className={styles.stepColTight}>
            <p className={styles.accountIntro}>
              이미 가입한 계좌가 있다면 알려주세요. 남은 납입 한도를 계산에
              반영해요.
            </p>
            <AccountToggle
              label="연금저축 보유"
              on={hasPension}
              onToggle={() => setHasPension((v) => !v)}
            >
              <FieldRow label="연금저축 연 납입액 (최대 600만원)">
                <InputBox
                  value={pensionAnnual === "" ? "" : won(pensionAnnual)}
                  onChange={(v) => setPensionAnnual(digitsOnly(v))}
                  placeholder="0"
                  suffix="만원"
                  align="right"
                  inputMode="numeric"
                />
              </FieldRow>
            </AccountToggle>
            <AccountToggle
              label="IRP 보유"
              on={hasIRP}
              onToggle={() => setHasIRP((v) => !v)}
            >
              <FieldRow label="IRP 연 납입액 (최대 300만원)">
                <InputBox
                  value={irpAnnual === "" ? "" : won(irpAnnual)}
                  onChange={(v) => setIrpAnnual(digitsOnly(v))}
                  placeholder="0"
                  suffix="만원"
                  align="right"
                  inputMode="numeric"
                />
              </FieldRow>
            </AccountToggle>
            <AccountToggle
              label="ISA 보유"
              on={hasISA}
              onToggle={() => setHasISA((v) => !v)}
            />
          </div>
        )}

        {idx === 3 && (
          <div className={styles.stepCol}>
            <FieldRow label="연 금융소득" hint="이자 + 배당 합산">
              <InputBox
                value={financialIncome === "" ? "" : won(financialIncome)}
                onChange={(v) => setFinancialIncome(digitsOnly(v))}
                placeholder="0"
                suffix="만원"
                align="right"
                inputMode="numeric"
              />
            </FieldRow>
            <FieldRow label="연 배당소득">
              <InputBox
                value={dividendIncome === "" ? "" : won(dividendIncome)}
                onChange={(v) => setDividendIncome(digitsOnly(v))}
                placeholder="0"
                suffix="만원"
                align="right"
                inputMode="numeric"
              />
            </FieldRow>
            <FieldRow label="해당사항">
              <div className={styles.checkCol}>
                <CheckRow
                  label="고배당주 보유"
                  checked={hasHighDividend}
                  onChange={setHasHighDividend}
                />
                <CheckRow
                  label="배우자 있음"
                  checked={hasSpouse}
                  onChange={setHasSpouse}
                />
                <AccountToggle
                  label="자녀 있음"
                  on={hasChild}
                  onToggle={() =>
                    setHasChild((v) => {
                      if (v) setHasMinorChild(false);
                      return !v;
                    })
                  }
                >
                  <CheckRow
                    label="미성년 자녀 포함"
                    checked={hasMinorChild}
                    onChange={setHasMinorChild}
                    compact
                  />
                </AccountToggle>
              </div>
            </FieldRow>
          </div>
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
