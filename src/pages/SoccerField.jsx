import React, { useState, useRef, useCallback } from 'react';

const ROLE_OPTIONS = {
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

// 기본 포메이션 (4-3-3)
const INITIAL_HOME = [
  { id: 1, top: 92, left: 50, detail: '스위퍼 키퍼' },
  { id: 2, top: 82, left: 15, detail: '인버티드 풀백' }, 
  { id: 3, top: 85, left: 38, detail: '볼 플레잉 빌드업' }, 
  { id: 4, top: 85, left: 62, detail: '커버러' }, 
  { id: 5, top: 82, left: 85, detail: '인버티드 풀백' },
  { id: 6, top: 70, left: 50, detail: '앵커맨' }, 
  { id: 7, top: 65, left: 30, detail: '박스 투 박스' }, 
  { id: 8, top: 65, left: 70, detail: '박스 투 박스' },
  { id: 9, top: 56, left: 15, detail: '인사이드 포워드' }, 
  { id: 10, top: 52, left: 50, detail: '펄스 나인' }, // ST는 공(50)보다 뒤
  { id: 11, top: 56, left: 85, detail: '인사이드 포워드' }
];

const INITIAL_AWAY = [
  { id: 1, top: 8, left: 50 },
  { id: 2, top: 18, left: 85 }, { id: 3, top: 15, left: 62 }, 
  { id: 4, top: 15, left: 38 }, { id: 5, top: 18, left: 15 },
  { id: 6, top: 30, left: 50 }, { id: 7, top: 35, left: 70 }, 
  { id: 8, top: 35, left: 30 },
  { id: 9, top: 44, left: 80 }, { id: 10, top: 48, left: 50 }, 
  { id: 11, top: 44, left: 20 }
];

const SoccerField = () => {
  const [homePlayers, setHomePlayers] = useState(INITIAL_HOME);
  const [awayPlayers, setAwayPlayers] = useState(INITIAL_AWAY);
  const [prevHome, setPrevHome] = useState(INITIAL_HOME);
  const [ball, setBall] = useState({ top: 50, left: 50 });
  const [tactic, setTactic] = useState('none');
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [isMoving, setIsMoving] = useState(false);
  
  const boardRef = useRef(null);
  const draggingId = useRef(null);

  const calculatePos = useCallback((top, left, id) => {
    if (id === 1) return 'GK';
    if (id === 2) return 'LB'; 
    if (id === 5) return 'RB';
    if (id === 3 || id === 4) return 'CB';
    if (id === 6) return 'CDM'; 
    if (id === 7 || id === 8) return 'CM';
    if (id === 9) return 'LW'; 
    if (id === 11) return 'RW';
    if (id === 10) return 'ST';
    return 'SUB';
  }, []);

  const applyTactic = (type) => {
    setPrevHome([...homePlayers]);
    setTactic(type);
    setIsMoving(true);

    let nextHome = INITIAL_HOME.map(p => ({ ...p }));
    let nextBall = { top: 50, left: 50 };

    if (type === 'lavolpiana') {
      // 라볼피아나 빌드업 - CDM이 공을 받아서 빌드업 시작
      nextHome = nextHome.map(p => {
        if (p.id === 1) return { ...p, top: 96, detail: '스위퍼 키퍼' };
        if (p.id === 6) return { ...p, top: 88, left: 50, detail: '레지스타' }; // CDM이 공을 받음
        if (p.id === 3) return { ...p, top: 88, left: 30, detail: '볼 플레잉 빌드업' };
        if (p.id === 4) return { ...p, top: 88, left: 70, detail: '볼 플레잉 빌드업' };
        if (p.id === 2) return { ...p, top: 65, left: 10, detail: '인버티드 풀백' };
        if (p.id === 5) return { ...p, top: 65, left: 90, detail: '인버티드 풀백' };
        return p;
      });
      // 공은 CDM(6번) 발 밑에
      nextBall = { top: 88, left: 50 };
    } 
    else if (type === 'counter') {
      // 역습 상황 - 중원에서 공을 뺏고 빠르게 전진
      nextHome = nextHome.map(p => {
        // 공격수들은 이미 전진
        if (p.id === 9) return { ...p, top: 35, left: 15, detail: '인사이드 포워드' };
        if (p.id === 10) return { ...p, top: 32, left: 50, detail: '완성형 포워드' };
        if (p.id === 11) return { ...p, top: 35, left: 85, detail: '인사이드 포워드' };
        
        // 미드필더 중 한 명이 공을 잡고 전진 패스 준비
        if (p.id === 7) return { ...p, top: 55, left: 40 }; // 이 선수가 공을 가짐
        if (p.id === 8) return { ...p, top: 58, left: 65 };
        if (p.id === 6) return { ...p, top: 68, left: 50 };
        
        // 수비수들은 안정적 위치
        return { ...p, top: Math.min(94, p.top + 8) };
      });
      // 공은 CM(7번) 발 밑 - 역습 시작 지점
      nextBall = { top: 55, left: 40 };
    }
    else if (type === 'gegen_attack') {
      // 🔥 공격 시 게겐프레싱 (Rest Defence)
      // 공격 중이지만 공 뺏겼을 때를 대비한 구조
      // 핵심: 3-2 수비 구조 유지 + 인버티드 풀백 + 높은 라인
      
      nextHome = nextHome.map(p => {
        // GK: 높은 위치 (상대 롱볼 대비)
        if (p.id === 1) return { ...p, top: 85, detail: '스위퍼 키퍼' };
        
        // CB 라인: 높은 수비 라인 (하프라인 근처)
        // 오프사이드 트랩 가능, 압박 거리 단축
        if (p.id === 3) return { ...p, top: 68, left: 35, detail: '볼 플레잉 빌드업' };
        if (p.id === 4) return { ...p, top: 68, left: 65, detail: '커버러' };
        
        // CDM: Rest Defence의 핵심 - 수비 밸런스 담당
        if (p.id === 6) return { ...p, top: 60, left: 50, detail: '앵커맨' };
        
        // 인버티드 풀백: 중앙으로 이동하여 3-2 구조 완성
        // 공 잃으면 즉시 압박 참여 가능한 위치
        if (p.id === 2) return { ...p, top: 60, left: 28, detail: '인버티드 풀백' };
        if (p.id === 5) return { ...p, top: 60, left: 72, detail: '인버티드 풀백' };
        
        // CM: 공격 가담하되 좁은 간격 유지
        if (p.id === 7) return { ...p, top: 40, left: 35 };
        if (p.id === 8) return { ...p, top: 40, left: 65 };
        
        // 공격수들: 수적 우위 확보하되 압박 준비
        // ST가 공을 받을 준비 (공보다 약간 뒤)
        if (p.id === 10) return { ...p, top: 22, left: 50, detail: '펄스 나인' };
        if (p.id === 9) return { ...p, top: 28, left: 10, detail: '인사이드 포워드' };
        if (p.id === 11) return { ...p, top: 28, left: 90, detail: '인사이드 포워드' };
        
        return p;
      });
      
      // 공은 CM이 전진 패스 준비 중 (상대 진영)
      nextBall = { top: 20, left: 50 };
    }
    else if (type === 'gegen_press') {
      // 🔥 수비 시 게겐프레싱 (Counter-Pressing / Swarming)
      // 공 뺏긴 직후 3-5초 내 즉각 압박
      // 핵심: 공 중심 압박 + 패스 길목 차단 + 선수 간 좁은 간격
      
      const ballPos = { top: 35, left: 40 }; // 우리팀이 중원에서 공 뺏긴 위치
      
      nextHome = nextHome.map(p => {
        // GK: 안정적 위치 유지
        if (p.id === 1) return { ...p, top: 88, detail: '스위퍼 키퍼' };
        
        // 🎯 1차 압박 그룹 (공 주변 3명이 즉시 압박)
        // ST: 공을 가진 선수에게 직접 압박 (공보다 뒤에서 압박)
        if (p.id === 10) return { 
          ...p, 
          top: ballPos.top + 5, 
          left: ballPos.left,
          detail: '펄스 나인' 
        };
        
        // LW: 상대의 오른쪽 패스 경로 차단
        if (p.id === 9) return { 
          ...p, 
          top: ballPos.top + 3, 
          left: ballPos.left - 15,
          detail: '인사이드 포워드' 
        };
        
        // CM(좌): 상대의 후방 패스 길목 차단
        if (p.id === 7) return { 
          ...p, 
          top: ballPos.top + 10, 
          left: ballPos.left + 5 
        };
        
        // 🛡️ 2차 압박 그룹 (공간 커버 + 백업 압박)
        // RW: 반대편 측면 커버
        if (p.id === 11) return { ...p, top: 40, left: 80 };
        
        // CM(우): 중앙 패스 차단
        if (p.id === 8) return { ...p, top: 48, left: 65 };
        
        // CDM: 중앙 공간 커버 + 압박 백업
        if (p.id === 6) return { ...p, top: 58, left: 50, detail: '볼 위닝 MF' };
        
        // 🔒 수비 라인: 압박 실패 시 대비 (높지만 안정적)
        // 너무 전진하지 않고 압박과 적절한 거리 유지
        if (p.id === 2) return { ...p, top: 68, left: 18, detail: '풀백' };
        if (p.id === 3) return { ...p, top: 72, left: 38, detail: '파이터형 센터백' };
        if (p.id === 4) return { ...p, top: 72, left: 62, detail: '커버러' };
        if (p.id === 5) return { ...p, top: 68, left: 82, detail: '풀백' };
        
        return p;
      });
      
      // 공은 상대가 소유 (우리가 뺏긴 위치)
      nextBall = ballPos;
    }

    setHomePlayers(nextHome);
    setBall(nextBall);
    setTimeout(() => setIsMoving(false), 2000);
  };

  const handleMouseDown = (e, p) => { 
    draggingId.current = p.id; 
    setSelectedPlayer(p); 
  };

  const handleMouseMove = useCallback((e) => {
    if (!draggingId.current || !boardRef.current) return;
    const rect = boardRef.current.getBoundingClientRect();
    setHomePlayers(prev => prev.map(p => 
      p.id === draggingId.current 
        ? { 
            ...p, 
            top: ((e.clientY - rect.top) / rect.height) * 100, 
            left: ((e.clientX - rect.left) / rect.width) * 100 
          } 
        : p
    ));
  }, []);

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen bg-[#020617] text-white p-4 gap-8 select-none"
         onMouseMove={handleMouseMove} 
         onMouseUp={() => draggingId.current = null}>
      
      <div className="flex flex-col items-center">
        <div className="mb-6 flex flex-col items-center">
          <div className="text-emerald-400 text-[10px] font-black tracking-widest uppercase mb-1">
            Professional Tactical Board
          </div>
          <div className="text-4xl font-black italic tracking-tighter uppercase">
            Match <span className="text-blue-500">Analysis</span>
          </div>
        </div>

        <div ref={boardRef} className="relative w-[340px] sm:w-[520px] aspect-[3/4] bg-[#14532d] rounded-[2.5rem] border-[12px] border-slate-800 shadow-2xl overflow-hidden">
          {/* Field lines */}
          <div className="absolute inset-0 opacity-20 pointer-events-none" 
               style={{ backgroundImage: 'repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 10%)' }} />
          <div className="absolute top-1/2 w-full h-0.5 bg-white/30 z-10" />
          <div className="absolute top-1/2 left-1/2 w-32 h-32 border border-white/30 rounded-full -translate-x-1/2 -translate-y-1/2 z-10" />

          {/* Movement arrows */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
            <defs>
              <marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
                <path d="M0,0 L10,5 L0,10 Z" fill="rgba(255,255,255,0.4)" />
              </marker>
            </defs>
            {isMoving && homePlayers.map((p, i) => {
              const start = prevHome[i];
              if (!start) return null;
              if (Math.abs(start.top - p.top) < 1 && Math.abs(start.left - p.left) < 1) return null;
              return (
                <line 
                  key={`path-${p.id}`} 
                  x1={`${start.left}%`} 
                  y1={`${start.top}%`} 
                  x2={`${p.left}%`} 
                  y2={`${p.top}%`} 
                  stroke="rgba(255,255,255,0.3)" 
                  strokeWidth="2" 
                  strokeDasharray="5,5" 
                  markerEnd="url(#arrow)" 
                />
              );
            })}
          </svg>

          {/* Ball */}
          <div className="absolute w-5 h-5 bg-white rounded-full shadow-2xl z-40 transition-all duration-[2000ms] ease-in-out"
               style={{ 
                 top: `${ball.top}%`, 
                 left: `${ball.left}%`, 
                 transform: 'translate(-50%, -50%)', 
                 border: '2px solid #222' 
               }} />

          {/* Away team */}
          {awayPlayers.map(p => (
            <div 
              key={`away-${p.id}`} 
              className="absolute w-7 h-7 bg-red-600 rounded-full border border-white/30 flex items-center justify-center text-[10px] font-bold z-20 shadow-lg"
              style={{ 
                top: `${p.top}%`, 
                left: `${p.left}%`, 
                transform: 'translate(-50%, -50%)' 
              }}>
              {p.id}
            </div>
          ))}

          {/* Home team */}
          {homePlayers.map(p => {
            const pos = calculatePos(p.top, p.left, p.id);
            return (
              <div 
                key={`home-${p.id}`} 
                onMouseDown={(e) => handleMouseDown(e, p)}
                className={`absolute flex flex-col items-center cursor-grab active:cursor-grabbing ${
                  draggingId.current === p.id ? 'z-50' : 'z-30 transition-all duration-[2000ms] ease-in-out'
                }`}
                style={{ 
                  top: `${p.top}%`, 
                  left: `${p.left}%`, 
                  transform: 'translate(-50%, -50%)' 
                }}>
                <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 flex items-center justify-center font-black text-sm shadow-xl ${
                  selectedPlayer?.id === p.id 
                    ? 'bg-yellow-400 border-white text-black' 
                    : 'bg-blue-600 border-white text-white'
                }`}>
                  {p.id}
                </div>
                <div className="mt-1 bg-black/80 px-2 py-0.5 rounded text-[9px] font-black border border-white/10 uppercase text-emerald-400">
                  {pos}
                </div>
                {/* Role label */}
                {p.detail && (
                  <div className="mt-0.5 bg-blue-900/90 px-1.5 py-0.5 rounded text-[7px] font-bold text-blue-200 max-w-[80px] text-center truncate">
                    {p.detail}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Tactic buttons */}
        <div className="mt-8 w-full space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => applyTactic('lavolpiana')} 
              className={`py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                tactic === 'lavolpiana' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'
              }`}>
              Lavolpiana
            </button>
            <button 
              onClick={() => applyTactic('counter')} 
              className={`py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                tactic === 'counter' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'
              }`}>
              Counter
            </button>
          </div>
          
          {/* Gegenpressing buttons with description */}
          <div className="space-y-2">
            <button 
              onClick={() => applyTactic('gegen_attack')} 
              className={`w-full py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                tactic === 'gegen_attack' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
              }`}>
              🟢 Gegen (공격 시)
            </button>
            <div className="text-[8px] text-slate-500 px-2 leading-relaxed">
              공격 중 수비 구조 • Rest Defence • 인버티드 풀백 • 높은 라인
            </div>
          </div>

          <div className="space-y-2">
            <button 
              onClick={() => applyTactic('gegen_press')} 
              className={`w-full py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                tactic === 'gegen_press' ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-400'
              }`}>
              🔴 Gegen (수비 시)
            </button>
            <div className="text-[8px] text-slate-500 px-2 leading-relaxed">
              공 뺏긴 직후 • 3-5초 압박 • 패스 길목 차단 • Swarming
            </div>
          </div>

          <button 
            onClick={() => { 
              setPrevHome([...homePlayers]); 
              setHomePlayers(INITIAL_HOME); 
              setBall({ top: 50, left: 50 });
              setTactic('none'); 
              setIsMoving(true); 
              setTimeout(() => setIsMoving(false), 2000); 
            }} 
            className="w-full py-4 bg-white/5 hover:bg-white/10 rounded-2xl text-xs font-black text-white border border-white/10 transition-all uppercase tracking-widest">
            🔄 Reset Formation
          </button>
        </div>
      </div>

      {/* Player detail panel */}
      <div className={`w-full lg:w-72 bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 shadow-2xl transition-all ${
        selectedPlayer ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0 pointer-events-none'
      }`}>
        {selectedPlayer && (
          <div className="flex flex-col h-full">
            <h3 className="text-2xl font-black italic mb-6">
              PLAYER #{selectedPlayer.id}
            </h3>
            
            <div className="mb-8">
              <label className="text-[10px] font-black text-slate-500 uppercase mb-2 block">
                Current Pos
              </label>
              <div className="text-4xl font-black text-yellow-400 italic">
                {calculatePos(selectedPlayer.top, selectedPlayer.left, selectedPlayer.id)}
              </div>
            </div>

            <div className="mb-4">
              <label className="text-[10px] font-black text-slate-500 uppercase mb-2 block">
                Current Role
              </label>
              <div className="text-sm font-bold text-blue-400">
                {selectedPlayer.detail || '역할 미지정'}
              </div>
            </div>
            
            <div className="space-y-4">
              <label className="text-[10px] font-black text-slate-500 uppercase block">
                Assign Role
              </label>
              <div className="grid gap-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {ROLE_OPTIONS[calculatePos(selectedPlayer.top, selectedPlayer.left, selectedPlayer.id)]?.map(role => (
                  <button 
                    key={role} 
                    onClick={() => {
                      setHomePlayers(prev => prev.map(pl => 
                        pl.id === selectedPlayer.id ? { ...pl, detail: role } : pl
                      ));
                      setSelectedPlayer(curr => ({ ...curr, detail: role }));
                    }} 
                    className={`text-left p-4 rounded-xl text-[10px] font-bold border-2 transition-all ${
                      selectedPlayer.detail === role 
                        ? 'bg-blue-600 border-blue-400 text-white' 
                        : 'bg-slate-800 border-transparent text-slate-500 hover:bg-slate-700'
                    }`}>
                    {role}
                  </button>
                ))}
              </div>
            </div>
            
            <button 
              onClick={() => setSelectedPlayer(null)} 
              className="mt-8 pt-4 text-xs font-bold text-slate-500 hover:text-white transition-colors border-t border-white/5">
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SoccerField;