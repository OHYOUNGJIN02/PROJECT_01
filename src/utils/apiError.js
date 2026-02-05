/**
 * 백엔드 에러 응답(ApiRespDto)에서 메시지를 추출하는 함수
 * @param {Error} error - Axios 에러 객체
 * @param {string} fallback - 기본 에러 메시지
 * @returns {string} 추출된 에러 메시지
 */
export const getApiErrorMessage = (
    error,
    fallback = "요청 중 문제가 발생했습니다.",
) => {
    // 1. 서버가 응답을 준 경우 (ApiRespDto 구조)
    const serverResponse = error?.response?.data;

    // 백엔드 { status, message, data } 구조 분해
    if (serverResponse && typeof serverResponse === "object") {
        if (serverResponse.message) {
            return serverResponse.message;
        }
    }

    // 2. 서버 응답은 없으나 에러 객체 자체의 메시지가 있는 경우
    if (error?.message) {
        // 네트워크 타임아웃 등
        if (error.message === "Network Error")
            return "서버와 연결할 수 없습니다.";
        return error.message;
    }

    // 3. 둘 다 없으면 기본 메시지 반환
    return fallback;
};
