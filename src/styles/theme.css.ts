import { createGlobalTheme } from "@vanilla-extract/css";

// 절세 서비스 디자인 토큰 — design_handoff_jeolse/theme.jsx의 TT를 CSS 변수로 이식.
// :root에 전역 변수로 선언되어 어디서든 vars.* 로 참조 가능.
export const vars = createGlobalTheme(":root", {
  color: {
    // brand
    blue: "#2F6BF0",
    blueDeep: "#1D52C9",
    blueWeak: "#EAF1FE",
    blueWeak2: "#F4F8FF",
    green: "#12B886",
    greenDeep: "#0CA678",
    greenWeak: "#E6F8F1",
    // neutrals (cool-tinted, Toss-ish)
    ink: "#191F28",
    ink2: "#4E5968",
    ink3: "#8B95A1",
    ink4: "#B0B8C1",
    line: "#E5E8EB",
    line2: "#F2F4F6",
    fill: "#F2F4F6",
    fieldBg: "#F7F8FA",
    appBg: "#F2F4F6",
    white: "#FFFFFF",
  },
  font: {
    body: 'var(--font-pretendard), -apple-system, system-ui, sans-serif',
  },
  radius: {
    chip: "8px",
    field: "14px",
    button: "16px",
    card: "20px",
    cardLg: "24px",
    pill: "999px",
  },
  shadow: {
    card: "0 1px 2px rgba(25,31,40,0.04), 0 6px 20px rgba(25,31,40,0.05)",
    cardHi: "0 2px 4px rgba(25,31,40,0.05), 0 12px 32px rgba(47,107,240,0.12)",
    cta: "0 6px 18px rgba(47,107,240,0.28)",
  },
  // 모바일웹 기준 컨테이너 폭
  layout: {
    maxWidth: "430px",
  },
});
