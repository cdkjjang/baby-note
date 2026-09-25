// 출산·육아 현금성 지원금 합산 — 첫만남이용권·부모급여·아동수당
//
// ⚠️ 매년 갱신 대상(보건복지부, 연초 고시) — 값 변경 시 테스트도 함께 갱신할 것.
//   2026년 기준:
//   - 첫만남이용권: 첫째 200만원 / 둘째 이상 300만원 (출생 시 1회, 바우처)
//   - 부모급여: 0세 월 100만원(연 1,200만) / 1세 월 50만원(연 600만)
//   - 아동수당: 월 10만원. 아동수당법 제4조(2026. 3. 20. 개정)로 "13세 미만"이 되고
//       부칙에 따라 해마다 한 살씩 확대된다 — CHILD_ALLOWANCE_AGE_BY_YEAR 참조.
//       (2026년 1월분부터 소급. 지급 기간은 출생월부터 상한 나이 생일이 속한 달의 전월까지)
//
//   * 지자체별 출산장려금은 지역마다 크게 달라 여기서 합산하지 않는다(안내만).
//   * 아동수당 비수도권·인구감소지역 추가 지급(제4조 ⑥, 월 2만원 범위)은 금액이
//     대통령령이라 계산에 넣지 않는다(안내만).

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
} as const;

/**
 * 아동수당 지급 연령 상한(만 N세 미만) — 해당 연도에 적용되는 값.
 * 아동수당법 제4조(2026. 3. 20. 개정)·부칙. 2030년부터는 본칙대로 13세 미만.
 * ⚠️ 지난 연도 값을 지우지 말 것 — 개월 수 계산이 연도별로 이 표를 읽는다.
 */
export const CHILD_ALLOWANCE_AGE_BY_YEAR: Readonly<Record<number, number>> = {
  2025: 8,
  2026: 9,
  2027: 10,
  2028: 11,
  2029: 12,
  2030: 13,
};

const AGE_TABLE_YEARS = Object.keys(CHILD_ALLOWANCE_AGE_BY_YEAR).map(Number);
/** 표가 시작하는 연도. 그 이전 지급 이력은 계산하지 않는다. */
export const CHILD_ALLOWANCE_FIRST_YEAR = Math.min(...AGE_TABLE_YEARS);
const AGE_TABLE_LAST_YEAR = Math.max(...AGE_TABLE_YEARS);

/** 그 해에 아동수당을 받는 나이 상한(만 N세 미만). 표 마지막 해 이후는 그 값 유지. */
export function childAllowanceAgeLimit(year: number): number {
  if (year < CHILD_ALLOWANCE_FIRST_YEAR) {
    throw new RangeError(`${year}년 아동수당 연령 기준은 표에 없습니다`);
  }
  return CHILD_ALLOWANCE_AGE_BY_YEAR[Math.min(year, AGE_TABLE_LAST_YEAR)];
}

/**
 * 아동수당을 받는 개월 수 — CHILD_ALLOWANCE_FIRST_YEAR(2025년) 1월 이후 분만 센다.
 *
 * 상한 나이가 해마다 한 살씩 오르므로 "상한 × 12"로 끝나지 않는다. 달마다
 * 그 달이 속한 해의 상한과 아이의 만 나이(생일이 속한 달부터 한 살 더한 것으로 본다)를
 * 비교한다. 2017년생처럼 상한과 같이 나이를 먹는 아이는 해마다 생일 전 몇 달만 받는다.
 */
export function childAllowanceMonths(birthYear: number, birthMonth = 1): number {
  if (!Number.isInteger(birthMonth) || birthMonth < 1 || birthMonth > 12) {
    throw new RangeError(`출생월이 올바르지 않습니다: ${birthMonth}`);
  }
  // 최종 상한(13세)에 닿으면 더 받을 달이 없다.
  const finalAge = CHILD_ALLOWANCE_AGE_BY_YEAR[AGE_TABLE_LAST_YEAR];
  let months = 0;
  for (let age = 0; age < finalAge; age++) {
    for (let i = 0; i < 12; i++) {
      // 만 age세인 i번째 달의 달력상 연도
      const monthIndex = birthMonth - 1 + age * 12 + i;
      const year = birthYear + Math.floor(monthIndex / 12);
      if (year < CHILD_ALLOWANCE_FIRST_YEAR) continue;
      if (age < childAllowanceAgeLimit(year)) months++;
    }
  }
  return months;
}

export type BirthOrder = "first" | "secondPlus";

export interface BenefitBreakdown {
  firstMeet: number; // 첫만남이용권(1회)
  parentAllowanceAge0: number; // 0세 부모급여 연간 총액
  parentAllowanceAge1: number; // 1세 부모급여 연간 총액
  childAllowanceMonths: number; // 아동수당 받는 개월 수(생년별)
  childAllowanceTotal: number; // 아동수당 총액
  firstTwoYears: number; // 출생~만 2세 전까지 받는 총액(첫만남+부모급여 2년)
  grandTotal: number; // 아동수당이 끝날 때까지 현금성 지원 총액
}

/** 계산기의 기본 출생 연도 — 화면이 "2026년 기준"이다. */
export const DEFAULT_BIRTH_YEAR = 2026;

/**
 * 출산·육아 현금성 지원금 합산.
 * @param order 출생 순서 (첫만남이용권 금액 결정)
 * @param birthYear 출생 연도 (아동수당 개월 수 결정). 표 시작 연도 이전 출생은 받지 않는다 —
 *   그 이전 지급분을 알 수 없어 총액이 틀리기 때문이다.
 */
export function calcBenefits(
  order: BirthOrder,
  birthYear: number = DEFAULT_BIRTH_YEAR,
): BenefitBreakdown {
  if (birthYear < CHILD_ALLOWANCE_FIRST_YEAR) {
    throw new RangeError(
      `${CHILD_ALLOWANCE_FIRST_YEAR}년 이후 출생아만 계산합니다: ${birthYear}`,
    );
  }
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
