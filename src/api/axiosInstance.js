// src/api/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080",
    withCredentials: false,
});

// 요청 인터셉터: 토큰 자동 부착
// src/api/axiosInstance.js 수정
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");

    // 토큰이 존재하고, 최소한 JWT의 최소 구조인 '.'을 포함하고 있을 때만 발송
    if (token && token.includes(".") && token.split(".").length === 3) {
        config.headers.Authorization = `Bearer ${token}`;
    } else if (token) {
        // 만약 이상한 토큰이 들어있다면 스스로 삭제해서 무한 에러 방지
        localStorage.removeItem("accessToken");
    }

    return config;
});

// (선택) 응답 인터셉터: 에러 로깅
axiosInstance.interceptors.response.use(
    (res) => res,
    (err) => {
        // 콘솔에서 바로 원인 파악 가능
        console.error(
            "[API ERROR]",
            err?.response?.status,
            err?.response?.data || err?.message,
        );
        return Promise.reject(err);
    },
);

export default axiosInstance;
