// 계산기 결과 아래에 보여 주는 쿠팡 상품 링크 (2026-11-19, LBJ-REQ-7 사용자 결정).
// 상품은 피클AI 큐레이션(lifebanjang-hub/collab/inbox/2026-11-16-seo-ctr-coupang-boost.md 6.1).
//
// - 계산기 slug 에 상품이 없으면 블록이 아예 그려지지 않는다(빈 자리 없음).
// - href 는 정식 파트너 딥링크(lptag=AF6888890). subId 로 노트 · 자리별 클릭을 나눠 본다.
//   파트너스 콘솔에서 단축 링크(/a/…)를 발급하면 href 만 바꾸면 된다.
// - ⚠️ title · why 에 가격 · 할인 · '최저가' · '인기' 같은 말을 넣지 말 것(표시광고법 · 파트너스 약관).
//   why 는 계산 결과와 이어지는 한 문장으로 쓴다. lib/coupang.test.ts 가 막는다.
// - ⚠️ 상품 이미지를 쿠팡 CDN 에서 직접 받아 쓰지 말 것 — 글자 블록으로 둔다.

export type CoupangPick = {
  title: string;
  why: string;
  href: string;
};

export const COUPANG_PICKS: Record<string, CoupangPick[]> = {
  "parental-leave": [
    {
      "title": "냉장 이유식 초기 1단계 세트 (만 4~6개월)",
      "why": "휴직 중 아이가 4~6개월이 되면 이유식을 시작합니다. 처음 몇 주는 만들어 둔 것으로 시작하는 집이 많습니다.",
      "href": "https://link.coupang.com/re/AFFSDP?lptag=AF6888890&pageKey=245220295&subId=baby1"
    }
  ],
  "benefits": [
    {
      "title": "유리 밀폐 이유식 용기 3종 (230ml)",
      "why": "부모급여·아동수당으로 가장 먼저 사는 것 중 하나가 이유식 보관 용기입니다.",
      "href": "https://link.coupang.com/re/AFFSDP?lptag=AF6888890&pageKey=8106420396&subId=baby2"
    }
  ],
  "vaccine": [
    {
      "title": "비접촉 체온계 (휴비딕 써모파인더 S2)",
      "why": "예방접종 뒤 하루 이틀은 열이 오를 수 있어 집에서 체온을 자주 잽니다. 자는 아이도 깨우지 않고 잴 수 있습니다.",
      "href": "https://link.coupang.com/re/AFFSDP?lptag=AF6888890&pageKey=5449239271&subId=baby3"
    }
  ]
};

export function picksFor(calc: string): CoupangPick[] {
  return COUPANG_PICKS[calc] ?? [];
}
