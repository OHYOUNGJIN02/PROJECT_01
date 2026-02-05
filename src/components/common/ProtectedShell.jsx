import React from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { Navigate, Outlet, useLocation } from "react-router-dom";

// ProtectedShell: 로그인 안 된 사용자는 튕겨내고, 된 사용자는 Outlet(자식 라우트)을 보여줌
function ProtectedShell() {
    const { isLoggedIn, loading } = useAuthStore(); 
    const location = useLocation();

    // 1. 로딩 중일 때 (새로고침 시 깜빡임 방지)
    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-gray-90 text-gray-40 font-medium">
                로딩 중...
            </div>
        );
    }

    // 2. 로그인 안 되어 있으면 로그인 페이지로 튕겨냄
    // state={{ from: location }}을 통해 로그인 후 원래 가려던 페이지로 돌려보낼 수 있음
    if (!isLoggedIn) {
        return <Navigate to="/auth/login" state={{ from: location }} replace />;
    }

    // 3. 로그인 통과 시: 자식 라우트(Outlet)를 렌더링
    // ✅ (return children -> return <Outlet />)
    return <Outlet />;
}

export default ProtectedShell;
