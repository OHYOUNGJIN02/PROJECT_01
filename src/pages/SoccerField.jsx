import React, { useState, useRef, useCallback, useEffect } from 'react';
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
  { id: 10, top: 52, left: 50, detail: '펄스 나인' },
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
  const [prevAway, setPrevAway] = useState(INITIAL_AWAY);
  const [ball, setBall] = useState({ top: 50, left: 50 });
  const [tactic, setTactic] = useState('none');
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [isMoving, setIsMoving] = useState(false);
  const [pressDirection, setPressDirection] = useState(null);
  const [lockedPlayers, setLockedPlayers] = useState(new Set());
  const [ballOwner, setBallOwner] = useState(null);
  
  const [plannedMoves, setPlannedMoves] = useState([]);
  const [immediateMove, setImmediateMove] = useState(null);
  const [passPreview, setPassPreview] = useState(null);
  
  const boardRef = useRef(null);
  const pressStartPos = useRef(null);
  const pressStartTime = useRef(null);
  const isPressing = useRef(false);
  const pressingPlayerId = useRef(null);
  const pressingBall = useRef(false);

  const getDistance = (pos1, pos2) => {
    const dx = pos1.left - pos2.left;
    const dy = pos1.top - pos2.top;
    return Math.sqrt(dx * dx + dy * dy);
  };

  useEffect(() => {
    if (isMoving || pressingBall.current) return;

    const PICKUP_DISTANCE = 4;
    
    for (const player of homePlayers) {
      if (getDistance(player, ball) < PICKUP_DISTANCE) {
        setBallOwner(prev => {
          if (prev?.team === 'home' && prev?.id === player.id) return prev;
          return { team: 'home', id: player.id };
        });
        return;
      }
    }
    
    for (const player of awayPlayers) {
      if (getDistance(player, ball) < PICKUP_DISTANCE) {
        setBallOwner(prev => {
          if (prev?.team === 'away' && prev?.id === player.id) return prev;
          return { team: 'away', id: player.id };
        });
        return;
      }
    }
    
    setBallOwner(prev => prev ? null : prev);
  }, [ball.top, ball.left, homePlayers, awayPlayers, isMoving]);

  useEffect(() => {
    if (!ballOwner || pressingBall.current || isMoving) return;
    
    if (ballOwner.team === 'home') {
      const owner = homePlayers.find(p => p.id === ballOwner.id);
      if (owner && (Math.abs(ball.top - owner.top) > 0.1 || Math.abs(ball.left - owner.left) > 0.1)) {
        setBall({ top: owner.top, left: owner.left });
      }
    } else {
      const owner = awayPlayers.find(p => p.id === ballOwner.id);
      if (owner && (Math.abs(ball.top - owner.top) > 0.1 || Math.abs(ball.left - owner.left) > 0.1)) {
        setBall({ top: owner.top, left: owner.left });
      }
    }
  }, [homePlayers, awayPlayers, ballOwner, isMoving]);

  const calculatePos = useCallback((top, left, id) => {
    const isLeft = left < 33;
    const isRight = left > 67;
    const isCenter = !isLeft && !isRight;
   
    if (top >= 90) return 'GK';
    else if (top >= 80) {
      if (isLeft) return 'LB';
      if (isRight) return 'RB';
      return 'CB';
    } else if (top >= 70) {
      if (isLeft) return 'LWB';
      if (isRight) return 'RWB';
      return 'CDM';
    } else if (top >= 63) {
      if (isLeft) return 'LM';
      if (isRight) return 'RM';
      return isCenter ? 'CM' : 'AM';
    } else {
      if (isLeft) return 'LW';
      if (isRight) return 'RW';
      return 'ST';
    }
  }, []);

  const getFieldPosition = useCallback((clientX, clientY) => {
    if (!boardRef.current) return null;
    const rect = boardRef.current.getBoundingClientRect();
    return {
      top: ((clientY - rect.top) / rect.height) * 100,
      left: ((clientX - rect.left) / rect.width) * 100
    };
  }, []);

  const handleBallMouseDown = (e) => {
    if (!ballOwner || ballOwner.team !== 'home') return;
    
    e.stopPropagation();
    pressingBall.current = true;
    pressStartTime.current = Date.now();
    pressStartPos.current = getFieldPosition(e.clientX, e.clientY);
  };

  const handlePlayerMouseDown = (e, player) => {
    if (lockedPlayers.has(player.id)) return;
    
    e.stopPropagation();
    isPressing.current = true;
    pressingPlayerId.current = player.id;
    pressStartTime.current = Date.now();
    pressStartPos.current = { top: player.top, left: player.left };
    setSelectedPlayer(player);
  };

  const handleMouseMove = useCallback((e) => {
    const currentPos = getFieldPosition(e.clientX, e.clientY);
    if (!currentPos) return;

    if (pressingBall.current && pressStartPos.current) {
      const pressDuration = Date.now() - pressStartTime.current;
      if (pressDuration > 200) {
        setPassPreview({
          from: { ...ball },
          to: currentPos
        });
      }
    }

    if (isPressing.current && pressingPlayerId.current && pressStartPos.current) {
      const pressDuration = Date.now() - pressStartTime.current;
      if (pressDuration > 200) {
        setPassPreview({
          from: pressStartPos.current,
          to: currentPos,
          isPlayerMove: true,
          isPlanned: pressDuration >= 3000
        });
      }
    }
  }, [ball, getFieldPosition]);

  const handleMouseUp = useCallback((e) => {
    const pressDuration = pressStartTime.current ? Date.now() - pressStartTime.current : 0;
    const endPos = getFieldPosition(e.clientX, e.clientY);

    // 공 패스 실행
    if (pressingBall.current && endPos && pressDuration > 200) {
      setBall(endPos);
      setBallOwner(null);
      setPassPreview(null);
    }

    // 선수 이동 처리
    if (isPressing.current && pressingPlayerId.current && endPos && pressDuration > 200) {
      if (pressDuration < 3000) {
        // 3초 미만: 즉시 이동
        setImmediateMove({
          playerId: pressingPlayerId.current,
          from: pressStartPos.current,
          to: endPos
        });
        setPassPreview(null);
        
        setHomePlayers(prev => prev.map(p =>
          p.id === pressingPlayerId.current ? { ...p, top: endPos.top, left: endPos.left } : p
        ));
        
        setTimeout(() => {
          setImmediateMove(null);
        }, 500);
      } else {
        // 3초 이상: 계획된 이동으로 저장
        console.log('🎯 계획된 이동 추가:', {
          playerId: pressingPlayerId.current,
          from: pressStartPos.current,
          to: endPos
        });
        
        setPlannedMoves(prev => {
          const filtered = prev.filter(m => m.playerId !== pressingPlayerId.current);
          const newMove = {
            playerId: pressingPlayerId.current,
            from: { ...pressStartPos.current },
            to: { ...endPos },
            playerName: `#${pressingPlayerId.current}`
          };
          console.log('✅ 새 계획:', newMove);
          return [...filtered, newMove];
        });
        setPassPreview(null);
      }
    }

    // 초기화
    pressingBall.current = false;
    isPressing.current = false;
    pressingPlayerId.current = null;
    pressStartTime.current = null;
    pressStartPos.current = null;
    setPassPreview(null);
  }, [getFieldPosition]);

  const executePlannedMoves = () => {
    if (plannedMoves.length === 0) return;

    console.log('▶️ 계획된 이동 실행:', plannedMoves);

    setPrevHome([...homePlayers]);
    setIsMoving(true);

    setHomePlayers(prev => {
      let updated = [...prev];
      plannedMoves.forEach(move => {
        console.log(`🏃 선수 #${move.playerId} 이동:`, move.from, '→', move.to);
        updated = updated.map(p =>
          p.id === move.playerId ? { ...p, top: move.to.top, left: move.to.left } : p
        );
      });
      return updated;
    });

    setTimeout(() => {
      setIsMoving(false);
      setPlannedMoves([]);
    }, 2000);
  };

  const clearPlannedMoves = () => {
    setPlannedMoves([]);
  };

  const removePlannedMove = (playerId) => {
    setPlannedMoves(prev => prev.filter(m => m.playerId !== playerId));
  };

  const applyTactic = (type) => {
    setPrevHome([...homePlayers]);
    setPrevAway([...awayPlayers]);
    setTactic(type);
    setIsMoving(true);
    setPressDirection(null);
    setBallOwner(null);
    setPassPreview(null);
    setPlannedMoves([]);
    setImmediateMove(null);

    let nextHome = INITIAL_HOME.map(p => ({ ...p }));
    let nextAway = INITIAL_AWAY.map(p => ({ ...p }));
    let nextBall = { top: 50, left: 50 };

    if (type === 'lavolpiana') {
      nextHome = nextHome.map(p => {
        if (p.id === 1) return { ...p, top: 96, detail: '스위퍼 키퍼' };
        if (p.id === 6) return { ...p, top: 88, left: 50, detail: '레지스타' };
        if (p.id === 3) return { ...p, top: 88, left: 30, detail: '볼 플레잉 빌드업' };
        if (p.id === 4) return { ...p, top: 88, left: 70, detail: '볼 플레잉 빌드업' };
        if (p.id === 2) return { ...p, top: 65, left: 10, detail: '인버티드 풀백' };
        if (p.id === 5) return { ...p, top: 65, left: 90, detail: '인버티드 풀백' };
        return p;
      });
      nextBall = { top: 88, left: 50 };
      setBallOwner({ team: 'home', id: 6 });
      nextAway = INITIAL_AWAY;
    }
    else if (type === 'counter') {
      nextHome = nextHome.map(p => {
        if (p.id === 9) return { ...p, top: 35, left: 15, detail: '인사이드 포워드' };
        if (p.id === 10) return { ...p, top: 32, left: 50, detail: '완성형 포워드' };
        if (p.id === 11) return { ...p, top: 35, left: 85, detail: '인사이드 포워드' };
        if (p.id === 7) return { ...p, top: 55, left: 40 };
        if (p.id === 8) return { ...p, top: 58, left: 65 };
        if (p.id === 6) return { ...p, top: 68, left: 50 };
        return { ...p, top: Math.min(94, p.top + 8) };
      });
      nextBall = { top: 55, left: 40 };
      setBallOwner({ team: 'home', id: 7 });
      nextAway = INITIAL_AWAY;
    }
    else if (type === 'gegen_attack') {
      nextHome = nextHome.map(p => {
        if (p.id === 1) return { ...p, top: 85, detail: '스위퍼 키퍼' };
        if (p.id === 3) return { ...p, top: 68, left: 35, detail: '볼 플레잉 빌드업' };
        if (p.id === 4) return { ...p, top: 68, left: 65, detail: '커버러' };
        if (p.id === 6) return { ...p, top: 60, left: 50, detail: '앵커맨' };
        if (p.id === 2) return { ...p, top: 60, left: 28, detail: '인버티드 풀백' };
        if (p.id === 5) return { ...p, top: 60, left: 72, detail: '인버티드 풀백' };
        if (p.id === 7) return { ...p, top: 40, left: 35 };
        if (p.id === 8) return { ...p, top: 40, left: 65 };
        if (p.id === 10) return { ...p, top: 22, left: 50, detail: '펄스 나인' };
        if (p.id === 9) return { ...p, top: 28, left: 10, detail: '인사이드 포워드' };
        if (p.id === 11) return { ...p, top: 28, left: 90, detail: '인사이드 포워드' };
        return p;
      });
      nextBall = { top: 20, left: 50 };
      nextAway = INITIAL_AWAY;
    }
    else if (type === 'gegen_press') {
      const ballPos = { top: 62, left: 35 };
      nextAway = [
        { id: 1, top: 8, left: 50 },
        { id: 2, top: 50, left: 15 },
        { id: 3, top: 48, left: 35 },
        { id: 4, top: 48, left: 65 },
        { id: 5, top: 50, left: 85 },
        { id: 6, top: 58, left: 50 },
        { id: 7, top: ballPos.top, left: ballPos.left },
        { id: 8, top: 60, left: 65 },
        { id: 9, top: 68, left: 20 },
        { id: 10, top: 72, left: 50 },
        { id: 11, top: 68, left: 80 }
      ];
      nextHome = nextHome.map(p => {
        if (p.id === 1) return { ...p, top: 88, detail: '스위퍼 키퍼' };
        if (p.id === 10) return { ...p, top: ballPos.top + 8, left: ballPos.left - 3, detail: '포처' };
        if (p.id === 9) return { ...p, top: ballPos.top + 5, left: ballPos.left - 18, detail: '인사이드 포워드' };
        if (p.id === 7) return { ...p, top: ballPos.top + 12, left: ballPos.left + 8 };
        if (p.id === 11) return { ...p, top: 65, left: 78 };
        if (p.id === 8) return { ...p, top: 70, left: 60 };
        if (p.id === 6) return { ...p, top: 75, left: 48, detail: '볼 위닝 MF' };
        if (p.id === 2) return { ...p, top: 78, left: 20, detail: '풀백' };
        if (p.id === 3) return { ...p, top: 80, left: 38, detail: '파이터형 센터백' };
        if (p.id === 4) return { ...p, top: 80, left: 62, detail: '커버러' };
        if (p.id === 5) return { ...p, top: 78, left: 80, detail: '풀백' };
        return p;
      });
      nextBall = ballPos;
      setBallOwner({ team: 'away', id: 7 });
      setPressDirection({
        from: ballPos,
        to: { top: ballPos.top + 5, left: 10 },
        label: '측면으로 몰기'
      });
    }

    setHomePlayers(nextHome);
    setAwayPlayers(nextAway);
    setBall(nextBall);
    setTimeout(() => {
      setIsMoving(false);
      if (type !== 'gegen_press') setPressDirection(null);
    }, 2000);
  };

  const toggleLock = (playerId) => {
    setLockedPlayers(prev => {
      const newSet = new Set(prev);
      if (newSet.has(playerId)) {
        newSet.delete(playerId);
      } else {
        newSet.add(playerId);
      }
      return newSet;
    });
  };

  // 🆕 현재 선수 위치 가져오기 (계획 표시용)
  const getPlayerCurrentPosition = (playerId) => {
    const player = homePlayers.find(p => p.id === playerId);
    return player ? { top: player.top, left: player.left } : null;
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen bg-[#020617] text-white p-4 gap-8 select-none"
         onMouseMove={handleMouseMove}
         onMouseUp={handleMouseUp}>
     
      <div className="flex flex-col items-center">
        <div className="mb-6 flex flex-col items-center">
          <div className="text-emerald-400 text-[10px] font-black tracking-widest uppercase mb-1">
            Professional Tactical Board
          </div>
          <div className="text-4xl font-black italic tracking-tighter uppercase">
            Match <span className="text-blue-500">Analysis</span>
          </div>
        </div>

        <div 
          ref={boardRef} 
          className="relative w-[340px] sm:w-[520px] aspect-[3/4] bg-[#14532d] rounded-[2.5rem] border-[12px] border-slate-800 shadow-2xl overflow-hidden"
        >
          <div className="absolute inset-0 opacity-20 pointer-events-none"
               style={{ backgroundImage: 'repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 10%)' }} />
          <div className="absolute top-1/2 w-full h-0.5 bg-white/30 z-10" />
          <div className="absolute top-1/2 left-1/2 w-32 h-32 border border-white/30 rounded-full -translate-x-1/2 -translate-y-1/2 z-10" />
         
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
            <defs>
              <marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
                <path d="M0,0 L10,5 L0,10 Z" fill="rgba(255,255,255,0.4)" />
              </marker>
              <marker id="press-arrow" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto">
                <path d="M0,0 L12,6 L0,12 Z" fill="#ef4444" />
              </marker>
              <marker id="pass-arrow" markerWidth="14" markerHeight="14" refX="12" refY="7" orient="auto">
                <path d="M0,0 L14,7 L0,14 Z" fill="#22c55e" />
              </marker>
              <marker id="move-arrow" markerWidth="14" markerHeight="14" refX="12" refY="7" orient="auto">
                <path d="M0,0 L14,7 L0,14 Z" fill="#3b82f6" />
              </marker>
              <marker id="planned-arrow" markerWidth="14" markerHeight="14" refX="12" refY="7" orient="auto">
                <path d="M0,0 L14,7 L0,14 Z" fill="#f59e0b" />
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
           
            {pressDirection && (
              <g>
                <line
                  x1={`${pressDirection.from.left}%`}
                  y1={`${pressDirection.from.top}%`}
                  x2={`${pressDirection.to.left}%`}
                  y2={`${pressDirection.to.top}%`}
                  stroke="#ef4444"
                  strokeWidth="4"
                  strokeDasharray="8,4"
                  markerEnd="url(#press-arrow)"
                  opacity="0.8"
                />
                <text
                  x={`${pressDirection.to.left}%`}
                  y={`${pressDirection.to.top + 3}%`}
                  fill="#ef4444"
                  fontSize="10"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  {pressDirection.label}
                </text>
              </g>
            )}

            {immediateMove && (
              <line
                x1={`${immediateMove.from.left}%`}
                y1={`${immediateMove.from.top}%`}
                x2={`${immediateMove.to.left}%`}
                y2={`${immediateMove.to.top}%`}
                stroke="#3b82f6"
                strokeWidth="3"
                markerEnd="url(#move-arrow)"
                opacity="0.8"
              />
            )}

            {passPreview && (
              <line
                x1={`${passPreview.from.left}%`}
                y1={`${passPreview.from.top}%`}
                x2={`${passPreview.to.left}%`}
                y2={`${passPreview.to.top}%`}
                stroke={passPreview.isPlayerMove ? (passPreview.isPlanned ? "#f59e0b" : "#3b82f6") : "#22c55e"}
                strokeWidth="3"
                strokeDasharray="6,6"
                markerEnd={passPreview.isPlayerMove ? (passPreview.isPlanned ? "url(#planned-arrow)" : "url(#move-arrow)") : "url(#pass-arrow)"}
                opacity="0.8"
                className="animate-pulse"
              />
            )}

            {/* 🆕 계획된 이동 화살표 - 현재 위치에서 시작 */}
            {plannedMoves.map((move, idx) => {
              if (!move || !move.to) return null;
              const currentPos = getPlayerCurrentPosition(move.playerId);
              if (!currentPos) return null;
              
              return (
                <g key={`planned-${idx}`}>
                  <line
                    x1={`${currentPos.left}%`}
                    y1={`${currentPos.top}%`}
                    x2={`${move.to.left}%`}
                    y2={`${move.to.top}%`}
                    stroke="#f59e0b"
                    strokeWidth="3"
                    strokeDasharray="8,4"
                    markerEnd="url(#planned-arrow)"
                    opacity="0.7"
                  />
                  <circle
                    cx={`${move.to.left}%`}
                    cy={`${move.to.top}%`}
                    r="4"
                    fill="#f59e0b"
                    stroke="#fff"
                    strokeWidth="1"
                    opacity="0.8"
                  />
                </g>
              );
            })}
          </svg>

          <div 
            className={`absolute w-5 h-5 bg-white rounded-full shadow-2xl z-40 transition-all duration-300 ${
              ballOwner ? 'ring-4 ring-green-400 ring-opacity-50' : ''
            }`}
            style={{
              top: `${ball.top}%`,
              left: `${ball.left}%`,
              transform: 'translate(-50%, -50%)',
              border: '2px solid #222',
              cursor: ballOwner?.team === 'home' ? 'pointer' : 'default'
            }}
            onMouseDown={handleBallMouseDown}
          />

          {awayPlayers.map(p => (
            <div
              key={`away-${p.id}`}
              className={`absolute w-7 h-7 rounded-full border flex items-center justify-center text-[10px] font-bold shadow-lg ${
                isMoving ? 'transition-all duration-[2000ms] ease-in-out z-20' : 'z-20'
              } ${
                ballOwner?.team === 'away' && ballOwner?.id === p.id
                  ? 'bg-red-400 border-white ring-4 ring-green-400 ring-opacity-50'
                  : 'bg-red-600 border-white/30'
              }`}
              style={{
                top: `${p.top}%`,
                left: `${p.left}%`,
                transform: 'translate(-50%, -50%)'
              }}>
              {p.id}
            </div>
          ))}

          {homePlayers.map(p => {
            const pos = calculatePos(p.top, p.left, p.id);
            const isLocked = lockedPlayers.has(p.id);
            const hasBall = ballOwner?.team === 'home' && ballOwner?.id === p.id;
            const hasPlannedMove = plannedMoves.some(m => m.playerId === p.id);
            
            return (
              <div
                key={`home-${p.id}`}
                onMouseDown={(e) => handlePlayerMouseDown(e, p)}
                className={`absolute flex flex-col items-center ${
                  isLocked ? 'cursor-not-allowed' : 'cursor-pointer'
                } ${
                  isMoving ? 'transition-all duration-[2000ms] ease-in-out z-30' : 'z-30'
                }`}
                style={{
                  top: `${p.top}%`,
                  left: `${p.left}%`,
                  transform: 'translate(-50%, -50%)'
                }}>
                <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 flex items-center justify-center font-black text-sm shadow-xl relative ${
                  selectedPlayer?.id === p.id
                    ? 'bg-yellow-400 border-white text-black'
                    : hasBall
                    ? 'bg-blue-400 border-white text-white ring-4 ring-green-400 ring-opacity-50'
                    : hasPlannedMove
                    ? 'bg-blue-600 border-amber-400 border-4 text-white'
                    : 'bg-blue-600 border-white text-white'
                }`}>
                  {p.id}
                  {isLocked && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center text-[8px]">
                      🔒
                    </div>
                  )}
                </div>
                <div className="mt-1 bg-black/80 px-2 py-0.5 rounded text-[9px] font-black border border-white/10 uppercase text-emerald-400">
                  {pos}
                </div>
                {p.detail && (
                  <div className="mt-0.5 bg-blue-900/90 px-1.5 py-0.5 rounded text-[7px] font-bold text-blue-200 max-w-[80px] text-center truncate">
                    {p.detail}
                  </div>
                )}
              </div>
            );
          })}

          {ballOwner && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-full text-xs font-bold z-50">
              {ballOwner.team === 'home' ? `우리팀 #${ballOwner.id}` : `상대팀 #${ballOwner.id}`} 공 소유
            </div>
          )}

          {(pressingBall.current || isPressing.current) && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/80 text-white px-4 py-2 rounded-full text-xs font-bold z-50 animate-pulse">
              {pressingBall.current 
                ? '🎯 패스 방향 설정 중...' 
                : isPressing.current && pressStartTime.current && Date.now() - pressStartTime.current > 3000 
                ? '📍 이동 위치 저장 중...' 
                : '➡️ 이동 방향 설정 중...'}
            </div>
          )}
        </div>

        <div className="mt-8 w-full space-y-3">
          <div className={`bg-amber-900/30 border-2 rounded-2xl p-4 space-y-3 transition-all ${
            plannedMoves.length > 0 ? 'border-amber-500' : 'border-amber-900/50 opacity-50'
          }`}>
            <div className="text-xs font-bold text-amber-400 mb-2">
              계획된 이동 {plannedMoves.length > 0 && `(${plannedMoves.length}개)`}
            </div>
            
            {plannedMoves.length > 0 && (
              <div className="space-y-2 max-h-32 overflow-y-auto mb-3">
                {plannedMoves.map((move) => (
                  <div key={move.playerId} className="flex items-center justify-between bg-black/30 rounded-lg px-3 py-2">
                    <span className="text-xs text-white">선수 #{move.playerId}</span>
                    <button
                      onClick={() => removePlannedMove(move.playerId)}
                      className="text-xs text-red-400 hover:text-red-300">
                      ✖
                    </button>
                  </div>
                ))}
              </div>
            )}
            
            <div className="flex gap-2">
              <button
                onClick={executePlannedMoves}
                disabled={plannedMoves.length === 0}
                className={`flex-1 py-3 rounded-xl text-xs font-black text-white transition-all ${
                  plannedMoves.length > 0
                    ? 'bg-amber-600 hover:bg-amber-500'
                    : 'bg-amber-900/50 cursor-not-allowed'
                }`}>
                ▶️ 실행
              </button>
              <button
                onClick={clearPlannedMoves}
                disabled={plannedMoves.length === 0}
                className={`flex-1 py-3 rounded-xl text-xs font-black text-white transition-all ${
                  plannedMoves.length > 0
                    ? 'bg-slate-700 hover:bg-slate-600'
                    : 'bg-slate-900/50 cursor-not-allowed'
                }`}>
                ✖️ 취소
              </button>
            </div>
          </div>

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
              공 뺏긴 직후 • 3-5초 압박 • 측면으로 몰기 • Swarming
            </div>
          </div>

          <button
            onClick={() => {
              setPrevHome([...homePlayers]);
              setPrevAway([...awayPlayers]);
              setHomePlayers(INITIAL_HOME);
              setAwayPlayers(INITIAL_AWAY);
              setBall({ top: 50, left: 50 });
              setTactic('none');
              setPressDirection(null);
              setBallOwner(null);
              setPassPreview(null);
              setPlannedMoves([]);
              setImmediateMove(null);
              setIsMoving(true);
              setTimeout(() => setIsMoving(false), 2000);
            }}
            className="w-full py-4 bg-white/5 hover:bg-white/10 rounded-2xl text-xs font-black text-white border border-white/10 transition-all uppercase tracking-widest">
            🔄 Reset Formation
          </button>
        </div>

        <div className="mt-6 bg-slate-800/50 rounded-2xl p-4 text-[10px] text-slate-400 space-y-2 max-w-[340px] sm:max-w-[520px]">
          <div className="font-bold text-white mb-2">조작 가이드</div>
          <div>⚽ <span className="text-green-400">공 패스:</span> 공 길게 누르기 → 화살표로 방향 설정</div>
          <div>🏃 <span className="text-blue-400">즉시 이동:</span> 선수 길게 누르기 (3초 미만) → 화살표 표시 후 이동</div>
          <div>📍 <span className="text-amber-400">계획 이동:</span> 선수 3초 이상 누르기 → 실행 버튼으로 일괄 실행</div>
        </div>
      </div>

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

            <button
              onClick={() => toggleLock(selectedPlayer.id)}
              className={`mb-6 py-3 rounded-xl text-xs font-bold transition-all ${
                lockedPlayers.has(selectedPlayer.id)
                  ? 'bg-yellow-600 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}>
              {lockedPlayers.has(selectedPlayer.id) ? '🔒 포지션 고정됨' : '🔓 포지션 고정'}
            </button>
           
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

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </div>
  );
};

export default SoccerField;