import BookCard from "../card/BookCard";
import Label from "../property/Label";

const CalendarWidgetProperty = () => {
  return (
    // 전체 컨테이너: 가로 126px, 세로 148px, 상하 패딩 8px
    <div className="w-[126px] h-[148px] py-[8px] flex flex-col justify-between bg-gray-90 rounded-lg">
      
      {/* 1. 상단 영역 (페이지 수 + 라벨) */}
      <div className="flex flex-col gap-1">
        <span className="text-white text-[16px] font-bold">+12P</span>
        <div className="flex gap-1">
          <Label label="New" size="s" isActived={true} />
          <Label label="New" size="s" isActived={true} />
        </div>
      </div>

      {/* 2. 하단 영역 (책 카드 4개) */}
      <div className="flex gap-1">
        {/* BookCard가 4개 들어갑니다 */}
        <BookCard size="s" state="default" book={{}} />
        <BookCard size="s" state="default" book={{}} />
        <BookCard size="s" state="default" book={{}} />
        <BookCard size="s" state="default" book={{}} />
      </div>

    </div>
  );
};

export default CalendarWidgetProperty;