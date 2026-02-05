import React, { useState, useEffect, useMemo } from "react";
// ✅ useReadingQueries 대신 useBookQueries에서 내 서재 목록 쿼리를 가져옵니다.
import { useMyBookListQuery } from "../../../hooks/queries/useBookQueries";

const SmallRoutineWidget = ({ className = "" }) => {
    const [isMounted, setIsMounted] = useState(false);
    
    // ✅ 내 서재 전체 목록 데이터 호출 (createDt, updateDt가 포함된 엔티티 기반)
    const { data: myBooks = [], isLoading } = useMyBookListQuery();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const timeStats = useMemo(() => {
        const stats = { morning: 0, afternoon: 0, night: 0, total: 0 };

        if (myBooks && myBooks.length > 0) {
            myBooks.forEach((book) => {
                // ✅ 엔티티에 존재하는 createDt 또는 updateDt 사용
                const rawDate = book.createDt || book.updateDt;
                if (!rawDate) return;

                let hour = -1;

                // 1. 문자열 형태 처리 ("2026-02-02T14:30:00")
                if (typeof rawDate === "string") {
                    const match = rawDate.match(/[T\s](\d{2}):/);
                    if (match) {
                        hour = parseInt(match[1], 10);
                    } else {
                        const d = new Date(rawDate);
                        if (!isNaN(d.getTime())) hour = d.getHours();
                    }
                } 
                // 2. 배열 형태 처리 (LocalDateTime이 JSON 배열로 올 경우 [2026, 2, 2, 14, 30])
                else if (Array.isArray(rawDate) && rawDate.length >= 4) {
                    hour = rawDate[3];
                }

                if (hour !== -1) {
                    if (hour >= 5 && hour < 12) stats.morning++;
                    else if (hour >= 12 && hour < 18) stats.afternoon++;
                    else stats.night++;
                    stats.total++;
                }
            });
        }

        const { morning, afternoon, night, total } = stats;
        const getPercent = (val) => total === 0 ? 0 : Math.round((val / total) * 100);

        // ✅ 순서 고정: 아침 -> 낮 -> 밤
        return [
            { id: "morning", label: "🌅 아침 독서", value: getPercent(morning), color: "bg-[#FFD233]", textColor: "text-[#FFD233]" },
            { id: "afternoon", label: "☀️ 낮 독서", value: getPercent(afternoon), color: "bg-[#33A1FF]", textColor: "text-[#33A1FF]" },
            { id: "night", label: "🌙 밤 독서", value: getPercent(night), color: "bg-[#7E69FE]", textColor: "text-[#7E69FE]" },
        ];
    }, [myBooks]);

    if (isLoading) return <div className={`${className} bg-[#1A1A1A] animate-pulse rounded-[12px] h-[180px] w-full`} />;

    return (
        <div className={`${className} w-full h-full flex flex-col mb-[5px] justify-between bg-transparent rounded-[12px] box-border`}>
            <div>
                <p className="font-bold text-gray-5 text-[16px]">“ 나는 보통 이 시간에 책을 읽어요 ”</p>
                <p className="text-gray-50 text-[12px] font-normal">
                    {myBooks.length > 0 ? "서재 등록 시간대 분석" : "등록된 도서가 없습니다."}
                </p>
            </div>

            <div className="flex flex-col justify-end gap-[12px] mt-[6px] flex-1">
                {timeStats.map((item) => (
                    <div key={item.id} className="flex flex-col w-full gap-[6px]">
                        <div className="flex justify-between items-center text-[12px]">
                            <span className="text-gray-40 font-medium">{item.label}</span>
                            <span className={`${item.textColor} font-bold`}>{item.value}%</span>
                        </div>
                        <div className="relative w-full h-[8px] bg-[#333333] rounded-full overflow-hidden">
                            <div
                                className={`absolute top-0 left-0 h-full ${item.color} rounded-full transition-all duration-1000 ease-in-out`}
                                style={{ width: isMounted ? `${item.value}%` : "0%" }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SmallRoutineWidget;