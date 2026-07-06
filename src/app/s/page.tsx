import type { Metadata } from "next";
import { ScreenShare } from "./ScreenShare";
import { normalizeShareParams } from "./shareParams";

type SharePageProps = {
  searchParams: Promise<{
    rate?: string;
    combos?: string;
    strategy?: string;
    norate?: string;
  }>;
};

// 공유 링크 랜딩: jeolse.kr/s
// 개인정보(이름·금액·나이·연봉)는 받지 않고, 예상 환급률(%)·계좌 조합·전략 문구만 파라미터로 렌더한다.
export default async function SharePage({ searchParams }: SharePageProps) {
  const { rate, combos, strategy } = normalizeShareParams(await searchParams);

  return <ScreenShare rate={rate} combos={combos} strategy={strategy} />;
}

// SNS 공유용 메타데이터 — 쿼리에 담긴 환급률·전략에 맞춰 동적으로 생성한다.
export async function generateMetadata({
  searchParams,
}: SharePageProps): Promise<Metadata> {
  const { rate, combos, strategy } = normalizeShareParams(await searchParams);

  const title =
    rate === null
      ? "납입 없이도 세금이 줄어드는 절세 전략"
      : `계좌 조합만 잘 짜도 환급률 ${rate}%`;
  const description = `${strategy} 내 조건으로 30초 만에 확인해보세요.`;

  // OG 이미지 라우트 URL — 한글 파라미터가 안전하게 인코딩되도록 URLSearchParams로 조립한다.
  const ogParams = new URLSearchParams({ combos: combos.join(",") });
  if (rate === null) {
    ogParams.set("norate", "1");
  } else {
    ogParams.set("rate", String(rate));
  }
  const ogImageUrl = `/s/og?${ogParams.toString()}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: "/s",
      siteName: "내 절세 전략 찾기",
      locale: "ko_KR",
      type: "website",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
  };
}
