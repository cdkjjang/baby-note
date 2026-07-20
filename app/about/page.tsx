import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "소개",
  description:
    "육아노트는 육아휴직급여·부모급여·아동수당·예방접종 등 출산·육아에 반복해서 찾게 되는 정부 지원 정보를 계산기와 가이드로 정리한 생활 정보 서비스입니다.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="space-y-4 text-[15px] leading-relaxed">
      <h1 className="text-2xl font-extrabold">{SITE_NAME} 소개</h1>
      <p>
        {SITE_NAME}는 출산과 육아 과정에서 반복해서 마주치는 정부 지원 정보를
        해결하는 무료 도구 모음입니다. 육아휴직급여, 첫만남이용권·부모급여·아동수당,
        예방접종 표준일정, 육아기 근로시간 단축급여를 계산기로 바로 확인하고, 관련
        상식을 가이드로 정리했습니다.
      </p>
      <p>
        모든 기준은 고용보험법·보건복지부·질병관리청 등 공개된 법령과 공공기관
        고시를 근거로 하며, 지원 금액과 상한이 매년 바뀌므로 확인된 최신 값으로
        갱신해 운영합니다.
      </p>
      <p>
        다만 이 사이트의 정보는 일반적인 안내이며 개별 사안에 대한 행정·법률
        자문이 아닙니다. 지자체별 추가 지원은 지역마다 다르므로, 정확한 금액과
        자격은 복지로(bokjiro.go.kr)·고용24(work24.go.kr)·예방접종도우미
        (nip.kdca.go.kr) 및 관할기관에서 확인하세요.
      </p>
      <p>
        입력한 생년월일·급여는 이용자의 브라우저 안에서만 계산되며 서버로
        전송·저장되지 않습니다. 회원가입도 없습니다. 문의는{" "}
        <a href="mailto:cdkjjang@gmail.com" className="text-accent underline-offset-4 hover:underline">
          cdkjjang@gmail.com
        </a>
        으로 보내주세요.
      </p>
      <p>
        <Link href="/" className="text-accent underline-offset-4 hover:underline">
          홈으로 →
        </Link>
      </p>
    </div>
  );
}
