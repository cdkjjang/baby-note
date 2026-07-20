// 육아휴직급여 계산 — 통상임금 기준, 개월 구간별 지급률·상한 적용
//
// ⚠️ 매년·수시 개편 대상 — 값 변경 시 테스트도 함께 갱신할 것.
//   2026년 기준(고용노동부 고시, 2025년 대개편 반영):
//   - 1~3개월: 통상임금 100%, 상한 250만원
//   - 4~6개월: 통상임금 100%, 상한 200만원
//   - 7개월~ : 통상임금 80%, 상한 160만원
//   - 하한: 부모 각각 월 70만원(통상임금이 낮아도 최소 보장)
//   - 사후지급금 제도 폐지 → 휴직 기간 중 전액을 매달 지급
//
//   6+6 부모육아휴직제(생후 18개월 내 부모가 동시·순차로 사용):
//   - 첫 6개월 통상임금 100%, 상한이 매월 상향(200→250→300→350→400→450만)
//   - 7개월째부터는 일반 기준(통상임금 80%, 상한 160만)으로 복귀

export const LOWER_LIMIT = 700_000; // 월 하한

/** 일반 육아휴직 개월 구간별 상한·지급률 */
export const STANDARD_TIERS = [
  { fromMonth: 1, toMonth: 3, rate: 1.0, cap: 2_500_000 },
  { fromMonth: 4, toMonth: 6, rate: 1.0, cap: 2_000_000 },
  { fromMonth: 7, toMonth: Infinity, rate: 0.8, cap: 1_600_000 },
] as const;

/** 6+6 부모육아휴직제 첫 6개월 월별 상한(통상임금 100%) */
export const COUPLE_66_CAPS = [
  2_000_000, // 1개월
  2_500_000, // 2개월
  3_000_000, // 3개월
  3_500_000, // 4개월
  4_000_000, // 5개월
  4_500_000, // 6개월
] as const;

export type LeaveMode = "single" | "couple66";

export interface MonthlyPay {
  month: number; // 1-based 개월 차
  gross: number; // 상한·하한 적용 전 (통상임금 × 지급률)
  amount: number; // 실제 지급액
  cap: number; // 적용 상한
  rate: number; // 지급률
}

export interface LeaveResult {
  monthly: MonthlyPay[];
  total: number;
}

/** 한 달치 지급액 계산 (하한 70만 · 상한 적용) */
function monthAmount(
  ordinaryWage: number,
  month: number,
  mode: LeaveMode
): MonthlyPay {
  let rate: number;
  let cap: number;

  if (mode === "couple66" && month <= 6) {
    rate = 1.0;
    cap = COUPLE_66_CAPS[month - 1];
  } else {
    const tier =
      STANDARD_TIERS.find((t) => month >= t.fromMonth && month <= t.toMonth) ??
      STANDARD_TIERS[STANDARD_TIERS.length - 1];
    rate = tier.rate;
    cap = tier.cap;
  }

  const gross = Math.round(ordinaryWage * rate);
  const amount = Math.max(Math.min(gross, cap), LOWER_LIMIT);
  return { month, gross, amount, cap, rate };
}

/**
 * 육아휴직급여 계산.
 * @param ordinaryWage 월 통상임금(원)
 * @param months 육아휴직 개월 수 (1~18)
 * @param mode 일반("single") / 6+6 부모육아휴직제("couple66")
 */
export function calcParentalLeave(
  ordinaryWage: number,
  months: number,
  mode: LeaveMode = "single"
):
  | { ok: true; result: LeaveResult }
  | { ok: false; error: "INVALID_INPUT" } {
  const w = Math.round(ordinaryWage);
  const m = Math.round(months);
  if (!Number.isFinite(w) || w <= 0 || !Number.isFinite(m) || m < 1 || m > 18) {
    return { ok: false, error: "INVALID_INPUT" };
  }

  const monthly: MonthlyPay[] = [];
  for (let i = 1; i <= m; i++) {
    monthly.push(monthAmount(w, i, mode));
  }
  const total = monthly.reduce((sum, x) => sum + x.amount, 0);
  return { ok: true, result: { monthly, total } };
}
