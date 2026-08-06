import type { Metadata } from "next";
import AdSlot from "@/components/AdSlot";
import HomeNotes from "@/components/HomeNotes";
import Link from "next/link";
import { guides } from "@/lib/guides";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

const TOOLS = [
  {
    href: "/calc/parental-leave",
    title: "육아휴직급여 계산기",
    desc: "통상임금·개월 수로 예상 급여 계산, 6+6 부모육아휴직제까지",
    badge: "육아휴직",
  },
  {
    href: "/calc/benefits",
    title: "출산·육아 지원금 계산기",
    desc: "첫만남이용권·부모급여·아동수당, 만 9세까지 총 얼마?",
    badge: "지원금",
  },
  {
    href: "/calc/vaccine",
    title: "예방접종 일정 계산기",
    desc: "생년월일만 넣으면 국가예방접종 표준일정을 날짜로",
    badge: "예방접종",
  },
  {
    href: "/calc/work-reduction",
    title: "육아기 근로시간 단축급여",
    desc: "휴직 대신 짧게 일할 때 받는 단축급여 계산",
    badge: "단축근무",
  },
];

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: "ko",
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="py-6 text-center sm:py-10">
        <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl">
          우리 아이 정부 지원,
          <br className="sm:hidden" /> 얼마나 받을까
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-muted">
          육아휴직급여부터 부모급여·아동수당·예방접종 일정까지, 정부24·복지로·고용24에
          흩어진 출산·육아 정보를 한곳에서 30초 안에 확인하세요.
        </p>
      </section>

      <section className="mt-4 grid gap-4 sm:grid-cols-2">
        {TOOLS.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="rounded-2xl border border-border-soft bg-card p-5 shadow-sm transition-all hover:border-accent hover:shadow-md"
          >
            <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-bold text-accent-strong">
              {tool.badge}
            </span>
            <h2 className="mt-3 text-lg font-bold leading-snug">{tool.title}</h2>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">
              {tool.desc}
            </p>
          </Link>
        ))}
      </section>

      <section className="mt-12">
        <div className="mb-4 flex items-baseline justify-between">
          <h2 className="text-xl font-bold">육아 가이드</h2>
          <Link href="/guide" className="text-sm text-accent hover:underline">
            전체 보기 →
          </Link>
        </div>
        <ul className="space-y-3">
          {guides.slice(0, 5).map((g) => (
            <li key={g.slug}>
              <Link
                href={`/guide/${g.slug}`}
                className="block rounded-xl border border-border-soft bg-card p-4 shadow-sm transition-all hover:border-accent"
              >
                <p className="font-bold leading-snug">{g.title}</p>
                <p className="mt-1 line-clamp-2 text-sm text-muted">
                  {g.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12 space-y-4 text-[15px] leading-relaxed">
        <h2 className="text-xl font-bold">
          출산·육아 지원, 흩어진 정보를 한곳에서
        </h2>
        <p>
          아이를 낳고 기르는 동안 받을 수 있는 정부 지원은 생각보다 많지만, 담당
          기관이 제각각입니다. 육아휴직급여는 고용보험, 부모급여·아동수당은 복지로,
          예방접종은 질병관리청 — 필요할 때마다 사이트를 옮겨 다니며 찾아야 하죠.
        </p>
        <p>
          {SITE_NAME}는 흩어진 출산·육아 정보를 계산기와 가이드로 한곳에 모았습니다.
          법령과 공공기관 고시를 근거로 한 계산으로 우리 아이가 받을 지원을 바로
          확인하세요. 회원가입도, 개인정보 입력도 없습니다. 입력한 생년월일·급여는
          브라우저 안에서만 계산되고 서버로 전송되지 않습니다.
        </p>
      </section>
      <HomeNotes
        siteName={SITE_NAME}
        updated="2026-08-02"
        intro="출산·육아 지원은 종류가 많고 창구도 정부24·복지로·고용24·질병청으로 흩어져 있습니다. 게다가 상당수는 기한이 있고 소급이 안 됩니다."
        scenarios={[
          {
            situation: "아이가 태어나 무엇부터 신청할지 모를 때",
            action:
              "출생신고는 출생일로부터 1개월 이내입니다. 첫만남이용권·부모급여·아동수당을 만 8세까지 합하면 3천만원대가 되는데, 신청하지 않으면 나오지 않습니다.",
            href: "/calc/benefits",
            label: "출산·육아 지원금 계산하기",
          },
          {
            situation: "육아휴직을 쓸지, 언제부터 쓸지 정할 때",
            action:
              "기간에 따라 지급률과 상한이 달라지고, 부부가 함께 쓰면 첫 6개월 상한이 올라갑니다. 누가 먼저 쓰느냐로 총 수령액이 달라지므로 순서를 정하기 전에 계산해 보세요.",
            href: "/calc/parental-leave",
            label: "육아휴직급여 계산하기",
          },
          {
            situation: "휴직 대신 근무시간을 줄이는 방법을 알아볼 때",
            action:
              "단축한 시간 중 최초 10시간까지는 지급률이 높게 적용됩니다. 소득 감소를 줄이면서 육아 시간을 확보하려는 경우에 검토할 만합니다.",
            href: "/calc/work-reduction",
            label: "근로시간 단축급여 계산하기",
          },
          {
            situation: "예방접종 일정을 놓칠까 걱정될 때",
            action:
              "생년월일만 넣으면 표준일정의 권장 시기가 한 번에 나옵니다. 생후 2·4·6개월과 12~15개월에 몰려 있어 달력에 미리 옮겨두면 안전합니다.",
            href: "/calc/vaccine",
            label: "예방접종 일정 확인하기",
          },
        ]}
        faq={[
          {
            q: "지원금은 신청하지 않아도 자동으로 나오나요?",
            a: "대부분 신청해야 지급됩니다. 병원에서 출생신고와 함께 일괄 신청하는 서비스를 이용하면 주요 항목이 한 번에 처리되지만, 그렇지 않다면 정부24나 복지로에서 개별 신청해야 합니다.",
          },
          {
            q: "어린이집에 보내면 부모급여를 못 받나요?",
            a: "총액이 줄어드는 것은 아닙니다. 보육료 바우처로 전환되고, 바우처 금액이 부모급여보다 적으면 차액이 현금으로 지급되는 구조입니다.",
          },
          {
            q: "지자체 출산장려금도 계산에 들어가나요?",
            a: "포함하지 않았습니다. 지역마다 금액과 거주 요건이 크게 달라 일반화할 수 없기 때문입니다. 거주지 시·군·구청에서 별도로 확인하세요.",
          },
          {
            q: "예방접종 일정을 의학적으로 신뢰해도 되나요?",
            a: "질병관리청 표준일정을 기준으로 권장 시기를 계산해 보여주는 도구이며 의학적 조언이 아닙니다. 아이의 건강 상태나 미숙아 여부에 따라 일정이 달라질 수 있으므로 담당 의료진과 상의하세요.",
          },
        ]}
        maintained={[
          "부모급여·아동수당·첫만남이용권 금액과 지급 기간",
          "육아휴직급여 지급률과 구간별 상한액 (고용보험법 시행령)",
          "6+6 부모육아휴직제의 월별 상한",
          "육아기 근로시간 단축급여 지급률과 상한",
          "국가예방접종 표준일정 (질병관리청 고시)",
        ]}
      />

      <AdSlot slot="home-bottom" />
    </div>
  );
}
