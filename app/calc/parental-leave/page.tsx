import type { Metadata } from "next";
import Link from "next/link";
import ParentalLeaveCalculator from "@/components/ParentalLeaveCalculator";
import AdSlot from "@/components/AdSlot";

export const metadata: Metadata = {
  title: "육아휴직급여 계산기 — 2026 상한·6+6 부모육아휴직제",
  description:
    "통상임금과 휴직 개월 수를 넣으면 2026년 기준 육아휴직급여를 개월 구간별 상한(250·200·160만)으로 계산합니다. 6+6 부모육아휴직제도 지원합니다.",
  alternates: { canonical: "/calc/parental-leave" },
};

const faq = [
  {
    q: "2026년 육아휴직급여는 얼마인가요?",
    a: "1~3개월은 통상임금 100%(상한 250만원), 4~6개월은 100%(상한 200만원), 7개월부터는 80%(상한 160만원)이며 월 하한은 70만원입니다. 2025년 개편으로 사후지급금이 폐지되어 전액을 매달 받습니다.",
  },
  {
    q: "6+6 부모육아휴직제가 뭔가요?",
    a: "자녀 생후 18개월 이내에 부모가 함께(동시 또는 순차) 육아휴직을 쓰면 첫 6개월간 두 사람 모두 통상임금 100%를 받고 상한이 1개월 200만원에서 6개월째 450만원까지 매월 오르는 제도입니다. 7개월째부터는 일반 기준으로 돌아갑니다.",
  },
  {
    q: "통상임금은 어떻게 확인하나요?",
    a: "정기적·고정적으로 지급되는 기본급과 고정수당의 합입니다. 성과급·변동상여·초과근무수당은 제외됩니다. 급여명세서의 기본급을 중심으로 보면 대략 맞고, 정확한 금액은 회사 급여담당에게 확인하세요.",
  },
];

export default function ParentalLeavePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="mb-2 text-2xl font-extrabold">육아휴직급여 계산기</h1>
      <p className="mb-6 text-muted">
        월 통상임금과 휴직 개월 수를 넣으면 2026년 기준으로 개월 구간별 급여와
        총액을 계산합니다. 부모가 함께 쓰는 6+6 제도도 선택할 수 있습니다.
      </p>
      <ParentalLeaveCalculator />

      <AdSlot slot="parental-leave-below-tool" />

      <section className="mt-10 space-y-4 text-[15px] leading-relaxed">
        <h2 className="text-xl font-bold">2025년 대개편으로 이렇게 달라졌습니다</h2>
        <p>
          예전 육아휴직급여는 통상임금의 80%를 기준으로 하고, 그중 일부(25%)는
          복직 후 6개월 이상 근무해야 나중에 주는 사후지급금 방식이었습니다. 휴직
          중 실제 손에 쥐는 돈이 적어 부담이 컸죠.
        </p>
        <p>
          2025년 개편으로 초기 6개월은 통상임금 100%까지 보전되고 상한도 오르는
          한편, 사후지급금이 폐지되어 이제 급여 전액을 매달 받습니다. 초기 육아기의
          소득 공백을 크게 줄인 변화입니다.
        </p>

        <h2 className="mt-8 text-xl font-bold">자주 묻는 질문</h2>
        <dl className="space-y-4">
          {faq.map(({ q, a }) => (
            <div
              key={q}
              className="rounded-xl border border-border-soft bg-card p-4 shadow-sm"
            >
              <dt className="font-bold">
                <span className="text-accent">Q.</span> {q}
              </dt>
              <dd className="mt-2 text-muted">{a}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-10 rounded-2xl border border-border-soft bg-card p-5">
        <h2 className="mb-3 font-bold">함께 확인하세요</h2>
        <ul className="space-y-2 text-[15px]">
          <li>
            <Link href="/calc/work-reduction" className="text-accent underline-offset-4 hover:underline">
              육아기 근로시간 단축급여 계산기 → 휴직 대신 짧게 일하기
            </Link>
          </li>
          <li>
            <Link href="/guide/parental-leave-2026" className="text-accent underline-offset-4 hover:underline">
              2026 육아휴직급여 완전정복 가이드 →
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
}
