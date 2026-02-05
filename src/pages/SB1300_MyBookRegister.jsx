import React, { useState } from 'react';
import BoxButton from '../components/input/BoxButton';
import Label from '../components/property/Label';
import { AiFillCalendar } from 'react-icons/ai';

const SB1300_MyBookRegister = () => {
  const [pageValue, setPageValue] = useState('');
  const [isError, setIsError] = useState(false);

  // 숫자 이외의 입력 차단 (e, -, +, . 등 방지)
  const handleKeyDown = (e) => {
    const invalidChars = ['e', 'E', '-', '+', '.'];
    if (invalidChars.includes(e.key)) {
      e.preventDefault();
    }
  };

  const handlePageChange = (e) => {
    const value = e.target.value;
    setPageValue(value);

    // 1보다 작은 숫자인지 확인 (빈 값이 아닐 때)
    if (value !== '' && parseInt(value, 10) < 1) {
      setIsError(true);
    } else {
      setIsError(false);
    }
  };

  return (
    <>
      <div 
        className="flex flex-col box-border relative overflow-hidden select-none"
        style={{
          width: '1000px',
          height: '560px',
          borderRadius: '12px',
          border: '2px solid #393735',
          background: '#141414',
          boxShadow: '0 4px 12px 0 rgba(0, 0, 0, 0.50)',
          padding: '32px',
          fontFamily: 'Pretendard'
        }}
      >
        {/* 헤더: 뒤로가기 */}
        <div className="w-full flex items-center mb-[40px] shrink-0">
          <button className="flex items-center group">
            <div className="w-[32px] h-[32px] rounded-[8px] border border-[#393735] flex items-center justify-center mr-3 group-hover:border-gray-400 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8B8884" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-white transition-colors">
                <path d="M15 19l-7-7 7-7" />
              </svg>
            </div>
            <span className="text-[#8B8884] text-[16px] font-medium group-hover:text-white transition-colors">뒤로가기</span>
          </button>
        </div>

        {/* 메인 컨텐츠 */}
        <div className="w-full flex justify-center gap-[108px] h-full items-start px-[40px]">
          
          {/* 왼쪽: 북커버 등록 영역 */}
          <div className="flex flex-col items-center shrink-0">
            <div className="w-[240px] h-[360px] rounded-[12px] bg-[#0A0A0A] flex flex-col items-center justify-center border border-[#2A2A2A] shadow-inner gap-4">
              <Label label="북커버 등록" size="s" isActived={true} />
            </div>
          </div>

          {/* 오른쪽: 입력 폼 섹션 */}
          <div className="flex flex-col justify-start" style={{ width: '400px' }}>
            <h1 className="text-[28px] font-bold text-[#8B8884] mb-[32px] whitespace-nowrap">
              책 제목을 입력하세요
            </h1>

            <div className="flex flex-col gap-[20px] mb-[40px]">
              
              {/* 저자 입력 */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-1.5 mb-1">
                  <AiFillCalendar color="#8B8884 " size={12}/>
                  <span className="text-[#8B8884] text-[14px]">저자</span>
                </div>
                <input 
                  type="text" 
                  placeholder="저자를 입력해주세요" 
                  style={{ width: '400px', height: '36px' }}
                  className="bg-[#2A2A2A] rounded-[8px] px-3 text-white text-[14px] placeholder-[#505050] border border-transparent focus:border-[#8B8884] outline-none transition-all"
                />
              </div>

              {/* 페이지 입력 */}
              <div className="flex flex-col gap-2 relative">
                <div className="flex items-center gap-1.5 mb-1">
                  <AiFillCalendar color="#8B8884" size={12}/>
                  <span className="text-[#8B8884] text-[14px]">페이지</span>
                </div>
                <input 
                  type="number" 
                  min="1"
                  value={pageValue}
                  onChange={handlePageChange}
                  onKeyDown={handleKeyDown}
                  placeholder="총 페이지 수를 입력해주세요" 
                  style={{ 
                    width: '400px', 
                    height: '36px',
                    borderColor: isError ? '#EF4444' : 'transparent' 
                  }}
                  className={`bg-[#2A2A2A] rounded-[8px] px-3 text-white text-[14px] placeholder-[#505050] border-2 outline-none transition-all`}
                />
                {isError && (
                  <span className="text-[#EF4444] text-[12px] mt-1 absolute -bottom-6 left-0">
                    페이지는 1페이지보다 작을 수 없습니다.
                  </span>
                )}
              </div>

            </div>

            {/* 하단 버튼 */}
            <div style={{ width: '356px', height: '52px', marginTop: isError ? '16px' : '0px' }}>
              <BoxButton label="내 서재에 추가하기" size="m" state={isError ? "disabled" : "enabled"} />
            </div>

          </div>
        </div>
      </div>

      <style>{`
        @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');
        * { font-family: 'Pretendard', sans-serif !important; box-sizing: border-box; }
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
      `}</style>
    </>
  );
};

export default SB1300_MyBookRegister;