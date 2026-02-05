import { request } from "./resp";

/**
 * OAuth2 관련 API
 * (내 정보 조회 등 계정 관리는 accountApi.js를 사용하세요)
 * OAuth2 신규회원 가입 완료
 * POST /user/auth/oauth2/signup
 */
export const oauth2Signup = async (payload) => {
    return request({
        url: "/user/auth/oauth2/signup",
        method: "POST",
        data: payload,
    });
};
