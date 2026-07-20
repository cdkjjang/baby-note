import type { Metadata } from "next";
import Link from "next/link";
import { guides } from "@/lib/guides";

export const metadata: Metadata = {
  title: "육아 가이드 — 지원금·육아휴직·예방접종",
  description:
    "출산하면 받는 돈, 육아휴직급여 개편, 부모급여와 아동수당의 차이, 예방접종 표준일정, 출산휴가까지 — 출산·육아에 꼭 필요한 정보를 글 하나씩으로 정리했습니다.",
  alternates: { canonical: "/guide" },
};

export default function GuideListPage() {
  return (
    <div>
      <h1 className="mb-2 text-2xl font-extrabold">육아 가이드</h1>
      <p className="mb-8 text-muted">
        지원금·육아휴직·예방접종 — 출산과 육아에서 한 번쯤 궁금했던 것들을 순서대로
        읽어도 좋고 필요한 글만 골라 읽어도 좋습니다.
      </p>
      <ul className="space-y-4">
        {guides.map((g) => (
          <li key={g.slug}>
            <Link
              href={`/guide/${g.slug}`}
              className="block rounded-2xl border border-border-soft bg-card p-5 shadow-sm transition-all hover:border-accent hover:shadow-md"
            >
              <h2 className="font-bold leading-snug">{g.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {g.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
