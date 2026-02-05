import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// 날짜 한 칸을 그리는 내부 컴포넌트
const SmallWidgetCalendarItem = ({ targetDate, currentMonth }) => {

  const isThisMonth = targetDate.getMonth() === currentMonth;
  const dayDisplay = targetDate.getDate();
  

  if (!isThisMonth) {
    return <div className="w-full aspect-square invisible"></div>;
  }

  return (
    <div className="w-full aspect-square flex items-center justify-center">
      <span className="text-gray-400 text-[12px] font-medium leading-tight">
        {dayDisplay}
      </span>
    </div>
  );
};

const SmallCalendarWidget = () => {
    const navigate = useNavigate();
  // ✅ [수정] 고정된 날짜가 아닌 현재 날짜(new Date())를 초기값으로 설정
  const [viewDate] = useState(() => {
    const now = new Date();
    // 현재 연도와 월의 1일로 설정하여 달력 계산의 기준점으로 삼음
    return new Date(now.getFullYear(), now.getMonth(), 1);
  }); 

  const viewYear = viewDate.getFullYear();
  const viewMonth = viewDate.getMonth();

  // 1. 해당 월의 1일 요일 (0: 일, 1: 월 ... 6: 토)
  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  
  // 2. 월요일 시작 기준 오프셋 계산
  const startOffset = firstDay === 0 ? 6 : firstDay - 1;

  const daysOfWeek = ["월", "화", "수", "목", "금", "토", "일"];

  // 3. 6주치(42개) 날짜 배열 생성
  const calendarDays = Array.from({ length: 42 }, (_, i) => {
    return new Date(viewYear, viewMonth, i + 1 - startOffset);
  });

  return (
    <div className="w-[320px] h-[303.5px] bg-[#0E0E0E] rounded-[12px] px-[18px] py-[22px] flex flex-col font-pretendard select-none shadow-xl">
      
      {/* 상단 헤더: 현재 연도와 월이 자동으로 표시됨 */}
      <div className="w-[272px] h-[40.5px] flex justify-between items-center mb-[28px] mx-auto">
        <h2 className="text-white text-[20px] font-bold leading-none font-pretendard">
          {String(viewYear).slice(2)}년 {viewMonth + 1}월 독서기록
        </h2>
        <button 
        onClick={() => navigate("/calender")}
        className="text-gray-500 text-[12px] font-medium hover:text-gray-300 transition-colors cursor-pointer">
          캘린더로 이동
        </button>
      </div>

      {/* 요일 표시 줄 */}
      <div className="grid grid-cols-7 gap-x-[8px] mb-[20px]">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-gray-500 text-[12px] font-medium text-center">
            {day}
          </div>
        ))}
      </div>

      {/* 날짜 그리드 영역 */}
      <div className="grid grid-cols-7 gap-x-[8px] gap-y-[4px]">
        {calendarDays.map((date, index) => (
          <SmallWidgetCalendarItem
            key={index}
            targetDate={date}
            currentMonth={viewMonth}
          />
        ))}
      </div>
    </div>
  );
};

export default SmallCalendarWidget;