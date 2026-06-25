import { style, styleVariants } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const group = style({
  display: "flex",
  gap: 8,
});

const optBase = style({
  flex: 1,
  height: 52,
  borderRadius: vars.radius.field,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 16,
  fontWeight: 700,
  letterSpacing: "-0.02em",
  cursor: "pointer",
  border: "1.5px solid",
  background: "transparent",
  transition: "background 0.12s ease, border-color 0.12s ease, color 0.12s ease",
});

export const state = styleVariants({
  on: {
    background: vars.color.blueWeak,
    borderColor: vars.color.blue,
    color: vars.color.blueDeep,
  },
  off: {
    background: vars.color.fieldBg,
    borderColor: vars.color.line,
    color: vars.color.ink2,
  },
});

export const option = optBase;
