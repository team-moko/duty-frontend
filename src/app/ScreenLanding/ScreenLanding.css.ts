import { vars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const screen = style({
  minHeight: "100dvh",
  display: "flex",
  flexDirection: "column",
  background: vars.color.white,
});

/* 히어로 */
export const hero = style({
  padding: "20px 24px 40px",
  background: `radial-gradient(130% 70% at 50% -6%, ${vars.color.blueWeak} 0%, ${vars.color.blueWeak2} 40%, ${vars.color.white} 78%)`,
});

export const badge = style({
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  background: vars.color.white,
  border: `1px solid ${vars.color.line}`,
  boxShadow: vars.shadow.card,
  borderRadius: vars.radius.pill,
  padding: "7px 13px 7px 11px",
  fontSize: 13,
  fontWeight: 700,
  color: vars.color.blueDeep,
  letterSpacing: "-0.02em",
});

export const badgeDot = style({
  width: 7,
  height: 7,
  borderRadius: vars.radius.pill,
  background: vars.color.green,
});

export const headline = style({
  margin: "20px 0 0",
  fontSize: 32,
  fontWeight: 800,
  color: vars.color.ink,
  lineHeight: 1.28,
  letterSpacing: "-0.035em",
});

export const headlineAccent = style({
  color: vars.color.blue,
});

export const subcopy = style({
  margin: "16px 0 0",
  fontSize: 16,
  fontWeight: 500,
  color: vars.color.ink2,
  lineHeight: 1.6,
  letterSpacing: "-0.02em",
  textWrap: "pretty",
});

/* 미리보기 스탯 카드 */
export const statCard = style({
  marginTop: 26,
  background: vars.color.white,
  borderRadius: vars.radius.card,
  padding: "18px 20px",
  boxShadow: vars.shadow.cardHi,
  display: "flex",
  alignItems: "center",
  gap: 16,
});

export const statCol = style({
  flex: 1,
});

export const statCaption = style({
  fontSize: 12.5,
  fontWeight: 600,
  color: vars.color.ink3,
  letterSpacing: "-0.02em",
});

export const statValue = style({
  marginTop: 3,
  fontSize: 27,
  fontWeight: 800,
  color: vars.color.ink,
  letterSpacing: "-0.03em",
});

export const statUnit = style({
  fontSize: 17,
});

export const statDivider = style({
  width: 1,
  height: 40,
  background: vars.color.line,
});

export const statChips = style({
  marginTop: 6,
  display: "flex",
  gap: 5,
  flexWrap: "wrap",
});

/* 특징 3줄 */
export const features = style({
  padding: "10px 24px 8px",
  display: "flex",
  flexDirection: "column",
  gap: 20,
});

export const featureRow = style({
  display: "flex",
  gap: 14,
  alignItems: "flex-start",
});

export const featureIcon = style({
  width: 46,
  height: 46,
  borderRadius: vars.radius.field,
  flexShrink: 0,
  background: vars.color.blueWeak,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const featureBody = style({
  paddingTop: 2,
});

export const featureTitle = style({
  fontSize: 17,
  fontWeight: 700,
  color: vars.color.ink,
  letterSpacing: "-0.02em",
});

export const featureDesc = style({
  marginTop: 4,
  fontSize: 14,
  fontWeight: 500,
  color: vars.color.ink2,
  lineHeight: 1.55,
  letterSpacing: "-0.02em",
  textWrap: "pretty",
});

/* 진행 방식 3스텝 */
export const steps = style({
  padding: "28px 24px 8px",
});

export const stepsCard = style({
  background: vars.color.fieldBg,
  borderRadius: vars.radius.card,
  padding: "22px 22px 8px",
});

export const stepsLabel = style({
  fontSize: 13,
  fontWeight: 700,
  color: vars.color.ink3,
  letterSpacing: "-0.02em",
  marginBottom: 16,
});

export const stepRow = style({
  display: "flex",
  gap: 14,
  alignItems: "flex-start",
});

export const stepRowLast = style({
  paddingBottom: 14,
});

export const stepMarker = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  flexShrink: 0,
});

export const stepNumber = style({
  width: 30,
  height: 30,
  borderRadius: vars.radius.pill,
  background: vars.color.blue,
  color: vars.color.white,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 12.5,
  fontWeight: 800,
  letterSpacing: "-0.02em",
});

export const stepConnector = style({
  width: 2,
  flex: 1,
  minHeight: 22,
  background: vars.color.line,
  margin: "4px 0",
});

export const stepBody = style({
  paddingTop: 4,
  paddingBottom: 14,
});

export const stepTitle = style({
  fontSize: 15.5,
  fontWeight: 700,
  color: vars.color.ink,
  letterSpacing: "-0.02em",
});

export const stepDesc = style({
  marginTop: 2,
  fontSize: 13.5,
  fontWeight: 500,
  color: vars.color.ink3,
  letterSpacing: "-0.02em",
});

/* 신뢰 라인 */
export const trust = style({
  padding: "18px 24px 130px",
  textAlign: "center",
});

export const trustText = style({
  margin: 0,
  fontSize: 13,
  fontWeight: 500,
  color: vars.color.ink3,
  lineHeight: 1.6,
  letterSpacing: "-0.02em",
});

/* 하단 고정 CTA */
export const ctaBar = style({
  position: "sticky",
  bottom: 0,
  padding: "14px 20px 30px",
  background: `linear-gradient(180deg, rgba(255,255,255,0) 0%, ${vars.color.white} 24%)`,
});
