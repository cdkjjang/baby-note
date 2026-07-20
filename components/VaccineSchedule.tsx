"use client";

import { useState } from "react";
import { DateField } from "./fields";
import { parseDate, formatKoreanDate, today } from "@/lib/date";
import { calcVaccineSchedule } from "@/lib/vaccine";

export default function VaccineSchedule() {
  const [birth, setBirth] = useState("");

  const birthDate = parseDate(birth);
  const schedule = birthDate ? calcVaccineSchedule(birthDate) : null;
  const now = today();

  return (
    <section className="rounded-2xl border border-border-soft bg-card p-5 shadow-sm">
      <DateField
        label="아이 생년월일"
        hint="입력값은 브라우저에서만 계산되고 전송되지 않습니다"
        value={birth}
        onChange={setBirth}
      />

      {!birthDate && (
        <p className="text-sm text-muted">생년월일을 입력하면 표준 접종 일정을 계산합니다.</p>
      )}

      {schedule && (
        <div className="mt-2">
          <p className="mb-3 text-sm text-muted">
            생년월일 기준 국가예방접종(NIP) 표준일정입니다. 지난 일정은 회색으로
            표시됩니다.
          </p>
          <ul className="space-y-2">
            {schedule.map((v, i) => {
              const past = v.date.getTime() < now.getTime();
              return (
                <li
                  key={`${v.abbr}-${v.dose}-${i}`}
                  className={`flex items-start justify-between gap-3 rounded-xl border p-3 ${
                    past
                      ? "border-border-soft/60 bg-background/40 text-muted"
                      : "border-border-soft bg-card"
                  }`}
                >
                  <div className="min-w-0">
                    <p className="font-bold leading-snug">
                      {v.vaccine}{" "}
                      <span className="text-sm font-normal text-muted">
                        {v.abbr} · {v.dose}
                      </span>
                    </p>
                    <p className="text-sm text-muted">{v.ageLabel}</p>
                    {v.note && (
                      <p className="mt-0.5 text-xs text-accent-strong">※ {v.note}</p>
                    )}
                  </div>
                  <div className="shrink-0 text-right">
                    <p className={`text-sm font-semibold ${past ? "" : "text-accent-strong"}`}>
                      {formatKoreanDate(v.date)}
                    </p>
                    <p className="text-xs text-muted">{past ? "지남" : "예정"}</p>
                  </div>
                </li>
              );
            })}
          </ul>

          <p className="mt-4 border-t border-border-soft pt-4 text-sm leading-relaxed text-muted">
            접종일은 생년월일에 표준 권장 개월 수를 더한 참고용 날짜이며, 범위로
            권장되는 접종(예: 12~15개월)은 시작 시점 기준입니다. 백신 종류(로타릭스
            2회/로타텍 3회 등)와 아이 상태에 따라 실제 일정은 달라집니다. 정확한
            접종 이력·일정은{" "}
            <a
              href="https://nip.kdca.go.kr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline-offset-4 hover:underline"
            >
              예방접종도우미(nip.kdca.go.kr)
            </a>
            에서 확인하세요.
          </p>
        </div>
      )}
    </section>
  );
}
