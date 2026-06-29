"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AppBar,
  CTAButton,
  FieldRow,
  InputBox,
  Segmented,
  CheckRow,
  Tile,
  AccountToggle,
} from "@/components";
import { won, digitsOnly } from "@/lib/format";
import * as styles from "./page.css";

const STEPS = [
  { key: "basic", label: "기본 정보", title: "기본 정보를\n알려주세요" },
  { key: "invest", label: "투자 현황", title: "투자는 어떻게\n하고 계세요?" },
  { key: "account", label: "절세 계좌", title: "절세 계좌,\n이미 가지고 있나요?" },
  { key: "family", label: "소득·가족", title: "소득과 가족\n정보를 알려주세요" },
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
const NONE_OF_INVEST = "해당 없음 (투자 중인 종목이 없어요)";

export default function ScreenInput() {
  const router = useRouter();
  const [idx, setIdx] = useState(0);

  // 기본 정보
  const [age, setAge] = useState("");
  const [salary, setSalary] = useState("");
  const [incomeType, setIncomeType] = useState<IncomeType>("직장인");

  // 투자 현황
  const [investTypes, setInvestTypes] = useState<string[]>([]);
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
  const [isaAnnual, setIsaAnnual] = useState("");

  // 소득·가족
  const [financialIncome, setFinancialIncome] = useState("");
  const [dividendIncome, setDividendIncome] = useState("");
  const [hasHighDividend, setHasHighDividend] = useState(false);
  const [hasSpouse, setHasSpouse] = useState(false);
  const [hasChild, setHasChild] = useState(false);
  const [hasMinorChild, setHasMinorChild] = useState(false);

  const current = STEPS[idx]!;
  const last = idx === STEPS.length - 1;

  // 스텝 전환 시 해당 스텝의 첫 입력란에 포커스 (초기 진입은 제외)
  const formRef = useRef<HTMLDivElement>(null);
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    formRef.current?.querySelector("input")?.focus();
  }, [idx]);

  const toggleInvestType = (type: string) => {
    setNoInvest(false);
    setInvestTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  };

  const toggleNoInvest = () => {
    setNoInvest((prev) => {
      const next = !prev;
      if (next) setInvestTypes([]);
      return next;
    });
  };

  const goNext = () => (last ? router.push("/result") : setIdx((i) => i + 1));
  const goPrev = () => setIdx((i) => Math.max(0, i - 1));

  return (
    <div className={styles.screen}>
      <div className={styles.topFixed}>
        <AppBar title="내 절세 전략 찾기" showBack={idx > 0} onBack={goPrev} />
        <div className={styles.progress}>
          <div className={styles.progressBars}>
            {STEPS.map((s, i) => (
              <div key={s.key} className={i <= idx ? styles.bar.on : styles.bar.off} />
            ))}
          </div>
          <div className={styles.progressMeta}>
            <span className={styles.progressLabel}>{current.label}</span>
            <span className={styles.progressCount}>
              <span className={styles.progressCurrent}>{idx + 1}</span> / {STEPS.length}
            </span>
          </div>
        </div>
      </div>

      <div className={styles.header}>
        <h1 className={styles.title}>{current.title}</h1>
      </div>

      <div className={styles.formCard} ref={formRef}>
        {idx === 0 && (
          <div className={styles.stepCol}>
            <FieldRow label="나이">
              <InputBox
                value={age}
                onChange={(v) => setAge(digitsOnly(v).slice(0, 3))}
                placeholder="0"
                suffix="세"
                align="right"
                inputMode="numeric"
              />
            </FieldRow>
            <FieldRow label="연봉" hint="세전 총급여 기준">
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
            <FieldRow label="소득 유형">
              <Segmented options={INCOME_TYPES} value={incomeType} onChange={setIncomeType} />
            </FieldRow>
          </div>
        )}

        {idx === 1 && (
          <div className={styles.stepCol}>
            <FieldRow label="보유 투자 유형" hint="해당하는 항목을 모두 선택하세요">
              <div className={styles.investGrid}>
                {INVEST_TYPES.map((type) => (
                  <Tile
                    key={type}
                    label={type}
                    on={investTypes.includes(type)}
                    onClick={() => toggleInvestType(type)}
                  />
                ))}
                <Tile label={NONE_OF_INVEST} on={noInvest} onClick={toggleNoInvest} full />
              </div>
            </FieldRow>
            <FieldRow label="월 투자 가능액">
              <InputBox
                value={monthlyInvest === "" ? "" : won(monthlyInvest)}
                onChange={(v) => setMonthlyInvest(digitsOnly(v))}
                placeholder="0"
                suffix="만원"
                align="right"
                inputMode="numeric"
              />
            </FieldRow>
            <FieldRow label="투자 성향">
              <Segmented options={RISK_PROFILES} value={risk} onChange={setRisk} />
            </FieldRow>
            <FieldRow label="해외주식 미실현 수익" hint="양도소득세 절세 판단에 쓰여요">
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
              이미 가입한 계좌가 있다면 알려주세요. 남은 납입 한도를 계산에 반영해요.
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
            <AccountToggle label="IRP 보유" on={hasIRP} onToggle={() => setHasIRP((v) => !v)}>
              <FieldRow label="IRP 연 납입액">
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
            <AccountToggle label="ISA 보유" on={hasISA} onToggle={() => setHasISA((v) => !v)}>
              <FieldRow label="ISA 연 납입액">
                <InputBox
                  value={isaAnnual === "" ? "" : won(isaAnnual)}
                  onChange={(v) => setIsaAnnual(digitsOnly(v))}
                  placeholder="0"
                  suffix="만원"
                  align="right"
                  inputMode="numeric"
                />
              </FieldRow>
            </AccountToggle>
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
                <CheckRow label="배우자 있음" checked={hasSpouse} onChange={setHasSpouse} />
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
        {last ? (
          <CTAButton onClick={goNext}>내 절세 전략 보기</CTAButton>
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
