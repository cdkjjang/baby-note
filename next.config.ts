import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 보안 헤더 — 콘텐츠나 광고 동작에는 영향을 주지 않는다.
  // HSTS와 HTTPS 리다이렉트는 Vercel이 처리하므로 여기서는 세 가지만 둔다.
  // X-Frame-Options는 SAMEORIGIN — 광고는 우리 페이지 '안에' 들어오는
  // iframe이라 이 헤더의 영향을 받지 않는다.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          // 이 사이트는 카메라·마이크·위치·결제를 쓰지 않는다. 명시적으로 꺼 두면
          // 광고 iframe을 포함한 하위 프레임에서도 요청할 수 없다.
          // 애드센스가 쓰는 기능이 아니라 광고 게재에 영향이 없다.
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
          },
        ],
      },
    ];
  },

  // 2026-09-10 가이드 통합으로 사라진 슬러그 → 흡수한 글로 301.
  //
  // permanent: true는 308로 나가고 구글은 301과 같게 처리한다.
  // **이 목록을 지우지 말 것.** 지우는 순간 옛 URL이 404가 된다.
  //
  // 27편 중 8편이 옆 글에 흡수됐다. 27편 중 8편이 본문 1,500자를 밑돌았고,
  // 출산 지원금 한 주제를 세 편이, 육아휴직을 네 편이 나눠 갖고 있었다.
  // 이런 구조가 애드센스 재반려의 원인 중 하나였다(워크스페이스 CLAUDE.md 8장).
  async redirects() {
    const merged: Record<string, string> = {
      // → 출산하면 받는 돈 총정리 (금액·차이·신청 순서)
      "parent-vs-child-allowance": "/guide/birth-benefits-2026",
      "birth-benefit-order": "/guide/birth-benefits-2026",
      // → 육아휴직급여 (6+6·순서 정하기·근로시간 단축)
      "parental-leave-order": "/guide/parental-leave-2026",
      "work-reduction-guide": "/guide/parental-leave-2026",
      // → 출산휴가 총정리 (임신 중 단축근로부터)
      "pregnancy-work-hours": "/guide/maternity-leave-guide",
      // → 어린이집과 유치원 (비교 + 입소 대기)
      "daycare-application": "/guide/daycare-vs-kindergarten",
      // → 돌봄 공백 메우기 (늘봄·돌봄교실 + 아이돌봄서비스)
      "child-care-service": "/guide/elementary-care",
      // → 예방접종과 영유아 건강검진
      "infant-checkup": "/guide/vaccine-schedule-guide",
    };

    return Object.entries(merged).map(([from, to]) => ({
      source: `/guide/${from}`,
      destination: to,
      permanent: true,
    }));
  },
};

export default nextConfig;
