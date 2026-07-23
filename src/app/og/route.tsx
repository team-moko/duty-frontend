import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// 사이트 대표 OG 이미지 (1200x630 PNG). 랜딩 히어로(src/app/ScreenLanding) 톤으로 구성.
// 폴더명을 opengraph-image로 두면 파일 컨벤션이 하위 세그먼트(/s)로 상속되며
// generateMetadata 기반 동적 OG보다 우선순위가 높아 이를 덮어쓴다. 그래서 일반 라우트(/og)로 둔다.
// Node.js 런타임에서 정적 폰트를 fs로 읽어 한글을 렌더한다(satori는 variable woff 미지원, 700 단일 웨이트).

const BLUE = "#2F6BF0";
const BLUE_DEEP = "#1D52C9";
const INK = "#191F28";
const INK3 = "#8B95A1";
const LINE = "#E5E8EB";
const GREEN = "#12B886";
const BLUE_WEAK = "#EAF1FE";

export async function GET() {
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
          justifyContent: "space-between",
          padding: "56px 80px 48px",
          // 랜딩 히어로의 소프트 블루 그라데이션 톤(상단 중앙 기준).
          backgroundImage:
            "radial-gradient(130% 80% at 50% -10%, #EAF1FE 0%, #F4F8FF 42%, #FFFFFF 80%)",
        }}
      >
        {/* 상단 그룹: 배지 + 헤드라인 + 스탯 카드 */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {/* 배지 pill */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              alignSelf: "flex-start",
              background: "#FFFFFF",
              border: `1px solid ${LINE}`,
              borderRadius: 999,
              padding: "12px 24px 12px 20px",
              fontSize: 28,
              color: BLUE_DEEP,
              boxShadow: "0 4px 16px rgba(25,31,40,0.05)",
            }}
          >
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: 999,
                background: GREEN,
              }}
            />
            가입 없이 · 무료로
          </div>

          {/* 헤드라인 */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 32,
              fontSize: 78,
              lineHeight: 1.2,
              letterSpacing: "-0.03em",
              color: INK,
            }}
          >
            <div style={{ display: "flex" }}>몰라서 못 받던 세금,</div>
            <div style={{ display: "flex" }}>
              <span style={{ color: BLUE }}>30초</span>
              <span>면 찾아드려요</span>
            </div>
          </div>

          {/* 미리보기 스탯 카드 */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              alignSelf: "flex-start",
              gap: 44,
              marginTop: 40,
              background: "#FFFFFF",
              borderRadius: 28,
              padding: "28px 44px",
              boxShadow: "0 12px 32px rgba(47,107,240,0.12)",
            }}
          >
            {/* 좌: 예상 추가 환급액 */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", fontSize: 26, color: INK3 }}>
                예상 추가 환급액
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  marginTop: 8,
                  color: INK,
                }}
              >
                <span style={{ fontSize: 60, letterSpacing: "-0.02em" }}>+84</span>
                <span style={{ fontSize: 36 }}>만원</span>
              </div>
            </div>

            {/* 세로 구분선 */}
            <div style={{ width: 1, height: 88, background: LINE }} />

            {/* 우: 추천 계좌 조합 */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", fontSize: 26, color: INK3 }}>
                추천 계좌 조합
              </div>
              <div style={{ display: "flex", gap: 12, marginTop: 14 }}>
                <div
                  style={{
                    display: "flex",
                    background: BLUE_WEAK,
                    color: BLUE,
                    borderRadius: 999,
                    padding: "10px 20px",
                    fontSize: 28,
                  }}
                >
                  연금저축
                </div>
                <div
                  style={{
                    display: "flex",
                    background: BLUE_WEAK,
                    color: BLUE,
                    borderRadius: 999,
                    padding: "10px 20px",
                    fontSize: 28,
                  }}
                >
                  IRP
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 하단 브랜딩 */}
        <div style={{ display: "flex", fontSize: 30, color: INK3 }}>
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
