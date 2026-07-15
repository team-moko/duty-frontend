import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// 사이트 대표 OG 이미지 (1200x630 PNG).
// 폴더명을 opengraph-image로 두면 파일 컨벤션이 하위 세그먼트(/s)로 상속되며
// generateMetadata 기반 동적 OG보다 우선순위가 높아 이를 덮어쓴다. 그래서 일반 라우트(/og)로 둔다.
// Node.js 런타임에서 정적 폰트를 fs로 읽어 한글을 렌더한다(satori는 variable woff 미지원).

const BRAND_BLUE = "#2F6BF0";

export async function GET() {
  // process.cwd()는 Next.js 프로젝트 루트. /s/og 라우트와 동일한 방식으로 읽는다.
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
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: "#FFFFFF",
            borderRadius: 40,
            padding: "64px 72px",
            boxShadow: "0 24px 60px rgba(0,0,0,0.18)",
          }}
        >
          {/* 서비스명 */}
          <span style={{ fontSize: 88, color: BRAND_BLUE, lineHeight: 1.2 }}>
            내 절세 전략 찾기
          </span>

          {/* 태그라인 */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: 28,
              color: "#4B5563",
              fontSize: 40,
              lineHeight: 1.4,
            }}
          >
            <span>연봉·자산·가족 정보로</span>
            <span>가장 유리한 절세 계좌 조합을 추천해 드려요</span>
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
          getsavemate.com
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
