import { request } from "./resp";

/**
 * 알라딘 검색 (백엔드 래핑)
 * GET /book/aladin/search
 */
export const searchAladin = (keyword, start = 1, maxResults = 10) => {
    return request({
        url: "/book/aladin/search",
        method: "GET",
        params: { keyword, start, maxResults },
    });
};

/**
 * 알라딘 상세 저장 (book_tb upsert)
 * POST /book/aladin/detail/save
 */
export const saveAladinDetailToCache = (isbn) => {
    return request({
        url: "/book/aladin/detail/save",
        method: "POST",
        params: { isbn },
    });
};

/**
 * 내 서재 목록 조회
 * GET /book/list
 * 응답: { books: [...] }
 */
export const getMyBookList = () => {
    return request({
        url: "/book/list",
        method: "GET",
    });
};

/**
 * 내 서재 상세 조회
 * GET /book/my/{myBookId}
 * 응답: { myBook: {...}, readingBook: {...}, ... }
 */
export const getMyBookDetail = (myBookId) => {
    return request({
        url: `/book/my/${myBookId}`,
        method: "GET",
    });
};

/**
 * 검색 도서(book_tb)를 내 서재(my_book_tb)에 추가
 * POST /book/add-my-library
 */
export const addSearchedBookToMyLibrary = (bookId) => {
    return request({
        url: "/book/add-my-library",
        method: "POST",
        data: { bookId },
    });
};

/**
 * 내 서재 검색
 * GET /book/my/search?keyword=...
 */
export const searchMyBooks = (keyword) => {
    return request({
        url: "/book/my/search",
        method: "GET",
        params: { keyword },
    });
};

/**
 * 내 서재에 개인 도서 추가 (검색 안 되는 도서)
 * POST /book/add-my-personal
 */
export const addPersonalBook = (bookData) => {
    return request({
        url: "/book/add-my-personal",
        method: "POST",
        data: bookData,
    });
};

/**
 * 내 서재 도서 수정 (my_book_tb 기준)
 * POST /book/modify/{myBookId}
 */
export const modifyMyBook = (myBookId, data) => {
    return request({
        url: `/book/modify/${myBookId}`,
        method: "POST",
        data,
    });
};

/**
 * 내 서재 도서 삭제 (my_book_tb 기준)
 * DELETE /book/delete/{myBookId}
 */
export const deleteMyBook = (myBookId) => {
    return request({
        url: `/book/delete/${myBookId}`,
        method: "DELETE",
    });
};

/**
 * AI 도서 추천 (Gemini)
 * GET /book/ai/recommend
 * 2025년 베스트셀러 3개를 추천
 */
export const getAiRecommendBooks = () => {
    return request({
        url: "/book/ai/recommend",
        method: "GET",
    });
};

/**
 * 사용자 카테고리 기반 인기 도서 추천 (5개)
 * GET /book/recommend/category
 */
export const getRecommendBooksByCategory = () => {
    return request({
        url: "/book/recommend/category",
        method: "GET",
    });
};

/**
 * 사용자의 서재에서 status가 BEFORE 또는 IN_PROGRESS인 가장 오래된 도서 조회 (5개)
 * GET /book/my/oldest
 */
export const getOldestBooksByStatus = () => {
    return request({
        url: "/book/my/oldest",
        method: "GET",
    });
};