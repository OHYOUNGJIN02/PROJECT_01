import { request } from "./resp";

/**
 * 읽고 있는 책 목록 조회
 * GET /book/reading/list
 */
export const getReadingBooks = () => {
    return request({ method: "GET", url: "/book/reading/list" });
};

/**
 * 읽기 시작
 * POST /book/reading/start/{myBookId}
 */
export const startReading = (myBookId) => {
    return request({ method: "POST", url: `/book/reading/start/${myBookId}` });
};

/**
 * 독서 기록 업데이트
 * POST /book/reading/progress/record
 */
export const recordProgress = (payload) => {
    return request({
        method: "POST",
        url: "/book/reading/progress/record",
        data: payload,
    });
};

/**
 * 읽기 중단/완독
 * POST /book/reading/stop/{readingBookId}?completed=...
 */
export const stopReading = (readingBookId, completed) => {
    return request({
        method: "POST",
        url: `/book/reading/stop/${readingBookId}`,
        params: { completed },
    });
};

/**
 * 일별 독서 기록 조회
 * GET /book/reading/progress/daily?date=yyyy-MM-dd
 */
export const getDailyProgress = (date) => {
    return request({
        method: "GET",
        url: "/book/reading/progress/daily",
        params: { date },
    });
};

/**
 * 월간 캘린더/통계 데이터 조회
 * GET /book/reading/progress/calendar?year=...&month=...
 */
export const getCalendarData = (year, month) => {
    return request({
        method: "GET",
        url: "/book/reading/progress/calendar",
        params: { year, month },
    });
};

/**
 * 주간 그래프 데이터 조회 (특정 책)
 * GET /book/reading/progress/weekly/{readingBookId}
 */
export const getWeeklyProgressByBook = (readingBookId) => {
    return request({
        method: "GET",
        url: `/book/reading/progress/weekly/${readingBookId}`,
    });
};

/**
 * 주간 그래프 데이터 조회 (전체 책)
 * GET /book/reading/progress/weekly
 */
export const getWeeklyProgress = () => {
    return request({
        method: "GET",
        url: "/book/reading/progress/weekly",
    });
};