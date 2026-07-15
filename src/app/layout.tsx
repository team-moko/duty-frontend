import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import * as styles from "./layout.css";

const pretendard = localFont({
  src: "../fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  weight: "45 920",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://getsavemate.com"
  ),
  title: "내 절세 전략 찾기",
  description: "연봉·자산·가족 정보로 가장 유리한 절세 계좌 조합을 추천해 드려요.",
  // 사이트 공통 OG. 대표 og:image는 일반 라우트(/og)를 URL로 연결한다.
  // (루트에 opengraph-image 파일 컨벤션을 두면 우선순위가 더 높아 /s의 동적 OG를 덮어쓴다)
  openGraph: {
    title: "내 절세 전략 찾기",
    description: "연봉·자산·가족 정보로 가장 유리한 절세 계좌 조합을 추천해 드려요.",
    url: "/",
    siteName: "내 절세 전략 찾기",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/og",
        width: 1200,
        height: 630,
        alt: "내 절세 전략 찾기",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  // 상태바(배터리·시간) 영역이 화면 상단과 이어지도록 기본은 appBg.
  // 상단이 파란 히어로인 라우트(결과·상세)는 page에서 themeColor를 덮어쓴다.
  themeColor: "#F2F4F6",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <body>
        <div className={styles.appShell}>{children}</div>
      </body>
    </html>
  );
}
