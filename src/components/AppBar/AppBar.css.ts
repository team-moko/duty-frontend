import { style, styleVariants } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

const barBase = style({
  position: "sticky",
  top: 0,
  paddingTop: 6,
});

export const bar = styleVariants({
  // 일반(흰 배경 + blur). 입력/리스트 화면 상단.
  solid: {
    zIndex: 9,
    background: "rgba(255,255,255,0.86)",
    backdropFilter: "saturate(180%) blur(12px)",
    WebkitBackdropFilter: "saturate(180%) blur(12px)",
  },
  // hero(파랑 그라데이션) 위에 얹는 투명 바.
  accent: {
    zIndex: 6,
    background: "transparent",
  },
  // 랜딩 히어로(밝은 그라데이션) 위에 얹는 투명 바 + ink 타이틀.
  bare: {
    zIndex: 9,
    background: "transparent",
  },
});

export const inner = style({
  height: 52,
  display: "flex",
  alignItems: "center",
  gap: 6,
  padding: "0 8px 0 12px",
});

export const innerNoBack = style({
  padding: "0 12px 0 20px",
});

export const backBtn = style({
  width: 40,
  height: 40,
  border: "none",
  background: "transparent",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  padding: 0,
});

const titleBase = style({
  flex: 1,
  letterSpacing: "-0.02em",
  textAlign: "left",
});

export const title = styleVariants({
  solid: [titleBase, { color: vars.color.ink }],
  accent: [titleBase, { color: vars.color.white }],
  bare: [titleBase, { color: vars.color.ink }],
});

export const titleSize = styleVariants({
  small: { fontSize: 16, fontWeight: 700 },
  large: { fontSize: 19, fontWeight: 800 },
});

export const step = style({
  fontSize: 13,
  fontWeight: 600,
  color: vars.color.ink3,
  paddingRight: 12,
});

export const stepCurrent = style({
  color: vars.color.blue,
});

export const barClass = barBase;
