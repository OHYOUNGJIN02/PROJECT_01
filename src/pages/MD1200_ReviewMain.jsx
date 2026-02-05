import React, { useState, useRef, useEffect } from 'react';
import { AiOutlineEye, AiOutlineCalendar, AiFillLike, AiOutlinePlus, AiOutlineClose } from 'react-icons/ai';
import { BiSolidPencil } from 'react-icons/bi';
import BookCardRow from '../components/card/BookCardRow';
import BoxButton from '../components/input/BoxButton';
import ReviewCard from '../components/card/ReviewCard';
import PostEditHeader from "../components/gnb/PostEditHeader";
import PostAiCard from "../components/card/PostAiCard";

const MD1200_ReviewMain = () => {
  // 화면 전환을 위한 상태만 추가
  const [isEditing, setIsEditing] = useState(false);

  // MD1100_ReviewRegister 로직 그대로 복사
  const [buttonTop, setButtonTop] = useState(0);
  const [isAiCardOpen, setIsAiCardOpen] = useState(false);
  const textareaRef = useRef(null);
  const containerRef = useRef(null);
  const [content, setContent] = useState("");

  const ADJUST_X = -48;   
  const START_Y = 125;    
  const LINE_HEIGHT = 25.6;

  const forcedPretendard = {
    fontFamily: "'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif",
    WebkitFontSmoothing: 'antialiased',
  };

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsAiCardOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isAiCardOpen]);

  // --- 렌더링 분기 ---
  if (isEditing) {
    // 🟢 사용자가 준 MD1100_ReviewRegister 코드 그대로 렌더링
    return (
      <div className="w-[calc(100%+80px)] -mx-[40px] min-h-screen bg-transparent flex flex-col items-center overflow-x-hidden">
        <style>{`main::-webkit-scrollbar { display: none !important; } main { -ms-overflow-style: none !important; scrollbar-width: none !important; } `}</style>
        <div className="w-full shrink-0 flex justify-center"><PostEditHeader /></div>
        <div ref={containerRef} className="flex flex-col bg-gray-95 mt-[40px] mb-[40px] box-border shrink-0 relative" style={{ width: "1100px", height: "980px", minHeight: "1000px", padding: "20px 60px", ...forcedPretendard }}>
          <div onClick={() => setIsAiCardOpen(!isAiCardOpen)} className={`absolute flex items-center justify-center w-[32px] h-[32px] rounded-md cursor-pointer transition-all duration-100 ease-out z-[110] ${isAiCardOpen ? 'bg-gray-95 text-gray-50' : 'bg-gray-95 text-gray-50 hover:bg-gray-60'}`} style={{ left: `${ADJUST_X}px`, top: `${START_Y + buttonTop}px` }}>
            {isAiCardOpen ? <AiOutlineClose size={18} /> : <AiOutlinePlus size={18} />}
          </div>
          {isAiCardOpen && (
            <div className="absolute left-0 w-full flex justify-center pointer-events-none" style={{ top: `${START_Y + buttonTop + LINE_HEIGHT + 8}px`, zIndex: 100 }}>
              <div className="pointer-events-auto animate-in fade-in slide-in-from-top-2 duration-300">
                <PostAiCard onClose={() => setIsAiCardOpen(false)} currentText={content} onRestore={(text) => setContent(text)} />
              </div>
            </div>
          )}
          <div className="w-full flex flex-col gap-[20px] mt-[40px]">
            <input type="text" placeholder="제목을 입력해주세요" className="w-full font-pretendard bg-transparent text-[32px] font-bold text-gray-10 outline-none border-none p-0 placeholder:text-gray-50" />
            <div className="w-full h-[1px] bg-gray-90" />
          </div>
          <textarea ref={textareaRef} placeholder="독서 경험을 공유해보세요" value={content} onChange={(e) => setContent(e.target.value)} onInput={handlePositionUpdate} onSelect={handlePositionUpdate} onKeyUp={handlePositionUpdate} spellCheck="false" className="w-full flex-1 bg-transparent font-pretendard text-gray-10 text-[16px] leading-[1.6] outline-none border-none p-0 resize-none placeholder:text-gray-60" />
        </div>
      </div>
    );
  }

  // 🔵 사용자가 준 MD1200_ReviewMain 코드 그대로 렌더링
  return (
    <div className=" bg-transparent flex items-centerjustify-center overflow-x-hidden font-pretendard">
      <div className="relative flex justify-center w-full max-w-[1200px]">
        <div className="absolute top-0" style={{ transform: 'translateX(-410px)' }}> 
          <div className="flex flex-col gap-[16px]">
            <div className="w-[80px] h-[86px] py-[16px] flex flex-col items-center justify-center bg-[#121110] border border-[#393735] rounded-[14px] shadow-lg">
              <AiFillLike size={24} className="text-[#D1D1D1] mb-[6px]" />
              <span className="text-[#D1D1D1] text-[14px] font-medium">142</span>
            </div>
            {/* 수정 버튼 누르면 전환 */}
            <div onClick={() => setIsEditing(true)} className="w-[80px] h-[86px] py-[16px] flex flex-col gap-[8px] items-center justify-center bg-[#121110] border border-[#393735] rounded-[14px] shadow-lg cursor-pointer hover:bg-[#1A1A1A] transition-colors">
              <BiSolidPencil size={24} className="text-[#D1D1D1]" />
              <span className="text-[#D1D1D1] text-[14px] font-medium">수정</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center box-border bg-[#121110] border border-[#393735] rounded-[16px] z-10 shadow-xl" style={{ width: '720px', padding: '32px 40px', ...forcedPretendard }}>
          <div className="w-[640px] flex flex-col gap-[12px] mb-[20px] text-left shrink-0">
            <div className="flex items-center gap-[8px]">
              <span className="px-[12px] py-[4px] bg-[#2A2A2A] rounded-[99px] text-[#D1D1D1] text-[12px]">자기개발</span>
              <div className="flex items-center gap-[4px] text-[#757575] text-[12px]"><AiOutlineEye size={16} /><span>1,234</span></div>
            </div>
            <h1 className="text-white text-[28px] font-bold leading-tight">내가 바뀌게 된 독서란 대단해</h1>
            <div className="flex items-center gap-[8px] text-[#757575] text-[14px]"><AiOutlineCalendar size={16} /><span>2025.01.26</span></div>
          </div>
          <div className="w-[640px] h-[104px] p-[11px] bg-gray-90 border border-[#393735] rounded-[12px] mb-[27px] shrink-0"><BookCardRow books={[{ title: "내 인생을 바꾸는 독서의 힘", author: "김신영 저", genre: "자기개발" }]} size="m" /></div>
          <div className="w-[640px] h-[45.5px] flex items-center px-[20px] gap-[16px] bg-gray-90 border border-[#393735] rounded-[12px] mb-[27px] shrink-0"><span className="text-[#D1D1D1] text-[14px] font-medium">독서기간</span><span className="text-[#757575] text-[14px]">2025.06.17 ~ 2025.07.12</span></div>
          <div className="w-[640px] h-[1px] bg-[#393735] mb-[32px] shrink-0" />
          <div className="w-[640px] flex flex-col gap-[24px] text-[#D1D1D1] text-[15px] leading-[1.8] text-left mb-[40px]"><p>처음 이 책의 첫 장을 넘겼을 때 느껴졌던 그 서늘한 공기를 아직도 기억한다. ... </p></div>
          <div className="w-[640px] h-[177px] flex flex-col justify-between p-[24px] bg-gray-90 border border-[#393735] rounded-[14px] shrink-0">
            <div className="flex justify-between items-start w-full">
              <div className="flex items-center gap-[12px]"><div className="w-[48px] h-[48px] rounded-full bg-[#D9D9D9] shrink-0" /><div className="flex flex-col"><span className="text-white text-[16px] font-bold">김독서</span><span className="text-[#757575] text-[12px]">@kimdokseo</span></div></div>
              <button className="px-[20px] py-[8px] bg-[#EFEFEF] rounded-[99px] text-[#121110] text-[14px] font-bold hover:bg-white transition-colors">팔로우</button>
            </div>
            <p className="text-[#9CA3AF] text-[14px]">책을 사랑하는 독서가입니다. 주로 인문학과 자기개발 분야를 읽습니다.</p>
            <div className="flex items-center gap-[24px]"><div className="flex flex-col"><span className="text-white font-bold">156</span><span className="text-[#757575] text-[12px]">독후감</span></div><div className="flex flex-col"><span className="text-white font-bold">1.2K</span><span className="text-[#757575] text-[12px]">팔로워</span></div><div className="flex flex-col"><span className="text-white font-bold">389</span><span className="text-[#757575] text-[12px]">팔로잉</span></div></div>
          </div>
        </div>

        <div className="absolute top-0" style={{ transform: 'translateX(530px)' }}>
          <div className="flex flex-col items-start bg-transparent border border-[#393735] rounded-[16px] box-border shadow-lg" style={{ width: '320px', height: '476px', padding: '20px', gap: '16px', ...forcedPretendard }}>
            <span className="text-white text-[16px] font-bold">비슷한 독후감</span>
            <div className="w-full flex flex-col gap-[16px] flex-1">
              {[1, 2, 3].map((item) => (
                <div key={item} className="bg-gray-95 border border-[#393735] rounded-[12px] overflow-hidden hover:border-gray-60 transition-colors" style={{ width: '280px', height: '104px' }}>
                  <ReviewCard size="s" book={{ title: '독후감 제목란' }} userName="작성자명" likeCount="12K" />
                </div>
              ))}
            </div>
            <div className="w-full flex justify-center mt-auto">
              <div style={{ width: '280px', height: '36px', display: 'flex' }} className="[&_button]:!h-full [&_button]:!w-full [&_button]:!py-0 [&_button]:!px-[32px] [&_button]:!min-h-0 [&_button]:!text-[14px] [&_button]:!rounded-[8px]"><BoxButton label="더 많은 독후감 보기" size="s" state="enabled" /></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MD1200_ReviewMain;