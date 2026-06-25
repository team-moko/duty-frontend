import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const screen = style({
  minHeight: "100dvh",
  background: vars.color.appBg,
  display: "flex",
  flexDirection: "column",
});

export const intro = style({
  padding: "18px 20px",
});

export const title = style({
  margin: 0,
  fontSize: 24,
  fontWeight: 800,
  color: vars.color.ink,
  lineHeight: 1.34,
  letterSpacing: "-0.03em",
});

export const subtitle = style({
  margin: "10px 0 0",
  fontSize: 14.5,
  fontWeight: 500,
  color: vars.color.ink3,
  lineHeight: 1.5,
  letterSpacing: "-0.02em",
});

export const formCard = style({
  background: vars.color.white,
  borderRadius: "24px 24px 0 0",
  flex: 1,
  padding: "26px 20px 140px",
  display: "flex",
  flexDirection: "column",
  gap: 28,
  boxShadow: `0 -1px 0 ${vars.color.line}`,
});

export const assetCol = style({
  display: "flex",
  flexDirection: "column",
  gap: 12,
});

export const assetSummary = style({
  display: "flex",
  alignItems: "center",
  gap: 8,
});

export const assetSummaryLabel = style({
  fontSize: 13,
  fontWeight: 600,
  color: vars.color.ink3,
});

export const assetSummaryDivider = style({
  flex: 1,
  height: 1,
  background: vars.color.line2,
});

export const assetSummaryValue = style({
  fontSize: 14,
  fontWeight: 700,
  color: vars.color.ink2,
});

export const divider = style({
  height: 1,
  background: vars.color.line2,
});

export const newlywedGap = style({
  height: 4,
});

export const checkCol = style({
  display: "flex",
  flexDirection: "column",
  gap: 10,
});
