import { style, styleVariants } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const track = style({
  display: "flex",
  gap: 6,
  background: vars.color.fieldBg,
  border: `1px solid ${vars.color.line}`,
  borderRadius: vars.radius.field,
  padding: 4,
});

const tabBase = style({
  position: "relative",
  flex: 1,
  height: 40,
  borderRadius: 10,
  border: "none",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 14.5,
  fontWeight: 700,
  letterSpacing: "-0.02em",
  background: "transparent",
  transition: "color 0.15s ease",
});

export const state = styleVariants({
  on: {
    color: vars.color.ink,
  },
  off: {
    color: vars.color.ink3,
  },
});

export const pill = style({
  position: "absolute",
  inset: 0,
  background: vars.color.white,
  borderRadius: 10,
  boxShadow: "0 1px 3px rgba(25,31,40,0.1)",
});

export const label = style({
  position: "relative",
  zIndex: 1,
});

export const tab = tabBase;
