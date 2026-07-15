import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// 브랜드 파비콘/아이콘 (파란 둥근 사각형 배경 + 흰색 "절").
// favicon.ico를 대체한다(브라우저 기본 /favicon.ico 대신 <link rel="icon" href="/icon?..."> 생성).
// 한글 렌더에 폰트가 필요해 정적 폰트를 fs로 읽는다. 아이콘은 빌드 타임에 정적 최적화된다.

const BRAND_BLUE = "#2F6BF0";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default async function Icon() {
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
          alignItems: "center",
          justifyContent: "center",
          background: BRAND_BLUE,
          borderRadius: 6,
          color: "#FFFFFF",
          fontSize: 22,
        }}
      >
        절
      </div>
    ),
    {
      ...size,
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
