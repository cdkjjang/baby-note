import { describe, expect, it } from "vitest";
import {
  calcBenefits,
  CHILD_ALLOWANCE,
  CHILD_ALLOWANCE_AGE_BY_YEAR,
  childAllowanceAgeLimit,
  childAllowanceMonths,
  FIRST_MEET,
  PARENT_ALLOWANCE,
} from "./benefits";

describe("상수 — 2026년 기준", () => {
  it("첫만남이용권 첫째 200만·둘째이상 300만", () => {
    expect(FIRST_MEET.first).toBe(2_000_000);
    expect(FIRST_MEET.secondPlus).toBe(3_000_000);
  });
  it("부모급여 0세 100만·1세 50만", () => {
    expect(PARENT_ALLOWANCE.age0Monthly).toBe(1_000_000);
    expect(PARENT_ALLOWANCE.age1Monthly).toBe(500_000);
  });
  it("아동수당 월 10만", () => {
    expect(CHILD_ALLOWANCE.monthly).toBe(100_000);
  });
});

describe("아동수당 연도별 지급 연령 — 아동수당법 제4조(2026. 3. 20. 개정)·부칙", () => {
  // 고시값 고정 테스트. 기호로만 참조하면 값이 낡아도 통과한다(워크스페이스 CLAUDE.md 5장).
  it("2025 8세 · 2026 9세 · 2027 10세 · 2028 11세 · 2029 12세 · 2030 13세 미만", () => {
    expect(CHILD_ALLOWANCE_AGE_BY_YEAR).toEqual({
      2025: 8,
      2026: 9,
      2027: 10,
      2028: 11,
      2029: 12,
      2030: 13,
    });
  });
  it("2030년 이후는 본칙대로 13세 미만을 유지한다", () => {
    expect(childAllowanceAgeLimit(2031)).toBe(13);
    expect(childAllowanceAgeLimit(2045)).toBe(13);
  });
  it("표 이전 연도는 모른다고 답한다", () => {
    expect(() => childAllowanceAgeLimit(2024)).toThrow(RangeError);
  });
});

describe("아동수당 생년별 개월 수 (2025년 1월 이후분)", () => {
  it("2025년 이후 출생은 만 13세 미만까지 156개월 — 출생월과 무관", () => {
    for (const year of [2025, 2026, 2027, 2030]) {
      for (const month of [1, 6, 12]) {
        expect(childAllowanceMonths(year, month)).toBe(156);
      }
    }
  });
  it("2026년생은 옛 기준(만 9세 미만 108개월)보다 48개월 더 받는다", () => {
    expect(childAllowanceMonths(2026) - 108).toBe(48);
  });
  it("2021년 1월생 — 만 4세부터 12세까지 9년 = 108개월", () => {
    expect(childAllowanceMonths(2021, 1)).toBe(108);
  });
  it("2018년 1월생 — 상한에 걸리지 않고 만 7~12세 6년 = 72개월", () => {
    expect(childAllowanceMonths(2018, 1)).toBe(72);
  });
  it("2017년 6월생 — 부칙 제2조②로 2026~2029년은 매월, 2025·2030년은 1~5월 = 58개월", () => {
    // 2025년 6월 만 8세(상한 8) → 중단, 2026년 1월 상한 9 → 재개, 6월 만 9세 → 중단 …
    expect(childAllowanceMonths(2017, 6)).toBe(5 + 48 + 5);
  });
  it("2017년 12월생 — 2025·2030년 1~11월 + 2026~2029년 매월 = 70개월", () => {
    expect(childAllowanceMonths(2017, 12)).toBe(11 + 48 + 11);
  });
  it("2016년 1월생 — 매년 상한보다 한 살 많아 한 달도 못 받는다", () => {
    expect(childAllowanceMonths(2016, 1)).toBe(0);
  });
  it("출생월이 1~12가 아니면 거부한다", () => {
    expect(() => childAllowanceMonths(2026, 0)).toThrow(RangeError);
    expect(() => childAllowanceMonths(2026, 13)).toThrow(RangeError);
  });
});

describe("calcBenefits — 첫째 (2026년생)", () => {
  const b = calcBenefits("first");
  it("부모급여 0세 연 1,200만·1세 연 600만", () => {
    expect(b.parentAllowanceAge0).toBe(12_000_000);
    expect(b.parentAllowanceAge1).toBe(6_000_000);
  });
  it("아동수당 156개월 · 총액 1,560만", () => {
    expect(b.childAllowanceMonths).toBe(156);
    expect(b.childAllowanceTotal).toBe(15_600_000);
  });
  it("첫 2년 총액 = 첫만남 200만 + 1,200만 + 600만 = 2,000만", () => {
    expect(b.firstTwoYears).toBe(20_000_000);
  });
  it("만 13세까지 총액 = 2,000만 + 1,560만 = 3,560만", () => {
    expect(b.grandTotal).toBe(35_600_000);
  });
});

describe("calcBenefits — 둘째 이상", () => {
  it("첫만남이용권만 100만 더 많다 — 3,660만", () => {
    const first = calcBenefits("first");
    const second = calcBenefits("secondPlus");
    expect(second.firstMeet - first.firstMeet).toBe(1_000_000);
    expect(second.grandTotal - first.grandTotal).toBe(1_000_000);
    expect(second.grandTotal).toBe(36_600_000);
  });
});

describe("calcBenefits — 출생 연도", () => {
  it("표 시작(2025년) 이전 출생은 총액을 낼 수 없어 거부한다", () => {
    expect(() => calcBenefits("first", 2024)).toThrow(RangeError);
  });
  it("2025년생도 2026년생과 총액이 같다", () => {
    expect(calcBenefits("first", 2025).grandTotal).toBe(35_600_000);
  });
});
