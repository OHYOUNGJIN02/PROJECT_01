import { useState, useRef, useCallback } from 'react';
import { getFieldPosition, calculatePosition } from '../../utils/utils';

export const usePlayerMovement = (boardRef, ballOwner, setBall, setBallOwner, setHomePlayers) => {
  const [plannedMoves, setPlannedMoves] = useState([]);
  const [immediateMove, setImmediateMove] = useState(null);
  const [passPreview, setPassPreview] = useState(null);
  
  const pressStartPos = useRef(null);
  const pressStartTime = useRef(null);
  const isPressing = useRef(false);
  const pressingPlayerId = useRef(null);
  const pressingBall = useRef(false);

  const LONG_PRESS_THRESHOLD = 3000;

  // 1. 공 마우스 다운
  const handleBallMouseDown = useCallback((e, ball) => {
    if (!ballOwner || ballOwner.team !== 'home') return;
    e.stopPropagation();
    pressingBall.current = true;
    pressStartTime.current = Date.now();
    // 공의 현재 위치를 기준점으로 저장
    pressStartPos.current = { top: ball.top, left: ball.left };
  }, [ballOwner]);

  const handlePlayerMouseDown = useCallback((e, player, lockedPlayers, setSelectedPlayer) => {
    if (lockedPlayers.has(player.id)) return;
    e.stopPropagation();
    
    isPressing.current = true;
    pressingPlayerId.current = player.id;
    pressStartTime.current = Date.now();
    pressStartPos.current = { top: player.top, left: player.left };
    setSelectedPlayer(player);
  }, []);

  const handleMouseMove = useCallback((e, ball) => {
    if (!isPressing.current && !pressingBall.current) return;
    const currentPos = getFieldPosition(e.clientX, e.clientY, boardRef);
    if (!currentPos) return;

    const duration = Date.now() - pressStartTime.current;

    // 공 패스 미리보기: 공은 고정하고 화살표만 이동 (떨림 방지)
    if (pressingBall.current) {
      setPassPreview({ 
        from: { ...ball }, 
        to: currentPos,
        isPlayerMove: false 
      });
      return; 
    }

    // 선수 이동 미리보기
    if (isPressing.current && pressingPlayerId.current) {
      if (duration >= LONG_PRESS_THRESHOLD) {
        // 계획 모드: 선수는 제자리 고정
        setHomePlayers(prev => prev.map(p => 
          p.id === pressingPlayerId.current ? { ...p, ...pressStartPos.current } : p
        ));
        setPassPreview({
          from: pressStartPos.current,
          to: currentPos,
          isPlayerMove: true,
          isPlanned: true
        });
      } else {
        // 즉시 이동: 선수가 마우스를 따라감
        setHomePlayers(prev => prev.map(p => 
          p.id === pressingPlayerId.current ? { ...p, top: currentPos.top, left: currentPos.left } : p
        ));
        setPassPreview(null); 
      }
    }
  }, [boardRef, setHomePlayers]);

  const handleMouseUp = useCallback((e) => {
    const duration = Date.now() - pressStartTime.current;
    const endPos = getFieldPosition(e.clientX, e.clientY, boardRef);

    // 공 패스 실행: setBall 호출 시 CSS의 ball-transition이 작동함
    if (pressingBall.current && endPos && duration > 200) {
      setBall(endPos);
      setBallOwner(null);
    }

    // 선수 이동 확정
    if (isPressing.current && pressingPlayerId.current && endPos) {
      if (duration >= LONG_PRESS_THRESHOLD) {
        setPlannedMoves(prev => [
          ...prev.filter(m => m.playerId !== pressingPlayerId.current),
          {
            playerId: pressingPlayerId.current,
            from: { ...pressStartPos.current },
            to: { ...endPos }
          }
        ]);
        setHomePlayers(prev => prev.map(p => 
          p.id === pressingPlayerId.current ? { ...p, ...pressStartPos.current } : p
        ));
      } else {
        setHomePlayers(prev => prev.map(p =>
          p.id === pressingPlayerId.current 
            ? { ...p, ...endPos, detail: calculatePosition(endPos.top, endPos.left) } 
            : p
        ));
      }
    }

    isPressing.current = false;
    pressingBall.current = false;
    pressingPlayerId.current = null;
    setPassPreview(null);
  }, [boardRef, setBall, setBallOwner, setHomePlayers]);

  // ★ 실행 기능: 애니메이션 완료 대기 시간을 1.5초로 연장
  const executePlannedMoves = useCallback((setPrevHome, homePlayers, setIsMoving) => {
    if (plannedMoves.length === 0) return;
    
    setPrevHome([...homePlayers]);
    setIsMoving(true);

    setHomePlayers(prev => prev.map(p => {
      const move = plannedMoves.find(m => m.playerId === p.id);
      if (move) {
        return { 
          ...p, 
          top: move.to.top, 
          left: move.to.left,
          detail: calculatePosition(move.to.top, move.to.left)
        };
      }
      return p;
    }));

    // 전체 이동이 완료될 때까지 상태 유지 (1500ms)
    setTimeout(() => {
      setIsMoving(false);
      setPlannedMoves([]);
    }, 1500); 
  }, [plannedMoves, setHomePlayers]);

  const clearPlannedMoves = useCallback(() => setPlannedMoves([]), []);
  const removePlannedMove = useCallback((playerId) => {
    setPlannedMoves(prev => prev.filter(m => m.playerId !== playerId));
  }, []);

  return {
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
    setPlannedMoves,
    clearPlannedMoves,
    removePlannedMove
  };
};