import type { Metadata } from "next";
import CalcGuides from "@/components/CalcGuides";
import RelatedTools from "@/components/RelatedTools";
import Link from "next/link";
import VaccineSchedule from "@/components/VaccineSchedule";
import AdSlot from "@/components/AdSlot";
import CalcNotes from "@/components/CalcNotes";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "예방접종 일정 계산기 — 생년월일로 표준일정 확인",
  description:
    "아이 생년월일을 넣으면 국가예방접종(NIP) 표준일정을 접종 날짜로 계산합니다. BCG·DTaP·MMR·HPV까지 지난 접종과 예정 접종을 한눈에.",
  alternates: { canonical: "/calc/vaccine" },
};

const faq = [
  {
    q: "국가예방접종은 무료인가요?",
    a: "표준일정에 포함된 국가예방접종(NIP)은 전국 지정 위탁의료기관과 보건소에서 무료로 접종받을 수 있습니다. 일부 선택 백신이나 접종 외 진료비는 별도일 수 있습니다.",
  },
  {
    q: "2026년에 달라진 접종이 있나요?",
    a: "인플루엔자 백신이 4가에서 3가로 변경됐고, HPV 국가예방접종이 만 12세 남자아이까지 확대되어 남녀 모두 무료 접종 대상이 됐습니다. 로타바이러스는 모든 접종을 생후 8개월 0일 전에 마쳐야 합니다.",
  },
  {
    q: "권장 시기를 놓치면 어떻게 하나요?",
    a: "대부분은 이어서 접종할 수 있고 이미 맞은 접종을 처음부터 다시 하지는 않습니다. 다만 로타바이러스처럼 완료 기한이 정해진 백신은 시기가 중요하니, 늦어졌다면 의료기관과 상담하세요.",
  },
];

export default function VaccinePage() {
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
          { "@type": "ListItem", position: 2, name: "예방접종 일정 계산기" },
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
      <h1 className="mb-2 text-2xl font-extrabold">예방접종 일정 계산기</h1>
      <p className="mb-6 text-muted">
        아이 생년월일을 넣으면 국가예방접종 표준일정을 접종 날짜로 계산해
        지난 접종과 예정 접종을 시기 순으로 정리합니다.
      </p>
      <VaccineSchedule />

      <AdSlot slot="vaccine-below-tool" />

      <section className="mt-10 space-y-4 text-[15px] leading-relaxed">
        <h2 className="text-xl font-bold">개월별 접종의 큰 흐름</h2>
        <p>
          예방접종은 출생 직후부터 만 12세까지 이어집니다. 출생 직후 B형간염과 생후
          4주 이내 BCG(결핵)로 시작해, 생후 2·4·6개월은 DTaP·폴리오·Hib·폐렴구균·로타
          같은 여러 백신을 함께 맞는 집중 시기입니다.
        </p>
        <p>
          생후 12~15개월에는 MMR·수두·A형간염·일본뇌염이 시작되고, 만 4~6세에
          DTaP·폴리오·MMR 추가접종, 만 11~12세에 Td/Tdap과 HPV를 맞습니다. 시기를
          놓치지 않는 것이 가장 중요합니다.
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
            law: "감염병의 예방 및 관리에 관한 법률 제24조 (필수예방접종)",
            detail:
              "국가예방접종사업(NIP)으로 지정된 백신은 지정 의료기관과 보건소에서 무료로 접종할 수 있습니다. 대상 백신과 일정은 질병관리청이 고시합니다.",
          },
          {
            law: "표준예방접종일정표",
            detail:
              "출생 직후 BCG·B형간염을 시작으로 생후 개월 수에 맞춰 DTaP, 폴리오, Hib, 폐렴구균, MMR, 수두, 일본뇌염 등이 이어집니다. 백신마다 접종 횟수와 간격이 다릅니다.",
          },
          {
            law: "접종 간격의 원칙",
            detail:
              "같은 백신의 차수 사이에는 최소 간격이 정해져 있습니다. 이보다 짧은 간격으로 맞으면 유효한 접종으로 인정되지 않을 수 있으므로 일정을 앞당기는 것은 권하지 않습니다.",
          },
          {
            law: "지연 시 처리",
            detail:
              "일정이 밀렸다고 처음부터 다시 맞는 것은 아니며, 대부분 남은 차수를 이어서 접종합니다. 다만 조정이 필요하므로 의료기관이나 보건소에서 일정을 다시 잡아야 합니다.",
          },
        ]}
        note="이 계산기는 생년월일을 기준으로 표준일정의 권장 시기를 계산해 보여줍니다. 아이의 건강 상태, 미숙아 여부, 기저질환에 따라 일정이 달라질 수 있으므로 최종 판단은 담당 의료진과 상의하세요. 의학적 조언이 아닙니다."
        examples={[
          {
            title: "출생 직후 ~ 생후 1개월",
            steps: [
              "출생 후 4주 이내: BCG(결핵) 1회",
              "출생 직후: B형간염 1차",
              "생후 1개월: B형간염 2차",
            ],
            result: "첫 달에만 3건 — 산후조리 중에 놓치기 쉬운 구간입니다",
          },
          {
            title: "생후 2·4·6개월 — 가장 촘촘한 시기",
            steps: [
              "2개월: DTaP 1차, 폴리오 1차, Hib 1차, 폐렴구균 1차, 로타바이러스 1차",
              "4개월: 같은 백신들의 2차",
              "6개월: 3차 + B형간염 3차",
            ],
            result:
              "한 번에 여러 백신을 동시 접종하는 것이 일반적이며, 안전성이 확인된 방식입니다",
          },
        ]}
        pitfalls={[
          {
            heading: "달력에 미리 옮겨 적어두세요",
            body:
              "수첩만으로 관리하면 놓치기 쉽습니다. 특히 생후 12~15개월에 MMR·수두·일본뇌염이 몰리는데, 이 시기는 첫돌 준비와 겹쳐 잊기 쉽습니다.",
          },
          {
            heading: "무료 접종 기관을 확인하세요",
            body:
              "국가예방접종은 지정 의료기관에서 무료입니다. 지정되지 않은 곳에서는 비용이 발생할 수 있으니 예방접종도우미 사이트에서 가까운 지정 기관을 확인하고 가세요.",
          },
          {
            heading: "아플 때는 미루는 것이 원칙입니다",
            body:
              "발열이나 급성 질환이 있으면 회복 후에 접종합니다. 며칠 미뤄도 문제되지 않으니 무리해서 일정을 맞추지 마세요.",
          },
          {
            heading: "접종 기록은 전산으로 관리됩니다",
            body:
              "예방접종도우미에서 자녀의 접종 이력을 조회할 수 있습니다. 어린이집 입소나 초등학교 입학 때 확인이 필요하므로 기록을 챙겨두세요.",
          },
        ]}
        sources={[
          { label: "질병관리청 예방접종도우미", href: "https://nip.kdca.go.kr" },
          { label: "질병관리청", href: "https://www.kdca.go.kr" },
          { label: "국가법령정보센터", href: "https://www.law.go.kr" },
        ]}
      />

      <section className="mt-10 rounded-2xl border border-border-soft bg-card p-5">
        <h2 className="mb-3 font-bold">함께 확인하세요</h2>
        <ul className="space-y-2 text-[15px]">
          <li>
            <Link href="/guide/vaccine-schedule-guide" className="text-accent underline-offset-4 hover:underline">
              우리 아이 예방접종 완전 가이드 →
            </Link>
          </li>
          <li>
            <Link href="/calc/benefits" className="text-accent underline-offset-4 hover:underline">
              출산·육아 지원금 계산기 →
            </Link>
          </li>
        </ul>
      </section>
      <CalcGuides calcHref="/calc/vaccine" />
      <RelatedTools calc="/calc/vaccine" />
    </div>
  );
}
