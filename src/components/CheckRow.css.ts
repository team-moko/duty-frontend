import { style, styleVariants } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

const rowBase = style({
  display: "flex",
  alignItems: "center",
  gap: 12,
  width: "100%",
  cursor: "pointer",
  textAlign: "left",
  border: "1.5px solid",
  transition: "background 0.12s ease, border-color 0.12s ease",
});

export const variant = styleVariants({
  boxed: {
    padding: "14px 16px",
    borderRadius: vars.radius.field,
  },
  compact: {
    padding: 0,
    border: "none",
    background: "transparent",
  },
});

export const state = styleVariants({
  on: {
    background: vars.color.blueWeak2,
    borderColor: vars.color.blue,
  },
  off: {
    background: vars.color.fieldBg,
    borderColor: vars.color.line,
  },
});

export const box = style({
  width: 24,
  height: 24,
  borderRadius: 8,
  flexShrink: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "1.5px solid",
  transition: "background 0.12s ease, border-color 0.12s ease",
});

export const boxState = styleVariants({
  on: { background: vars.color.blue, borderColor: vars.color.blue },
  off: { background: vars.color.white, borderColor: vars.color.line },
});

export const texts = style({
  display: "flex",
  flexDirection: "column",
  gap: 1,
});

export const label = style({
  fontSize: 15.5,
  fontWeight: 600,
  color: vars.color.ink,
  letterSpacing: "-0.02em",
});

export const sub = style({
  fontSize: 12.5,
  fontWeight: 500,
  color: vars.color.ink3,
});

export const row = rowBase;
