import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const row = style({
  display: "flex",
  flexDirection: "column",
  gap: 10,
});

export const head = style({
  display: "flex",
  alignItems: "baseline",
  gap: 8,
});

export const label = style({
  fontSize: 15,
  fontWeight: 700,
  color: vars.color.ink,
  letterSpacing: "-0.02em",
});

export const hint = style({
  fontSize: 12.5,
  fontWeight: 500,
  color: vars.color.ink3,
});
