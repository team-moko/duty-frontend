import { style, styleVariants } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const screen = style({
  minHeight: "100dvh",
  background: vars.color.appBg,
  display: "flex",
  flexDirection: "column",
});

export const hero = style({
  // 고정 AppBar(약 58px) 높이만큼 상단 여백 확보.
  paddingTop: 58,
  background: `linear-gradient(160deg, ${vars.color.blue} 0%, ${vars.color.blueDeep} 100%)`,
  color: vars.color.white,
});

export const heroBody = style({
  padding: "2px 24px 34px",
});

export const rankPill = style({
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  background: "rgba(255,255,255,0.18)",
  borderRadius: vars.radius.pill,
  padding: "5px 12px",
  marginBottom: 14,
  fontSize: 12.5,
  fontWeight: 800,
});

export const heroChips = style({
  display: "flex",
  flexWrap: "wrap",
  gap: 7,
  marginBottom: 18,
});

export const heroMetric = style({
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "space-between",
});

export const heroMetricLabel = style({
  fontSize: 14,
  fontWeight: 600,
  color: "rgba(255,255,255,0.82)",
  display: "block",
  marginBottom: 2,
});

export const heroRateWrap = style({
  display: "flex",
  alignItems: "baseline",
  gap: 4,
});

export const heroRate = style({
  fontSize: 56,
  fontWeight: 800,
  letterSpacing: "-0.05em",
  lineHeight: 0.95,
});

export const heroPct = style({
  fontSize: 30,
  fontWeight: 800,
});

export const heroRefundCol = style({
  textAlign: "right",
  paddingBottom: 6,
});

export const heroRefund = style({
  fontSize: 22,
  fontWeight: 800,
  letterSpacing: "-0.02em",
});

export const body = style({
  position: "relative",
  zIndex: 1,
  background: vars.color.appBg,
  borderRadius: "24px 24px 0 0",
  marginTop: -16,
  padding: "8px 18px 140px",
  display: "flex",
  flexDirection: "column",
  gap: 14,
});

export const card = style({
  background: vars.color.white,
  borderRadius: vars.radius.card,
  padding: "22px 20px",
  boxShadow: vars.shadow.card,
});

export const cardFirst = style({
  marginTop: 12,
});

/* SectionTitle */
export const sectionTitle = style({
  display: "flex",
  flexDirection: "column",
  gap: 3,
  marginBottom: 14,
});

export const sectionHeading = style({
  margin: 0,
  fontSize: 17,
  fontWeight: 800,
  color: vars.color.ink,
  letterSpacing: "-0.03em",
});

export const sectionSub = style({
  fontSize: 13,
  fontWeight: 500,
  color: vars.color.ink3,
  letterSpacing: "-0.02em",
});

/* Priority timeline */
export const priorityList = style({
  marginTop: 6,
});

export const step = style({
  display: "flex",
  gap: 14,
});

export const rail = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: 30,
});

export const railDot = style({
  width: 30,
  height: 30,
  borderRadius: vars.radius.pill,
  flexShrink: 0,
  background: vars.color.blue,
  color: vars.color.white,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 14,
  fontWeight: 800,
});

export const railLine = style({
  width: 2,
  flex: 1,
  background: vars.color.line,
  marginTop: 4,
  marginBottom: 4,
  minHeight: 28,
});

export const stepBody = style({
  flex: 1,
});

export const stepBodyGap = style({
  paddingBottom: 20,
});

export const stepHead = style({
  display: "flex",
  alignItems: "center",
  gap: 8,
  marginBottom: 4,
});

export const stepAcc = style({
  fontSize: 16,
  fontWeight: 800,
  color: vars.color.ink,
  letterSpacing: "-0.02em",
});

export const stepAmt = style({
  fontSize: 13.5,
  fontWeight: 700,
  color: vars.color.blue,
});

export const stepDesc = style({
  margin: 0,
  fontSize: 13.5,
  fontWeight: 500,
  color: vars.color.ink2,
  lineHeight: 1.45,
  letterSpacing: "-0.02em",
});

/* Effect */
export const effectCol = style({
  display: "flex",
  flexDirection: "column",
  gap: 10,
});

const effectBoxBase = style({
  borderRadius: vars.radius.field,
  padding: "15px 16px",
  display: "flex",
  flexDirection: "column",
  gap: 6,
});

export const effectBox = styleVariants({
  blue: { background: vars.color.blueWeak2 },
  green: { background: vars.color.greenWeak },
});

export const effectBoxBaseClass = effectBoxBase;

export const effectHead = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const effectLabel = style({
  fontSize: 14.5,
  fontWeight: 700,
  color: vars.color.ink,
});

const effectValueBase = style({
  fontSize: 16,
  fontWeight: 800,
  letterSpacing: "-0.02em",
});

export const effectValue = styleVariants({
  blue: { color: vars.color.blueDeep },
  green: { color: vars.color.greenDeep },
});

export const effectValueBaseClass = effectValueBase;

export const effectNote = style({
  fontSize: 12.5,
  fontWeight: 500,
  color: vars.color.ink3,
  lineHeight: 1.4,
});

export const afterTax = style({
  marginTop: 14,
  paddingTop: 16,
  borderTop: `1px dashed ${vars.color.line}`,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const afterTaxLeft = style({
  display: "flex",
  flexDirection: "column",
  gap: 2,
});

export const afterTaxLabel = style({
  fontSize: 14.5,
  fontWeight: 700,
  color: vars.color.ink,
});

export const afterTaxNote = style({
  fontSize: 12,
  fontWeight: 500,
  color: vars.color.ink3,
});

export const afterTaxValue = style({
  fontSize: 20,
  fontWeight: 800,
  color: vars.color.green,
  letterSpacing: "-0.02em",
});

/* Reasons */
export const reasonList = style({
  display: "flex",
  flexDirection: "column",
  gap: 14,
});

export const reasonItem = style({
  display: "flex",
  gap: 11,
});

export const reasonNum = style({
  width: 22,
  height: 22,
  borderRadius: vars.radius.pill,
  flexShrink: 0,
  marginTop: 1,
  background: vars.color.blueWeak,
  color: vars.color.blueDeep,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 12,
  fontWeight: 800,
});

export const reasonText = style({
  margin: 0,
  flex: 1,
  fontSize: 14,
  fontWeight: 500,
  color: vars.color.ink2,
  lineHeight: 1.55,
  letterSpacing: "-0.02em",
});

export const disclaimer = style({
  marginTop: 16,
  background: vars.color.fieldBg,
  borderRadius: 12,
  padding: "12px 14px",
  display: "flex",
  gap: 8,
});

export const disclaimerIcon = style({
  fontSize: 13,
});

export const disclaimerText = style({
  fontSize: 12,
  fontWeight: 500,
  color: vars.color.ink3,
  lineHeight: 1.45,
});

/* 하단 공유 버튼 */
export const shareButton = style({
  width: "100%",
  height: 56,
  borderRadius: vars.radius.button,
  cursor: "pointer",
  background: vars.color.white,
  border: `1px solid ${vars.color.line}`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  boxShadow: vars.shadow.card,
  fontSize: 16,
  fontWeight: 800,
  color: vars.color.ink,
  letterSpacing: "-0.02em",
});
