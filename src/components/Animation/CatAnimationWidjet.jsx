import React, { useMemo } from "react";
import { motion } from "framer-motion";
import {
    useReadingBooksQuery,
    useContinuousReadingDaysQuery,
    useCalendarStatQuery,
} from "../../hooks/queries/useReadingQueries";

/**
 * CatAnimationWidjet
 * - state에 따라 애니메이션(src)과 말풍선 메시지(message) 변경
 */
function CatAnimationWidjet({ size = "small", state = "dashboard" }) {
    // 1. 사이즈 정의
    const sizeClasses = {
        small: "w-[200px] h-[100px]",
    };

    // ---------------------------------------------------------
    // 2. 데이터 조회 (Hooks)
    // ---------------------------------------------------------

    // (A) [공통/대시보드] 연속 독서 일수
    const { data: continuousDays = 0 } = useContinuousReadingDaysQuery();

    // (B) [서재] 읽고 있는 책 목록
    const { data: readingBooks = [], isLoading: isBooksLoading } =
        useReadingBooksQuery({
            enabled: state === "library",
        });

    // (C) [캘린더] 이번 달 페이지 수 조회
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;

    const { data: calendarResp } = useCalendarStatQuery(
        currentYear,
        currentMonth,
        {
            enabled: state === "calendar",
        },
    );

    // ---------------------------------------------------------
    // ✅ [추가] 실제 읽고 있는 책 권수 계산 (필터링)
    // ---------------------------------------------------------
    const activeBookCount = useMemo(() => {
        if (!Array.isArray(readingBooks)) return 0;

        // 완독(COMPLETED)이나 읽기 전(BEFORE)은 제외하고
        // 실제로 읽고 있는(IN_PROGRESS, READING) 책만 카운트
        return readingBooks.filter(
            (book) =>
                book.status === "IN_PROGRESS" || book.status === "READING",
        ).length;
    }, [readingBooks]);

    // ---------------------------------------------------------
    // 3. 메시지(말풍선) 결정 로직
    // ---------------------------------------------------------
    const message = useMemo(() => {
        const defaultMsg = "오늘도 책 읽기 도전! 🐾";

        switch (state) {
            case "dashboard":
                return continuousDays > 0
                    ? `🔥 ${continuousDays}일째 달리는 중`
                    : defaultMsg;

            case "library":
                // ✅ 수정: 전체 목록(readingBooks.length) 대신 필터링된 개수(activeBookCount) 사용
                return activeBookCount > 0
                    ? `📚 ${activeBookCount}권 읽는 중`
                    : defaultMsg;

            case "calendar":
                const pageCount =
                    calendarResp?.monthlySummary?.monthlyTotalPageCount ?? 0;
                return pageCount > 0
                    ? `이번 달 모은 페이지 수 ${pageCount}p`
                    : defaultMsg;

            case "review":
                return "읽은 책을 기록해볼까요 🐾";

            default:
                return defaultMsg;
        }
    }, [state, continuousDays, activeBookCount, calendarResp]);

    // ---------------------------------------------------------
    // 4. 비디오 소스(src) 결정 로직
    // ---------------------------------------------------------
    const src = useMemo(() => {
        if (state === "dashboard") return "/webm/dashboard.webm";
        if (state === "calendar") return "/webm/calendar.webm";
        if (state === "review") return "/webm/review.webm";

        if (state === "library") {
            // ✅ 수정: 필터링된 개수에 따라 비디오 변경
            const count = activeBookCount;

            if (count <= 2) return "/webm/libraryCount1.webm";
            if (count <= 7) return "/webm/libraryCount3.webm";
            if (count <= 19) return "/webm/libraryCount8.webm";
            return "/webm/libraryCount20.webm";
        }

        return "/webm/dashboard.webm";
    }, [state, activeBookCount]);

    // ---------------------------------------------------------
    // 5. 렌더링
    // ---------------------------------------------------------
    const isLibraryLoading = state === "library" && isBooksLoading;

    return (
        <div
            className={`${sizeClasses[size] ?? sizeClasses.small} relative inline-flex cursor-pointer items-center justify-center`}>
            {!isLibraryLoading && (
                <>
                    {/* 💬 말풍선 */}
                    <motion.div
                        className="absolute -top-[28px] left-1/2 -translate-x-1/2 z-20 pointer-events-none"
                        animate={{ y: [0, -4, 0] }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}>
                        <div className="relative text-[12px] text-gray-40 bg-gray-95 px-[10px] py-[4px] rounded-full shadow-sm whitespace-nowrap">
                            {message}
                            <span className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-gray-95" />
                        </div>
                    </motion.div>

                    {/* 🎥 비디오 (무한 재생) */}
                    <video
                        key={src} // ✅ src가 바뀌면 컴포넌트를 새로 그려서 바로 재생되게 함
                        src={src}
                        autoPlay // ✅ 자동 재생
                        loop // ✅ 무한 반복
                        muted // ✅ 자동 재생 정책 준수 (음소거 필수)
                        playsInline
                        className="block w-full h-full object-contain select-none z-10"
                        onError={(e) =>
                            console.error("❌ 비디오 에러:", e.target.error)
                        }
                    />
                </>
            )}
        </div>
    );
}

export default CatAnimationWidjet;
