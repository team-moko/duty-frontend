import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Apple 터치 아이콘 (180x180). icon.tsx와 동일한 브랜드 디자인.

const BRAND_BLUE = "#2F6BF0";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default async function AppleIcon() {
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
          borderRadius: 40,
          color: "#FFFFFF",
          fontSize: 116,
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
