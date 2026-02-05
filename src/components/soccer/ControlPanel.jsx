import React from 'react';

export const ControlPanel = ({ 
  plannedMoves, 
  onExecute, 
  onClear, 
  onRemove,
  tactic,
  onTacticChange,
  onReset
}) => {
  return (
    <div className="mt-8 w-full space-y-3">
      {/* 계획된 이동 섹션 */}
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
                  onClick={() => onRemove(move.playerId)}
                  className="text-xs text-red-400 hover:text-red-300">
                  ✖
                </button>
              </div>
            ))}
          </div>
        )}
        
        <div className="flex gap-2">
          <button
            onClick={onExecute}
            disabled={plannedMoves.length === 0}
            className={`flex-1 py-3 rounded-xl text-xs font-black text-white transition-all ${
              plannedMoves.length > 0
                ? 'bg-amber-600 hover:bg-amber-500'
                : 'bg-amber-900/50 cursor-not-allowed'
            }`}>
            ▶️ 실행
          </button>
          <button
            onClick={onClear}
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

      {/* 전술 버튼 */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => onTacticChange('lavolpiana')}
          className={`py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
            tactic === 'lavolpiana' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'
          }`}>
          Lavolpiana
        </button>
        <button
          onClick={() => onTacticChange('counter')}
          className={`py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
            tactic === 'counter' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'
          }`}>
          Counter
        </button>
      </div>
     
      <div className="space-y-2">
        <button
          onClick={() => onTacticChange('gegen_attack')}
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
          onClick={() => onTacticChange('gegen_press')}
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
        onClick={onReset}
        className="w-full py-4 bg-white/5 hover:bg-white/10 rounded-2xl text-xs font-black text-white border border-white/10 transition-all uppercase tracking-widest">
        🔄 Reset Formation
      </button>
    </div>
  );
};
