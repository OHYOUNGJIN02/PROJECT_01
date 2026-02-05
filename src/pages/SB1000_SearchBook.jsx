import React from 'react';
import { X, Search } from 'lucide-react';

const SB1000_SearchBook = () => {
  return (
    // 배경 레이아웃 (실제 프로젝트의 Modal Portal 내부에 배치하세요)
    <div className="flex items-center justify-center min-h-screen bg-neutral-950 p-4">
      
      {/* Modal Container: 1000px X 560px 
          - Background: gray90 느낌의 #1A1A1A (또는 gray-900)
          - Radius: 12px / Border: 2px / Padding: 32px / Gap: 4px
      */}
      <div className="
        flex flex-col 
        w-[1000px] h-[560px] 
        bg-[#1A1A1A] 
        rounded-[12px] 
        border-[2px] border-[#333333] 
        p-[32px] 
        gap-[4px] 
        shadow-2xl
      ">
        
        {/* 상단 헤더: 닫기 아이콘 + 타이틀 */}
        <div className="flex items-center gap-[12px] mb-[12px]">
          <button className="text-gray-400 hover:text-white transition-colors">
            <X size={24} strokeWidth={2} />
          </button>
          <h2 className="text-[18px] font-semibold text-gray-100">
            도서정보 검색
          </h2>
        </div>

        {/* 검색창 영역: 936px X 40px 
            (1000px - 패딩 64px = 936px)
        */}
        <div className="
          relative 
          flex items-center 
          w-full h-[40px] 
          bg-[#2A2A2A] 
          rounded-[4px] 
          px-[16px] 
          focus-within:ring-1 focus-within:ring-gray-500
        ">
          <input 
            type="text" 
            placeholder="제목, 저자 등 키워드로 검색" 
            className="
              flex-1 h-full 
              bg-transparent 
              border-none outline-none 
              text-[14px] text-gray-200 
              placeholder-gray-500
            "
          />
          <button title="검색하기">
            <Search size={18} className="text-gray-500 hover:text-gray-300" />
          </button>
        </div>

        {/* 결과 안내 메시지 */}
        <div className="mt-[8px]">
          <p className="text-[14px] text-gray-400">
            검색어를 입력해주세요
          </p>
        </div>

        {/* 하단 빈 공간 (560px 높이 유지를 위한 영역) */}
        <div className="flex-1" />

      </div>
    </div>
  );
};

export default SB1000_SearchBook;