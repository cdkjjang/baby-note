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
    </div>
  );
}
