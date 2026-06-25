import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

// 데스크톱에서도 모바일 폭으로 중앙 정렬되는 앱 셸.
export const appShell = style({
  width: "100%",
  maxWidth: vars.layout.maxWidth,
  minHeight: "100dvh",
  margin: "0 auto",
  background: vars.color.appBg,
  position: "relative",
  overflowX: "hidden",
});
