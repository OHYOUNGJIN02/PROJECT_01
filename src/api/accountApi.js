import { request } from "./resp";

/**
 * 내 정보 조회
 * GET /user/account/me
 */
export const getMe = () => {
    return request({
        url: "/user/account/me",
        method: "GET",
    });
};

/**
 * 닉네임 변경
 * POST /user/account/modify-nickname
 * body: { nickname }
 */
export const modifyNickname = (data) => {
    return request({
        url: "/user/account/modify-nickname",
        method: "POST",
        data,
    });
};

/**
 * 프로필 이미지 변경
 * POST /user/account/modify-profile-img
 * body: { profileImage }
 */
export const modifyProfileImg = (data) => {
    return request({
        url: "/user/account/modify-profile-img",
        method: "POST",
        data,
    });
};

/**
 * 회원 탈퇴
 * DELETE /user/account/delete-user
 */
export const deleteUser = () => {
    return request({
        url: "/user/account/delete-user",
        method: "DELETE",
    });
};
