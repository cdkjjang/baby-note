// 육아기 근로시간 단축급여 계산 (고용보험)
//
// ⚠️ 매년 갱신 대상(고용노동부) — 값 변경 시 테스트도 함께 갱신할 것.
//   2026년 기준:
//   - 최초 주 10시간 단축분: 통상임금 100%, 상한 월 250만원
//   - 나머지 단축분:        통상임금 80%,  상한 월 160만원
//
//   급여 = min(통상임금, 250만) × (최초10시간분 / 주소정근로시간)
//        + min(통상임금×0.8, 160만) × (나머지단축분 / 주소정근로시간)

export const FIRST10_RATE = 1.0;
export const FIRST10_CAP = 2_500_000;
export const REST_RATE = 0.8;
export const REST_CAP = 1_600_000;
export const FIRST10_HOURS = 10;

export interface WorkReductionResult {
  reducedHours: number; // 총 단축 시간(주)
  first10Hours: number; // 100% 적용 구간(최대 10시간)
  restHours: number; // 80% 적용 구간
  first10Pay: number; // 최초 10시간분 급여
  restPay: number; // 나머지분 급여
  monthlyPay: number; // 월 단축급여 합계
}

/**
 * 육아기 근로시간 단축급여.
 * @param ordinaryWage 월 통상임금(원, 전일제 기준)
 * @param weeklyHours 단축 전 주 소정근로시간(보통 40)
 * @param reducedWeeklyHours 단축 후 주 근로시간
 */
export function calcWorkReduction(
  ordinaryWage: number,
  weeklyHours: number,
  reducedWeeklyHours: number
):
  | { ok: true; result: WorkReductionResult }
  | { ok: false; error: "INVALID_INPUT" } {
  const w = Math.round(ordinaryWage);
  const full = weeklyHours;
  const after = reducedWeeklyHours;
  const reduced = full - after;

  if (
    !Number.isFinite(w) ||
    w <= 0 ||
    !Number.isFinite(full) ||
    full <= 0 ||
    full > 40 ||
    !Number.isFinite(after) ||
    after < 0 ||
    reduced <= 0 // 실제로 단축이 있어야 함
  ) {
    return { ok: false, error: "INVALID_INPUT" };
  }

  const first10Hours = Math.min(reduced, FIRST10_HOURS);
  const restHours = Math.max(reduced - FIRST10_HOURS, 0);

  const first10Pay = Math.round(
    Math.min(w * FIRST10_RATE, FIRST10_CAP) * (first10Hours / full)
  );
  const restPay = Math.round(
    Math.min(w * REST_RATE, REST_CAP) * (restHours / full)
  );

  return {
    ok: true,
    result: {
      reducedHours: reduced,
      first10Hours,
      restHours,
      first10Pay,
      restPay,
      monthlyPay: first10Pay + restPay,
    },
  };
}
