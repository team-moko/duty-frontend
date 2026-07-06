import { style, styleVariants } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

const cardBase = style({
  background: vars.color.white,
  borderRadius: vars.radius.card,
  padding: "18px 18px 16px",
  display: "flex",
  flexDirection: "column",
  gap: 14,
  position: "relative",
  cursor: "pointer",
  border: "1px solid",
  width: "100%",
  textAlign: "left",
  transition: "transform 0.08s ease",
  selectors: {
    "&:active": { transform: "scale(0.995)" },
  },
});

export const card = styleVariants({
  top: [
    cardBase,
    {
      borderColor: vars.color.blue,
      borderWidth: 1.5,
      boxShadow: vars.shadow.cardHi,
    },
  ],
  normal: [
    cardBase,
    {
      borderColor: vars.color.line,
      boxShadow: vars.shadow.card,
    },
  ],
});

export const bestBadge = style({
  position: "absolute",
  top: -11,
  left: 18,
  background: vars.color.blue,
  color: vars.color.white,
  borderRadius: vars.radius.chip,
  padding: "4px 10px",
  fontSize: 11.5,
  fontWeight: 800,
  letterSpacing: "0.04em",
  boxShadow: "0 4px 10px rgba(47,107,240,0.35)",
});

export const topRow = style({
  display: "flex",
  alignItems: "flex-start",
  gap: 11,
});

export const chips = style({
  flex: 1,
  paddingTop: 1,
  display: "flex",
  flexWrap: "wrap",
  gap: 6,
});

export const chevron = style({
  marginTop: 9,
  flexShrink: 0,
});

export const metricRow = style({
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "space-between",
});

export const metricLeft = style({
  display: "flex",
  flexDirection: "column",
  gap: 2,
});

export const metricLabel = style({
  fontSize: 12.5,
  fontWeight: 700,
  color: vars.color.ink3,
});

export const rateWrap = style({
  display: "flex",
  alignItems: "baseline",
  gap: 3,
});

const rateBase = style({
  fontSize: 36,
  fontWeight: 800,
  letterSpacing: "-0.04em",
  lineHeight: 1,
});

export const rate = styleVariants({
  top: { color: vars.color.blue },
  normal: { color: vars.color.ink },
});

export const rateBaseClass = rateBase;

const pctBase = style({
  fontSize: 19,
  fontWeight: 800,
});

export const pct = styleVariants({
  top: { color: vars.color.blue },
  normal: { color: vars.color.ink2 },
});

export const pctBaseClass = pctBase;

const amountBase = style({
  fontSize: 26,
  fontWeight: 800,
  letterSpacing: "-0.03em",
  lineHeight: 1.2,
});

export const amount = styleVariants({
  top: { color: vars.color.blue },
  normal: { color: vars.color.ink },
});

export const amountBaseClass = amountBase;

export const noContribBadge = style({
  display: "inline-block",
  background: vars.color.fieldBg,
  color: vars.color.ink2,
  borderRadius: vars.radius.chip,
  padding: "5px 10px",
  fontSize: 12,
  fontWeight: 700,
});

export const metricRight = style({
  textAlign: "right",
});

export const refundLabel = style({
  fontSize: 12.5,
  fontWeight: 700,
  color: vars.color.ink3,
  display: "block",
});

export const refundValue = style({
  fontSize: 18,
  fontWeight: 800,
  color: vars.color.ink,
  letterSpacing: "-0.02em",
});

const reasonBase = style({
  borderRadius: 12,
  padding: "11px 13px",
  display: "flex",
  gap: 8,
  alignItems: "flex-start",
});

export const reason = styleVariants({
  top: { background: vars.color.blueWeak2 },
  normal: { background: vars.color.fieldBg },
});

export const reasonBaseClass = reasonBase;

export const reasonEmoji = style({
  fontSize: 13,
  lineHeight: 1.4,
});

export const reasonText = style({
  fontSize: 13,
  fontWeight: 600,
  color: vars.color.ink2,
  lineHeight: 1.45,
  letterSpacing: "-0.02em",
});
