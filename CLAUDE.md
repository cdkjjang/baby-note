# CLAUDE.md — 육아노트 (baby-note)

출산·육아 지원제도(육아휴직급여·부모급여·아동수당·예방접종)가 정부24·복지로·고용24·
질병청에 흩어져 있어 부모들이 반복 검색하는 정보를, 계산기 4종과 가이드 글로 한곳에
모은 애드센스 수익형 미니사이트. 생활반장 노트 시리즈.

## 스택·명령

- Next.js 16.2.10 (App Router) + TypeScript + Tailwind CSS 4. DB·로그인·결제 없음, 전부 정적.
- 개발 서버: 워크스페이스 `.claude/launch.json`의 `baby-note-dev` (포트 3800, preview_start 사용)
- 빌드: `npm run build` / 테스트: `npm test` (vitest 28개)
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
- 가이드 글 6편: `lib/guides-1.ts`(지원금·휴직 3)·`guides-2.ts`(제도·실무 3), `lib/guides.ts`(집계)
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
