import type { Metadata } from "next";
import Link from "next/link";
import BenefitsCalculator from "@/components/BenefitsCalculator";
import AdSlot from "@/components/AdSlot";

export const metadata: Metadata = {
  title: "출산·육아 지원금 계산기 — 첫만남·부모급여·아동수당 합계",
  description:
    "첫만남이용권·부모급여·아동수당을 2026년 기준으로 합산해 우리 아이가 만 9세까지 받는 현금성 정부 지원 총액을 계산합니다.",
  alternates: { canonical: "/calc/benefits" },
};

const faq = [
  {
    q: "0세 아이는 매달 얼마를 받나요?",
    a: "부모급여 100만원과 아동수당 10만원을 더해 매달 110만원을 받습니다. 여기에 출생 직후 첫만남이용권(첫째 200만·둘째 이상 300만원)이 별도로 지급됩니다.",
  },
  {
    q: "첫만남이용권·부모급여·아동수당을 다 같이 받나요?",
    a: "네, 셋 다 별개 제도라 중복해서 받습니다. 첫만남이용권은 출생 시 1회 바우처, 부모급여와 아동수당은 매달 지급됩니다.",
  },
  {
    q: "지자체 출산장려금도 포함된 금액인가요?",
    a: "아닙니다. 이 계산기는 전국 공통 현금성 지원만 합산합니다. 지자체 출산장려금은 지역마다 금액과 조건이 크게 달라 거주지 시·군·구청에서 별도로 확인해야 합니다.",
  },
];

export default function BenefitsPage() {
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
      <h1 className="mb-2 text-2xl font-extrabold">출산·육아 지원금 계산기</h1>
      <p className="mb-6 text-muted">
        출생 순서만 고르면 첫만남이용권·부모급여·아동수당을 합산해 만 9세까지 받는
        현금성 지원 총액을 보여드립니다.
      </p>
      <BenefitsCalculator />

      <AdSlot slot="benefits-below-tool" />

      <section className="mt-10 space-y-4 text-[15px] leading-relaxed">
        <h2 className="text-xl font-bold">출산하면 받는 현금 지원 3종</h2>
        <p>
          아이가 태어나면 받는 대표 지원은 첫만남이용권, 부모급여, 아동수당입니다.
          첫만남이용권은 출생 시 한 번 국민행복카드에 바우처로, 부모급여와 아동수당은
          매달 현금으로 지급됩니다. 만 0세는 부모급여가 월 100만원으로 가장 크고, 만
          1세에는 월 50만원으로 줄어듭니다.
        </p>
        <p>
          세 가지 모두 출생신고와 함께 복지로 또는 정부24 '행복출산 원스톱
          서비스'로 한 번에 신청하는 것이 가장 편합니다. 부모급여·아동수당은 생후
          60일 안에 신청하면 출생월부터 소급 지급되니, 출생신고 때 함께 처리하세요.
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
            <Link href="/guide/birth-benefits-2026" className="text-accent underline-offset-4 hover:underline">
              2026 출산하면 받는 돈 총정리 →
            </Link>
          </li>
          <li>
            <Link href="/guide/parent-vs-child-allowance" className="text-accent underline-offset-4 hover:underline">
              부모급여 vs 아동수당 차이 →
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
}
