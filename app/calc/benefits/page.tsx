import type { Metadata } from "next";
import CalcGuides from "@/components/CalcGuides";
import Link from "next/link";
import BenefitsCalculator from "@/components/BenefitsCalculator";
import AdSlot from "@/components/AdSlot";
import CalcNotes from "@/components/CalcNotes";
import { SITE_NAME, SITE_URL } from "@/lib/site";

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
    "@graph": [
      {
        "@type": "FAQPage",
        mainEntity: faq.map(({ q, a }) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
      },
      // 검색결과에 "사이트명 > 계산기명" 경로가 표시되도록 한다.
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: SITE_NAME, item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "출산·육아 지원금 계산기" },
        ],
      },
    ],
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

      <CalcNotes
        updated="2026-08-02"
        basis={[
          {
            law: "저출산·고령사회기본법 및 첫만남이용권 지원 지침",
            detail:
              "출생아 1인당 바우처로 지급되며 첫째는 200만원, 둘째 이상은 300만원입니다. 출생신고와 함께 신청하면 국민행복카드에 포인트로 들어옵니다.",
          },
          {
            law: "아동수당법 및 부모급여 지원 지침",
            detail:
              "부모급여는 만 0세(0~11개월) 월 100만원, 만 1세(12~23개월) 월 50만원입니다. 어린이집을 이용하면 보육료 바우처로 전환되어 차액만 현금으로 지급됩니다.",
          },
          {
            law: "아동수당법 제4조",
            detail:
              "아동수당은 만 8세 미만 아동에게 월 10만원을 지급합니다. 최대 96개월(만 0세부터 8세 생일 전달까지)이 지급 기간이며, 소득과 무관하게 모든 아동이 대상입니다.",
          },
          {
            law: "가족관계의 등록 등에 관한 법률 제44조",
            detail:
              "출생신고는 출생일로부터 1개월 이내에 해야 합니다. 기한을 넘기면 과태료가 부과되고, 신고가 되어야 각종 지원 신청이 가능합니다.",
          },
        ]}
        note="지자체가 별도로 지급하는 출산장려금은 지역마다 금액과 요건이 크게 다르므로 이 계산에 포함하지 않았습니다. 거주지 시·군·구청에서 별도로 확인하세요. 지원 금액과 요건은 매년 조정될 수 있습니다."
        examples={[
          {
            title: "첫째 아이 · 만 2세가 될 때까지 받는 금액",
            steps: [
              "첫만남이용권 = 2,000,000원 (출생 시 1회)",
              "부모급여 만 0세 = 1,000,000 × 12 = 12,000,000원",
              "부모급여 만 1세 = 500,000 × 12 = 6,000,000원",
              "아동수당 = 100,000 × 24 = 2,400,000원 (첫 2년분)",
            ],
            result: "만 2세까지 합계 약 20,000,000원",
          },
          {
            title: "만 8세까지 전체를 합하면 (첫째 기준)",
            steps: [
              "첫만남이용권 2,000,000원",
              "부모급여 2년치 18,000,000원",
              "아동수당 = 100,000 × 108개월 = 10,800,000원",
            ],
            result:
              "총 30,800,000원 — 둘째 이상은 첫만남이용권이 100만원 더 많아 31,800,000원",
          },
        ]}
        pitfalls={[
          {
            heading: "신청해야 나옵니다",
            body:
              "자동 지급이 아닙니다. 병원에서 출생신고와 지원금 신청을 한 번에 처리하는 서비스를 이용하면 편하지만, 그렇지 않다면 정부24나 복지로에서 개별 신청해야 합니다.",
          },
          {
            heading: "부모급여는 어린이집 이용 여부로 형태가 바뀝니다",
            body:
              "가정 양육 시에는 현금으로 받지만, 어린이집을 이용하면 보육료 바우처로 전환되고 바우처 금액이 부모급여보다 적으면 차액만 현금으로 나옵니다. 총액이 줄어드는 것은 아닙니다.",
          },
          {
            heading: "첫만남이용권에는 사용 기한이 있습니다",
            body:
              "바우처 형태라 사용 기한이 정해져 있고, 기한이 지나면 잔액이 소멸합니다. 사용처 제한도 있으니 발급 후 안내를 확인하세요.",
          },
          {
            heading: "지자체 지원은 주소지 기준이라 이사하면 바뀝니다",
            body:
              "출산장려금은 지자체마다 금액이 크게 다르고, 일정 기간 이상 거주를 요건으로 하는 곳도 많습니다. 출산 전 이사 계획이 있다면 미리 확인하세요.",
          },
        ]}
        sources={[
          { label: "복지로", href: "https://www.bokjiro.go.kr" },
          { label: "정부24", href: "https://www.gov.kr" },
          { label: "보건복지부", href: "https://www.mohw.go.kr" },
        ]}
      />

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
      <CalcGuides calcHref="/calc/benefits" />
    </div>
  );
}
