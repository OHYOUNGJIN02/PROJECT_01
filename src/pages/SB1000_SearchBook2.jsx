import React, { useState } from 'react'; // useState 추가
import { X } from 'lucide-react';
import BookCard from '../components/card/BookCard';

const SB1100_BookInfo = () => {
  // 1. 검색어 상태 관리
  const [searchTerm, setSearchTerm] = useState("내 인생을");

  const dummyBooks = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    title: "내 인생을 바꾸는 ...",
    author: "정은혜",
    genre: "판타지",
  }));

  // 2. 텍스트 삭제 핸들러
  const handleClear = () => {
    setSearchTerm("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-950 p-4 font-pretendard">
      <div className="flex flex-col w-[1000px] h-[560px] bg-[#1A1A1A] rounded-[12px] border-[2px] border-[#333333] p-[32px] shadow-2xl">
        
        <div className="flex items-center gap-[12px] mb-[20px] shrink-0">
          <button className="text-gray-400 hover:text-white transition-colors">
            <X size={24} strokeWidth={2} />
          </button>
          <h2 className="text-[18px] font-semibold text-gray-100 font-pretendard">
            도서정보 검색
          </h2>
        </div>

        {/* 검색창 영역 */}
        <div className="relative flex items-center justify-between w-full h-[40px] bg-[#2A2A2A] rounded-[4px] px-[16px] mb-[24px] shrink-0">
          <input 
            type="text" 
            value={searchTerm} // 3. 상태와 연결
            onChange={(e) => setSearchTerm(e.target.value)} // 직접 입력 시 상태 업데이트
            className="flex-1 h-full bg-transparent border-none outline-none text-[14px] text-gray-200 font-pretendard"
          />
          
          {/* 4. X 버튼 클릭 시 handleClear 호출 */}
          {searchTerm.length > 0 && (
            <button 
              onClick={handleClear}
              className="text-gray-500 hover:text-gray-300 transition-colors"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <div className="flex justify-between items-end mb-[16px] shrink-0 font-pretendard">
          <div className="text-[14px] text-gray-400">
            검색결과 <span className="ml-1 text-gray-300 font-pretendard">15건</span>
          </div>
          <button className="px-[12px] py-[6px] text-[12px] text-gray-300 border border-gray-600 rounded-[4px] hover:bg-gray-800 hover:text-white transition-all font-pretendard">
            책 직접 등록하기
          </button>
        </div>

        <div className="flex-1 overflow-y-auto min-h-0 [&::-webkit-scrollbar]:display-none [scrollbar-width:none]">
          <div className="grid grid-cols-5 gap-x-[12px] gap-y-[24px]">
            {dummyBooks.map((book) => (
              <BookCard 
                key={book.id} 
                size="l" 
                state="default" 
                book={book} 
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default SB1100_BookInfo;