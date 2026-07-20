// 국가예방접종(NIP) 표준예방접종일정 — 질병관리청 기준
//
// ⚠️ 표준일정은 질병청 고시로 갱신됨(값 변경 시 테스트도 함께 갱신).
//   2026년 반영: 인플루엔자 3가 백신 전환, HPV 남아(만 12세) 확대,
//   로타바이러스 모든 접종 생후 8개월 0일 전 완료.
//   * 실제 접종 시기는 아이 상태·백신 종류(예: 로타릭스 2회/로타텍 3회)에 따라
//     달라질 수 있으므로 정확한 일정은 예방접종도우미(nip.kdca.go.kr) 확인.
//
// ageMonths: 접종 권장 개월 수(스케줄 기준일 계산용). 범위 접종은 시작 시점 기준.

import { addMonths } from "./date";

export interface VaccineDose {
  vaccine: string; // 백신명
  abbr: string; // 약어
  dose: string; // 회차/구분
  ageMonths: number; // 권장 개월 수(기준일 계산)
  ageLabel: string; // 표시용 시기
  note?: string;
}

export const VACCINE_SCHEDULE: VaccineDose[] = [
  { vaccine: "B형간염", abbr: "HepB", dose: "1차", ageMonths: 0, ageLabel: "출생 직후" },
  { vaccine: "결핵", abbr: "BCG", dose: "1회", ageMonths: 0, ageLabel: "생후 4주 이내" },
  { vaccine: "B형간염", abbr: "HepB", dose: "2차", ageMonths: 1, ageLabel: "생후 1개월" },
  { vaccine: "디프테리아·파상풍·백일해", abbr: "DTaP", dose: "1차", ageMonths: 2, ageLabel: "생후 2개월" },
  { vaccine: "폴리오", abbr: "IPV", dose: "1차", ageMonths: 2, ageLabel: "생후 2개월" },
  { vaccine: "b형헤모필루스인플루엔자", abbr: "Hib", dose: "1차", ageMonths: 2, ageLabel: "생후 2개월" },
  { vaccine: "폐렴구균", abbr: "PCV", dose: "1차", ageMonths: 2, ageLabel: "생후 2개월" },
  { vaccine: "로타바이러스", abbr: "RV", dose: "1차", ageMonths: 2, ageLabel: "생후 2개월", note: "생후 8개월 0일 전 완료" },
  { vaccine: "디프테리아·파상풍·백일해", abbr: "DTaP", dose: "2차", ageMonths: 4, ageLabel: "생후 4개월" },
  { vaccine: "폴리오", abbr: "IPV", dose: "2차", ageMonths: 4, ageLabel: "생후 4개월" },
  { vaccine: "b형헤모필루스인플루엔자", abbr: "Hib", dose: "2차", ageMonths: 4, ageLabel: "생후 4개월" },
  { vaccine: "폐렴구균", abbr: "PCV", dose: "2차", ageMonths: 4, ageLabel: "생후 4개월" },
  { vaccine: "로타바이러스", abbr: "RV", dose: "2차", ageMonths: 4, ageLabel: "생후 4개월", note: "생후 8개월 0일 전 완료" },
  { vaccine: "디프테리아·파상풍·백일해", abbr: "DTaP", dose: "3차", ageMonths: 6, ageLabel: "생후 6개월" },
  { vaccine: "폴리오", abbr: "IPV", dose: "3차", ageMonths: 6, ageLabel: "생후 6~18개월" },
  { vaccine: "b형헤모필루스인플루엔자", abbr: "Hib", dose: "3차", ageMonths: 6, ageLabel: "생후 6개월" },
  { vaccine: "폐렴구균", abbr: "PCV", dose: "3차", ageMonths: 6, ageLabel: "생후 6개월" },
  { vaccine: "B형간염", abbr: "HepB", dose: "3차", ageMonths: 6, ageLabel: "생후 6개월" },
  { vaccine: "인플루엔자", abbr: "IIV", dose: "매년", ageMonths: 6, ageLabel: "생후 6개월~ 매년", note: "2026 절기부터 3가 백신" },
  { vaccine: "홍역·유행성이하선염·풍진", abbr: "MMR", dose: "1차", ageMonths: 12, ageLabel: "생후 12~15개월" },
  { vaccine: "수두", abbr: "VAR", dose: "1회", ageMonths: 12, ageLabel: "생후 12~15개월" },
  { vaccine: "b형헤모필루스인플루엔자", abbr: "Hib", dose: "4차(추가)", ageMonths: 12, ageLabel: "생후 12~15개월" },
  { vaccine: "폐렴구균", abbr: "PCV", dose: "4차(추가)", ageMonths: 12, ageLabel: "생후 12~15개월" },
  { vaccine: "A형간염", abbr: "HepA", dose: "1차", ageMonths: 12, ageLabel: "생후 12~23개월" },
  { vaccine: "일본뇌염", abbr: "IJEV/LJEV", dose: "1차", ageMonths: 12, ageLabel: "생후 12~23개월", note: "불활성화(5회)·약독화 생백신(2회) 중 선택" },
  { vaccine: "A형간염", abbr: "HepA", dose: "2차", ageMonths: 18, ageLabel: "1차 후 6개월" },
  { vaccine: "디프테리아·파상풍·백일해", abbr: "DTaP", dose: "4차(추가)", ageMonths: 15, ageLabel: "생후 15~18개월" },
  { vaccine: "일본뇌염", abbr: "IJEV/LJEV", dose: "2차", ageMonths: 24, ageLabel: "생후 24~35개월", note: "백신 종류별 상이" },
  { vaccine: "디프테리아·파상풍·백일해", abbr: "DTaP", dose: "5차(추가)", ageMonths: 48, ageLabel: "만 4~6세" },
  { vaccine: "폴리오", abbr: "IPV", dose: "4차(추가)", ageMonths: 48, ageLabel: "만 4~6세" },
  { vaccine: "홍역·유행성이하선염·풍진", abbr: "MMR", dose: "2차", ageMonths: 48, ageLabel: "만 4~6세" },
  { vaccine: "파상풍·디프테리아(·백일해)", abbr: "Td/Tdap", dose: "6차(추가)", ageMonths: 132, ageLabel: "만 11~12세" },
  { vaccine: "일본뇌염", abbr: "IJEV", dose: "추가", ageMonths: 144, ageLabel: "만 12세", note: "불활성화 백신 접종 시" },
  { vaccine: "사람유두종바이러스", abbr: "HPV", dose: "1~2차", ageMonths: 144, ageLabel: "만 12세(남녀)", note: "2026년 남아 확대" },
];

export interface ScheduledDose extends VaccineDose {
  date: Date; // 권장 접종일 (생년월일 + ageMonths)
}

/** 생년월일 기준 표준 접종 일정(권장 접종일 계산, 시기 순 정렬) */
export function calcVaccineSchedule(birth: Date): ScheduledDose[] {
  return VACCINE_SCHEDULE.map((v) => ({
    ...v,
    date: addMonths(birth, v.ageMonths),
  })).sort((a, b) => a.ageMonths - b.ageMonths);
}
