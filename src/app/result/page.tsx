import type { Viewport } from "next";
import { AppBar } from "@/components/AppBar/AppBar";
import { CTAButton } from "@/components/CTAButton/CTAButton";
import { getRecommendResult } from "@/lib/recommend-result.server";
import { ScreenResult } from "./ScreenResult";
import * as styles from "./ScreenResult.css";

// 상단이 파란 히어로라 상태바 영역도 같은 색으로 틴트한다. (루트 기본값 appBg 덮어쓰기)
export const viewport: Viewport = {
  themeColor: "#2F6BF0",
};

export default async function Page() {
  const result = await getRecommendResult().catch(() => null);

  if (!result) {
    return (
      <div className={styles.screen}>
        <AppBar title="추천 결과" accent />
        <div className={styles.empty}>
          <p className={styles.loading}>저장된 입력 정보가 없어요.</p>
          <CTAButton href="/start">정보 입력하러 가기</CTAButton>
        </div>
      </div>
    );
  }

  return <ScreenResult result={result} />;
}
