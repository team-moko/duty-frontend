import { vars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const screen = style({
  minHeight: "100dvh",
  background: vars.color.appBg,
  display: "flex",
  flexDirection: "column",
});

export const loading = style({
  margin: 0,
  color: vars.color.ink3,
  fontSize: 14,
  fontWeight: 600,
  textAlign: "center",
});

export const empty = style({
  margin: "48px 20px",
  display: "flex",
  flexDirection: "column",
  gap: 18,
});

export const hero = style({
  // 고정 AppBar(약 58px) 높이만큼 상단 여백 확보.
  paddingTop: 58,
  background: `linear-gradient(160deg, ${vars.color.blue} 0%, ${vars.color.blueDeep} 100%)`,
  color: vars.color.white,
});

export const heroBody = style({
  padding: "6px 24px 32px",
});

export const persona = style({
  margin: 0,
  fontSize: 15.5,
  fontWeight: 600,
  color: "rgba(255,255,255,0.82)",
  letterSpacing: "-0.02em",
});

export const lead = style({
  margin: "16px 0 0",
  fontSize: 18,
  fontWeight: 600,
  color: "rgba(255,255,255,0.95)",
  letterSpacing: "-0.02em",
});

export const bigRateWrap = style({
  display: "flex",
  alignItems: "baseline",
  gap: 6,
  marginTop: 4,
});

export const bigRate = style({
  fontSize: 72,
  fontWeight: 800,
  letterSpacing: "-0.05em",
  lineHeight: 0.95,
});

export const bigPct = style({
  fontSize: 40,
  fontWeight: 800,
});

export const bigAmount = style({
  fontSize: 46,
  fontWeight: 800,
  letterSpacing: "-0.04em",
  lineHeight: 1.15,
});

export const heroSub = style({
  margin: "8px 0 0",
  fontSize: 18,
  fontWeight: 700,
  letterSpacing: "-0.02em",
});

export const pill = style({
  marginTop: 18,
  display: "inline-flex",
  alignItems: "center",
  gap: 7,
  background: "rgba(255,255,255,0.16)",
  borderRadius: vars.radius.pill,
  padding: "8px 14px",
});

export const pillStrong = style({
  fontSize: 14,
  fontWeight: 700,
});

export const pillDot = style({
  width: 3,
  height: 3,
  borderRadius: vars.radius.pill,
  background: "rgba(255,255,255,0.6)",
});

export const pillMuted = style({
  fontSize: 14,
  fontWeight: 600,
  color: "rgba(255,255,255,0.85)",
});

export const list = style({
  position: "relative",
  zIndex: 1,
  background: vars.color.appBg,
  borderRadius: "24px 24px 0 0",
  marginTop: -16,
  padding: "24px 18px 40px",
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: 18,
});

export const listHeader = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 2px",
});

export const listTitle = style({
  margin: 0,
  fontSize: 18,
  fontWeight: 800,
  color: vars.color.ink,
  letterSpacing: "-0.03em",
});

export const listHint = style({
  fontSize: 13,
  fontWeight: 600,
  color: vars.color.ink3,
});
