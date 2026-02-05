import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const OAuth2SignupCallback = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        // signupToken이 있으면 온보딩 페이지로 이동
        const signupToken = searchParams.get("signupToken");

        if (signupToken) {
            // signupToken을 localStorage에 임시 저장 (온보딩 페이지에서 사용)
            localStorage.setItem("signupToken", signupToken);
            navigate("/auth/onboarding", { replace: true });
        } else {
            alert("회원가입 토큰이 없습니다.");
            navigate("/auth/login", { replace: true });
        }
    }, [searchParams, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-95">
            <div className="text-center">
                <div className="w-12 h-12 border-4 border-gray-5 border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="mt-4 text-gray-40 font-medium">
                    회원가입 처리 중입니다...
                </p>
            </div>
        </div>
    );
};

export default OAuth2SignupCallback;
