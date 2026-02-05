import React from "react";
import BookCard from "./BookCard";

/**
 * BookCardRow
 * 제목과 함께 BookCard들을 가로로 스크롤 가능한 행으로 보여주는 컴포넌트입니다.
 *
 * @param {string} title - 섹션 제목
 * @param {Array} books - 도서 객체 배열 { title, author, genre, ... }
 * @param {string} size - 'l' | 'm' | 's' (BookCard에 전달됨)
 */
function BookCardRow({ title, books = [], size = "s" }) {
    return (
        <div className="flex flex-col gap-4 w-full">
            {/* 제목 섹션 */}
            {title && (
                <div className="flex justify-between items-end px-1">
                    <h2 className="text-[20px] font-bold text-gray-10 font-['Pretendard']">
                        {title}
                    </h2>
                    {/* 선택 사항: '모두 보기' 버튼이 여기에 위치할 수 있음 */}
                </div>
            )}

            {/* 가로 스크롤 리스트 */}
            <div className="flex gap- overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 scroll-smooth">
                {books.map((book, index) => (
                    <div key={index} className="shrink-0">
                        <BookCard size={size} book={book} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BookCardRow;
