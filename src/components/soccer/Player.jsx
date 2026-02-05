import React from 'react';
import { calculatePosition } from '../../utils/utils';

export const Player = ({ 
  player, 
  team, 
  isMoving, 
  isLocked, 
  isSelected, 
  hasBall, 
  hasPlannedMove,
  onMouseDown 
}) => {
  const isHome = team === 'home';
  
  if (!isHome) {
    // 상대팀 선수
    return (
      <div
        className={`absolute w-7 h-7 rounded-full border flex items-center justify-center text-[10px] font-bold shadow-lg ${
          isMoving ? 'transition-all duration-[2000ms] ease-in-out z-20' : 'z-20'
        } ${
          hasBall
            ? 'bg-red-400 border-white ring-4 ring-green-400 ring-opacity-50'
            : 'bg-red-600 border-white/30'
        }`}
        style={{
          top: `${player.top}%`,
          left: `${player.left}%`,
          transform: 'translate(-50%, -50%)'
        }}>
        {player.id}
      </div>
    );
  }

  // 우리팀 선수
  const pos = calculatePosition(player.top, player.left);
  
  return (
    <div
      onMouseDown={onMouseDown}
      className={`absolute flex flex-col items-center ${
        isLocked ? 'cursor-not-allowed' : 'cursor-pointer'
      } ${
        isMoving ? 'transition-all duration-[2000ms] ease-in-out z-30' : 'z-30'
      }`}
      style={{
        top: `${player.top}%`,
        left: `${player.left}%`,
        transform: 'translate(-50%, -50%)'
      }}>
      <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 flex items-center justify-center font-black text-sm shadow-xl relative ${
        isSelected
          ? 'bg-yellow-400 border-white text-black'
          : hasBall
          ? 'bg-blue-400 border-white text-white ring-4 ring-green-400 ring-opacity-50'
          : hasPlannedMove
          ? 'bg-blue-600 border-amber-400 border-4 text-white'
          : 'bg-blue-600 border-white text-white'
      }`}>
        {player.id}
        {isLocked && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center text-[8px]">
            🔒
          </div>
        )}
      </div>
      <div className="mt-1 bg-black/80 px-2 py-0.5 rounded text-[9px] font-black border border-white/10 uppercase text-emerald-400">
        {pos}
      </div>
      {player.detail && (
        <div className="mt-0.5 bg-blue-900/90 px-1.5 py-0.5 rounded text-[7px] font-bold text-blue-200 max-w-[80px] text-center truncate">
          {player.detail}
        </div>
      )}
    </div>
  );
};
