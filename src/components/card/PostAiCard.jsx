import React, { useState } from "react";
import { IoLogoOctocat } from "react-icons/io";
import PostAiCardItem from "./PostAiCardItem";

const PostAiCard = ({ onClose, currentText, onRestore }) => {
  const [isGenerated, setIsGenerated] = useState(false);
  const [generatedText, setGeneratedText] = useState("");
  const [backupText, setBackupText] = useState(""); 

  const forcedPretendard = {
    fontFamily: "'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif",
    WebkitFontSmoothing: "antialiased",
  };

  const handleGenerate = () => {
    setBackupText(currentText); 
    setIsGenerated(true);
    // AI가 생성한 텍스트 시뮬레이션
    setGeneratedText("AI 임시 텍스트 입니다"); 
  };

  const handleUndo = () => {
    if (onRestore && backupText) {
      onRestore(backupText); 
    }
    setIsGenerated(false);
    setGeneratedText("");
  };

  return (
    <div
      className="flex flex-col bg-gray-95 border-[1px] border-[#393735] rounded-[12px] box-border transition-all duration-300 ease-in-out shadow-2xl overflow-hidden"
      style={{
        width: "1040px",
        // 생성 전/후 높이 설정 (내용이 길어지면 auto로 확장됨)
        minHeight: isGenerated ? "134px" : "122px",
        height: "auto",
        padding: "12px 16px",
        ...forcedPretendard,
      }}
    >
      {/* 상단 레이아웃 */}
      <div className="flex flex-col gap-[16px] shrink-0">
        <div className="flex items-center gap-[6px] text-gray-50">
          <IoLogoOctocat size={20} />
          <span className="text-[16px] font-bold text-gray-20 font-pretendard">AI 추천</span>
        </div>
        
        {/* 이 영역에서 텍스트가 교체됩니다 */}
        <div className="min-h-[18px] transition-all duration-300">
          {isGenerated ? (
            <p className="text-gray-50 font-pretendard text-[12px] leading-relaxed animate-in fade-in duration-500">
              {generatedText}
            </p>
          ) : (
            <p className="text-gray-50 text-[12px] font-pretendard">
              고양이가 독후감 작성을 도와드려요!
            </p>
          )}
        </div>
      </div>

      {/* 하단 버튼 영역 */}
      <div className="w-full flex justify-between font-pretendard items-end mt-auto pt-[16px] shrink-0">
        <div className="flex gap-[12px] text-gray-30">
          {isGenerated ? (
            <>
              <PostAiCardItem
                label="되돌리기"
                onClick={handleUndo}
              />
              <PostAiCardItem
                label="다시 생성하기"
                onClick={handleGenerate} 
              />
            </>
          ) : (
            <>
              <PostAiCardItem label="오탈자 수정" onClick={() => {}} />
              <PostAiCardItem label="본문 다듬기" onClick={() => {}} />
              <PostAiCardItem
                label="문단 생성"
                onClick={handleGenerate}
              />
            </>
          )}
        </div>

        <button
          className={`
            flex items-center justify-center
            px-[10px] py-[6px] h-[30px] 
            bg-gray-10 rounded-[8px] font-bold text-[15px] transition-colors
            ${isGenerated ? "text-gray-80" : "text-gray-40 opacity-50"}
          `}
        >
          <span className="leading-none font-pretendard">본문에 삽입</span>
        </button>
      </div>
    </div>
  );
};

export default PostAiCard;