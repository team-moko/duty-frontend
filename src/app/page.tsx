import { ScreenInput } from "./ScreenInput";

// 입력 화면은 전 과정이 상태·폼·뮤테이션 → 클라 경계(ScreenInput)로 분리하고
// 라우트 진입점은 서버 컴포넌트로 유지한다. (docs/RSC-컨벤션.md §0)
export default function Page() {
  return <ScreenInput />;
}
