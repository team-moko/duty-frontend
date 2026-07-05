import { style, styleVariants } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

// 뷰포트 최상단에 고정되는 중앙 컬럼 바.
const base = style({
  position: "fixed",
  top: 0,
  left: "50%",
  transform: "translateX(-50%)",
  width: "100%",
  maxWidth: vars.layout.maxWidth,
  zIndex: 20,
  transition: "background 0.2s ease, box-shadow 0.2s ease",
});

const heroGradient = `linear-gradient(160deg, ${vars.color.blue} 0%, ${vars.color.blueDeep} 100%)`;

// accent: hero 위에 얹히는 투명 바 / solid: 흰 배경 + 하단 헤어라인.
export const bar = styleVariants({
  accent: [base, { background: "transparent" }],
  solid: [
    base,
    { background: vars.color.white, boxShadow: `0 1px 0 ${vars.color.line}` },
  ],
});

// 스크롤 시작 시: accent는 hero 그라데이션으로 채우고, 둘 다 하단 그림자.
export const scrolled = styleVariants({
  accent: {
    background: heroGradient,
    boxShadow: "0 4px 12px rgba(25,31,40,0.12)",
  },
  solid: {
    boxShadow: "0 4px 12px rgba(25,31,40,0.08)",
  },
});
