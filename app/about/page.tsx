import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "소개",
  description:
    "육아노트는 육아휴직급여·부모급여·아동수당·예방접종 일정을 계산기와 가이드로 정리한 생활 정보 서비스입니다. 근거와 갱신 방식, 계산하지 않는 것까지 밝혀 두었습니다.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="space-y-4 text-[15px] leading-relaxed">
      <h1 className="text-2xl font-extrabold">{SITE_NAME} 소개</h1>
      <p>
        {SITE_NAME}는 아이가 태어난 뒤 챙겨야 할 <strong>지원금과 일정</strong>을
        한곳에서 확인하는 무료 도구 모음입니다. 회원가입도, 개인정보 수집도
        없습니다.
      </p>

      <h2 className="pt-2 text-lg font-bold">왜 이 네 가지인가</h2>
      <p>
        출산·육아 지원은 <strong>담당 기관이 전부 다릅니다.</strong> 육아휴직급여는
        고용노동부, 부모급여와 아동수당은 복지부, 예방접종은 질병관리청입니다.
        그래서 한 번에 보기가 어렵고, 기한을 놓치기 쉽습니다.
      </p>
      <ul className="ml-5 list-disc space-y-1.5">
        <li>
          <strong>육아휴직급여</strong> — 개월 구간마다 지급률과 상한이 다릅니다.
          부부가 순서를 어떻게 쓰느냐로 총액이 크게 갈립니다
        </li>
        <li>
          <strong>출산·육아 지원금 합산</strong> — 첫만남이용권·부모급여·아동수당을
          한꺼번에. <strong>60일 안에 신청하지 않으면 소급이 안 됩니다</strong>
        </li>
        <li>
          <strong>예방접종 일정</strong> — 생년월일만 넣으면 접종일이 나옵니다.
          종류가 많고 간격이 제각각이라 표로는 관리가 어렵습니다
        </li>
        <li>
          <strong>육아기 근로시간 단축급여</strong> — 휴직 대신 시간을 줄일 때.
          휴직과 계산 방식이 다릅니다
        </li>
      </ul>

      <h2 className="pt-2 text-lg font-bold">근거와 갱신</h2>
      <p>
        모든 기준은 <strong>고용보험법</strong>, <strong>아동수당법</strong>,{" "}
        <strong>남녀고용평등법</strong>과 보건복지부·고용노동부·질병관리청의 연도별
        고시를 근거로 합니다. 각 계산기 페이지에 적용한 근거를 함께 표기합니다.
      </p>
      <p>
        이 분야는 <strong>제도가 가장 자주 바뀌는 영역</strong>입니다. 지급률과
        상한액이 해마다 조정되고, 예방접종 표준일정도 개정됩니다. 그래서 고시값
        자체를 숫자로 고정하는 검증 테스트를 두어, 값이 낡으면 테스트가 먼저
        실패하도록 했습니다.
      </p>

      <h2 className="pt-2 text-lg font-bold">계산하지 않는 것</h2>
      <p>
        확실하지 않은 것은 넣지 않습니다. 어설픈 추정이 잘못된 기대를 만들기
        때문입니다.
      </p>
      <ul className="ml-5 list-disc space-y-1.5">
        <li>
          <strong>지자체 출산장려금</strong> — 지역마다 금액과 요건이 크게 다르고
          거주 기간 조건을 두는 곳도 있습니다. 계산에 넣지 않고 거주지 확인으로
          안내합니다
        </li>
        <li>
          <strong>어린이집 보육료 차액</strong> — 기관과 반에 따라 달라집니다
        </li>
        <li>
          <strong>산후조리원 비용</strong> — 지역·시설별 편차가 커서 표로 만들 수
          없습니다
        </li>
        <li>
          <strong>회사별 출산 지원</strong> — 취업규칙에 따라 달라 일률적으로
          계산할 수 없습니다
        </li>
      </ul>

      <h2 className="pt-2 text-lg font-bold">한계와 문의</h2>
      <p>
        이 사이트의 계산은 <strong>참고용 추정치</strong>이며 행정·법률·의료 자문이
        아닙니다. 특히 <strong>예방접종 일정은 표준일정을 코드로 옮긴 것</strong>으로,
        아이의 건강 상태나 접종 이력에 따라 달라질 수 있으니 반드시 의료진과
        상의하세요. 확정 사항은 <strong>고용노동부(1350)</strong>,{" "}
        <strong>복지로</strong>, <strong>질병관리청 예방접종도우미</strong>에서 확인할
        수 있습니다. 입력한 생년월일과 급여는 브라우저 안에서만 처리되며 서버로
        전송되지 않습니다.
      </p>
      <p>
        {SITE_NAME}는 생활반장(lifebanjang.com) 노트 시리즈의 하나입니다. 문의는{" "}
        <a
          href="mailto:cdkjjang@gmail.com"
          className="text-accent underline-offset-4 hover:underline"
        >
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
