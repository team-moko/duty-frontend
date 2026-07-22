import type { Viewport } from "next";
import { ScreenLanding } from "./ScreenLanding/ScreenLanding";

// 랜딩 상단은 불투명 흰색 고정 헤더라 상태바 영역도 같은 색으로 틴트한다.
// (루트 기본값 appBg 덮어쓰기 — src/app/result/page.tsx와 동일 패턴)
export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

// 랜딩은 100% 정적 콘텐츠 + Link 네비게이션뿐이라 서버 컴포넌트로만 렌더한다.
// (docs/RSC-컨벤션.md §0)
export default function Page() {
  return <ScreenLanding />;
}
