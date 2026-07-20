"use client";

import { useState } from "react";
import { ResultCard } from "./fields";
import OptionGroup from "./OptionGroup";
import { formatWon } from "@/lib/date";
import { calcBenefits, type BirthOrder } from "@/lib/benefits";

export default function BenefitsCalculator() {
  const [order, setOrder] = useState<BirthOrder>("first");
  const b = calcBenefits(order);

  const rows = [
    { label: "첫만남이용권 (출생 시 1회)", value: b.firstMeet },
    { label: "부모급여 0세 (월 100만 × 12)", value: b.parentAllowanceAge0 },
    { label: "부모급여 1세 (월 50만 × 12)", value: b.parentAllowanceAge1 },
    { label: "아동수당 (월 10만 × 만 9세 미만)", value: b.childAllowanceTotal },
  ];

  return (
    <section className="rounded-2xl border border-border-soft bg-card p-5 shadow-sm">
      <OptionGroup<BirthOrder>
        label="출생 순서"
        options={[
          { value: "first", label: "첫째", hint: "첫만남 200만" },
          { value: "secondPlus", label: "둘째 이상", hint: "첫만남 300만" },
        ]}
        value={order}
        onChange={setOrder}
      />

      <ResultCard title="만 9세까지 받는 현금성 지원 합계">
        <p className="text-3xl font-extrabold text-accent-strong">
          총 {formatWon(b.grandTotal)}
        </p>
        <p className="mt-1 text-sm text-muted">
          출생~만 2세 전까지 {formatWon(b.firstTwoYears)} + 아동수당{" "}
          {formatWon(b.childAllowanceTotal)}
        </p>

        <dl className="mt-4 space-y-1.5 text-[15px]">
          {rows.map((r) => (
            <div key={r.label} className="flex justify-between gap-3">
              <dt className="text-muted">{r.label}</dt>
              <dd className="shrink-0 font-bold">{formatWon(r.value)}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-4 rounded-lg bg-accent/10 p-3 text-sm text-accent-strong">
          <p className="font-semibold">0세 아이라면 매달 얼마?</p>
          <p className="mt-1">
            부모급여 100만 + 아동수당 10만 ={" "}
            <strong>매달 110만원</strong> (어린이집 이용 시 보육료로 전환)
          </p>
        </div>

        <p className="mt-4 border-t border-border-soft pt-4 text-sm leading-relaxed text-muted">
          전국 공통 현금성 지원만 합산한 값입니다. 지자체 출산장려금은 지역마다
          크게 달라 포함하지 않았으니 거주지 시·군·구청에서 별도로 확인하세요.
          부모급여·아동수당은 출생신고 때 함께 신청하면 출생월부터 받습니다.
        </p>
      </ResultCard>
    </section>
  );
}
