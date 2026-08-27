/**
 * 이 노트의 계산기를 쓴 사람이 **다음에 마주칠 질문**과, 그 답이 있는
 * 다른 노트의 계산기.
 *
 * ⚠️ 이 파일은 워크스페이스 생성기로 만든다. 손으로 고치면 다음 생성 때 덮인다.
 *
 * 규칙 (components/RelatedTools.tsx 주석 참조):
 *   - 계산기마다 최대 3개. 페이지마다 내용이 달라야 한다.
 *   - 같은 노트 안의 계산기는 넣지 않는다.
 *   - "관련 계산기"가 아니라 그 사람이 실제로 다음에 겪는 일로 적는다.
 */
export type RelatedTool = {
  /** 그 사람이 다음에 던지는 질문 — 링크 텍스트가 된다 */
  question: string;
  /** 어느 노트인지 */
  note: string;
  /** 어떤 계산기인지 */
  tool: string;
  /** 전체 URL (다른 도메인이므로 절대 경로) */
  href: string;
};

export const RELATED_TOOLS: Record<string, RelatedTool[]> = {
  "/calc/parental-leave": [
    {
      question: "복직하면 실수령액이 얼마가 되나요",
      note: "급여노트",
      tool: "연봉 실수령액 계산기",
      href: "https://salary.lifebanjang.com/calc/salary",
    },
    {
      question: "휴직 기간도 연말정산을 하나요",
      note: "세금노트",
      tool: "연말정산 계산기",
      href: "https://tax.lifebanjang.com/calc/year-end",
    },
    {
      question: "청년 월세지원을 함께 받을 수 있나요",
      note: "청년정책노트",
      tool: "청년 월세지원 계산기",
      href: "https://youth.lifebanjang.com/calc/rent",
    },
  ],
  "/calc/benefits": [
    {
      question: "돌잔치 답례와 축하금은 얼마가 적당한가요",
      note: "경조사노트",
      tool: "돌잔치 축하금 계산기",
      href: "https://gyeongjosa.lifebanjang.com/doljanchi/gift",
    },
    {
      question: "외벌이가 되면 실수령액이 얼마인가요",
      note: "급여노트",
      tool: "연봉 실수령액 계산기",
      href: "https://salary.lifebanjang.com/calc/salary",
    },
    {
      question: "출산하면 연말정산이 달라지나요",
      note: "세금노트",
      tool: "연말정산 계산기",
      href: "https://tax.lifebanjang.com/calc/year-end",
    },
  ],
  "/calc/vaccine": [
    {
      question: "아이 병원비는 몇 퍼센트를 내나요",
      note: "건강보험노트",
      tool: "본인부담률 계산기",
      href: "https://health.lifebanjang.com/calc/rate",
    },
    {
      question: "어른 건강검진은 언제 받나요",
      note: "건강보험노트",
      tool: "건강검진 대상 계산기",
      href: "https://health.lifebanjang.com/calc/checkup",
    },
    {
      question: "돌잔치 축하금은 얼마가 적당한가요",
      note: "경조사노트",
      tool: "돌잔치 축하금 계산기",
      href: "https://gyeongjosa.lifebanjang.com/doljanchi/gift",
    },
  ],
  "/calc/work-reduction": [
    {
      question: "단축하면 실수령액이 얼마가 되나요",
      note: "급여노트",
      tool: "연봉 실수령액 계산기",
      href: "https://salary.lifebanjang.com/calc/salary",
    },
    {
      question: "4대보험료도 함께 줄어드나요",
      note: "급여노트",
      tool: "4대보험 계산기",
      href: "https://salary.lifebanjang.com/calc/insurance",
    },
    {
      question: "국민연금 낸 기간이 줄면 손해인가요",
      note: "연금노트",
      tool: "국민연금 예상액 계산기",
      href: "https://pension.lifebanjang.com/calc/national",
    },
  ],
};
