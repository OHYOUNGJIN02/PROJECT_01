import React, { useState } from "react";
import CalendarWidgetItem from "./CalenderWidjetItem";

const Calendar = () => {
  // 현재 보고 있는 기준 날짜 (2026년 1월 1일)
  const [viewDate, setViewDate] = useState(new Date(2026, 0, 1)); 

  const viewYear = viewDate.getFullYear();
  const viewMonth = viewDate.getMonth();

  // 1. 해당 월의 1일 요일 계산 (0: 일, 1: 월 ... 4: 목)
  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  // 2. 월요일 시작 기준 오프셋 (목요일이면 앞의 3칸을 이전 달 날짜로 채움)
  const startOffset = firstDay === 0 ? 6 : firstDay - 1;

  const handlePrevMonth = () => setViewDate(new Date(viewYear, viewMonth - 1, 1));
  const handleNextMonth = () => setViewDate(new Date(viewYear, viewMonth + 1, 1));
  const handleToday = () => {
    const now = new Date();
    setViewDate(new Date(now.getFullYear(), now.getMonth(), 1));
  };

  const daysOfWeek = ["월", "화", "수", "목", "금", "토", "일"];

  // 3. 총 35개 혹은 42개의 칸을 모두 날짜 객체로 채움
  const calendarDays = Array.from({ length: 35 }, (_, i) => {
    // i + 1 - startOffset 로직으로 이전 달, 현재 달, 다음 달 날짜가 자동으로 계산됨
    return new Date(viewYear, viewMonth, i + 1 - startOffset);
  });

  return (
    <div className="w-[1060px] h-[788px] bg-gray-95 rounded-[12px] p-[20px] flex flex-col font-pretendard text-gray-10">
      {/* 헤더 */}
      <div className="flex justify-between items-center mb-[24px]">
        <div className="flex items-center gap-4">
          <h2 className="text-[24px] font-bold">{viewYear}년 {viewMonth + 1}월</h2>
          <div className="flex gap-2">
            <button onClick={handlePrevMonth} className="p-2 bg-gray-80 rounded-lg">&lt;</button>
            <button onClick={handleNextMonth} className="p-2 bg-gray-80 rounded-lg">&gt;</button>
          </div>
        </div>
        <button onClick={handleToday} className="px-4 py-2 bg-white text-gray-95 rounded-lg font-bold">오늘로</button>
      </div>

      {/* 요일 라벨 */}
      <div className="grid grid-cols-7 mb-[12px]">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-gray-40 text-[14px] font-medium text-center">{day}</div>
        ))}
      </div>

      {/* 날짜 그리드 (1px 선 유지) */}
      <div className="grid grid-cols-7 gap-[1px] bg-gray-90 border-[1px] border-gray-90 flex-1 overflow-hidden">
        {calendarDays.map((date, index) => (
          <CalendarWidgetItem 
            key={index} 
            targetDate={date} 
            currentMonth={viewMonth}
          />
        ))}
      </div>
    </div>
  );
};

export default Calendar;