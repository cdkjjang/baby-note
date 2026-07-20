import Link from "next/link";
import FamilyLinks from "@/components/FamilyLinks";
import { SITE_NAME } from "@/lib/site";

const TOOL_LINKS = [
  { href: "/calc/parental-leave", label: "육아휴직급여 계산기" },
  { href: "/calc/benefits", label: "출산·육아 지원금 계산기" },
  { href: "/calc/vaccine", label: "예방접종 일정 계산기" },
  { href: "/calc/work-reduction", label: "육아기 근로시간 단축급여" },
  { href: "/guide", label: "육아 가이드" },
];

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-border-soft bg-card">
      <div className="mx-auto max-w-3xl px-4 py-8 text-sm text-muted">
        <nav aria-label="사이트 바로가기" className="mb-5">
          <p className="mb-2 font-semibold text-foreground">{SITE_NAME} 도구</p>
          <ul className="flex flex-wrap gap-x-4 gap-y-2">
            {TOOL_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-accent">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <FamilyLinks />
        <p className="mb-3">
          {SITE_NAME}의 계산 결과는 법령·공개 고시를 정리한 참고용 추정치이며,
          개별 사안에 대한 행정·법률 자문이 아닙니다. 지원 금액·상한은 매년 바뀌고
          지자체별 추가 지원은 지역마다 다릅니다. 정확한 금액과 자격은 복지로
          (bokjiro.go.kr)·고용24(work24.go.kr)·예방접종도우미(nip.kdca.go.kr) 및
          관할기관에서 확인하세요.
        </p>
        <div className="flex gap-4">
          <Link href="/about" className="hover:text-accent">
            소개
          </Link>
          <Link href="/terms" className="hover:text-accent">
            이용약관
          </Link>
          <Link href="/privacy" className="hover:text-accent">
            개인정보처리방침
          </Link>
        </div>
        <p className="mt-3">© {new Date().getFullYear()} {SITE_NAME}</p>
      </div>
    </footer>
  );
}
