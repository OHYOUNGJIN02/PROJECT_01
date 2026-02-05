import React, { useEffect, useState } from 'react';

export default function ReadProgressReportWidget({ className }) {
  const data = [
    { label: "판타지", value: 84, color: "bg-gray-10", textColor: "text-gray-60" },
    { label: "판타지", value: 84, color: "bg-gray-30", textColor: "text-gray-80" },
    { label: "판타지", value: 24, color: "bg-gray-50", textColor: "text-gray-5" },
    { label: "판타지", value: 24, color: "bg-gray-70", textColor: "text-gray-30" },
  ];

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div 
      className={`${className} flex bg-gray-95 rounded-[12px] box-border overflow-hidden`}
      style={{ 
        width: '861px', 
        height: '220px', 
        fontFamily: '"Pretendard Variable", sans-serif'
      }}
    >
      {/* 1. 좌측 타이틀 영역: 240px X 204px */}
      <div 
        className="flex flex-col text-left shrink-0 justify-start"
        style={{ width: '240px', height: '204px', padding: '24px 0 0 24px' }}
      >
        <h3 className="text-gray-5 text-[18px] font-bold opacity-10 leading-none">
          제목
        </h3>
        <h2 className="text-gray-50 text-[16px] font-bold mt-[4px] leading-tight">
          독서취향 분석 위젯 1
        </h2>
      </div>

      {/* 2. 우측 그래프 영역: 621px X 220px */}
      <div 
        className="flex flex-col justify-between py-[24px] pr-[20px] shrink-0 items-end"
        style={{ width: '621px', height: '220px' }}
      >
        {data.map((item, idx) => {
          // 요청하신 그래프 본체 가로 539px 고정
          const barMaxWidth = 539;
          const fillWidth = isMounted ? (item.value / 100) * barMaxWidth : 0;

          return (
            <div key={idx} className="flex items-center justify-end w-full gap-[32px]">
              {/* 라벨: 그래프 왼쪽 32px 지점 */}
              <div className="w-[60px] h-[28px] flex items-center bg-gray-30 justify-center border border-gray-900 rounded-[4px] shrink-0">
                <span className="text-gray-90 text-[13px] font-bold leading-none">
                  {item.label}
                </span>
              </div>

              {/* 그래프 본체: 가로 539px, 세로 32px 고정 */}
              <div 
                className="relative bg-[#1A1A1A] rounded-full overflow-hidden shrink-0" 
                style={{ width: `${barMaxWidth}px`, height: '32px' }}
              >
                <div 
                  className={`absolute top-0 left-0 h-full ${item.color} rounded-full transition-all duration-1000 ease-in-out flex items-center px-[16px]`}
                  style={{ width: `${fillWidth}px` }} 
                >
                  {isMounted && (
                    <span className={`${item.textColor} text-[13px] font-bold whitespace-nowrap`}>
                      {item.value}%
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}