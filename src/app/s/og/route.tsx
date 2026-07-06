import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { getTaxType } from "@/lib/taxType";
import { normalizeShareParams } from "../shareParams";

// SNS 공유용 동적 OG 이미지 (1200x630 PNG).
// 폴더명을 opengraph-image로 두면 파일 컨벤션과 충돌하므로 일반 라우트(/s/og)로 둔다.
// Node.js 런타임에서 정적 폰트를 fs로 읽어 한글을 렌더한다(satori는 variable woff 미지원).

const BRAND_BLUE = "#2F6BF0";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const { rate, combos } = normalizeShareParams({
    rate: searchParams.get("rate") ?? undefined,
    combos: searchParams.get("combos") ?? undefined,
    strategy: searchParams.get("strategy") ?? undefined,
  });

  const type = getTaxType(rate);

  // process.cwd()는 Next.js 프로젝트 루트. 커스텀 폰트 예제 방식 그대로 읽는다.
  const pretendardBold = await readFile(
    join(process.cwd(), "src/fonts/og/Pretendard-Bold.woff")
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: `linear-gradient(135deg, ${BRAND_BLUE} 0%, #1E4FD1 100%)`,
          padding: "40px 48px",
        }}
      >
        {/* 흰 카드 */}
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: "#FFFFFF",
            borderRadius: 40,
            padding: "36px 64px",
            boxShadow: "0 24px 60px rgba(0,0,0,0.18)",
          }}
        >
          {/* 절세 유형 */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              color: BRAND_BLUE,
              fontSize: 40,
            }}
          >
            <span>{type.emoji}</span>
            <span>{type.name}</span>
          </div>

          {/* 환급률 지표 */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: 16,
            }}
          >
            <span style={{ fontSize: 40, color: "#4B5563" }}>
              계좌를 잘 조합하면
            </span>
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                color: BRAND_BLUE,
                marginTop: 4,
              }}
            >
              <span style={{ fontSize: 150, lineHeight: 1 }}>{rate}</span>
              <span style={{ fontSize: 76, marginBottom: 16 }}>%</span>
            </div>
            <span style={{ fontSize: 40, color: "#4B5563", marginTop: 4 }}>
              까지 돌려받을 수 있어요
            </span>
          </div>

          {/* 계좌 조합 칩 */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 16,
              marginTop: 24,
            }}
          >
            {combos.map((combo) => (
              <div
                key={combo}
                style={{
                  display: "flex",
                  background: "#EAF1FF",
                  color: BRAND_BLUE,
                  fontSize: 34,
                  padding: "14px 28px",
                  borderRadius: 999,
                }}
              >
                {combo}
              </div>
            ))}
          </div>
        </div>

        {/* 하단 브랜딩 */}
        <div
          style={{
            display: "flex",
            color: "#FFFFFF",
            fontSize: 32,
            marginTop: 24,
            opacity: 0.95,
          }}
        >
          jeolse.kr
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Pretendard",
          data: pretendardBold,
          style: "normal",
          weight: 700,
        },
      ],
    }
  );
}
