"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AppBar,
  CTAButton,
  FieldRow,
  InputBox,
  RadioPill,
  CheckRow,
  Segmented,
  BottomBar,
} from "@/components";
import { won, digitsOnly } from "@/lib/format";
import * as styles from "./page.css";

const ASSET_TABS = ["저축", "투자", "부동산"] as const;
type AssetTab = (typeof ASSET_TABS)[number];

const MARRIAGE = ["미혼", "기혼"] as const;
type Marriage = (typeof MARRIAGE)[number];

export default function ScreenInput() {
  const router = useRouter();

  const [birthYear, setBirthYear] = useState("1996");
  const [salary, setSalary] = useState("4200");
  const [assetTab, setAssetTab] = useState<AssetTab>("저축");
  const [assets, setAssets] = useState<Record<AssetTab, string>>({
    저축: "4000",
    투자: "1000",
    부동산: "",
  });
  const [married, setMarried] = useState<Marriage>("미혼");
  const [isNewlywed, setIsNewlywed] = useState(false);
  const [dependents, setDependents] = useState("0");
  const [isDisabled, setIsDisabled] = useState(false);
  const [isVeteran, setIsVeteran] = useState(false);

  const assetSummary = ASSET_TABS.filter((k) => assets[k] !== "")
    .map((k) => `${k} ${won(assets[k])}`)
    .join(" · ");

  return (
    <div className={styles.screen}>
      <AppBar title="내 절세 전략 찾기" step={1} totalSteps={2} showBack={false} />

      <div className={styles.intro}>
        <h1 className={styles.title}>
          내 상황을 알려주시면
          <br />
          가장 유리한 절세 조합을
          <br />
          찾아드릴게요
        </h1>
        <p className={styles.subtitle}>입력한 정보는 계산에만 쓰이고 저장되지 않아요.</p>
      </div>

      <div className={styles.formCard}>
        <FieldRow label="태어난 해" hint="만 나이로 청년 혜택을 판별해요">
          <InputBox
            value={birthYear}
            onChange={(v) => setBirthYear(digitsOnly(v).slice(0, 4))}
            placeholder="예) 1996"
            suffix="년생"
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

        <FieldRow label="보유 자산">
          <div className={styles.assetCol}>
            <Segmented options={ASSET_TABS} value={assetTab} onChange={setAssetTab} />
            <InputBox
              value={assets[assetTab] === "" ? "" : won(assets[assetTab])}
              onChange={(v) => setAssets((prev) => ({ ...prev, [assetTab]: digitsOnly(v) }))}
              placeholder="0"
              suffix="만원"
              align="right"
              strong
              inputMode="numeric"
            />
            <div className={styles.assetSummary}>
              <span className={styles.assetSummaryLabel}>입력한 자산</span>
              <div className={styles.assetSummaryDivider} />
              <span className={styles.assetSummaryValue}>
                {assetSummary ? `${assetSummary}만원` : "아직 없어요"}
              </span>
            </div>
          </div>
        </FieldRow>

        <div className={styles.divider} />

        <FieldRow label="결혼 여부">
          <RadioPill options={MARRIAGE} value={married} onChange={setMarried} />
          <div className={styles.newlywedGap} />
          <CheckRow
            label="신혼이에요"
            sub="혼인신고 후 3년 이하"
            checked={isNewlywed}
            onChange={setIsNewlywed}
          />
        </FieldRow>

        <FieldRow label="부양가족 수" hint="본인 제외, 기본공제 대상">
          <InputBox
            value={dependents === "" ? "" : won(dependents)}
            onChange={(v) => setDependents(digitsOnly(v))}
            placeholder="0"
            suffix="명"
            align="right"
            inputMode="numeric"
          />
        </FieldRow>

        <FieldRow label="해당사항" hint="추가 비과세 한도가 적용돼요">
          <div className={styles.checkCol}>
            <CheckRow label="장애인" checked={isDisabled} onChange={setIsDisabled} />
            <CheckRow label="국가유공자" checked={isVeteran} onChange={setIsVeteran} />
          </div>
        </FieldRow>
      </div>

      <BottomBar tone="white">
        <CTAButton onClick={() => router.push("/result")}>내 절세 전략 보기</CTAButton>
      </BottomBar>
    </div>
  );
}
