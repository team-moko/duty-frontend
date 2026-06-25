import { style, styleVariants } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

const base = style({
  display: "inline-flex",
  alignItems: "center",
  borderRadius: vars.radius.chip,
  fontWeight: 700,
  letterSpacing: "-0.02em",
  whiteSpace: "nowrap",
});

export const tone = styleVariants({
  blue: { background: vars.color.blueWeak, color: vars.color.blueDeep },
  green: { background: vars.color.greenWeak, color: vars.color.greenDeep },
  gray: { background: vars.color.fill, color: vars.color.ink2 },
  // hero(파랑 배경) 위에서 쓰는 반투명 칩
  onHero: { background: "rgba(255,255,255,0.18)", color: vars.color.white },
});

export const size = styleVariants({
  sm: { padding: "5px 9px", fontSize: 12.5 },
  md: { padding: "7px 12px", fontSize: 14 },
});

export const chip = base;
