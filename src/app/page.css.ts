import { vars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const screen = style({
  minHeight: "100dvh",
  background: vars.color.appBg,
  display: "flex",
  flexDirection: "column",
});

// 고정 헤더 높이만큼 자리를 비우는 spacer — flex column에서 눌리지 않도록 shrink 방지.
export const topSpacer = style({
  flexShrink: 0,
});

// ── StepProgress ─────────────────────────────
export const progress = style({
  padding: "4px 20px 18px",
});

export const progressBars = style({
  display: "flex",
  gap: 6,
  marginBottom: 10,
});

export const barTrack = style({
  flex: 1,
  height: 4,
  borderRadius: vars.radius.pill,
  background: vars.color.line,
  overflow: "hidden",
});

export const barFill = style({
  width: "100%",
  height: "100%",
  background: vars.color.blue,
  transformOrigin: "left",
});

export const progressMeta = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const progressLabel = style({
  fontSize: 13,
  fontWeight: 700,
  color: vars.color.blue,
  letterSpacing: "-0.02em",
});

export const progressCount = style({
  fontSize: 13,
  fontWeight: 600,
  color: vars.color.ink3,
});

export const progressCurrent = style({
  color: vars.color.ink,
});

// ── StepHeader ───────────────────────────────
export const header = style({
  padding: "20px 22px",
});

export const title = style({
  margin: 0,
  fontSize: 25,
  fontWeight: 800,
  color: vars.color.ink,
  lineHeight: 1.32,
  letterSpacing: "-0.03em",
  whiteSpace: "pre-line",
});

// ── 폼 카드 ──────────────────────────────────
export const formCard = style({
  background: vars.color.white,
  borderRadius: "24px 24px 0 0",
  flex: 1,
  padding: "26px 20px 150px",
  boxShadow: `0 -1px 0 ${vars.color.line}`,
});

// 스텝 본문 세로 스택
export const stepCol = style({
  display: "flex",
  flexDirection: "column",
  gap: 26,
});

export const stepColTight = style({
  display: "flex",
  flexDirection: "column",
  gap: 12,
});

export const investGrid = style({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 8,
});

export const accountIntro = style({
  margin: "0 0 4px",
  fontSize: 14,
  fontWeight: 500,
  color: vars.color.ink3,
  lineHeight: 1.5,
  letterSpacing: "-0.02em",
});

export const checkCol = style({
  display: "flex",
  flexDirection: "column",
  gap: 10,
});

// ── 하단 내비 (뷰포트 하단 고정) ──────────────
export const nav = style({
  position: "fixed",
  bottom: 0,
  left: "50%",
  transform: "translateX(-50%)",
  width: "100%",
  maxWidth: vars.layout.maxWidth,
  zIndex: 10,
  padding: "14px 20px 30px",
});

export const submitError = style({
  margin: "0 0 10px",
  color: "red",
  fontSize: 13,
  fontWeight: 600,
  lineHeight: 1.4,
  textAlign: "center",
  whiteSpace: "pre-line",
});

export const navRow = style({
  display: "flex",
  gap: 10,
});

export const prevBtn = style({
  width: 92,
  height: 56,
  flexShrink: 0,
  borderRadius: vars.radius.button,
  cursor: "pointer",
  background: vars.color.white,
  border: `1px solid ${vars.color.line}`,
  boxShadow: vars.shadow.card,
  fontSize: 16,
  fontWeight: 700,
  color: vars.color.ink2,
  letterSpacing: "-0.02em",
});

export const nextWrap = style({
  flex: 1,
});
