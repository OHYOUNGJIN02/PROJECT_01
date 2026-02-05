/**
 * React Query의 Query Key를 중앙 관리하는 파일입니다.
 * - API 파일 구조(accountApi, bookApi...)와 통일성을 맞춥니다.
 */

export const queryKeys = {
    // 1. 계정 & 내 정보 (Account)
    account: {
        me: () => ["account", "me"], // 내 정보 조회
    },

    // 2. 도서 (Book - 외부 검색 및 추천)
    book: {
        // 알라딘 검색
        aladinSearch: (keyword, start = 1, maxResults = 10) => [
            "book",
            "aladinSearch",
            keyword,
            start,
            maxResults,
        ],
        // AI 도서 추천 (Gemini)
        aiRecommend: () => ["book", "aiRecommend"],
        // 사용자 카테고리 기반 추천
        categoryRecommend: () => ["book", "categoryRecommend"],
        // 가장 오래된(읽다 만) 책 조회
        oldest: () => ["book", "oldest"],
    },

    // 3. 내 서재 (Library - DB)
    library: {
        myBooks: () => ["library", "myBooks"], // 서재 전체 목록
        myBookDetail: (myBookId) => ["library", "myBookDetail", myBookId], // 특정 도서 상세
        search: (keyword) => ["library", "search", keyword], // 서재 내 검색
        oldest: () => ["library", "oldest"], // 읽다 만 가장 오래된 책 (5개)
    },

    // 4. 독서 활동 & 통계 (Reading)
    reading: {
        books: () => ["reading", "books"], // 현재 읽고 있는 책 리스트
        daily: (date) => ["reading", "daily", date], // 특정 날짜의 기록
        calendar: (year, month) => ["reading", "calendar", year, month], // 월별 통계
        weekly: (readingBookId) => [
            "reading",
            "weekly",
            readingBookId || "all",
        ], // 주간 통계 (책별/전체)
    },

    // 5. 독후감 (Review)
    review: {
        detail: (reviewId) => ["review", "detail", reviewId], // 독후감 상세
        myList: () => ["review", "myList"], // 내 독후감 목록
        likedList: () => ["review", "likedList"], // 내가 좋아요한 목록
    },
};
