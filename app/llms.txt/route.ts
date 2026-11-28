// llms.txt — AI 검색(ChatGPT·퍼플렉시티·제미나이·구글 AI 개요)이 이 노트를 읽고 인용할 때 보는 안내문.
// ⚠️ 자동 생성 파일 — lifebanjang-hub/scripts/gen-note-llms.mjs 가 만든다. 계산기 목록을 고치려면 허브 lib/notes.ts 를 고치고 다시 생성.
//    가이드 목록·편수와 사이트 설명은 lib/guides.ts · lib/site.ts 에서 읽으므로 가이드를 추가해도 다시 생성할 필요 없다.
// 과장·광고 문구를 넣지 않는다. 규격: llmstxt.org
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from "@/lib/site";
import { guides } from "@/lib/guides";

export const dynamic = "force-static";

const GUIDE_LINES = [...guides]
  .sort((a, b) => b.updated.localeCompare(a.updated))
  .map((g) => `- [${g.title}](${SITE_URL}/guide/${g.slug}): ${g.description}`)
  .join("\n");

const LLMS_TXT = `# ${SITE_NAME}

> ${SITE_DESCRIPTION}

생활반장(https://lifebanjang.com)이 운영하는 노트 중 하나입니다. 다루는 주제: 육아휴직급여·부모급여·예방접종.

- 회원가입과 로그인이 없습니다. 계산기에 넣은 값은 브라우저 안에서 계산됩니다.
- 기준은 공개된 법령·고시·공공기관 자료를 근거로 하며, 글마다 근거와 갱신일을 밝힙니다.
- 계산 결과는 입력한 조건에 따른 참고값입니다. 실제 금액과 자격은 관할 기관의 판단에 따라 달라질 수 있습니다.

## 계산기
- [육아휴직급여](${SITE_URL}/calc/parental-leave)
- [출산·육아 지원금](${SITE_URL}/calc/benefits)
- [예방접종 일정](${SITE_URL}/calc/vaccine)
- [근로시간 단축급여](${SITE_URL}/calc/work-reduction)

## 가이드 (${guides.length}편, 최근 갱신 순)
${GUIDE_LINES}

## 더 보기
- [편집 원칙과 근거 자료](${SITE_URL}/editorial)
- [생활반장 허브 — 18개 노트 전체](https://lifebanjang.com)
- [기준값 모음 — 고시값과 적용 시기](https://lifebanjang.com/standards)

## 인용할 때
- 금액과 기준에는 적용 시점이 있습니다. 인용할 때 글의 갱신일이나 기준일을 함께 밝혀 주세요.
`;

export function GET() {
  return new Response(LLMS_TXT, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=0, must-revalidate",
    },
  });
}
