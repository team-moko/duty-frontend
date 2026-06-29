import { style, styleVariants } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const card = style({
  borderRadius: vars.radius.field,
  border: "1.5px solid",
  overflow: "hidden",
  transition: "background 0.12s ease, border-color 0.12s ease",
});

export const state = styleVariants({
  on: { background: vars.color.blueWeak2, borderColor: vars.color.blue },
  off: { background: vars.color.fieldBg, borderColor: vars.color.line },
});

export const header = style({
  display: "flex",
  alignItems: "center",
  gap: 12,
  width: "100%",
  padding: "15px 16px",
  background: "transparent",
  border: "none",
  cursor: "pointer",
  textAlign: "left",
});

export const box = style({
  width: 22,
  height: 22,
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

export const label = style({
  flex: 1,
  fontSize: 15.5,
  fontWeight: 700,
  color: vars.color.ink,
  letterSpacing: "-0.02em",
});

export const body = style({
  padding: "0 16px 16px",
  display: "flex",
  flexDirection: "column",
  gap: 8,
});

export const bodyDivider = style({
  height: 1,
  background: "rgba(47,107,240,0.14)",
  marginBottom: 6,
});
