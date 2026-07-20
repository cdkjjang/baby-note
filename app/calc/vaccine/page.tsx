import type { Metadata } from "next";
import Link from "next/link";
import VaccineSchedule from "@/components/VaccineSchedule";
import AdSlot from "@/components/AdSlot";

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
    </div>
  );
}
