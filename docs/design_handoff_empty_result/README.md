# Handoff: 절세 서비스 — 추천 결과 "결과 없음" 폴백 화면

## Overview
STEP2 추천 결과 페이지의 **폴백(빈) 상태** 디자인입니다.

사용자가 STEP1에서 필수 정보를 정확히 입력하지 않으면 예상 환급률(rate)이 **`null`** 로 계산됩니다. 이때 정상 추천 결과(`ScreenResult`) 대신, 무엇이 잘못됐고 어떻게 고치는지 안내하는 **`ScreenResultEmpty`** 화면을 보여줍니다.

목표: 막다른 에러가 아니라, 사용자가 부족한 항목을 바로 알아채고 다시 입력해 결과에 도달하도록 부드럽게 유도.

## About the Design Files
이 번들의 파일들은 **HTML/React(JSX)로 만든 디자인 레퍼런스**입니다 — 의도한 룩앤필과 동작을 보여주는 프로토타입이며, 그대로 프로덕션에 복사할 코드가 아닙니다.

작업은 이 디자인을 **타겟 코드베이스의 기존 환경(React/Vue/Next 등)과 패턴·컴포넌트·디자인 토큰을 사용해 재현**하는 것입니다. 프론트엔드 환경이 아직 없다면 프로젝트에 가장 적합한 프레임워크를 선택해 구현하세요. `.jsx`는 데모용이라 inline style + 전역 `window` 등록 방식이며, 실제로는 코드베이스의 스타일링 방식으로 옮기세요.

## Fidelity
**High-fidelity (hifi).** 최종 색상·타이포·간격이 확정된 목업입니다. 아래 토큰/스펙대로 픽셀 단위로 재현하세요. 폰트는 **Pretendard Variable**.

---

## Screens / Views

### 추천 결과 — 결과 없음 (환급률 null)
- **컴포넌트**: `ScreenResultEmpty` (`design_files/screen-result.jsx` 하단)
- **트리거 조건**: 추천 계산 결과 `rate === null` (또는 필수 입력 누락/유효성 실패). 정상일 땐 `ScreenResult`, null일 땐 `ScreenResultEmpty` 렌더.
- **전체 레이아웃** (모바일 width 390px 기준, 세로 flex column):
  - 배경 `#F2F4F6` (`TT.appBg`)
  - 상단 **AppBar** — title "추천 결과", 뒤로가기 화살표 있음(accent 아님, 흰 반투명 바)
  - 본문 컨테이너: `flex:1`, 패딩 `20px 20px 24px`
  - 하단 **고정 CTA** (sticky bottom)

**본문 구성 (위→아래):**

1. **히어로 메시지** (가운데 정렬, 패딩 `36px 4px 28px`)
   - 아이콘 원형: 76×76, radius 999, 흰 배경 + `1px solid #E5E8EB` + `TT.card` 그림자. 내부에 SVG(회색 원 + 파란 느낌표: 세로 막대 `#2F6BF0` + 아래 점). 복잡한 일러스트 대신 단순 기호.
   - 제목: "아직 환급률을 / 계산할 수 없어요" — 22px / 800 / `#191F28` / letter-spacing -0.03em / line-height 1.35
   - 본문: "입력하신 정보가 일부 비어 있거나 / 정확하지 않아 추천 결과를 만들지 못했어요." — 14.5px / 500 / `#8B95A1` / line-height 1.6

2. **확인이 필요한 항목 카드** (흰 배경, radius 20, 패딩 20, `TT.card` 그림자)
   - 헤더: "확인이 필요한 항목"(15px/800) + 누락 개수 뱃지(`#EAF1FE` 배경 / `#1D52C9` 텍스트 / radius 999 / 12px 800). 누락 0개면 뱃지 숨김.
   - 서브: "아래 항목을 채우면 바로 결과를 볼 수 있어요."(12.5px/500 `#8B95A1`)
   - **필드 리스트** (각 행 `padding 13px 0`, 첫 행 제외 `1px solid #F2F4F6` 상단 구분선):
     - 좌측 상태 아이콘 26×26 원형:
       - 완료(`done: true`) → `#E6F8F1` 배경 + 초록 체크(`#0CA678`)
       - 미완료 → `#F2F4F6` 배경 + 6px 회색 점(`#B0B8C1`)
     - 라벨(15px/700, 완료 시 `#8B95A1`·미완료 시 `#191F28`) + 힌트(12px/500 `#B0B8C1`)
     - 미완료 행 우측에 "입력 필요" 라벨(12.5px/800 `#2F6BF0`)
   - **필드 목록**(`REQUIRED_FIELDS`): 연봉(세전 총급여), 태어난 해(청년 혜택 판별), 보유 자산(저축·투자 금액), 부양가족 수(기본공제 대상)

3. **안내 박스** (`marginTop 14`, `#F7F8FA` 배경, radius 12, 패딩 `12px 14px`)
   - ⓘ + "연봉이 0이거나 태어난 해가 비어 있으면 세율·청년 혜택을 판별할 수 없어 환급률이 계산되지 않아요."(12px/500 `#8B95A1`)

4. **고정 CTA** (`position: sticky; bottom:0`, 패딩 `14px 20px 30px`, 위로 앱배경 페이드 그라데이션)
   - 파란 `CTAButton`, 텍스트 "정보 다시 입력하기"

---

## Interactions & Behavior
- **렌더 분기**: 결과 계산 후 `rate == null` → `ScreenResultEmpty`, 아니면 `ScreenResult`.
- **필드 상태**: 각 필수 필드의 유효성 결과를 `fields`(`{ key, label, hint, done }[]`)로 넘김. `done`이 곧 "정상 입력됨" 여부. 컴포넌트가 `done: false` 개수를 세어 뱃지·"입력 필요" 표시를 자동 계산.
- **"정보 다시 입력하기"**: STEP1 입력 페이지로 이동. 이상적으로는 기존 입력값을 유지한 채, 첫 번째 미완료(`done:false`) 필드로 포커스/스크롤 이동.
- **엣지 케이스**: 모든 필드가 `done`인데도 rate가 null인 경우(계산 오류 등)엔 안내 박스 문구를 일반 오류 메시지로 대체하고, 필요하면 "다시 시도" 액션을 추가.

## State Management
- 입력값(연봉·태어난 해·자산·부양가족 등)과, 그로부터 산출한 `rate`.
- 필드별 유효성 → `fields[].done` 매핑.
- `rate === null` 여부가 결과 페이지의 표시 분기를 결정하는 핵심 상태.

## 유효성 기준 (권장)
- **연봉**: 필수. `> 0`. (0/빈값이면 세율 산정 불가 → null)
- **태어난 해**: 필수. 4자리 연도, 합리적 범위(예: 1930~올해). (청년 혜택·만나이 판별 불가 → null)
- **보유 자산**: 최소 하나 이상 입력. 전부 비면 추천 조합 산출 곤란.
- **부양가족 수**: 0 이상 정수. 미입력은 0으로 간주 가능(정책에 따라 필수 여부 결정).

## Design Tokens
`design_files/theme.jsx`의 `TT` 객체 기준:
- **Brand**: blue `#2F6BF0`, blueDeep `#1D52C9`, blueWeak `#EAF1FE`
- **Green**(완료 표시): greenDeep `#0CA678`, greenWeak `#E6F8F1`
- **Neutrals**: ink `#191F28`, ink3 `#8B95A1`, ink4 `#B0B8C1`, line `#E5E8EB`, line2 `#F2F4F6`, fill `#F2F4F6`, fieldBg `#F7F8FA`, appBg `#F2F4F6`, white `#FFFFFF`
- **Type**: Pretendard Variable
- **Radius**: 안내박스/뱃지영역 12, 카드 20, 아이콘원/상태원 999, 버튼 16
- **Shadow**: card = `0 1px 2px rgba(25,31,40,0.04), 0 6px 20px rgba(25,31,40,0.05)`

## Assets
- **폰트**: Pretendard Variable (CDN `https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/...`) 또는 코드베이스 기존 폰트.
- **아이콘**: 인라인 SVG(느낌표, 체크, 뒤로가기 화살표). 코드베이스 아이콘 라이브러리로 대체 가능.
- 별도 비트맵 없음.

## Files
- `design_files/screen-result.jsx` — 정상 결과(`ScreenResult`) + **폴백(`ScreenResultEmpty`, `REQUIRED_FIELDS`)**. 이번 핸드오프의 핵심.
- `design_files/screen-input.jsx` — STEP1 입력 화면. 어떤 필드가 필수인지 근거.
- `design_files/theme.jsx` — 디자인 토큰 + 공용 UI 프리미티브.
- `design_files/절세 서비스 시안 (모바일웹).html` — 전체 플로우 실행 프로토타입. "STEP 2 · 결과 없음 (환급률 null)" 아트보드에서 이 화면 확인.
- 그 외 `design-canvas.jsx`, `screen-detail.jsx`, `screen-share.jsx`, `screen-input2.jsx`, `screen-input-stepped.jsx` — 프로토타입 실행에 필요한 의존 파일(참고용).

> 프로토타입을 직접 보려면 `design_files/절세 서비스 시안 (모바일웹).html`을 브라우저로 열고 "STEP 2 · 결과 없음" 아트보드를 확인하세요.
