import React from "react";
import BookCard from "../card/BookCard";
import Label from "../property/Label";

const CalendarWidgetItem = ({ targetDate, currentMonth }) => {
  const now = new Date();
  
  // 이번 달 여부 판별
  const isThisMonth = targetDate.getMonth() === currentMonth;

  // 오늘 여부 판별
  const isToday = 
    targetDate.getDate() === now.getDate() &&
    targetDate.getMonth() === now.getMonth() &&
    targetDate.getFullYear() === now.getFullYear();

  // 주말 여부 판별
  const isWeekend = targetDate.getDay() === 0 || targetDate.getDay() === 6;
  
  // 날짜 숫자 포맷 (01, 02...)
  const dayDisplay = targetDate.getDate().toString().padStart(2, '0');

  // 🎨 배경색 결정
  // 🎨 배경색 결정 (수정된 로직)
  const getBgColor = () => {
    // 1. 오늘이면 무조건 gray-90 (가장 높은 우선순위)
    if (isToday) return "bg-gray-90";
    
    // 2. 주말이면 이번 달 여부와 상관없이 #0E0E0E 적용 📍
    if (isWeekend) return "bg-[#0E0E0E]";
    
    // 3. 그 외 평일은 투명하게 (그리드 선 노출)
    return "bg-gray-95";
  };

  // 🎨 글자색 결정
  const getDayColor = () => {
    if (!isThisMonth) return "text-gray-80";    // 이전/다음 달 숫자는 흐리게
    if (isToday) return "text-gray-5";          // 오늘 숫자는 밝게
    return "text-gray-50";                      // 이번 달 평일/주말 기본 숫자
  };

  return (
    <div className={`w-full h-full px-[8px] py-[4px] flex flex-col justify-between ${getBgColor()}`}>
      <div className="flex flex-col gap-1">
        {/* 날짜 숫자는 모든 칸에 출력됨 */}
        <span className={`${getDayColor()} text-[12px] font-medium leading-tight`}>
          {dayDisplay}
        </span>
        
        {/* 이번 달인 경우에만 독서 기록 정보를 표시 */}
        {isThisMonth && (
          <div className="flex flex-col gap-1">
            <span className="text-gray-10 font-pretendard text-[16px] font-bold leading-tight">+12P</span>
            <div className="flex gap-1">
              <Label label="장르" size="s" isActived={true} />
              <Label label="장르" size="s" isActived={true} />
            </div>
          </div>
        )}
      </div>

      {/* 이번 달인 경우에만 책 카드 목록 표시 */}
      {isThisMonth && (
        <div className="flex items-end justify-between">
          <div className="flex gap-1">
            <BookCard size="s" state="default" book={{}} />
            <BookCard size="s" state="default" book={{}} />
            <BookCard size="s" state="default" book={{}} />
            <BookCard size="s" state="default" book={{}} />
          </div>
          <span className="text-gray-40 font-pretendard text-[14px] font-medium pb-1">2+</span>
        </div>
      )}
    </div>
  );
};

export default CalendarWidgetItem;