import React, { useState, useRef, useEffect } from "react";
import PostEditHeader from "../components/gnb/PostEditHeader";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
import PostAiCard from "../components/card/PostAiCard";

const MD1100_ReviewRegister = () => {
  const [buttonTop, setButtonTop] = useState(0);
  const [isAiCardOpen, setIsAiCardOpen] = useState(false);
  const textareaRef = useRef(null);
  const containerRef = useRef(null);
  const [content, setContent] = useState("");

  // --- 🛠 수치 조절 변수 ---
  const ADJUST_X = -48;   
  const START_Y = 125;    
  const LINE_HEIGHT = 25.6; // 16px * 1.6
  // -----------------------

  const forcedPretendard = {
    fontFamily: "'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif",
    WebkitFontSmoothing: "antialiased",
  };

  /**
   * 자동 줄바꿈을 고려하여 현재 커서의 줄 번호를 계산
   */
  const getCaretLineCount = (textarea) => {
    if (!textarea) return 1;

    const text = textarea.value.substring(0, textarea.selectionStart);
    const style = window.getComputedStyle(textarea);
    const font = style.font;
    const paddingLeft = parseFloat(style.paddingLeft);
    const paddingRight = parseFloat(style.paddingRight);
    
    const maxWidth = textarea.clientWidth - paddingLeft - paddingRight;

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    context.font = font;

    const lines = text.split("\n");
    let currentLine = 0;

    lines.forEach((lineText, index) => {
      const lineWidth = context.measureText(lineText).width;
      const wrappedLines = Math.max(1, Math.ceil(lineWidth / maxWidth));
      currentLine += wrappedLines;
    });

    return currentLine;
  };

  const handlePositionUpdate = () => {
    if (textareaRef.current) {
      const lineCount = getCaretLineCount(textareaRef.current);
      setButtonTop((lineCount - 1) * LINE_HEIGHT);
    }
  };

  const handlePlusClick = () => {
    setIsAiCardOpen(!isAiCardOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsAiCardOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isAiCardOpen]);

  return (
    <div className="w-[calc(100%+80px)] -mx-[40px] min-h-screen bg-transparent flex flex-col items-center overflow-x-hidden">
      <style>
        {`
          main::-webkit-scrollbar { display: none !important; }
          main { -ms-overflow-style: none !important; scrollbar-width: none !important; }
        `}
      </style>
      
      <div className="w-full shrink-0 flex justify-center">
        <PostEditHeader />
      </div>

      <div
        ref={containerRef}
        className="flex flex-col bg-gray-95 mt-[40px] mb-[40px] box-border shrink-0 relative"
        style={{
          width: "1100px",
          height: "980px",
          minHeight: "1000px",
          padding: "20px 60px",
          ...forcedPretendard,
        }}
      >
        {/* 플러스/닫기 버튼: 현재 커서 줄 높이 유지 */}
        <div 
          onClick={handlePlusClick}
          className={`absolute flex items-center justify-center w-[32px] h-[32px] rounded-md cursor-pointer transition-all duration-100 ease-out z-[110]
            ${isAiCardOpen ? 'bg-gray-95 text-gray-50' : 'bg-gray-95 text-gray-50 hover:bg-gray-60'}`}
          style={{ 
            left: `${ADJUST_X}px`,
            top: `${START_Y + buttonTop}px`,
          }}
        >
          {isAiCardOpen ? <AiOutlineClose size={18} /> : <AiOutlinePlus size={18} />}
        </div>

        {/* PostAiCard: 버튼 높이(buttonTop) + LINE_HEIGHT를 더해 다음 줄에 표시 */}
        {isAiCardOpen && (
          <div 
            className="absolute left-0 w-full flex justify-center pointer-events-none"
            style={{ 
              top: `${START_Y + buttonTop + LINE_HEIGHT + 8}px`, // 줄 간격 + 여백(8px) 추가
              zIndex: 100 
            }}
          >
            <div className="pointer-events-auto animate-in fade-in slide-in-from-top-2 duration-300">
              <PostAiCard 
                onClose={() => setIsAiCardOpen(false)} 
                currentText={content} // 현재 작성된 글 넘겨주기
                onRestore={(text) => setContent(text)} // 복구 함수 넘겨주기
              />
            </div>
          </div>
        )}

        {/* 제목 영역 */}
        <div className="w-full flex flex-col gap-[20px] mt-[40px]">
          <input
            type="text"
            placeholder="제목을 입력해주세요"
            className="w-full font-pretendard bg-transparent text-[32px] font-bold text-gray-10 outline-none border-none p-0 placeholder:text-gray-50"
          />
          <div className="w-full h-[1px] bg-gray-90" />
        </div>

        {/* 본문 영역 */}
        <textarea
          ref={textareaRef}
          placeholder="독서 경험을 공유해보세요"
          onInput={handlePositionUpdate}
          onSelect={handlePositionUpdate}
          onKeyUp={handlePositionUpdate}
          spellCheck="false"
          className="w-full flex-1 bg-transparent font-pretendard text-gray-10 text-[16px] leading-[1.6] outline-none border-none p-0 resize-none placeholder:text-gray-60"
        />
      </div>
    </div>
  );
};

export default MD1100_ReviewRegister;