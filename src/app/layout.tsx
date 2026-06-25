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
  title: "내 절세 전략 찾기",
  description: "연봉·자산·가족 정보로 가장 유리한 절세 계좌 조합을 추천해 드려요.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#2F6BF0",
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
