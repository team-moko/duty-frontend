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
  transition: "background 0.12s ease, box-shadow 0.12s ease, color 0.12s ease",
});

export const state = styleVariants({
  on: {
    background: vars.color.white,
    boxShadow: "0 1px 3px rgba(25,31,40,0.1)",
    color: vars.color.ink,
  },
  off: {
    background: "transparent",
    color: vars.color.ink3,
  },
});

export const tab = tabBase;
