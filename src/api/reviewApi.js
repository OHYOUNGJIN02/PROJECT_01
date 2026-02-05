import { request } from "./resp";

/**
 * 독후감 생성
 * POST /review/create
 * body: { readingBookId, content, rating, seeable }
 */
export const createReview = (data) => {
    return request({ method: "POST", url: "/review/create", data });
};

/**
 * 독후감 상세 조회
 * GET /review/{reviewId}
 */
export const getReviewDetail = (reviewId) => {
    return request({ method: "GET", url: `/review/${reviewId}` });
};

/**
 * 독후감 수정
 * POST /review/modify/{reviewId}
 * body: { content, rating, seeable }
 */
export const modifyReview = (reviewId, data) => {
    return request({ method: "POST", url: `/review/modify/${reviewId}`, data });
};

/**
 * 독후감 삭제
 * DELETE /review/{reviewId}
 */
export const deleteReview = (reviewId) => {
    return request({ method: "DELETE", url: `/review/${reviewId}` });
};

/**
 * 내 독후감 목록 조회
 * GET /review/my/list
 */
export const getMyReviews = () => {
    return request({ method: "GET", url: "/review/my/list" });
};

/**
 * 좋아요 등록
 * POST /review/like/{reviewId}
 */
export const likeReview = (reviewId) => {
    return request({ method: "POST", url: `/review/like/${reviewId}` });
};

/**
 * 좋아요 취소
 * DELETE /review/like/{reviewId}
 */
export const unlikeReview = (reviewId) => {
    return request({ method: "DELETE", url: `/review/like/${reviewId}` });
};

/**
 * 내가 좋아요한 독후감 목록 조회
 * GET /review/like/my/list
 */
export const getMyLikedReviews = () => {
    return request({ method: "GET", url: "/review/like/my/list" });
};

/**
 * AI 독후감 체크 (맞춤법/다듬기/제안)
 * POST /review/ai/check
 * body: { content, checkType }
 * checkType: "SPELL_CHECK" | "POLISH" | "SUGGEST"
 */
export const checkReviewWithAI = (data) => {
    return request({ method: "POST", url: "/review/ai/check", data });
};