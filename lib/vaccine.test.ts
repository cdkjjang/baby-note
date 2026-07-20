import { describe, expect, it } from "vitest";
import { calcVaccineSchedule, VACCINE_SCHEDULE } from "./vaccine";
import { formatDate, parseDate } from "./date";

describe("표준예방접종일정 데이터", () => {
  it("모든 항목이 개월 수·시기 라벨을 가진다", () => {
    for (const v of VACCINE_SCHEDULE) {
      expect(v.ageMonths).toBeGreaterThanOrEqual(0);
      expect(v.ageLabel.length).toBeGreaterThan(0);
      expect(v.vaccine.length).toBeGreaterThan(0);
    }
  });
  it("주요 백신(BCG·DTaP·MMR·HPV)이 포함된다", () => {
    const abbrs = new Set(VACCINE_SCHEDULE.map((v) => v.abbr));
    expect(abbrs.has("BCG")).toBe(true);
    expect(abbrs.has("DTaP")).toBe(true);
    expect(abbrs.has("MMR")).toBe(true);
    expect(abbrs.has("HPV")).toBe(true);
  });
});

describe("calcVaccineSchedule", () => {
  const birth = parseDate("2026-01-15")!;
  const schedule = calcVaccineSchedule(birth);

  it("항목 수가 원본과 같다", () => {
    expect(schedule.length).toBe(VACCINE_SCHEDULE.length);
  });

  it("시기 순으로 정렬된다", () => {
    for (let i = 1; i < schedule.length; i++) {
      expect(schedule[i].ageMonths).toBeGreaterThanOrEqual(
        schedule[i - 1].ageMonths
      );
    }
  });

  it("생후 2개월 DTaP 1차 접종일 = 2026-03-15", () => {
    const dtap1 = schedule.find(
      (v) => v.abbr === "DTaP" && v.dose === "1차"
    )!;
    expect(formatDate(dtap1.date)).toBe("2026-03-15");
  });

  it("만 12세 HPV 접종일 = 2038-01-15 (144개월)", () => {
    const hpv = schedule.find((v) => v.abbr === "HPV")!;
    expect(formatDate(hpv.date)).toBe("2038-01-15");
  });
});
