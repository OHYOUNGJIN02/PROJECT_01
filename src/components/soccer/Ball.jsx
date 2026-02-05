import React from 'react';

export const Ball = ({ ball, ballOwner, onMouseDown }) => {
  return (
    <div 
      // 1. transition-all duration-300 대신 ball-transition을 넣었습니다.
      className={`absolute w-5 h-5 bg-white rounded-full shadow-2xl z-40 ball-transition ${
        ballOwner ? 'ring-4 ring-green-400 ring-opacity-50' : ''
      }`}
      style={{
        top: `${ball.top}%`,
        left: `${ball.left}%`,
        transform: 'translate(-50%, -50%)',
        border: '2px solid #222',
        cursor: ballOwner?.team === 'home' ? 'pointer' : 'default'
      }}
      onMouseDown={onMouseDown}
    >
      {/* 축구공 무늬를 살짝 넣고 싶다면 여기에 추가 가능합니다 */}
      <div className="absolute inset-0 rounded-full opacity-10" 
           style={{ backgroundImage: 'radial-gradient(circle, #000 10%, transparent 10%)', backgroundSize: '8px 8px' }} />
    </div>
  );
};