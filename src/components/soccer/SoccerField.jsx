import React from 'react';

export const SoccerField = ({ 
  boardRef, 
  children,
  isMoving,
  prevHome,
  homePlayers,
  pressDirection,
  immediateMove,
  passPreview,
  plannedMoves,
  getPlayerCurrentPosition,
  onMouseMove,
  onMouseUp,
  onMouseLeave
}) => {
  return (
    <div 
      ref={boardRef} 
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
      className="relative w-[340px] sm:w-[520px] aspect-[3/4] bg-[#14532d] rounded-[2.5rem] border-[12px] border-slate-800 shadow-2xl overflow-hidden"
    >
      {/* 잔디 패턴 */}
      <div className="absolute inset-0 opacity-20 pointer-events-none"
           style={{ backgroundImage: 'repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 10%)' }} />
      
      {/* 하프라인 */}
      <div className="absolute top-1/2 w-full h-0.5 bg-white/30 z-10" />
      
      {/* 센터 서클 */}
      <div className="absolute top-1/2 left-1/2 w-32 h-32 border border-white/30 rounded-full -translate-x-1/2 -translate-y-1/2 z-10" />
      
      {/* SVG 화살표 및 경로 레이어 */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" style={{ filter: 'drop-shadow(0px 2px 3px rgba(0,0,0,0.4))' }}>
        <defs>
          {/* 기존 마커들 유지 */}
          <marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
            <path d="M0,0 L10,5 L0,10 Z" fill="rgba(255,255,255,0.4)" />
          </marker>
          <marker id="press-arrow" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto">
            <path d="M0,0 L12,6 L0,12 Z" fill="#ef4444" />
          </marker>
          {/* 새로 추가된 세련된 화살표 촉 */}
          <marker id="arrow-head" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <path d="M0,0 L10,3.5 L0,7 L2,3.5 Z" fill="currentColor" />
          </marker>
        </defs>
        
        {/* 1. 이동 경로 표시 (isMoving) - 기존 로직 유지 */}
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
        
        {/* 2. 압박 방향 (pressDirection) - 기존 로직 유지 */}
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

        {/* 3. 즉시 이동 표시 (immediateMove) - 기존 로직 유지 */}
        {immediateMove && (
          <line
            x1={`${immediateMove.from.left}%`}
            y1={`${immediateMove.from.top}%`}
            x2={`${immediateMove.to.left}%`}
            y2={`${immediateMove.to.top}%`}
            stroke="#3b82f6"
            strokeWidth="3"
            markerEnd="url(#arrow-head)"
            opacity="0.8"
          />
        )}

        {/* 4. 계획된 이동 (SoccerField.jsx 내부) */}
        {plannedMoves.map((move, idx) => (
        <g key={`planned-${idx}`} className="text-yellow-400">
          <line
            x1={`${move.from.left}%`} // move.from이 저장되어 있어야 함
            y1={`${move.from.top}%`}
            x2={`${move.to.left}%`}
            y2={`${move.to.top}%`}
            stroke="currentColor"
            strokeWidth="3"
            strokeDasharray="8,5"
            markerEnd="url(#arrow-head)"
          />
          <circle cx={`${move.to.left}%`} cy={`${move.to.top}%`} r="4" fill="currentColor" opacity="0.5" />
        </g>
      ))}
        {/* 5. 실시간 드래그 미리보기 (요청하신 세련된 버전 적용) */}
        {passPreview && (
  <g className={
    passPreview.isPlayerMove 
      ? (passPreview.isPlanned ? "text-yellow-400" : "text-blue-400") // 800ms 넘으면 노란색, 아니면 파란색
      : "text-green-400" // 공 패스는 초록색
  }>
    <line
      x1={`${passPreview.from.left}%`}
      y1={`${passPreview.from.top}%`}
      x2={`${passPreview.to.left}%`}
      y2={`${passPreview.to.top}%`}
      stroke="currentColor"
      strokeWidth="4"
      strokeDasharray={passPreview.isPlanned ? "8,5" : "0"} // 계획 중이면 점선, 아니면 실선
      markerEnd="url(#arrow-head)"
    />
  </g>
)}
      </svg>

      {children}
    </div>
  );
};