// 출산·육아 현금성 지원금 합산 — 첫만남이용권·부모급여·아동수당
//
// ⚠️ 매년 갱신 대상(보건복지부, 연초 고시) — 값 변경 시 테스트도 함께 갱신할 것.
//   2026년 기준:
//   - 첫만남이용권: 첫째 200만원 / 둘째 이상 300만원 (출생 시 1회, 바우처)
//   - 부모급여: 0세 월 100만원(연 1,200만) / 1세 월 50만원(연 600만)
//   - 아동수당: 월 10만원, 만 8세 미만 → 2026년 만 9세 미만으로 확대
//       (출생월부터 만 9세 생일이 속한 달의 전월까지, 최대 108개월)
//
//   * 지자체별 출산장려금은 지역마다 크게 달라 여기서 합산하지 않는다(안내만).

export const FIRST_MEET = {
  first: 2_000_000,
  secondPlus: 3_000_000,
} as const;

export const PARENT_ALLOWANCE = {
  age0Monthly: 1_000_000, // 0세 월
  age1Monthly: 500_000, // 1세 월
  monthsPerYear: 12,
} as const;

export const CHILD_ALLOWANCE = {
  monthly: 100_000, // 월 10만
  maxMonths: 108, // 만 9세 미만 = 최대 108개월
} as const;

export type BirthOrder = "first" | "secondPlus";

export interface BenefitBreakdown {
  firstMeet: number; // 첫만남이용권(1회)
  parentAllowanceAge0: number; // 0세 부모급여 연간 총액
  parentAllowanceAge1: number; // 1세 부모급여 연간 총액
  childAllowanceTotal: number; // 아동수당 총액(만 9세 미만)
  firstTwoYears: number; // 출생~만 2세 전까지 받는 총액(첫만남+부모급여 2년)
  grandTotal: number; // 만 9세까지 현금성 지원 총액
}

/**
 * 출산·육아 현금성 지원금 합산.
 * @param order 출생 순서 (첫만남이용권 금액 결정)
 */
export function calcBenefits(order: BirthOrder): BenefitBreakdown {
  const firstMeet = FIRST_MEET[order];
  const parentAllowanceAge0 =
    PARENT_ALLOWANCE.age0Monthly * PARENT_ALLOWANCE.monthsPerYear;
  const parentAllowanceAge1 =
    PARENT_ALLOWANCE.age1Monthly * PARENT_ALLOWANCE.monthsPerYear;
  const childAllowanceTotal =
    CHILD_ALLOWANCE.monthly * CHILD_ALLOWANCE.maxMonths;

  const firstTwoYears = firstMeet + parentAllowanceAge0 + parentAllowanceAge1;
  const grandTotal = firstTwoYears + childAllowanceTotal;

  return {
    firstMeet,
    parentAllowanceAge0,
    parentAllowanceAge1,
    childAllowanceTotal,
    firstTwoYears,
    grandTotal,
  };
}
