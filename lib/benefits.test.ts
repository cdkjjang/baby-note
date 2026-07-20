import { describe, expect, it } from "vitest";
import {
  calcBenefits,
  CHILD_ALLOWANCE,
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
  it("아동수당 월 10만·만 9세 미만(108개월)", () => {
    expect(CHILD_ALLOWANCE.monthly).toBe(100_000);
    expect(CHILD_ALLOWANCE.maxMonths).toBe(108);
  });
});

describe("calcBenefits — 첫째", () => {
  const b = calcBenefits("first");
  it("부모급여 0세 연 1,200만·1세 연 600만", () => {
    expect(b.parentAllowanceAge0).toBe(12_000_000);
    expect(b.parentAllowanceAge1).toBe(6_000_000);
  });
  it("아동수당 총액 1,080만", () => {
    expect(b.childAllowanceTotal).toBe(10_800_000);
  });
  it("첫 2년 총액 = 첫만남 200만 + 1,200만 + 600만 = 2,000만", () => {
    expect(b.firstTwoYears).toBe(20_000_000);
  });
  it("만 9세까지 총액 = 2,000만 + 1,080만 = 3,080만", () => {
    expect(b.grandTotal).toBe(30_800_000);
  });
});

describe("calcBenefits — 둘째 이상", () => {
  it("첫만남이용권만 100만 더 많다", () => {
    const first = calcBenefits("first");
    const second = calcBenefits("secondPlus");
    expect(second.firstMeet - first.firstMeet).toBe(1_000_000);
    expect(second.grandTotal - first.grandTotal).toBe(1_000_000);
  });
});
