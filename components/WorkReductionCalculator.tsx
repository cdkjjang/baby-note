"use client";

import { useState } from "react";
import { MoneyField, ResultCard, parseMoney } from "./fields";
import { formatWon } from "@/lib/date";
import { calcWorkReduction } from "@/lib/work-reduction";

export default function WorkReductionCalculator() {
  const [wage, setWage] = useState("300"); // 통상임금(만원)
  const [full, setFull] = useState("40"); // 단축 전 주 근로시간
  const [after, setAfter] = useState("25"); // 단축 후 주 근로시간

  const wageNum = parseMoney(wage);
  const fullNum = parseMoney(full);
  const afterNum = parseMoney(after);
  const ready =
    wageNum !== null &&
    wageNum > 0 &&
    fullNum !== null &&
    fullNum > 0 &&
    afterNum !== null;

  const outcome = ready
    ? calcWorkReduction(wageNum * 10_000, fullNum, afterNum)
    : null;

  return (
    <section className="rounded-2xl border border-border-soft bg-card p-5 shadow-sm">
      <MoneyField
        label="월 통상임금"
        hint="전일제 기준 기본급 등"
        unit="만원"
        value={wage}
        onChange={setWage}
        placeholder="300"
      />
      <div className="grid grid-cols-2 gap-3">
        <MoneyField
          label="단축 전 주 근로시간"
          hint="보통 40"
          unit="시간"
          value={full}
          onChange={setFull}
          placeholder="40"
        />
        <MoneyField
          label="단축 후 주 근로시간"
          hint="15~35"
          unit="시간"
          value={after}
          onChange={setAfter}
          placeholder="25"
        />
      </div>

      {!ready && (
        <p className="text-sm text-muted">
          통상임금과 근로시간을 입력하세요.
        </p>
      )}

      {outcome && !outcome.ok && (
        <p className="text-sm text-red-600 dark:text-red-400">
          단축 후 시간이 단축 전보다 적어야 하고, 주 40시간 이내여야 합니다.
        </p>
      )}

      {outcome && outcome.ok && (
        <ResultCard title="예상 월 단축급여">
          <p className="text-3xl font-extrabold text-accent-strong">
            월 {formatWon(outcome.result.monthlyPay)}
          </p>
          <p className="mt-1 text-sm text-muted">
            주 {outcome.result.reducedHours}시간 단축 기준
          </p>

          <dl className="mt-3 space-y-1.5 text-[15px]">
            <div className="flex justify-between">
              <dt className="text-muted">
                최초 {outcome.result.first10Hours}시간분 (100%, 상한 250만)
              </dt>
              <dd className="font-bold">{formatWon(outcome.result.first10Pay)}</dd>
            </div>
            {outcome.result.restHours > 0 && (
              <div className="flex justify-between">
                <dt className="text-muted">
                  나머지 {outcome.result.restHours}시간분 (80%, 상한 160만)
                </dt>
                <dd className="font-bold">{formatWon(outcome.result.restPay)}</dd>
              </div>
            )}
          </dl>

          <p className="mt-4 border-t border-border-soft pt-4 text-sm leading-relaxed text-muted">
            2026년 기준 최초 주 10시간 단축분은 통상임금 100%(상한 250만원), 나머지
            단축분은 80%(상한 160만원)를 단축시간 비율로 적용합니다. 급여를 받으며
            줄인 시간만큼 보전받는 제도입니다. 실제 지급은 고용센터 심사 기준을
            따릅니다.
          </p>
        </ResultCard>
      )}
    </section>
  );
}
