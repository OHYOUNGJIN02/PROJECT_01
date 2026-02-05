import React, { useRef } from 'react';
import { SoccerField } from '../soccer/SoccerField';
import { Player } from '../soccer/Player';
import { Ball } from '../soccer/Ball';
import { ControlPanel } from '../soccer/ControlPanel.jsx';
import { PlayerDetailPanel } from '../soccer/PlayerDetailPanel.jsx';
import { useGameState } from '../../hooks/footballjs/useGameState.js';
import { usePlayerMovement } from '../../hooks//footballjs/usePlayerMovement.js';
import { useTactics } from '../../hooks/footballjs/useTactics.js';

const SoccerTacticsBoard = () => {
  const boardRef = useRef(null);
  
  // 게임 상태 관리
  const {
    homePlayers,
    setHomePlayers,
    awayPlayers,
    setAwayPlayers,
    prevHome,
    setPrevHome,
    prevAway,
    setPrevAway,
    ball,
    setBall,
    tactic,
    setTactic,
    selectedPlayer,
    setSelectedPlayer,
    isMoving,
    setIsMoving,
    pressDirection,
    setPressDirection,
    lockedPlayers,
    toggleLock,
    ballOwner,
    setBallOwner,
    resetFormation
  } = useGameState();

  // 선수/공 이동 관리
  const {
    plannedMoves,
    immediateMove,
    passPreview,
    pressingBall,
    isPressing,
    pressStartTime,
    handleBallMouseDown,
    handlePlayerMouseDown,
    handleMouseMove,
    handleMouseUp,
    executePlannedMoves,
    clearPlannedMoves,
    removePlannedMove
  } = usePlayerMovement(boardRef, ballOwner, setBall, setBallOwner, setHomePlayers);

  // 전술 관리
  const { applyTactic } = useTactics(
    setPrevHome,
    setPrevAway,
    setTactic,
    setIsMoving,
    setPressDirection,
    setBallOwner,
    setHomePlayers,
    setAwayPlayers,
    setBall,
    homePlayers,
    awayPlayers
  );

  // 선수 현재 위치 가져오기
  const getPlayerCurrentPosition = (playerId) => {
    const player = homePlayers.find(p => p.id === playerId);
    return player ? { top: player.top, left: player.left } : null;
  };

  // 역할 변경 핸들러
  const handleRoleChange = (playerId, role) => {
    setHomePlayers(prev => prev.map(pl =>
      pl.id === playerId ? { ...pl, detail: role } : pl
    ));
    setSelectedPlayer(curr => ({ ...curr, detail: role }));
  };

  return (
    <div 
      className="flex flex-col lg:flex-row items-center justify-center min-h-screen bg-[#020617] text-white p-4 gap-8 select-none"
      // 부모 div의 이벤트는 제거하거나 유지해도 되지만, 필드 위에서의 정확한 동작을 위해 SoccerField에 직접 전달합니다.
    >
      <div className="flex flex-col items-center">
        {/* 타이틀 */}
        <div className="mb-6 flex flex-col items-center">
          <div className="text-emerald-400 text-[10px] font-black tracking-widest uppercase mb-1">
            Professional Tactical Board
          </div>
          <div className="text-4xl font-black italic tracking-tighter uppercase">
            Match <span className="text-blue-500">Analysis</span>
          </div>
        </div>

        {/* 필드 - 이벤트 핸들러 추가됨 */}
        <SoccerField
          boardRef={boardRef}
          isMoving={isMoving}
          prevHome={prevHome}
          homePlayers={homePlayers}
          pressDirection={pressDirection}
          immediateMove={immediateMove}
          passPreview={passPreview}
          plannedMoves={plannedMoves}
          getPlayerCurrentPosition={getPlayerCurrentPosition}
          // 여기에 이벤트 핸들러를 추가하여 SoccerField 내부 div에 연결되게 합니다.
          onMouseMove={(e) => handleMouseMove(e, ball)}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* 공 */}
          <Ball
            ball={ball}
            ballOwner={ballOwner}
            onMouseDown={(e) => handleBallMouseDown(e, ball)}
          />

          {/* 상대팀 선수들 */}
          {awayPlayers.map(p => (
            <Player
              key={`away-${p.id}`}
              player={p}
              team="away"
              isMoving={isMoving}
              hasBall={ballOwner?.team === 'away' && ballOwner?.id === p.id}
            />
          ))}

          {/* 우리팀 선수들 */}
          {homePlayers.map(p => {
            const isLocked = lockedPlayers.has(p.id);
            const isSelected = selectedPlayer?.id === p.id;
            const hasBall = ballOwner?.team === 'home' && ballOwner?.id === p.id;
            const hasPlannedMove = plannedMoves.some(m => m.playerId === p.id);
            
            return (
              <Player
                key={`home-${p.id}`}
                player={p}
                team="home"
                isMoving={isMoving}
                isLocked={isLocked}
                isSelected={isSelected}
                hasBall={hasBall}
                hasPlannedMove={hasPlannedMove}
                onMouseDown={(e) => handlePlayerMouseDown(e, p, lockedPlayers, setSelectedPlayer)}
              />
            );
          })}

          {/* 공 소유 표시 */}
          {ballOwner && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-full text-xs font-bold z-50">
              {ballOwner.team === 'home' ? `우리팀 #${ballOwner.id}` : `상대팀 #${ballOwner.id}`} 공 소유
            </div>
          )}

          {/* 조작 안내 */}
          {(pressingBall?.current || isPressing?.current) && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/80 text-white px-4 py-2 rounded-full text-xs font-bold z-50 animate-pulse">
            {pressingBall.current 
              ? '🎯 패스 방향 설정 중...' 
              : passPreview?.isPlanned 
              ? '📍 계획 이동 설정 중 (놓으면 저장)...' 
              : '➡️ 즉시 이동 중...'}
          </div>
        )}
        </SoccerField>

        {/* 컨트롤 패널 */}
        <ControlPanel
          plannedMoves={plannedMoves}
          onExecute={() => executePlannedMoves(setPrevHome, homePlayers, setIsMoving)}
          onClear={clearPlannedMoves}
          onRemove={removePlannedMove}
          tactic={tactic}
          onTacticChange={applyTactic}
          onReset={resetFormation}
        />

        {/* 조작 가이드 */}
        <div className="mt-6 bg-slate-800/50 rounded-2xl p-4 text-[10px] text-slate-400 space-y-2 max-w-[340px] sm:max-w-[520px]">
          <div className="font-bold text-white mb-2">조작 가이드</div>
          <div>⚽ <span className="text-green-400">공 패스:</span> 공 길게 누르기 → 화살표로 방향 설정</div>
          <div>🏃 <span className="text-blue-400">즉시 이동:</span> 선수 드래그 (0.8초 이내) → 실시간 이동</div>
          <div>📍 <span className="text-amber-400">계획 이동:</span> 선수 0.8초 이상 꾹 누른 채 드래그 → 노란 화살표 저장</div>
        </div>
      </div>

      {/* 선수 상세 패널 */}
      <PlayerDetailPanel
        selectedPlayer={selectedPlayer}
        onClose={() => setSelectedPlayer(null)}
        onToggleLock={toggleLock}
        onRoleChange={handleRoleChange}
        isLocked={selectedPlayer && lockedPlayers.has(selectedPlayer.id)}
      />

      {/* 커스텀 스타일 */}
      <style>{`
  /* 선수: 0.8초 동안 부드럽고 묵직하게 이동 */
  .player-transition {
    transition: top 0.8s ease-in-out, left 0.8s ease-in-out;
    will-change: top, left; /* 성능 최적화 */
  }

  /* 공: 0.5초 동안 선수보다 빠르게, 도착 시 탄력 있게 멈춤 */
  .ball-transition {
    transition: top 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275), 
                left 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    will-change: top, left;
  }

  /* 기존 스크롤바 스타일 */
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

export default SoccerTacticsBoard;