import { describe, expect, it } from "vitest";
import { guides } from "./guides";
import nextConfig from "../next.config";
import { CHILD_ALLOWANCE } from "./benefits";

/**
 * 가이드 데이터가 조용히 망가지는 것을 막는 테스트.
 *
 * 2026-09-10에 27편을 19편으로 합쳤다. 애드센스가 "가치가 별로 없는 콘텐츠"로
 * 두 번 연속 반려했고, 이 노트는 27편 중 8편이 본문 1,500자를 밑돌았다.
 * 출산 지원금 한 주제를 세 편이, 육아휴직을 네 편이 나눠 갖고 있었다.
 */

/** 화면에 실제로 나가는 본문 길이 (공백 제외) */
function bodyLength(g: (typeof guides)[number]): number {
  const parts = [
    ...g.intro,
    ...g.sections.flatMap((s) => [s.heading, ...s.paragraphs, ...(s.list ?? [])]),
    ...g.faq.flatMap((f) => [f.q, f.a]),
  ];
  return parts.join("").replace(/\s/g, "").length;
}

function fullText(g: (typeof guides)[number]): string {
  return [
    g.title,
    g.description,
    ...g.intro,
    ...g.sections.flatMap((s) => [s.heading, ...s.paragraphs, ...(s.list ?? [])]),
    ...g.faq.flatMap((f) => [f.q, f.a]),
  ].join("\n");
}

describe("가이드 데이터", () => {
  it("슬러그가 중복되지 않는다", () => {
    const seen = new Set<string>();
    const dup: string[] = [];
    for (const g of guides) {
      if (seen.has(g.slug)) dup.push(g.slug);
      seen.add(g.slug);
    }
    expect(dup).toEqual([]);
  });

  it("related가 실제 있는 글을 가리키고 자기 자신을 넣지 않는다", () => {
    const known = new Set(guides.map((g) => g.slug));
    const bad: string[] = [];
    for (const g of guides) {
      for (const r of g.related) {
        if (!known.has(r)) bad.push(`${g.slug} → 없는 글 ${r}`);
        if (r === g.slug) bad.push(`${g.slug} → 자기 자신`);
      }
      if (new Set(g.related).size !== g.related.length) {
        bad.push(`${g.slug}: related 중복`);
      }
    }
    expect(bad).toEqual([]);
  });

  it("본문이 1,500자 미만인 글이 없다", () => {
    // ⚠️ 기준이 두 가지라 헷갈리기 쉽다. 통합을 결정할 때 쓴 감사 수치는
    //    소스의 문자열 리터럴을 세는 느슨한 방식이었고, 여기 bodyLength는
    //    화면에 실제로 나가는 글자를 공백까지 빼고 센다.
    //    감사 기준 2,000자 ≈ 여기 1,500자다.
    const thin = guides
      .map((g) => ({ slug: g.slug, len: bodyLength(g) }))
      .filter((x) => x.len < 1500)
      .map((x) => `${x.slug} (${x.len}자)`);
    expect(thin).toEqual([]);
  });

  it("섹션 제목이 한 글 안에서 중복되지 않는다", () => {
    // 템플릿이 heading을 React key로 쓴다. 겹치면 렌더링이 깨진다.
    const bad: string[] = [];
    for (const g of guides) {
      const seen = new Set<string>();
      for (const s of g.sections) {
        if (seen.has(s.heading)) bad.push(`${g.slug}: "${s.heading}"`);
        seen.add(s.heading);
      }
    }
    expect(bad).toEqual([]);
  });

  it("FAQ 질문이 한 글 안에서 중복되지 않는다", () => {
    const bad: string[] = [];
    for (const g of guides) {
      const seen = new Set<string>();
      for (const f of g.faq) {
        if (seen.has(f.q)) bad.push(`${g.slug}: "${f.q}"`);
        seen.add(f.q);
      }
    }
    expect(bad).toEqual([]);
  });

  it("faq에는 ** 를 쓰지 않는다", () => {
    // FAQ는 JSON-LD 구조화 데이터로도 나가므로 태그가 아니라 별표가 그대로 들어간다.
    const bad = guides
      .filter((g) => g.faq.some((f) => f.q.includes("**") || f.a.includes("**")))
      .map((g) => g.slug);
    expect(bad).toEqual([]);
  });

  it("제목의 부제(— 뒤)가 서로 겹치지 않는다", () => {
    const bySub = new Map<string, string[]>();
    for (const g of guides) {
      const parts = g.title.split(" — ");
      if (parts.length < 2) continue;
      const sub = parts.slice(1).join(" — ").trim();
      bySub.set(sub, [...(bySub.get(sub) ?? []), g.slug]);
    }
    const dup = [...bySub.entries()]
      .filter(([, v]) => v.length > 1)
      .map(([k, v]) => `"${k}": ${v.join(", ")}`);
    expect(dup).toEqual([]);
  });

  it("cta가 실제 있는 계산기를 가리킨다", () => {
    const calcs = new Set([
      "/calc/benefits",
      "/calc/parental-leave",
      "/calc/vaccine",
      "/calc/work-reduction",
    ]);
    const bad = guides
      .filter((g) => g.cta && !calcs.has(g.cta.href))
      .map((g) => `${g.slug} → ${g.cta!.href}`);
    expect(bad).toEqual([]);
  });
});

describe("가이드 본문의 고시값이 계산 엔진과 어긋나지 않는다", () => {
  it("아동수당을 만 8세로 쓴 글이 없다", () => {
    // 2026년부터 만 9세 미만이다. lib/benefits.ts의 maxMonths 108이 그 기준.
    // 통합 전에는 네 곳이 만 8세로 남아 있었다(가이드 셋 + 홈 시나리오 하나).
    // 쪼개져 있으면 각 글이 따로 읽혀 아무도 대조하지 않는다.
    expect(CHILD_ALLOWANCE.maxMonths).toBe(108); // 만 9세 미만 = 108개월

    const bad: string[] = [];
    for (const g of guides) {
      const t = fullText(g);
      // "만 8세"가 아동수당 문맥에서 쓰였는지 본다.
      for (const m of t.matchAll(/.{0,40}만 8세.{0,40}/g)) {
        if (/아동수당/.test(m[0])) bad.push(`${g.slug}: "${m[0].trim()}"`);
      }
    }
    expect(bad).toEqual([]);
  });

  it("사후지급금을 언급하는 글은 폐지 사실을 함께 밝힌다", () => {
    // 2025년에 폐지됐다. 통합 전 parental-leave-order는 "폐지·조정될 수 있다"고
    // 흐리게 써서, 폐지로 단정한 parental-leave-2026과 한 노트 안에서 어긋났다.
    //
    // ⚠️ 문장 주변 몇 글자만 잘라 보는 방식으로 짜지 말 것. 처음에 그렇게 했다가
    //    "예전 자료에는 아직 사후지급금 설명이 남아 있다"처럼 **폐지를 설명하는
    //    문장 자체**가 걸렸다(로또노트에서도 같은 실수를 했다). 글 단위로 본다.
    const bad = guides
      .filter((g) => {
        const t = fullText(g);
        return t.includes("사후지급금") && !t.includes("폐지");
      })
      .map((g) => g.slug);
    expect(bad).toEqual([]);
  });
});

describe("통합으로 사라진 URL의 301", () => {
  it("출발지는 사라진 글이고 목적지는 실재한다", async () => {
    const known = new Set(guides.map((g) => g.slug));
    const rules = await nextConfig.redirects!();
    expect(rules.length).toBe(8);

    const bad: string[] = [];
    for (const r of rules) {
      const from = r.source.replace("/guide/", "");
      const to = r.destination.replace("/guide/", "");
      if (known.has(from)) {
        bad.push(`${from}: 글이 살아 있는데 리다이렉트가 걸려 있음`);
      }
      if (!known.has(to)) bad.push(`${from} → ${to}: 목적지가 없음`);
      if (!r.permanent) bad.push(`${from}: 301이 아님`);
    }
    expect(bad).toEqual([]);
  });

  it("리다이렉트가 다시 리다이렉트로 이어지지 않는다", async () => {
    const rules = await nextConfig.redirects!();
    const sources = new Set(rules.map((r) => r.source));
    const chained = rules
      .filter((r) => sources.has(r.destination))
      .map((r) => `${r.source} → ${r.destination}`);
    expect(chained).toEqual([]);
  });
});
