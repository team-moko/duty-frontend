// 디자인 시안의 인라인 SVG 아이콘들. currentColor 기반으로 재사용 가능하게 정리.

export function ChevronLeftIcon({ color = "currentColor" }: { color?: string }) {
  return (
    <svg width="11" height="20" viewBox="0 0 11 20" fill="none" aria-hidden>
      <path
        d="M9.5 2L2 10l7.5 8"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChevronRightIcon({ color = "currentColor" }: { color?: string }) {
  return (
    <svg width="8" height="14" viewBox="0 0 8 14" fill="none" aria-hidden>
      <path
        d="M1 1l6 6-6 6"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CheckIcon({ color = "#fff" }: { color?: string }) {
  return (
    <svg width="13" height="10" viewBox="0 0 13 10" fill="none" aria-hidden>
      <path
        d="M1.5 5l3.2 3.2L11.5 1.5"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ShareIcon({ color = "currentColor" }: { color?: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
      <circle cx="5.5" cy="11" r="2.4" fill={color} />
      <circle cx="16" cy="5" r="2.4" fill={color} />
      <circle cx="16" cy="17" r="2.4" fill={color} />
      <path d="M7.6 9.8l6.4-3.6M7.6 12.2l6.4 3.6" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
