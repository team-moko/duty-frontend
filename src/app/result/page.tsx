import { ScreenResult } from "./ScreenResult";

// 추천 결과는 sessionStorage에 있어 서버 페치가 불가 → 클라 경계(ScreenResult)로 분리하고
// 라우트 진입점은 서버 컴포넌트로 유지한다. (docs/RSC-컨벤션.md §0)
export default function Page() {
  return <ScreenResult />;
}
