import React, { useState, useMemo, useEffect, useRef } from "react";
import { useMyBookListQuery } from "../../../hooks/queries/useBookQueries";
import Icon from "../../property/Icon";
import BookCardRow from "../../card/BookCardRow"; // 경로 확인 필요
import TextField from "../../input/TextField"; // 경로 확인 필요

const BookButton = ({ imgSrc, onClick }) => (
    <button
        onClick={onClick}
        className="relative w-[69px] h-[100px] rounded-[6px] border-[1px] border-gray-80 bg-gray-90 overflow-hidden 
    hover:scale-110 hover:border-white hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:z-10 
    transition-all duration-300 ease-out group shrink-0">
        {imgSrc ? (
            <img
                src={imgSrc}
                alt="Book"
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
            />
        ) : (
            <div className="w-full h-full bg-gray-90 flex items-center justify-center">
                <span className="text-gray-80 text-[12px]">No Image</span>
            </div>
        )}
    </button>
);

const ShelfLine = () => (
    <div className="w-full h-[12px] bg-gray-90 rounded-full mt-[8px] mb-[16px] shadow-sm shrink-0"></div>
);

export default function WriteReview({ className }) {
    const [pageIndex, setPageIndex] = useState(0);
    const [selectedBook, setSelectedBook] = useState(null); // 선택된 책 상태
    const slideRef = useRef(null);

    const { data: books = [] } = useMyBookListQuery();

    const { allThumbnails, totalPages } = useMemo(() => {
        const thumbnails = books
            .filter((book) => book.status === "IN_PROGRESS" && book.thumbnail)
            .map((book) => ({
                id: book.id,
                thumbnail: book.thumbnail,
                title: book.title,
                author: book.author
            }));
        const totalPages = Math.max(1, Math.ceil(thumbnails.length / 6));
        return { allThumbnails: thumbnails, totalPages };
    }, [books]);

    useEffect(() => {
        setPageIndex(0);
    }, [totalPages]);

    useEffect(() => {
        if (!slideRef.current) return;
        slideRef.current.style.transform = `translateX(-${pageIndex * 100}%)`;
    }, [pageIndex]);

    const handleNext = () => {
        if (totalPages <= 1) return;
        setPageIndex((prev) => (prev + 1) % totalPages);
    };

    const handlePrev = () => {
        if (totalPages <= 1) return;
        setPageIndex((prev) => (prev - 1 + totalPages) % totalPages);
    };

    return (
        <div
            className={`${className} flex flex-row w-full justify-between items-center h-[340px] bg-gray-95 rounded-[12px] relative font-pretendard box-border overflow-hidden px-10 transition-all duration-500`}
            style={{ fontFamily: '"Pretendard Variable", Pretendard, sans-serif' }}>
            
            {/* 1. 왼쪽 컨텐츠 영역 */}
            <div className="flex flex-col h-full z-20 bg-gray-95 pr-6 w-[420px] justify-start pt-10">
                {!selectedBook ? (
                    /* 초기 상태: 텍스트 가이드 */
                    <div className="animate-fadeIn">
                        <h2 className="text-gray-5 text-[20px] font-normal leading-[1.35] tracking-tight text-left">
                            오늘의 독서기록을
                            <br />
                            <span className="font-normal text-gray-5">입력해주세요</span>
                        </h2>
                        <p className="text-gray-50 text-[12px] font-normal text-left mt-2">
                            진행 중인 도서 {allThumbnails.length}권
                        </p>
                    </div>
                ) : (
                    /* 선택 상태: 책 정보 + 입력 폼 */
                    <div className="flex flex-col gap-6 animate-fadeIn">
                        <div className="-ml-4"> {/* 여백 조절 */}
                            <BookCardRow 
                                title="" 
                                size="m" 
                                books={[{ 
                                    title: selectedBook.title || "내 인생을 바꾸는 독서의 힘", 
                                    author: selectedBook.author || "김신영",
                                }]} 
                            />
                        </div>
                        <div className="flex flex-col gap-3">
                            <p className="text-gray-5 text-[16px] font-medium">
                                오늘은 몇페이지까지 읽으셨나요? 🤔
                            </p>
                            <div style={{ width: '320px', height: '36px' }}>
                                <TextField state="enabled" placeholder="페이지 번호를 입력해주세요" />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* 2. 오른쪽 책장 슬라이더 영역 */}
            <div className="relative w-[300px] h-[280px] flex items-center justify-center overflow-hidden shrink-0">
                <div
                    ref={slideRef}
                    className="flex h-full w-full transition-transform duration-500 ease-in-out"
                    style={{
                        width: `${totalPages * 100}%`,
                    }}>
                    {Array.from({ length: totalPages }).map((_, pageIdx) => {
                        const startIdx = pageIdx * 6;
                        const pageBooks = allThumbnails.slice(startIdx, startIdx + 6);
                        const paddedBooks = [
                            ...pageBooks,
                            ...Array(6 - pageBooks.length).fill(null),
                        ];

                        return (
                            <div
                                key={pageIdx}
                                className="w-full shrink-0 flex flex-col items-center justify-center"
                                style={{ width: `${100 / totalPages}%` }}
                            >
                                <div className="flex gap-[12px] justify-center w-full pt-[10px]">
                                    {paddedBooks.slice(0, 3).map((book, i) => (
                                        <BookButton 
                                            key={`row1-${i}`} 
                                            imgSrc={book?.thumbnail} 
                                            onClick={() => book && setSelectedBook(book)} 
                                        />
                                    ))}
                                </div>
                                <ShelfLine />
                                <div className="flex gap-[12px] justify-center w-full">
                                    {paddedBooks.slice(3, 6).map((book, i) => (
                                        <BookButton 
                                            key={`row2-${i}`} 
                                            imgSrc={book?.thumbnail} 
                                            onClick={() => book && setSelectedBook(book)} 
                                        />
                                    ))}
                                </div>
                                <ShelfLine />
                            </div>
                        );
                    })}
                </div>

                {totalPages > 1 && (
                    <div className="absolute inset-0 pointer-events-none flex items-center justify-between z-30 -mx-4">
                        <button
                            onClick={handlePrev}
                            className="pointer-events-auto hover:bg-gray-80/50 rounded-full transition-colors p-1 cursor-pointer">
                            <Icon type="BiChevronLeft" size="l" isActived={true} />
                        </button>
                        <button
                            onClick={handleNext}
                            className="pointer-events-auto hover:bg-gray-80/50 rounded-full transition-colors p-1 cursor-pointer">
                            <Icon type="BiChevronRight" size="l" isActived={true} />
                        </button>
                    </div>
                )}
            </div>

            <style>{`
                .animate-fadeIn {
                    animation: fadeIn 0.4s ease-out;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(5px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}