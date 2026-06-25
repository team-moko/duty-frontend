# jeolse — 절세 추천 서비스 (모바일웹)

연봉·자산·가족 정보를 입력하면 가장 유리한 **절세 계좌 조합**(연금저축·IRP·청년형 ISA 등)을
환급률 순으로 추천해 주는 모바일웹 서비스입니다.

화면은 2단계 플로우입니다.

1. **정보 입력** (`/`) — 절세 계산에 필요한 사용자 정보 입력
2. **추천 결과** (`/result`) — 환급률·조합 순위 → 조합 카드 클릭 시 **조합 상세**(`/result/[id]`)

---

## 1. 폴더 구조

```
duty-frontend/
├─ src/
│  ├─ app/                      # Next.js App Router (라우트 = 화면)
│  │  ├─ layout.tsx             # 루트 레이아웃 (Pretendard 폰트·앱 셸)
│  │  ├─ layout.css.ts
│  │  ├─ globals.css            # 전역 리셋
│  │  ├─ page.tsx               # 화면 1 · 정보 입력 (/)
│  │  ├─ page.css.ts
│  │  └─ result/
│  │     ├─ page.tsx            # 화면 2 · 추천 결과 (/result)
│  │     ├─ result.css.ts
│  │     ├─ ComboCard.tsx       # 조합 카드 (결과 화면 전용)
│  │     ├─ ComboCard.css.ts
│  │     └─ [id]/
│  │        ├─ page.tsx         # 화면 3 · 조합 상세 (/result/[id], 서버 컴포넌트)
│  │        ├─ ComboDetail.tsx  # 상세 뷰 (클라이언트)
│  │        └─ detail.css.ts
│  │
│  ├─ components/               # 공통 컴포넌트 팩 (.tsx + .css.ts 쌍)
│  │  ├─ index.ts               # 배럴 export
│  │  ├─ AppBar / CTAButton / InputBox / RadioPill / CheckRow
│  │  ├─ AccountChip / RankBadge / Segmented / BottomBar / FieldRow
│  │  └─ icons.tsx              # 인라인 SVG 아이콘
│  │
│  ├─ styles/
│  │  └─ theme.css.ts           # 디자인 토큰 (createGlobalTheme → CSS 변수)
│  ├─ data/
│  │  └─ combos.ts              # 절세 조합 예시 데이터 (실제 계산 로직 교체 대상)
│  ├─ lib/
│  │  └─ format.ts              # 숫자 포맷 헬퍼 (won, digitsOnly)
│  └─ fonts/
│     └─ PretendardVariable.woff2   # self-host 폰트
│
├─ next.config.ts              # Next + vanilla-extract 플러그인, React Compiler
├─ tsconfig.json               # 경로 별칭 @/* → src/*
├─ eslint.config.mjs
├─ .nvmrc                      # Node 버전 (v24)
├─ .npmrc                      # pnpm use-node-version
└─ package.json
```

**스타일링 규칙**: 컴포넌트마다 `*.tsx`(마크업)와 `*.css.ts`(vanilla-extract 스타일)를 쌍으로 둡니다.
색상·간격·그림자 등 모든 토큰은 `src/styles/theme.css.ts`의 `vars`에서 가져옵니다 (하드코딩 금지).

---

## 2. 메인 라이브러리 버전

| 라이브러리 | 버전 | 용도 |
|---|---|---|
| [Next.js](https://nextjs.org) | `16.2.9` | App Router 프레임워크 (React Compiler 활성화) |
| React / React DOM | `19.2.4` | UI 런타임 |
| [@vanilla-extract/css](https://vanilla-extract.style) | `^1.20.1` | 타입세이프 CSS-in-JS (제로런타임) |
| @vanilla-extract/next-plugin | `^2.5.2` | Next 빌드 통합 |
| [pretendard](https://github.com/orioncactus/pretendard) | `^1.3.9` | 본문 폰트 (self-host) |
| TypeScript | `^5` | 정적 타입 |
| ESLint / eslint-config-next | `^9` / `16.2.9` | 린트 |
| babel-plugin-react-compiler | `1.0.0` | React Compiler |

> 정확한 잠금 버전은 `pnpm-lock.yaml` 참고.

---

## 3. Node · pnpm 버전

| 도구 | 버전 | 고정 위치 |
|---|---|---|
| Node.js | **v24** (`>=24`) | `.nvmrc`, `package.json` `engines.node` |
| pnpm | **11.9.0** | `package.json` `packageManager` |

- pnpm 11.9.0은 Node **22.13 이상**을 요구합니다. Node 20 이하에서는 pnpm 자체가 부팅에 실패하므로,
  **pnpm 실행 전에 셸 Node를 24로 맞춰야 합니다.**
- `nvm` 사용 시 프로젝트 루트에서 `nvm use`를 실행하면 `.nvmrc`에 따라 Node 24로 전환됩니다.
- pnpm은 [Corepack](https://nodejs.org/api/corepack.html)으로 `packageManager` 핀에 맞춰 자동 사용됩니다
  (`corepack enable`).

---

## 4. 구동 방식

```bash
# 0. Node 버전 맞추기 (nvm 사용 시)
nvm use            # .nvmrc → Node 24

# 1. 의존성 설치
pnpm install

# 2. 개발 서버 (http://localhost:3000)
pnpm dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속.
모바일웹이므로 개발자도구에서 화면 폭을 **390px** 정도로 보면 디자인 의도에 가깝게 확인됩니다.

### 그 외 스크립트

| 명령 | 설명 |
|---|---|
| `pnpm dev` | 개발 서버 (Turbopack) |
| `pnpm build` | 프로덕션 빌드 |
| `pnpm start` | 빌드 결과 실행 |
| `pnpm lint` | ESLint 검사 |
