// 포지션별 역할 옵션
export const ROLE_OPTIONS = {
  GK: ['스위퍼 키퍼', '클래식 키퍼'],
  CB: ['볼 플레잉 빌드업', '파이터형 센터백', '커버러', '리베로'],
  LB: ['인버티드 풀백', '완성형 윙백', '윙백', '풀백'],
  RB: ['인버티드 풀백', '완성형 윙백', '윙백', '풀백'],
  LWB: ['완성형 윙백', '공격적 윙백', '인버티드 윙백'],
  RWB: ['완성형 윙백', '공격적 윙백', '인버티드 윙백'],
  CDM: ['레지스타', '딥라잉 플레이메이커', '앵커맨', '볼 위닝 MF', '하프백'],
  CM: ['박스 투 박스', '어드밴스드 플레이메이커', '중앙 미드필더'],
  LM: ['측면 플레이메이커', '와이드 타겟맨', '윙어', '인버티드 윙어'],
  RM: ['측면 플레이메이커', '와이드 타겟맨', '윙어', '인버티드 윙어'],
  AM: ['트레콰르티스타', '엔간체', '섀도우 스트라이커', '공격형 미드필더'],
  LW: ['인버티드 윙어', '연계형 윙어', '인사이드 포워드', '크랙'],
  RW: ['인버티드 윙어', '연계형 윙어', '인사이드 포워드', '크랙'],
  ST: ['딥라잉 포워드', '타겟맨', '포처', '펄스 나인', '완성형 포워드']
};

// 초기 포메이션
export const INITIAL_HOME = [
  { id: 1, top: 92, left: 50, detail: '스위퍼 키퍼' },
  { id: 2, top: 82, left: 15, detail: '인버티드 풀백' },
  { id: 3, top: 85, left: 38, detail: '볼 플레잉 빌드업' },
  { id: 4, top: 85, left: 62, detail: '커버러' },
  { id: 5, top: 82, left: 85, detail: '인버티드 풀백' },
  { id: 6, top: 70, left: 50, detail: '앵커맨' },
  { id: 7, top: 65, left: 30, detail: '박스 투 박스' },
  { id: 8, top: 65, left: 70, detail: '박스 투 박스' },
  { id: 9, top: 56, left: 15, detail: '인사이드 포워드' },
  { id: 10, top: 52, left: 50, detail: '펄스 나인' },
  { id: 11, top: 56, left: 85, detail: '인사이드 포워드' }
];

export const INITIAL_AWAY = [
  { id: 1, top: 8, left: 50 },
  { id: 2, top: 18, left: 85 },
  { id: 3, top: 15, left: 62 },
  { id: 4, top: 15, left: 38 },
  { id: 5, top: 18, left: 15 },
  { id: 6, top: 30, left: 50 },
  { id: 7, top: 35, left: 70 },
  { id: 8, top: 35, left: 30 },
  { id: 9, top: 44, left: 80 },
  { id: 10, top: 48, left: 50 },
  { id: 11, top: 44, left: 20 }
];

// 전술 타입
export const TACTICS = {
  NONE: 'none',
  LAVOLPIANA: 'lavolpiana',
  COUNTER: 'counter',
  GEGEN_ATTACK: 'gegen_attack',
  GEGEN_PRESS: 'gegen_press'
};
