import type { Metadata } from "next";
import CalcGuides from "@/components/CalcGuides";
import Link from "next/link";
import ParentalLeaveCalculator from "@/components/ParentalLeaveCalculator";
import AdSlot from "@/components/AdSlot";
import CalcNotes from "@/components/CalcNotes";
import { SITE_NAME, SITE_URL } from "@/lib/site";

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
          { "@type": "ListItem", position: 2, name: "육아휴직급여 계산기" },
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

      <CalcNotes
        updated="2026-08-02"
        basis={[
          {
            law: "고용보험법 제70조·시행령 제95조 (육아휴직 급여)",
            detail:
              "육아휴직 기간에 따라 지급률과 상한액이 달라집니다. 1~3개월은 통상임금의 100%(상한 250만원), 4~6개월은 100%(상한 200만원), 7개월 이후는 80%(상한 160만원)입니다. 하한은 70만원입니다.",
          },
          {
            law: "6+6 부모육아휴직제",
            detail:
              "같은 자녀에 대해 부모가 모두 육아휴직을 사용하면 첫 6개월 동안 지급률과 상한이 올라갑니다. 1개월 200만원부터 6개월 450만원까지 월별로 상한이 단계적으로 커지는 구조입니다.",
          },
          {
            law: "남녀고용평등법 제19조 (육아휴직)",
            detail:
              "만 8세 이하 또는 초등학교 2학년 이하 자녀를 양육하기 위해 신청할 수 있습니다. 사업주는 정당한 사유 없이 거부할 수 없으며, 육아휴직을 이유로 불리한 처우를 해서는 안 됩니다.",
          },
          {
            law: "사후지급분",
            detail:
              "일부 급여는 휴직 중에 지급되지 않고, 복직 후 정해진 기간 이상 계속 근무한 뒤 일괄 지급되는 구조가 있습니다. 휴직 초기 소득 공백을 감안해 자금 계획을 세워야 합니다.",
          },
        ]}
        note="통상임금은 정기적·일률적으로 지급하기로 정한 금액입니다. 실제 지급액은 고용센터 심사 결과에 따라 달라질 수 있으며, 지급 방식과 상한액은 제도 개편에 따라 변경됩니다. 신청은 고용24에서 합니다."
        examples={[
          {
            title: "통상임금 400만원 · 단독으로 12개월 육아휴직",
            steps: [
              "1~3개월: 통상임금의 100%지만 상한 250만원 → 월 2,500,000원",
              "4~6개월: 100%, 상한 200만원 → 월 2,000,000원",
              "7~12개월: 80%인 320만원이지만 상한 160만원 → 월 1,600,000원",
              "구간별로 합산해 총 수령액을 계산합니다",
            ],
            result:
              "상한이 걸리므로 통상임금이 높아도 실수령은 상한선에서 멈춥니다",
          },
          {
            title: "부모가 함께 쓰면 (6+6 부모육아휴직제)",
            steps: [
              "첫 6개월 상한이 월별로 200 → 250 → 300 → 350 → 400 → 450만원으로 올라갑니다",
              "단독 사용 시 1~3개월 상한 250만원과 비교하면 후반으로 갈수록 차이가 커집니다",
              "누가 먼저 쓰고 누가 이어받느냐에 따라 총액이 달라집니다",
            ],
            result:
              "부부가 순서를 정하기 전에 두 경우를 모두 계산해 비교하는 것이 좋습니다",
          },
        ]}
        pitfalls={[
          {
            heading: "통상임금이 높아도 상한에서 멈춥니다",
            body:
              "지급률이 100%라도 상한액이 있어 통상임금 250만원을 넘는 구간은 반영되지 않습니다. 고소득자일수록 소득 대체율이 낮아지므로 휴직 기간 생활비를 미리 계산해 두세요.",
          },
          {
            heading: "사후지급분 때문에 휴직 중 수령액이 적을 수 있습니다",
            body:
              "일부가 복직 후 지급되는 구조라면 휴직 중에는 계산된 금액보다 적게 들어옵니다. 첫 두어 달 생활비를 따로 준비해 두는 편이 안전합니다.",
          },
          {
            heading: "육아휴직 기간에도 4대보험은 이어집니다",
            body:
              "건강보험은 경감 제도가 있고 국민연금은 납부예외를 신청할 수 있습니다. 다만 납부예외 기간은 가입 기간에서 빠지므로 나중에 추후납부가 가능한지 확인해 두세요.",
          },
          {
            heading: "휴직 기간 소득이 줄면 연말정산 결과도 달라집니다",
            body:
              "육아휴직 급여는 비과세 소득이라 총급여에 포함되지 않습니다. 그래서 그 해 연말정산에서 공제 문턱(카드 25%, 의료비 3%)이 낮아져 결과가 평소와 다르게 나옵니다.",
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
      <CalcGuides calcHref="/calc/parental-leave" />
    </div>
  );
}
