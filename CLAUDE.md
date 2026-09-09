# CLAUDE.md — 육아노트 (baby-note)

출산·육아 지원제도(육아휴직급여·부모급여·아동수당·예방접종)가 정부24·복지로·고용24·
질병청에 흩어져 있어 부모들이 반복 검색하는 정보를, 계산기 4종과 가이드 글로 한곳에
모은 애드센스 수익형 미니사이트. 생활반장 노트 시리즈.

## 스택·명령

- Next.js 16.2.10 (App Router) + TypeScript + Tailwind CSS 4. DB·로그인·결제 없음, 전부 정적.
- 개발 서버: 워크스페이스 `.claude/launch.json`의 `baby-note-dev` (포트 3800, preview_start 사용)
- 빌드: `npm run build` / 테스트: `npm test` (vitest 40개)
- Node는 포터블: 명령 앞에 `$env:Path = "E:\클로드\tools\node;$env:Path"` 필요 (매 명령)
- 배포: `git push origin main` (Vercel 자동 배포)만 사용. 절차는 `DEPLOY.md`
- 도메인: baby.lifebanjang.com (허브 lifebanjang-hub의 `lib/notes.ts`에 등록 필요)

## 구조

- `lib/date.ts` — 공통 날짜·금액 유틸 (UTC 자정 기준, formatWon, formatKoreanDate, addMonths)
- `lib/site.ts` — 사이트 상수(SITE_NAME/URL/DESCRIPTION)
- 계산 엔진 + 테스트 (로직 수정 시 반드시 테스트 함께 갱신):
  - `lib/parental-leave.ts` 육아휴직급여 — 개월 구간별 지급률·상한, 6+6 부모육아휴직제
  - `lib/benefits.ts` 출산·육아 현금 지원 합산 — 첫만남이용권·부모급여·아동수당
  - `lib/vaccine.ts` 국가예방접종(NIP) 표준일정 — 생년월일 → 접종일 계산
  - `lib/work-reduction.ts` 육아기 근로시간 단축급여
- 가이드 글 **19편**: `lib/guides-1.ts`(지원금·육아휴직 2)·`guides-2.ts`(제도·실무 6)·
  `guides-3~9.ts`·`guides-11.ts`(휴가·보육·접종 4), `lib/guides.ts`(집계)

### 2026-09-10 가이드 통합 (27 → 19편)

애드센스가 "가치가 별로 없는 콘텐츠"로 두 번 반려했다(워크스페이스 CLAUDE.md 8장).
27편 중 **8편이 본문 1,500자를 밑돌았고**, 출산 지원금 한 주제를 세 편이,
육아휴직을 네 편이 나눠 갖고 있었다.

| 사라진 글 | 흡수한 글 |
|---|---|
| parent-vs-child-allowance · birth-benefit-order | birth-benefits-2026 |
| parental-leave-order · work-reduction-guide | parental-leave-2026 |
| pregnancy-work-hours | maternity-leave-guide |
| daycare-application | daycare-vs-kindergarten |
| child-care-service | elementary-care |
| infant-checkup | vaccine-schedule-guide |

- 사라진 8개 슬러그는 `next.config.ts`의 `redirects()`가 301(308)로 보낸다. **지우지 말 것.**
- `guides-10.ts`는 비어서 삭제됐다. **번호를 재사용하지 말 것** — 새 파일은 `guides-12.ts`부터.
- 계획표상 목표는 20편이었는데 19편이 됐다. 얇은 글 8편을 전부 흡수하려면 여기까지 와야 했다.

### ⚠️ 합치면서 드러난 두 가지 어긋남

쪼개져 있을 때는 각 글이 따로 읽혀 아무도 대조하지 않는다. 나란히 놓으니 보였다.

1. **아동수당을 만 8세 미만으로 쓴 곳이 넷** 있었다. 2026년부터 **만 9세 미만**이고
   `lib/benefits.ts`의 `maxMonths: 108`이 그 기준이다. 가이드 셋과 **홈 시나리오 하나**가
   낡아 있었다(`app/page.tsx`). 같은 노트의 다른 글들은 만 9세로 맞게 쓰고 있었다.
2. **사후지급금**을 `parental-leave-order`가 "폐지·조정될 수 있다"고 흐리게 썼는데
   **2025년에 이미 폐지**됐다. `parental-leave-2026`은 폐지로 단정하고 있어 어긋났다.

`lib/guides.test.ts`가 둘 다 고정한다. 아동수당은 `CHILD_ALLOWANCE.maxMonths`를 직접
읽어 대조하므로, 계산 엔진과 본문이 함께 움직인다.

### 테스트를 조각 매칭으로 짜지 말 것

`guides.test.ts`의 사후지급금 검사는 **글 단위**로 본다. 처음에 문장 주변 ±60자만
잘라 보게 짰더니 *"예전 자료에는 아직 사후지급금 설명이 남아 있다"*처럼
**폐지를 설명하는 문장 자체**가 걸렸다(로또노트에서도 같은 실수를 했다).
- 계산기 페이지: `app/calc/{parental-leave,benefits,vaccine,work-reduction}/page.tsx` — SEO 해설 + FAQPage JSON-LD
- 계산기 컴포넌트: `components/*Calculator.tsx`, `VaccineSchedule.tsx`
- 애드센스: `components/AdSlot.tsx` — `NEXT_PUBLIC_ADSENSE_CLIENT` 설정 전에는 아무것도 렌더링 안 함

## 주의사항 (매년·수시 갱신 대상 — 값 변경 시 테스트 동반)

- **육아휴직급여** (`lib/parental-leave.ts`, 고용노동부): 2026 기준 1~3개월 100%(상한 250만)/
  4~6개월 100%(상한 200만)/7개월~ 80%(상한 160만), 하한 70만, 사후지급금 폐지.
  6+6 부모육아휴직제 첫 6개월 상한 200~450만.
- **부모급여·첫만남·아동수당** (`lib/benefits.ts`, 복지부 연초): 부모급여 0세 100만/1세 50만,
  첫만남 첫째 200만/둘째이상 300만, 아동수당 월 10만·만 9세 미만(2026 확대).
- **육아기 근로시간 단축급여** (`lib/work-reduction.ts`): 최초 10시간분 100%(상한 250만)/
  나머지 80%(상한 160만).
- **예방접종 표준일정** (`lib/vaccine.ts`, 질병청): 2026 인플루엔자 3가 전환, HPV 남아 확대,
  로타 생후 8개월 전 완료.
- 지자체별 추가지원은 지역 상이 — 계산기·면책 고지 유지. 개별 행정·법률·의료 자문 아님 고지 유지.
- 생년월일·급여는 브라우저에서만 처리(서버 미전송) — 개인정보처리방침에 명시된 대로 유지.
- 브라우저 스크린샷은 이 환경에서 타임아웃 가능 — get_page_text/read_page로 검증.
- PowerShell에서 `app/guide/[slug]` 경로를 다룰 때는 `-LiteralPath` 사용 (대괄호가 와일드카드로 해석됨).
