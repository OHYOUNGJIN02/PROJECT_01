import React from "react";
import BookCard from "../../card/BookCard";

function ParallelReadingWidget({ books = [] }) {
  const displayBooks = books.length > 0 ? books : Array(5).fill({
    title: "내 인생을 바꾸는 ...",
    author: "정은혜",
    genre: "판타지",
    totalPage: 1820,
    currentPage: 73,
    status: "reading",
    coverImage: "", 
  });

  return (
    <div 
      // 1. 고정 높이 h-[351px]를 제거하거나 min-h-[351px]로 변경
      // 2. pb-[32px]를 유지하되 전체가 잘리지 않도록 설정
      style={{ width: '1100px' }} 
      className="flex flex-col items-start justify-end pb-[32px]"
    >
      <div className="flex flex-col items-start gap-[24px] w-full">
        
        {/* 도서 리스트 영역 */}
        <div className="flex items-start justify-between w-full px-[32px]">
          {displayBooks.slice(0, 5).map((book, index) => (
            <div key={index} className="flex shrink-0">
              <BookCard size="l" book={book} />
            </div>
          ))}
        </div>

        {/* 하단 책장 받침대 (Shelf) */}
        <div 
          style={{ 
            width: '1100px', 
            height: '16px',
            backgroundColor: '#4e4a46',
            borderRadius: '100px',
          }}
          className="shadow-lg"
        />
      </div>
    </div>
  );
}

export default ParallelReadingWidget;