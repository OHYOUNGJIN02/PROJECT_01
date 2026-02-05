import { useState, useRef, useCallback, useEffect } from 'react';
import { INITIAL_HOME, INITIAL_AWAY } from '../../utils/types';
import { getDistance } from '../../utils/utils';

export const useGameState = () => {
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

  // 공 소유권 감지
  useEffect(() => {
    if (isMoving) return;

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

  // 공 소유자와 공 위치 동기화
  useEffect(() => {
    if (!ballOwner || isMoving) return;
    
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
  }, [homePlayers, awayPlayers, ballOwner, isMoving, ball]);

  const toggleLock = useCallback((playerId) => {
    setLockedPlayers(prev => {
      const newSet = new Set(prev);
      if (newSet.has(playerId)) {
        newSet.delete(playerId);
      } else {
        newSet.add(playerId);
      }
      return newSet;
    });
  }, []);

  const resetFormation = useCallback(() => {
    setPrevHome([...homePlayers]);
    setPrevAway([...awayPlayers]);
    setHomePlayers(INITIAL_HOME);
    setAwayPlayers(INITIAL_AWAY);
    setBall({ top: 50, left: 50 });
    setTactic('none');
    setPressDirection(null);
    setBallOwner(null);
    setIsMoving(true);
    setTimeout(() => setIsMoving(false), 2000);
  }, [homePlayers, awayPlayers]);

  return {
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
  };
};
