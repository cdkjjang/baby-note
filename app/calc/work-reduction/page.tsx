import type { Metadata } from "next";
import Link from "next/link";
import WorkReductionCalculator from "@/components/WorkReductionCalculator";
import AdSlot from "@/components/AdSlot";

export const metadata: Metadata = {
  title: "육아기 근로시간 단축급여 계산기 — 2026 상한 반영",
  description:
    "통상임금과 단축 전후 근로시간을 넣으면 2026년 기준 육아기 근로시간 단축급여를 계산합니다. 최초 10시간분 100%(상한 250만)·나머지 80%(상한 160만).",
  alternates: { canonical: "/calc/work-reduction" },
};

const faq = [
  {
    q: "육아기 근로시간 단축은 누가 쓸 수 있나요?",
    a: "만 12세 이하 또는 초등학교 6학년 이하 자녀를 둔 근로자가 신청할 수 있습니다. 단축 후 근로시간은 주 15시간 이상 35시간 이하로 정합니다.",
  },
  {
    q: "단축급여는 어떻게 계산되나요?",
    a: "2026년 기준 최초 주 10시간 단축분은 통상임금 100%(상한 250만원), 나머지 단축분은 80%(상한 160만원)를 단축시간 비율로 계산합니다. 예를 들어 주 40시간에서 20시간으로 줄이면 10시간분은 100%, 나머지 10시간분은 80%가 적용됩니다.",
  },
  {
    q: "육아휴직과 같이 쓸 수 있나요?",
    a: "동시에는 안 되지만 나눠서 번갈아 쓸 수 있습니다. 육아휴직을 일부만 쓰고 남은 기간을 근로시간 단축으로 전환하면 아이를 돌보는 기간을 유연하게 늘릴 수 있습니다.",
  },
];

export default function WorkReductionPage() {
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
      <h1 className="mb-2 text-2xl font-extrabold">육아기 근로시간 단축급여 계산기</h1>
      <p className="mb-6 text-muted">
        통상임금과 단축 전후 주 근로시간을 넣으면 정부가 보전하는 월 단축급여를
        계산합니다. 완전히 쉬는 대신 짧게 일할 때의 급여를 확인하세요.
      </p>
      <WorkReductionCalculator />

      <AdSlot slot="work-reduction-below-tool" />

      <section className="mt-10 space-y-4 text-[15px] leading-relaxed">
        <h2 className="text-xl font-bold">휴직 대신 짧게 일하며 급여 받기</h2>
        <p>
          아이를 돌봐야 하지만 완전히 쉬긴 부담스러울 때, 육아휴직 대신 근무 시간을
          줄이는 육아기 근로시간 단축을 쓸 수 있습니다. 일을 이어가면서 줄인
          시간만큼 정부가 급여를 보전해 줍니다.
        </p>
        <p>
          2026년부터 최초 10시간 단축분의 상한이 월 250만원으로 올랐습니다. 소득
          공백은 줄이면서 경력을 이어가고 싶은 분에게 유용한 제도입니다.
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
            <Link href="/calc/parental-leave" className="text-accent underline-offset-4 hover:underline">
              육아휴직급여 계산기 →
            </Link>
          </li>
          <li>
            <Link href="/guide/work-reduction-guide" className="text-accent underline-offset-4 hover:underline">
              육아기 근로시간 단축 제도 가이드 →
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
}
