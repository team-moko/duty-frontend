import { vars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const screen = style({
  minHeight: "100dvh",
  background: vars.color.appBg,
  display: "flex",
  flexDirection: "column",
});

export const body = style({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  // 하단 고정 CTA(약 100px) 높이만큼 여백 확보.
  padding: "20px 20px 120px",
});

// 상단 고정 AppBar(약 58px) 높이만큼 자리를 비운다 — flex column에서 눌리지 않게.
export const headerSpacer = style({
  height: 58,
  flexShrink: 0,
});

// ── 히어로 메시지 ─────────────────────────────
export const hero = style({
  padding: "36px 4px 28px",
  textAlign: "center",
});

export const heroIcon = style({
  width: 76,
  height: 76,
  borderRadius: vars.radius.pill,
  margin: "0 auto 22px",
  background: vars.color.white,
  border: `1px solid ${vars.color.line}`,
  boxShadow: vars.shadow.card,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const heroTitle = style({
  margin: 0,
  fontSize: 22,
  fontWeight: 800,
  color: vars.color.ink,
  letterSpacing: "-0.03em",
  lineHeight: 1.35,
});

export const heroDesc = style({
  margin: "12px 0 0",
  fontSize: 14.5,
  fontWeight: 500,
  color: vars.color.ink3,
  lineHeight: 1.6,
  letterSpacing: "-0.02em",
});

// ── 확인이 필요한 항목 카드 ────────────────────
export const card = style({
  background: vars.color.white,
  borderRadius: vars.radius.card,
  padding: 20,
  boxShadow: vars.shadow.card,
});

export const cardHead = style({
  display: "flex",
  alignItems: "center",
  gap: 7,
  marginBottom: 4,
});

export const cardTitle = style({
  fontSize: 15,
  fontWeight: 800,
  color: vars.color.ink,
  letterSpacing: "-0.02em",
});

export const badge = style({
  background: vars.color.blueWeak,
  color: vars.color.blueDeep,
  borderRadius: vars.radius.pill,
  padding: "2px 8px",
  fontSize: 12,
  fontWeight: 800,
});

export const cardSub = style({
  margin: "0 0 14px",
  fontSize: 12.5,
  fontWeight: 500,
  color: vars.color.ink3,
});

export const list = style({
  display: "flex",
  flexDirection: "column",
});

export const row = style({
  display: "flex",
  alignItems: "center",
  gap: 12,
  padding: "13px 0",
  selectors: {
    "&:not(:first-child)": {
      borderTop: `1px solid ${vars.color.line2}`,
    },
  },
});

// 모든 항목을 동일한 미확인 상태(회색 점)로 표시.
export const statusDot = style({
  width: 26,
  height: 26,
  borderRadius: vars.radius.pill,
  flexShrink: 0,
  background: vars.color.fill,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const dot = style({
  width: 6,
  height: 6,
  borderRadius: vars.radius.pill,
  background: vars.color.ink4,
});

export const rowText = style({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: 1,
});

export const rowLabel = style({
  fontSize: 15,
  fontWeight: 700,
  color: vars.color.ink,
  letterSpacing: "-0.02em",
});

export const rowHint = style({
  fontSize: 12,
  fontWeight: 500,
  color: vars.color.ink4,
});

// ── 안내 박스 ─────────────────────────────────
export const notice = style({
  marginTop: 14,
  background: vars.color.fieldBg,
  borderRadius: 12,
  padding: "12px 14px",
  display: "flex",
  gap: 8,
});

export const noticeIcon = style({
  fontSize: 13,
});

export const noticeText = style({
  fontSize: 12,
  fontWeight: 500,
  color: vars.color.ink3,
  lineHeight: 1.5,
});
