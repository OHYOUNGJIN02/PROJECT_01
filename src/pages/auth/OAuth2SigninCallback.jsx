import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

const OAuth2SigninCallback = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { setLogin, setPrincipal } = useAuthStore();

    useEffect(() => {
        // accessToken이 있으면 로그인 처리
        const accessToken = searchParams.get("accessToken");
        const userInfoStr = searchParams.get("userInfo");

        if (accessToken) {
            // Zustand 스토어 및 로컬스토리지에 저장
            setLogin(accessToken);

            // 사용자 정보가 있으면 principal에 저장
            if (userInfoStr) {
                try {
                    const userInfo = JSON.parse(
                        decodeURIComponent(userInfoStr),
                    );
                    setPrincipal(userInfo);
                } catch (e) {
                    console.error("사용자 정보 파싱 실패:", e);
                }
            }

            // 로그인 환영 표시
            localStorage.setItem("showWelcome", "true");
            // 메인 페이지로 이동
            navigate("/", { replace: true });
        } else {
            alert("로그인에 실패하였습니다.");
            navigate("/auth/login", { replace: true });
        }
    }, [searchParams, setLogin, setPrincipal, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-95">
            <div className="text-center">
                <div className="w-12 h-12 border-4 border-gray-5 border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="mt-4 text-gray-40 font-medium">
                    로그인 처리 중입니다...
                </p>
            </div>
        </div>
    );
};

export default OAuth2SigninCallback;
