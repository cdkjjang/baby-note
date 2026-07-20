import { describe, expect, it } from "vitest";
import {
  calcWorkReduction,
  FIRST10_CAP,
  REST_CAP,
} from "./work-reduction";

describe("상수", () => {
  it("최초 10시간분 상한 250만·나머지 160만", () => {
    expect(FIRST10_CAP).toBe(2_500_000);
    expect(REST_CAP).toBe(1_600_000);
  });
});

describe("calcWorkReduction", () => {
  it("주40→30 (10시간 단축): 100% 구간만, 통상 200만", () => {
    const out = calcWorkReduction(2_000_000, 40, 30);
    expect(out.ok).toBe(true);
    if (!out.ok) return;
    expect(out.result.reducedHours).toBe(10);
    expect(out.result.first10Hours).toBe(10);
    expect(out.result.restHours).toBe(0);
    // min(200만,250만) × 10/40 = 50만
    expect(out.result.first10Pay).toBe(500_000);
    expect(out.result.restPay).toBe(0);
    expect(out.result.monthlyPay).toBe(500_000);
  });

  it("주40→20 (20시간 단축): 10시간 100% + 10시간 80%, 통상 200만", () => {
    const out = calcWorkReduction(2_000_000, 40, 20);
    expect(out.ok).toBe(true);
    if (!out.ok) return;
    expect(out.result.first10Hours).toBe(10);
    expect(out.result.restHours).toBe(10);
    // 100%: min(200,250)×10/40 = 50만
    expect(out.result.first10Pay).toBe(500_000);
    // 80%: min(160,160)×10/40 = 40만  (통상 200만×0.8=160만 = 상한)
    expect(out.result.restPay).toBe(400_000);
    expect(out.result.monthlyPay).toBe(900_000);
  });

  it("고소득: 통상 400만, 주40→15 (25시간 단축) — 상한 적용", () => {
    const out = calcWorkReduction(4_000_000, 40, 15);
    expect(out.ok).toBe(true);
    if (!out.ok) return;
    expect(out.result.first10Hours).toBe(10);
    expect(out.result.restHours).toBe(15);
    // 100%: min(400,250)=250만 × 10/40 = 62.5만
    expect(out.result.first10Pay).toBe(625_000);
    // 80%: min(320,160)=160만 × 15/40 = 60만
    expect(out.result.restPay).toBe(600_000);
    expect(out.result.monthlyPay).toBe(1_225_000);
  });

  it("단축이 없거나 잘못된 입력은 에러", () => {
    expect(calcWorkReduction(2_000_000, 40, 40).ok).toBe(false); // 단축 0
    expect(calcWorkReduction(0, 40, 30).ok).toBe(false);
    expect(calcWorkReduction(2_000_000, 40, 45).ok).toBe(false); // 단축 음수
  });
});
