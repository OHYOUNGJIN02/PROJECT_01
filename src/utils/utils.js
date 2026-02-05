// 두 점 사이의 거리 계산
export const getDistance = (pos1, pos2) => {
  const dx = pos1.left - pos2.left;
  const dy = pos1.top - pos2.top;
  return Math.sqrt(dx * dx + dy * dy);
};

// 선수 위치에 따른 포지션 계산
export const calculatePosition = (top, left) => {
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
};

// 필드 좌표 계산
export const getFieldPosition = (clientX, clientY, boardRef) => {
  if (!boardRef.current) return null;
  const rect = boardRef.current.getBoundingClientRect();
  return {
    top: ((clientY - rect.top) / rect.height) * 100,
    left: ((clientX - rect.left) / rect.width) * 100
  };
};
