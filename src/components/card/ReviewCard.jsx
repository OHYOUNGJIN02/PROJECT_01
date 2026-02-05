import React from "react";
import BookCard from "./BookCard";
import Icon from "../property/Icon";

/**
 * ReviewCard
 * Component for displaying a book review.
 * Features a book thumbnail, user info, review content, and like status.
 *
 * @param {object} book - Book data object { title, coverImage, ... }
 * @param {string} userName - Name of the reviewer
 * @param {string} date - Review date string
 * @param {string} content - Review content text
 * @param {number} likeCount - Number of likes
 * @param {boolean} isLiked - Whether current user liked it
 */
function ReviewCard({
    book = {},
    userName = "User",
    date = "2024.01.01",
    content = "Review content...",
    likeCount = 0,
    isLiked = false,
    size = "default",
}) {

   
if (size === "s") {
    return (
        <div className="flex w-full px-[16px] py-[12px] h-full gap-[16px] items-center">
            {/* Book Thumbnail - 56x80으로 강제 고정 */}
            <div className="shrink-0 w-[56px] h-[80px] bg-gray-95 border border-gray-80 rounded-[6px] overflow-hidden shadow-lg relative
                [&_div]:w-full [&_div]:h-full [&_img]:w-full [&_img]:h-full [&_img]:object-cover">
                <BookCard size="s" book={book} />
            </div>

            {/* Content Area */}
            <div className="flex flex-col flex-1 min-w-0 justify-center">
                <h3 className="text-white text-[15px] font-bold font-pretendard truncate">
                    {book.title || "독후감 제목란"}
                </h3>
                
                {/* 유저명 추가 (4px 간격) */}
                <span className="text-gray-40 text-[12px] font-medium font-pretendard mt-[4px] truncate">
                    {userName}
                </span>
                
                {/* 좋아요 정보 */}
                <div className="flex items-center gap-1 mt-[8px]">
                    <Icon type="AiFillLike" size="s" isActived={isLiked} />
                    <span className="text-gray-50 text-[12px] font-medium font-pretendard">
                        {likeCount}
                    </span>
                </div>
            </div>

            {/* 우측 점 3개 메뉴 */}
            <div className="text-gray-600 self-start pt-1 shrink-0">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                </svg>
            </div>
        </div>
    );
}
    return (
        <div className="flex gap-4 p-4 w-full bg-gray-95 rounded-[12px] hover:border-gray-70 transition-colors cursor-pointer group">
            {/* Book Thumbnail (BookCard Size M) */}
            <div className="shrink-0">
                <BookCard size="m" book={book} />
            </div>

            

            {/* Review Content */}
            <div className="flex flex-col w-full gap-2 overflow-hidden">
                {/* Header: Book Title & Like */}
                <div className="flex justify-between items-start">
                    <h3 className="text-gray-10 text-[16px] font-bold font-['Pretendard'] truncate pr-2">
                        {book.title || "Book Title"}
                    </h3>

                    {/* Like Count */}
                    <div className="flex items-center gap-1 shrink-0">
                        <Icon type="AiFillLike" size="s" isActived={isLiked} />
                        <span
                            className={`text-[12px] font-medium font-['Pretendard'] ${
                                isLiked ? "text-gray-10" : "text-gray-50"
                            }`}>
                            {likeCount}
                        </span>
                    </div>
                </div>

                {/* User Info & Date */}
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                        <div className="flex items-center justify-center p-[2px] rounded-full bg-gray-80">
                            <Icon type="BiSolidUser" size="s" isActived={false} />
                        </div>
                        <span className="text-gray-40 text-[12px] font-medium font-['Pretendard']">
                            {userName}
                        </span>
                    </div>
                    <span className="text-gray-70 text-[10px]">•</span>
                    <span className="text-gray-50 text-[12px] font-medium font-['Pretendard']">
                        {date}
                    </span>
                </div>

                {/* Body Text */}
                <p className="text-gray-30 text-[14px] font-normal font-['Pretendard'] leading-[150%] line-clamp-2">
                    {content}
                </p>
            </div>
        </div>
    );
}

export default ReviewCard;