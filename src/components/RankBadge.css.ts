import { style, styleVariants } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

const base = style({
  width: 30,
  height: 30,
  borderRadius: 10,
  flexShrink: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 15,
  fontWeight: 800,
});

export const variant = styleVariants({
  top: {
    background: vars.color.blue,
    color: vars.color.white,
    boxShadow: "0 4px 10px rgba(47,107,240,0.3)",
  },
  normal: {
    background: vars.color.fill,
    color: vars.color.ink2,
  },
});

export const badge = base;
