import { describe, expect, it } from "vitest";
import {
  calcParentalLeave,
  COUPLE_66_CAPS,
  LOWER_LIMIT,
  STANDARD_TIERS,
} from "./parental-leave";

describe("상수", () => {
  it("하한은 월 70만원", () => {
    expect(LOWER_LIMIT).toBe(700_000);
  });
  it("일반 구간 상한: 250/200/160만", () => {
    expect(STANDARD_TIERS[0].cap).toBe(2_500_000);
    expect(STANDARD_TIERS[1].cap).toBe(2_000_000);
    expect(STANDARD_TIERS[2].cap).toBe(1_600_000);
  });
  it("6+6 첫 6개월 상한: 200~450만", () => {
    expect(COUPLE_66_CAPS).toEqual([
      2_000_000, 2_500_000, 3_000_000, 3_500_000, 4_000_000, 4_500_000,
    ]);
  });
});

describe("calcParentalLeave — 일반(single)", () => {
  it("통상임금 300만·12개월: 구간별 상한 적용", () => {
    const out = calcParentalLeave(3_000_000, 12, "single");
    expect(out.ok).toBe(true);
    if (!out.ok) return;
    const m = out.result.monthly;
    // 1~3개월: 통상 300만 > 상한 250만 → 250만
    expect(m[0].amount).toBe(2_500_000);
    expect(m[2].amount).toBe(2_500_000);
    // 4~6개월: 상한 200만
    expect(m[3].amount).toBe(2_000_000);
    expect(m[5].amount).toBe(2_000_000);
    // 7개월~: 80% = 240만 > 상한 160만 → 160만
    expect(m[6].amount).toBe(1_600_000);
    expect(m[11].amount).toBe(1_600_000);
  });

  it("통상임금이 상한보다 낮으면 통상임금 그대로(1~6개월 100%)", () => {
    const out = calcParentalLeave(1_800_000, 12, "single");
    expect(out.ok).toBe(true);
    if (!out.ok) return;
    const m = out.result.monthly;
    expect(m[0].amount).toBe(1_800_000); // 100%
    expect(m[3].amount).toBe(1_800_000); // 100%
    // 7개월~: 80% = 144만 (상한 160만·하한 70만 사이)
    expect(m[6].amount).toBe(1_440_000);
  });

  it("하한 70만 보장 — 통상임금이 매우 낮을 때", () => {
    const out = calcParentalLeave(600_000, 12, "single");
    expect(out.ok).toBe(true);
    if (!out.ok) return;
    // 100% 구간도 60만 < 하한 70만 → 70만
    expect(out.result.monthly[0].amount).toBe(700_000);
    // 80% 구간 48만 < 70만 → 70만
    expect(out.result.monthly[6].amount).toBe(700_000);
  });

  it("총액 합산이 월별 합과 일치", () => {
    const out = calcParentalLeave(3_000_000, 12, "single");
    expect(out.ok).toBe(true);
    if (!out.ok) return;
    const sum = out.result.monthly.reduce((s, x) => s + x.amount, 0);
    expect(out.result.total).toBe(sum);
    // 250만×3 + 200만×3 + 160만×6 = 750 + 600 + 960 = 2310만
    expect(out.result.total).toBe(23_100_000);
  });
});

describe("calcParentalLeave — 6+6(couple66)", () => {
  it("첫 6개월 100%·월별 상한 상향, 통상임금 500만", () => {
    const out = calcParentalLeave(5_000_000, 7, "couple66");
    expect(out.ok).toBe(true);
    if (!out.ok) return;
    const m = out.result.monthly;
    expect(m[0].amount).toBe(2_000_000); // 1개월 상한 200만
    expect(m[3].amount).toBe(3_500_000); // 4개월 상한 350만
    expect(m[5].amount).toBe(4_500_000); // 6개월 상한 450만
    // 7개월째: 일반 복귀 80%=400만 > 상한 160만 → 160만
    expect(m[6].amount).toBe(1_600_000);
  });
});

describe("입력 검증", () => {
  it("잘못된 입력은 에러", () => {
    expect(calcParentalLeave(0, 12).ok).toBe(false);
    expect(calcParentalLeave(3_000_000, 0).ok).toBe(false);
    expect(calcParentalLeave(3_000_000, 19).ok).toBe(false);
  });
});
