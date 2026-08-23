import type { Metadata } from "next";
import CalcGuides from "@/components/CalcGuides";
import Link from "next/link";
import WorkReductionCalculator from "@/components/WorkReductionCalculator";
import AdSlot from "@/components/AdSlot";
import CalcNotes from "@/components/CalcNotes";
import { SITE_NAME, SITE_URL } from "@/lib/site";

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
          { "@type": "ListItem", position: 2, name: "육아기 근로시간 단축급여 계산기" },
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

      <CalcNotes
        updated="2026-08-02"
        basis={[
          {
            law: "남녀고용평등법 제19조의2 (육아기 근로시간 단축)",
            detail:
              "육아휴직 대신 근로시간을 줄여 일하면서 급여를 지원받는 제도입니다. 사업주는 정당한 사유 없이 거부할 수 없으며, 단축 후 근로시간은 주 15시간 이상 35시간 이하여야 합니다.",
          },
          {
            law: "고용보험법 시행령 (육아기 근로시간 단축 급여)",
            detail:
              "단축한 시간 중 최초 10시간까지는 통상임금의 100%(상한 250만원 기준으로 시간 비례), 나머지 시간은 80%(상한 160만원 기준)로 지원합니다.",
          },
          {
            law: "계산 방식",
            detail:
              "지원금 = (상한 적용 통상임금 × 최초 10시간 ÷ 소정근로시간) + (상한 적용 통상임금 × 나머지 단축시간 ÷ 소정근로시간). 단축한 시간에 비례해 산정합니다.",
          },
          {
            law: "육아휴직과의 관계",
            detail:
              "육아휴직과 근로시간 단축을 합쳐 사용할 수 있으며, 남은 육아휴직 기간을 근로시간 단축으로 전환해 더 길게 쓸 수 있는 제도가 마련돼 있습니다.",
          },
        ]}
        note="지원금은 줄어든 임금을 전액 보전하는 것이 아니라 일부를 지원하는 구조입니다. 소득 감소분과 지원금을 함께 계산해 실제 가계 수입이 얼마가 되는지 확인하세요."
        examples={[
          {
            title: "통상임금 300만원 · 주 40시간 → 주 20시간으로 단축",
            steps: [
              "단축 시간 = 40 − 20 = 20시간",
              "최초 10시간분 = 상한 적용 통상임금 × 10 ÷ 40 = 625,000원",
              "나머지 10시간분 = 80% 적용 상한 기준 × 10 ÷ 40 = 400,000원",
              "지원금 합계 = 1,025,000원",
            ],
            result:
              "회사에서 받는 절반 급여(150만원)에 지원금 약 102만원이 더해집니다",
          },
          {
            title: "왜 최초 10시간이 유리한가",
            steps: [
              "최초 10시간은 지급률 100% 기준으로 계산",
              "그 이후 시간은 80% 기준으로 계산",
              "즉 조금만 줄이면 줄인 시간당 보전율이 높습니다",
            ],
            result:
              "많이 줄일수록 총액은 늘지만 시간당 보전율은 낮아지는 구조입니다",
          },
        ]}
        pitfalls={[
          {
            heading: "주 15시간 미만으로는 줄일 수 없습니다",
            body:
              "단축 후 근로시간이 주 15시간 이상 35시간 이하여야 제도 대상이 됩니다. 그보다 더 줄이고 싶다면 육아휴직을 쓰는 것이 맞습니다.",
          },
          {
            heading: "지원금이 소득 감소를 다 메우지는 않습니다",
            body:
              "줄인 시간만큼 회사 급여가 줄고, 그중 일부를 지원받는 구조입니다. 근무시간을 절반으로 줄이면 총수입도 줄어드니 가계 예산을 다시 짜야 합니다.",
          },
          {
            heading: "4대보험은 줄어든 급여 기준으로 재산정됩니다",
            body:
              "보수가 줄면 보험료도 줄지만, 국민연금 가입 기간 중 소득이 낮아지면 나중에 받을 연금액에도 영향이 있습니다. 장기적인 부분까지 감안해 결정하세요.",
          },
          {
            heading: "육아휴직 잔여 기간을 전환해 더 길게 쓸 수 있습니다",
            body:
              "육아휴직을 다 쓰지 않았다면 남은 기간을 근로시간 단축으로 전환해 사용할 수 있는 제도가 있습니다. 어떻게 조합하는 것이 유리한지 미리 계산해 보세요.",
          },
        ]}
        sources={[
          { label: "고용24", href: "https://www.work24.go.kr" },
          { label: "고용노동부", href: "https://www.moel.go.kr" },
          { label: "국가법령정보센터", href: "https://www.law.go.kr" },
        ]}
      />

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
      <CalcGuides calcHref="/calc/work-reduction" />
    </div>
  );
}
