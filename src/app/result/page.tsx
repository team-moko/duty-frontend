import { AppBar, CTAButton } from "@/components";
import { getRecommendResult } from "@/lib/recommend-result.server";
import { ScreenResult } from "./ScreenResult";
import * as styles from "./ScreenResult.css";

export default async function Page() {
  const result = await getRecommendResult().catch(() => null);

  if (!result) {
    return (
      <div className={styles.screen}>
        <AppBar title="추천 결과" accent />
        <div className={styles.empty}>
          <p className={styles.loading}>저장된 입력 정보가 없어요.</p>
          <CTAButton href="/">정보 입력하러 가기</CTAButton>
        </div>
      </div>
    );
  }

  return <ScreenResult result={result} />;
}
