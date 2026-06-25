import { style, styleVariants } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const box = style({
  display: "flex",
  alignItems: "center",
  gap: 8,
  background: vars.color.fieldBg,
  border: `1px solid ${vars.color.line}`,
  borderRadius: vars.radius.field,
  height: 56,
  padding: "0 16px",
  transition: "border-color 0.12s ease",
  selectors: {
    "&:focus-within": { borderColor: vars.color.blue },
  },
});

const inputBase = style({
  flex: 1,
  minWidth: 0,
  border: "none",
  outline: "none",
  background: "transparent",
  fontFamily: "inherit",
  fontSize: 17,
  color: vars.color.ink,
  letterSpacing: "-0.02em",
  selectors: {
    "&::placeholder": { color: vars.color.ink4 },
  },
});

export const weight = styleVariants({
  normal: { fontWeight: 600 },
  strong: { fontWeight: 700 },
});

export const align = styleVariants({
  left: { textAlign: "left" },
  right: { textAlign: "right" },
});

export const suffix = style({
  fontSize: 16,
  fontWeight: 600,
  color: vars.color.ink2,
  flexShrink: 0,
});

export const input = inputBase;
