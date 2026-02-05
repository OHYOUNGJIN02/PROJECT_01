import React, { useMemo } from "react";
import {
    useCalendarStatQuery,
    useContinuousReadingDaysQuery,
    useReadingBooksQuery,
} from "../../../hooks/queries/useReadingQueries";

const SmallSummarizeWidget = ({ className }) => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;
    
    const targetMonthStr = `${currentYear}-${String(currentMonth).padStart(2, '0')}`;

    const { data: calendarResp, isLoading: isCalLoading } = useCalendarStatQuery(
        currentYear, 
        currentMonth
    );
    const { data: continuousDaysData } = useContinuousReadingDaysQuery();
    const { data: readingBooks = [] } = useReadingBooksQuery();

    const stats = useMemo(() => {
        const summary = calendarResp?.monthlySummary || {};
        const calendarObj = calendarResp?.calendar || {};

        
        const readBookTitles = new Set();      
        const completedBookTitles = new Set(); 

        Object.keys(calendarObj).forEach((dateKey) => {
            if (dateKey.startsWith(targetMonthStr)) {
                const dayData = calendarObj[dateKey];
                
                Object.values(dayData).forEach(value => {
                    if (Array.isArray(value)) {
                        value.forEach(record => {
                            const bookId = record.myBookId || record.title || record.bookTitle;
                            if (bookId) {
                                readBookTitles.add(bookId);
                                if (record.status === "COMPLETED") {
                                    completedBookTitles.add(bookId);
                                }
                            }
                        });
                    } else if (typeof value === 'object' && value !== null) {
                        const bookId = value.myBookId || value.title || value.bookTitle;
                        if (bookId) {
                            readBookTitles.add(bookId);
                            if (value.status === "COMPLETED") {
                                completedBookTitles.add(bookId);
                            }
                        }
                    }
                });
            }
        });

        const activeCount = readBookTitles.size;     
        const completedCount = completedBookTitles.size; 

        
        const totalReadPages = Number(summary.monthlyTotalPageCount || 0);
        const totalDaysRead = Number(summary.totalDaysRead || 0); 

        const continuousDays = typeof continuousDaysData === 'object'
            ? (continuousDaysData?.continuousReadingDays ?? 0)
            : (continuousDaysData ?? 0);

        const inProgressCount = readingBooks.length;

        const points = (completedCount * 500) + (totalReadPages * 10);

        return {
            totalReadPages,
            inProgressCount,
            activeCount,
            completedCount,
            continuousDays,
            totalDaysRead,
            points
        };
    }, [calendarResp, continuousDaysData, readingBooks, targetMonthStr]);

    if (isCalLoading && !calendarResp) return null;

    return (
        <div 
            className={`${className || ""} w-full h-full flex flex-col justify-between bg-transparent rounded-[12px]`}
            style={{ fontFamily: '"Pretendard Variable", sans-serif' }}
        >
            <div>
                <p className="font-bold text-gray-5 text-[16px]">“ 이번 달 나는 이렇게 읽었어요 ”</p>
                <p className="text-gray-50 text-[12px] font-normal">{currentMonth}월의 독서 기록</p>
            </div>

            <div className="flex flex-col justify-center flex-1 gap-[8px] py-[8px]">
                <p className="text-[14px] text-gray-40 leading-snug">
                    이번 달은 <span className="text-[var(--blue50)] font-bold">{stats.continuousDays}일 연속</span>으로<br />
                    총 <span className="text-white text-[20px] font-bold">{stats.totalDaysRead}일 동안</span> 집중했어요.
                </p>
                <p className="text-[14px] text-gray-40 leading-snug">
                    기록한 페이지는 <span className="text-[var(--yellow50)] font-medium">{stats.totalReadPages.toLocaleString()}쪽</span>이며,<br />
                    꾸준히 독서 습관을 만들어가고 있어요.
                </p>
            </div>

            {/* 하단 그리드 정보 */}
            <div className="mt-[8px] pt-[12px] border-t border-[#333333]">
                <div className="flex items-center justify-between text-[11px] text-gray-50">
                    <div className="flex gap-[12px]">
                        <div className="flex flex-col items-center gap-[2px]">
                            <span className="text-[12px] text-gray-40">읽는 중</span>
                            <span className="text-white font-bold text-[13px]">{stats.inProgressCount}</span>
                        </div>
                        <div className="flex flex-col items-center gap-[2px]">
                            <span className="text-[12px] text-blue-50">활동 도서</span>
                            <span className="text-blue-50 font-bold text-[13px]">{stats.activeCount}</span>
                        </div>
                        <div className="flex flex-col items-center gap-[2px]">
                            <span className="text-[12px] text-green-50">이번달 완독</span>
                            <span className="text-green-50 font-bold text-[13px]">{stats.completedCount}</span>
                        </div>
                    </div>
                    <div className="flex flex-col items-end gap-[2px]">
                        <span className="text-[12px] text-gray-60">총 읽은 페이지</span>
                        <span className="text-[var(--yellow50)] font-bold text-[14px]">
                            {stats.totalReadPages.toLocaleString()} P
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SmallSummarizeWidget;