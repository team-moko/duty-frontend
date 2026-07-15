import { style, styleVariants } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

const barBase = style({
  position: "fixed",
  bottom: 0,
  left: "50%",
  transform: "translateX(-50%)",
  width: "100%",
  maxWidth: vars.layout.maxWidth,
  zIndex: 10,
  padding: "14px 20px",
  display: "flex",
  gap: 10,
});

export const tone = styleVariants({
  white: {
    background: "linear-gradient(to top, #fff 72%, rgba(255,255,255,0))",
  },
  app: {
    background: "linear-gradient(to top, #F2F4F6 72%, rgba(242,244,246,0))",
  },
});

export const cta = style({
  flex: 1,
});

export const shareBtn = style({
  width: 56,
  height: 56,
  flexShrink: 0,
  borderRadius: vars.radius.button,
  cursor: "pointer",
  background: vars.color.white,
  border: `1px solid ${vars.color.line}`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: vars.shadow.card,
  color: vars.color.ink2,
});

export const bar = barBase;
