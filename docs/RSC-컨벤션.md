# RSC 우선 개발 컨벤션

> 모든 앱·라우트 작업에 공통 적용한다. 첫 적용 사례: `apps/subscribe-form`의 `unsubscribe/[listId]` 라우트.
> 폴더 구조 규약(`_block`, 라우트 중심)은 `docs/subscribe-form-이관-계획.md` §6.1을 따른다.

## 0. 대원칙

- **서버 컴포넌트가 기본값이다.** `'use client'`는 필요를 증명한 곳에만, 가능한 한 leaf에 선언한다.
- `'use client'`는 파일 표시가 아니라 **경계(boundary) 선언**이다 — 그 파일이 import하는 모든 것이 클라이언트 번들로 끌려간다. 라우트 최상위 View에 선언하는 것을 금지한다.

## 1. 서버/클라이언트 판정 기준

**클라이언트여야 하는 것** (이것만 클라로):

- 상태 (`useState`/`useReducer`), `useEffect`
- 이벤트 핸들러 (onClick, onSubmit …)
- 브라우저 API (localStorage, window …)
- react-hook-form, react-query 훅 (mutation·인증 GET)

**서버에 남겨야 하는 것**:

- 공개 GET fetch (`page.tsx`에서 `await`)
- `params` / `searchParams` 읽기 — **`useSearchParams` 대신 page의 `searchParams` prop을 우선** 사용하고 필요한 값만 아래로 내린다
- 언어 결정·정적 문구 렌더, URL/href 계산 등 순수 계산
- 무거운 의존성 (es-hangul 등) — 서버 전용화로 클라 번들에서 제외

훅·쿼리 파일(`@/hooks`, `@/queries`)은 leaf에서 `'use client'`를 직접 선언한다.

## 2. 라우트 표준 골격 (View / Flow / leaf)

```
app/<route>/
├─ page.tsx                  # RSC — 데이터 페치 + searchParams 정규화
└─ _block/components/
   ├─ <Route>View/           # 서버 — 레이아웃 + 서버 계산 + slot 합성
   ├─ <Route>Flow/           # ★ 'use client' — 라우트의 클라 경계
   │                         #   상태·폼·뮤테이션·알럿 오케스트레이션만
   └─ <Leaf>/                # 서버 leaf(slot용) 또는 클라 leaf(Flow 하위)
```

- **View(서버)**: lang·href 등 서버 계산을 수행하고, 정적 콘텐츠를 렌더해 Flow에 넘긴다. 인터랙션 로직을 갖지 않는다.
- **Flow(클라)**: 상태로 화면을 게이트하는 오케스트레이터. **라우트당 1개가 원칙**.
  - **예외 허용**: 서로 독립적인 인터랙션 영역이 여럿이면(예: 폼 + 무한스크롤 목록) 경계를 나눠도 된다. 단, 나눈 각 경계도 leaf에 가깝게 두고, "상위에서 하나로 합치면 서버 부분이 클라로 끌려가는가?"를 분리 판단 기준으로 삼는다.
- Flow 하위에서만 렌더되는 클라 leaf(예: ReasonField)는 이미 경계 안이므로 **directive를 다시 선언하지 않는다**.

## 3. Slot 패턴 — 상태에 게이트되는 정적 콘텐츠

클라 상태가 노출 여부만 결정하고 내용은 정적인 콘텐츠는, **서버(View)에서 렌더한 ReactNode를 props(slot)로 Flow에 전달**하고 Flow는 조건부 표시만 한다.

```tsx
// View(서버)
<Flow texts={{ completed: <CompletedText … /> }} paidNotice={<PaidNotice … />} />

// Flow(클라)
{displayMode === 'completed' && texts.completed}
```

- 서버 → 클라 props는 **직렬화 가능해야 한다**: 함수·클래스 인스턴스 전달 금지. ReactNode slot은 허용되는 전달 방식.
- 판단 기준: 콘텐츠가 서버가 아는 값(fetch 결과, searchParams)만으로 완성되면 slot으로. 클라 런타임 값(입력값, 뮤테이션 결과)이 섞이면 Flow 안에서 렌더.

## 4. 스타일 co-location

- 컴포넌트마다 폴더: `<Component>/<Component>.tsx` + `<Component>.styles.ts`
- **스타일 모음 파일 금지** (여러 컴포넌트가 하나의 `*.styles.ts`를 공유하는 형태)
- **폴더 간 스타일 import 금지** — 컴포넌트 간 결합을 만들지 않는다.
- **과도기 중복 허용**: `@stibee/ui` 적용 전이라 타이포·버튼 등 스타일 중복이 많이 생기는 것은 정상이다. 중복 대부분은 DS 컴포넌트로 대체되는 순간 사라지므로, **성급하게 공용화(모음 파일 부활)하지 말고** 중복을 그대로 두되 주석으로 출처(레거시 셀렉터·동일 값의 원본 위치)를 남긴다.

## 5. 검증

- 라우트 작업 후 `pnpm build`로 RSC 경계 유효성 확인 (직렬화 오류·CSR bailout은 typecheck로 안 잡힘)
- 서버 전용화를 의도한 의존성은 클라 청크에서 부재 확인: `grep -rl "<식별 문자열>" .next/static/chunks/`
