import { style, styleVariants } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

const base = style({
  width: "100%",
  border: "none",
  cursor: "pointer",
  borderRadius: vars.radius.button,
  color: vars.color.white,
  textDecoration: "none",
  fontSize: 17,
  fontWeight: 700,
  letterSpacing: "-0.02em",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 2,
  transition: "transform 0.08s ease, opacity 0.15s ease",
  selectors: {
    "&:active:not(:disabled)": { transform: "scale(0.99)" },
  },
});

export const variant = styleVariants({
  blue: { background: vars.color.blue, boxShadow: vars.shadow.cta },
  green: {
    background: vars.color.green,
    boxShadow: "0 6px 18px rgba(18,184,134,0.28)",
  },
  disabled: {
    background: vars.color.line,
    color: vars.color.ink4,
    cursor: "not-allowed",
    boxShadow: "none",
  },
});

export const size = styleVariants({
  normal: { height: 56 },
  withSub: { height: 60 },
});

export const sub = style({
  fontSize: 12,
  fontWeight: 600,
  opacity: 0.85,
});

export const button = base;
