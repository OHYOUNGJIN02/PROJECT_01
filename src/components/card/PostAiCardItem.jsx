import React from 'react';
import ChipButton from '../input/ChipButton';

const PostAiCardItem = ({ label, onClick }) => {
  return (
    <div 
      className={`
        shrink-0 
        w-[89px] 
        h-[28px] 
        /* 내부 버튼 스타일 강제 교정 */
        [&_button]:w-full 
        [&_button]:h-full 
        [&_button]:p-0 
        [&_button]:flex 
        [&_button]:items-center 
        [&_button]:justify-center 
        [&_button]:text-[16px] 
        [&_button]:font-semibold
        [&_button]:text-gray-30  /* 텍스트 색상 gray-30 적용 */
        [&_button]:tracking-[-1.2px] 
        [&_button]:whitespace-nowrap
        [&_button]:leading-none   /* 수직 중앙 정렬을 위해 행간 제거 */
        [&_button]:border-[#393735] /* 이미지와 유사한 테두리색 강제 */
        [&_button]:font-['Pretendard']
      `}
    >
      <ChipButton label={label} onClick={onClick} />
    </div>
  );
};

export default PostAiCardItem;