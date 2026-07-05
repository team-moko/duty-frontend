import { vars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

const SHARE_CARD_SHADOW =
  "0 12px 40px rgba(29,82,201,0.14), 0 2px 6px rgba(25,31,40,0.05)";

export const screen = style({
  minHeight: "100dvh",
  display: "flex",
  flexDirection: "column",
  // 상단에서 퍼지는 소프트 블루 방사형 그라데이션
  background: `radial-gradient(120% 60% at 50% 0%, ${vars.color.blueWeak} 0%, ${vars.color.appBg} 46%)`,
});

/* 발신 라인 */
export const sender = style({
  padding: "2px 24px 0",
  display: "flex",
  alignItems: "center",
  gap: 9,
});

export const avatar = style({
  width: 30,
  height: 30,
  borderRadius: vars.radius.pill,
  flexShrink: 0,
  background: `linear-gradient(150deg, ${vars.color.blue}, ${vars.color.blueDeep})`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 13,
  fontWeight: 800,
  color: vars.color.white,
});

export const senderText = style({
  fontSize: 14.5,
  fontWeight: 600,
  color: vars.color.ink2,
  letterSpacing: "-0.02em",
});

export const senderName = style({
  fontWeight: 800,
  color: vars.color.ink,
});

/* 공유 카드 */
export const cardWrap = style({
  padding: "18px 20px 4px",
});

export const card = style({
  background: vars.color.white,
  borderRadius: vars.radius.cardLg,
  overflow: "hidden",
  boxShadow: SHARE_CARD_SHADOW,
});

/* 카드 상단 — 절세 유형 */
export const typeSection = style({
  padding: "28px 26px 24px",
  textAlign: "center",
  background: `linear-gradient(180deg, ${vars.color.blueWeak2} 0%, ${vars.color.white} 100%)`,
});

export const typeBadge = style({
  display: "inline-block",
  background: vars.color.blue,
  color: vars.color.white,
  borderRadius: vars.radius.pill,
  padding: "6px 13px",
  fontSize: 12.5,
  fontWeight: 800,
  letterSpacing: "-0.01em",
});

export const typeEmoji = style({
  fontSize: 56,
  lineHeight: 1,
  margin: "18px 0 12px",
});

export const typeName = style({
  margin: 0,
  fontSize: 26,
  fontWeight: 800,
  color: vars.color.ink,
  letterSpacing: "-0.035em",
  lineHeight: 1.2,
});

export const typeTagline = style({
  margin: "8px 0 0",
  fontSize: 14.5,
  fontWeight: 600,
  color: vars.color.ink2,
  letterSpacing: "-0.02em",
});

export const keywords = style({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: 6,
  marginTop: 16,
});

export const keyword = style({
  background: vars.color.white,
  border: `1px solid ${vars.color.line}`,
  color: vars.color.ink2,
  borderRadius: vars.radius.pill,
  padding: "5px 11px",
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: "-0.01em",
});

/* 티켓 절취선 */
export const perforation = style({
  position: "relative",
  height: 1,
});

const notchBase = style({
  position: "absolute",
  top: -8,
  width: 16,
  height: 16,
  borderRadius: vars.radius.pill,
  background: vars.color.appBg,
});

export const notchLeft = style([notchBase, { left: -8 }]);
export const notchRight = style([notchBase, { right: -8 }]);

export const dash = style({
  position: "absolute",
  left: 16,
  right: 16,
  top: 0,
  borderTop: `2px dashed ${vars.color.line}`,
});

/* 카드 중단 — 지표 */
export const metricSection = style({
  padding: "26px 26px 22px",
  textAlign: "center",
});

export const metricLead = style({
  margin: 0,
  fontSize: 15.5,
  fontWeight: 600,
  color: vars.color.ink3,
  letterSpacing: "-0.02em",
});

export const rateWrap = style({
  display: "flex",
  alignItems: "baseline",
  justifyContent: "center",
  gap: 5,
  marginTop: 4,
});

export const rate = style({
  fontSize: 72,
  fontWeight: 800,
  letterSpacing: "-0.05em",
  lineHeight: 0.9,
  color: vars.color.blue,
});

export const ratePct = style({
  fontSize: 36,
  fontWeight: 800,
  color: vars.color.blue,
});

export const metricTail = style({
  margin: "8px 0 0",
  fontSize: 16.5,
  fontWeight: 700,
  color: vars.color.ink,
  letterSpacing: "-0.02em",
});

export const metricCaption = style({
  margin: "4px 0 0",
  fontSize: 12.5,
  fontWeight: 500,
  color: vars.color.ink4,
});

/* 카드 하단 — 조합 */
export const comboSection = style({
  padding: "24px 26px 28px",
});

export const comboLabel = style({
  fontSize: 13,
  fontWeight: 700,
  color: vars.color.ink3,
  letterSpacing: "-0.02em",
});

export const comboChips = style({
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
  margin: "12px 0 16px",
});

export const insight = style({
  background: vars.color.blueWeak2,
  borderRadius: 12,
  padding: "13px 15px",
  display: "flex",
  gap: 9,
  alignItems: "flex-start",
});

export const insightIcon = style({
  fontSize: 14,
  lineHeight: 1.4,
});

export const insightText = style({
  fontSize: 13.5,
  fontWeight: 600,
  color: vars.color.ink2,
  lineHeight: 1.5,
  letterSpacing: "-0.02em",
});

/* 전환 훅 */
export const hook = style({
  padding: "24px 24px 4px",
  textAlign: "center",
});

export const hookTitle = style({
  margin: 0,
  fontSize: 23,
  fontWeight: 800,
  color: vars.color.ink,
  letterSpacing: "-0.03em",
  lineHeight: 1.4,
});

export const hookAccent = style({
  color: vars.color.blue,
});

export const hookSub = style({
  margin: "10px 0 0",
  fontSize: 14.5,
  fontWeight: 500,
  color: vars.color.ink3,
  lineHeight: 1.55,
  letterSpacing: "-0.02em",
});

/* 혜택 3줄 */
export const benefitsWrap = style({
  padding: "20px 20px 0",
});

export const benefits = style({
  background: vars.color.white,
  borderRadius: vars.radius.card,
  padding: "10px 20px",
  boxShadow: vars.shadow.card,
});

export const benefitRow = style({
  display: "flex",
  alignItems: "center",
  gap: 14,
  padding: "15px 0",
  selectors: {
    "&:not(:first-child)": {
      borderTop: `1px solid ${vars.color.line2}`,
    },
  },
});

export const benefitIcon = style({
  width: 42,
  height: 42,
  borderRadius: 12,
  flexShrink: 0,
  background: vars.color.fieldBg,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 20,
});

export const benefitBody = style({
  display: "flex",
  flexDirection: "column",
  gap: 2,
});

export const benefitTitle = style({
  fontSize: 15.5,
  fontWeight: 800,
  color: vars.color.ink,
  letterSpacing: "-0.02em",
});

export const benefitDesc = style({
  fontSize: 13,
  fontWeight: 500,
  color: vars.color.ink3,
  letterSpacing: "-0.02em",
});

export const benefitCaption = style({
  margin: "14px 0 0",
  textAlign: "center",
  fontSize: 12,
  fontWeight: 500,
  color: vars.color.ink4,
  lineHeight: 1.5,
});

export const spacer = style({
  flex: 1,
  minHeight: 24,
});

/* 고정 CTA */
export const ctaBar = style({
  position: "sticky",
  bottom: 0,
  padding: "14px 20px 30px",
  background: `linear-gradient(to top, ${vars.color.appBg} 72%, rgba(242,244,246,0))`,
});
