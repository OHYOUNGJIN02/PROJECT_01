import React, { useState, useRef, useEffect } from 'react';
import BoxButtonPrimary from '../input/BoxButtonPrimary';
import BookCardRow from '../card/BookCardRow';
import { BiSolidPencil } from 'react-icons/bi';
import { AiFillCalendar } from 'react-icons/ai';

const PostEditHeader = () => {
  const [isShareEnabled, setIsShareEnabled] = useState(false);
  const [startDate, setStartDate] = useState("2025.08.12");
  const [endDate, setEndDate] = useState("2025.12.12");
  const [isEditingStart, setIsEditingStart] = useState(false);
  const [isEditingEnd, setIsEditingEnd] = useState(false);

  const startInputRef = useRef(null);
  const endInputRef = useRef(null);

  const forcedPretendard = { 
    fontFamily: "'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif",
    WebkitFontSmoothing: 'antialiased'
  };

  useEffect(() => {
    if (isEditingStart) startInputRef.current?.focus();
  }, [isEditingStart]);

  useEffect(() => {
    if (isEditingEnd) endInputRef.current?.focus();
  }, [isEditingEnd]);

  return (
    <div 
      className="flex flex-col justify-start box-border shrink-0 select-none w-full"
      style={{
        width: '1680px',
        height: '148px',
        padding: '20px 260px',
        borderBottom: '1px solid #393735',
        background: '#121110',
        ...forcedPretendard 
      }}
    >
      <h2 className="text-gray-30 text-[16px] font-normal leading-none mb-[24px]" style={{ transform: 'translateY(10px)' }}>
        읽은 도서
      </h2>

      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-[40px]">
          
          {/* 🔴 BookCardRow 컨테이너: 높이 56px 고정 및 수직 중앙 정렬 */}
          <div className="flex items-center w-[320px] h-[56px] px-[12px] bg-[#201F1E] rounded-[8px] overflow-hidden border border-transparent hover:border-[#393735] transition-all">
            <div className="w-full h-full flex items-center [&_div]:!gap-0 [&_div]:!pb-0 [&_div]:!mb-0 [&_div]:!-mx-0 [&_div]:!px-0">
              <BookCardRow 
                title="" 
                size="s" 
                books={[{ 
                  title: "내 인생을 바꾸는 독서의 힘", 
                  author: "김신영",
                }]} 
              />
            </div>
          </div>

          {/* 날짜 영역 */}
          <div className="flex items-center text-[#D1D1D1] gap-[24px]">
            <div className="flex flex-col gap-[4px]">
              <div className="flex items-center gap-[6px] text-[12px] text-gray-50">
                <AiFillCalendar size={12} />
                <span>시작</span>
              </div>
              <div className="flex items-center gap-[8px] cursor-pointer group" style={{ width: '160px' }}>
                {isEditingStart ? (
                  <input
                    ref={startInputRef}
                    type="text"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    onBlur={() => setIsEditingStart(false)}
                    className="bg-transparent border-b border-gray-50 text-[18px] text-gray-10 outline-none w-full"
                  />
                ) : (
                  <div className="flex items-center gap-[8px]" onClick={() => setIsEditingStart(true)}>
                    <span className="text-[18px] text-gray-10">{startDate} ~</span>
                    <BiSolidPencil size={12} className="text-gray-50 group-hover:text-white" />
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-[4px]">
              <div className="flex items-center gap-[6px] text-[12px] text-gray-50">
                <AiFillCalendar size={12} />
                <span>종료</span>
              </div>
              <div className="flex items-center gap-[8px] cursor-pointer group" style={{ width: '160px' }}>
                {isEditingEnd ? (
                  <input
                    ref={endInputRef}
                    type="text"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    onBlur={() => setIsEditingEnd(false)}
                    className="bg-transparent border-b border-gray-50 text-[18px] text-gray-10 outline-none w-full"
                  />
                ) : (
                  <div className="flex items-center gap-[8px]" onClick={() => setIsEditingEnd(true)}>
                    <span className="text-[18px] text-gray-10">{endDate}</span>
                    <BiSolidPencil size={12} className="text-gray-50 group-hover:text-white" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 등록 버튼 영역 */}
        <div className="relative" style={{ width: '200px', height: '56px', marginRight: '120px'}}>
          <div className="absolute flex items-center gap-[12px] whitespace-nowrap" style={{ bottom: 'calc(100% + 4px)', right: '-76px' }}>
            <div 
              className={`w-[52px] h-[32px] rounded-full p-[2px] cursor-pointer transition-colors duration-200 ease-in-out relative ${isShareEnabled ? 'bg-white' : 'bg-[#393735]'}`}
              onClick={() => setIsShareEnabled(!isShareEnabled)}
            >
              <div className={`w-[28px] h-[28px] rounded-full bg-black shadow-md transform transition-transform duration-200 ease-in-out ${isShareEnabled ? 'translate-x-[20px]' : 'translate-x-0'}`}></div>
            </div>
            <div className="flex flex-col items-start">
              <span className="text-white text-[15px] font-medium leading-tight">독후감 공유</span>
              <span className="text-[#757575] text-[12px] leading-tight">다른 유저가 내 독후감을 볼 수 있어요!</span>
            </div>
          </div>
          <div style={{ transform: 'translateY(16px)' }}>
            <BoxButtonPrimary label="독후감 등록" size="s" state="enabled" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostEditHeader;


