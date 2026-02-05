import { useCallback } from 'react';
import { INITIAL_HOME, INITIAL_AWAY } from '../../utils/types';

export const useTactics = (
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
) => {
  const applyTactic = useCallback((type) => {
    setPrevHome([...homePlayers]);
    setPrevAway([...awayPlayers]);
    setTactic(type);
    setIsMoving(true);
    setPressDirection(null);
    setBallOwner(null);

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
  }, [
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
  ]);

  return { applyTactic };
};
