import React from 'react';
import { ROLE_OPTIONS } from '../../utils/types';
import { calculatePosition } from '../../utils/utils';

export const PlayerDetailPanel = ({ 
  selectedPlayer, 
  onClose, 
  onToggleLock, 
  onRoleChange, 
  isLocked 
}) => {
  if (!selectedPlayer) return null;

  const currentPos = calculatePosition(selectedPlayer.top, selectedPlayer.left);
  const availableRoles = ROLE_OPTIONS[currentPos] || [];

  return (
    <div className={`w-full lg:w-72 bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 shadow-2xl transition-all ${
      selectedPlayer ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0 pointer-events-none'
    }`}>
      <div className="flex flex-col h-full">
        <h3 className="text-2xl font-black italic mb-6">
          PLAYER #{selectedPlayer.id}
        </h3>
       
        <div className="mb-8">
          <label className="text-[10px] font-black text-slate-500 uppercase mb-2 block">
            Current Pos
          </label>
          <div className="text-4xl font-black text-yellow-400 italic">
            {currentPos}
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
          onClick={() => onToggleLock(selectedPlayer.id)}
          className={`mb-6 py-3 rounded-xl text-xs font-bold transition-all ${
            isLocked
              ? 'bg-yellow-600 text-white'
              : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
          }`}>
          {isLocked ? '🔒 포지션 고정됨' : '🔓 포지션 고정'}
        </button>
       
        <div className="space-y-4">
          <label className="text-[10px] font-black text-slate-500 uppercase block">
            Assign Role
          </label>
          <div className="grid gap-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
            {availableRoles.map(role => (
              <button
                key={role}
                onClick={() => onRoleChange(selectedPlayer.id, role)}
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
          onClick={onClose}
          className="mt-8 pt-4 text-xs font-bold text-slate-500 hover:text-white transition-colors border-t border-white/5">
          Close
        </button>
      </div>
    </div>
  );
};
