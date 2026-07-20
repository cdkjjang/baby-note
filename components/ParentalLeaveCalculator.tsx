"use client";

import { useState } from "react";
import { MoneyField, ResultCard, parseMoney } from "./fields";
import OptionGroup from "./OptionGroup";
import { formatWon } from "@/lib/date";
import { calcParentalLeave, type LeaveMode } from "@/lib/parental-leave";

const MONTH_OPTIONS = ["6", "12", "18"];

export default function ParentalLeaveCalculator() {
  const [wage, setWage] = useState("300"); // 통상임금(만원)
  const [months, setMonths] = useState("12");
  const [mode, setMode] = useState<LeaveMode>("single");

  const wageNum = parseMoney(wage);
  const monthsNum = parseMoney(months);
  const ready =
    wageNum !== null && wageNum > 0 && monthsNum !== null && monthsNum >= 1;

  const outcome = ready
    ? calcParentalLeave(wageNum * 10_000, monthsNum, mode)
    : null;

  return (
    <section className="rounded-2xl border border-border-soft bg-card p-5 shadow-sm">
      <OptionGroup<LeaveMode>
        label="사용 형태"
        options={[
          { value: "single", label: "일반 육아휴직", hint: "혼자 사용" },
          { value: "couple66", label: "6+6 부모육아휴직제", hint: "부모 함께" },
        ]}
        value={mode}
        onChange={setMode}
      />

      <div className="grid grid-cols-2 gap-3">
        <MoneyField
          label="월 통상임금"
          hint="기본급 등 고정급"
          unit="만원"
          value={wage}
          onChange={setWage}
          placeholder="300"
        />
        <MoneyField
          label="휴직 개월 수"
          hint="1~18"
          unit="개월"
          value={months}
          onChange={setMonths}
          placeholder="12"
        />
      </div>
      <div className="-mt-2 mb-4 flex gap-2">
        {MONTH_OPTIONS.map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMonths(m)}
            className="rounded-full border border-border-soft px-3 py-1 text-xs text-muted transition-colors hover:border-accent hover:text-accent"
          >
            {m}개월
          </button>
        ))}
      </div>

      {!ready && (
        <p className="text-sm text-muted">
          통상임금과 휴직 개월 수를 입력하세요.
        </p>
      )}

      {outcome && !outcome.ok && (
        <p className="text-sm text-red-600 dark:text-red-400">
          휴직 개월 수는 1~18 사이로 입력하세요.
        </p>
      )}

      {outcome && outcome.ok && (
        <ResultCard title="예상 육아휴직급여">
          <p className="text-3xl font-extrabold text-accent-strong">
            총 {formatWon(outcome.result.total)}
          </p>
          <p className="mt-1 text-sm text-muted">
            {monthsNum}개월 합계 (하한 월 70만원 · 사후지급금 없이 매달 전액)
          </p>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border-soft text-left text-muted">
                  <th className="py-1.5 pr-2 font-semibold">개월</th>
                  <th className="py-1.5 pr-2 font-semibold">지급률·상한</th>
                  <th className="py-1.5 text-right font-semibold">월 지급액</th>
                </tr>
              </thead>
              <tbody>
                {outcome.result.monthly.map((m) => (
                  <tr key={m.month} className="border-b border-border-soft/60">
                    <td className="py-1.5 pr-2">{m.month}개월</td>
                    <td className="py-1.5 pr-2 text-muted">
                      {Math.round(m.rate * 100)}% · 상한 {formatWon(m.cap)}
                    </td>
                    <td className="py-1.5 text-right font-bold">
                      {formatWon(m.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 border-t border-border-soft pt-4 text-sm leading-relaxed text-muted">
            2026년 기준 1~3개월 통상임금 100%(상한 250만), 4~6개월 100%(상한 200만),
            7개월부터 80%(상한 160만)를 적용하며 월 하한은 70만원입니다. 6+6
            부모육아휴직제는 생후 18개월 내 부모가 함께 쓸 때 첫 6개월 상한이
            200~450만원으로 매월 오릅니다. 실제 지급은 고용센터 심사 기준을 따릅니다.
          </p>
        </ResultCard>
      )}
    </section>
  );
}
