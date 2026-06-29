import { style, styleVariants } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const tile = style({
  display: "flex",
  alignItems: "center",
  gap: 10,
  width: "100%",
  minHeight: 52,
  padding: "13px 14px",
  borderRadius: 13,
  border: "1.5px solid",
  cursor: "pointer",
  textAlign: "left",
  transition: "background 0.12s ease, border-color 0.12s ease",
});

export const full = style({
  gridColumn: "1 / -1",
});

export const state = styleVariants({
  on: { background: vars.color.blueWeak2, borderColor: vars.color.blue },
  off: { background: vars.color.fieldBg, borderColor: vars.color.line },
});

export const box = style({
  width: 21,
  height: 21,
  borderRadius: 7,
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

const labelBase = style({
  fontSize: 14,
  letterSpacing: "-0.02em",
  lineHeight: 1.25,
});

export const label = styleVariants({
  on: [labelBase, { fontWeight: 700, color: vars.color.ink }],
  off: [labelBase, { fontWeight: 600, color: vars.color.ink2 }],
});
