import React from "react";
import { Routes, Route } from "react-router-dom";

// 1. 공통/레이아웃
import ProtectedShell from "../components/common/ProtectedShell";
import MainLayout from "../components/layout/MainLayout";

// 2. 인증(Auth) 페이지
import RG1100_LoginRegister from "../pages/auth/RG1100_LoginRegister";
import RG1100_OnboardingRegister from "../pages/auth/RG1100_OnboardingRegister";
import OAuth2SigninCallback from "../pages/auth/OAuth2SigninCallback";
import OAuth2SignupCallback from "../pages/auth/OAuth2SignupCallback";

// 3. 메인 서비스 페이지
import GuidePage from "../pages/guide/GuidePage";
import ComponentsGuide from "../pages/ComponentsGuide";
import MY1000_MyPage from "../pages/mypage/MY1000_MyPage";
import MY1100_WithDraw from "../pages/mypage/MY1100_WithDraw";
import ErrorPage from "../pages/error/ErrorPage";
import CB1000_CalenderBook from "../pages/CB1000_CalenderBook";
import MD1000_MainDashBoard from "../pages/MD1000_MainDashBoard";
import SB1000_SearchBook from "../pages/SB1000_SearchBook";
import MD1200_ReviewMain from "../pages/MD1200_ReviewMain";
import SoccerField from "../pages/SoccerField";

function MainRouter() {
    return (
        <Routes>

            {/* 루트 경로 - ComponentsGuide를 메인으로
            <Route path="/" element={<ComponentsGuide />} /> */}
            
            {/* 1. 인증 (Authentication) - 레이아웃 미적용 */}
            <Route path="/auth/login" element={<RG1100_LoginRegister />} />
            <Route path="/auth/oauth2/signin" element={<OAuth2SigninCallback />} />
            <Route path="/auth/oauth2/signup" element={<OAuth2SignupCallback />} />
            <Route path="/auth/onboarding" element={<RG1100_OnboardingRegister />} />

            {/* 2. 로그인한 사용자만 접근 가능 */}
            {/* 2. 공통 레이아웃이 적용되는 라우트 그룹 */}
            <Route element={<MainLayout />}>
                {/* 인덱스 페이지(가이드) */}
                <Route path="/" element={<ComponentsGuide />} />

                {/* 로그인한 사용자만 접근 가능한 보호된 라우트 */}
                
                {/* 가이드 페이지 */}
                    <Route path="/guide" element={<GuidePage />} />
                {/* 메인 서비스 */}
                    <Route path="/mypage" element={<MY1000_MyPage />} />
                    <Route path="/mypage/withdraw" element={<MY1100_WithDraw />} />
                    <Route path="/soccerfield" element={<SoccerField />} />
                    <Route path="/dashboard" element={<MD1000_MainDashBoard />} />
                    <Route path="/calender" element={<CB1000_CalenderBook />} />
                    <Route path="/searchbook" element={<SB1000_SearchBook />} />
                    <Route path="/reviewmain" element={<MD1200_ReviewMain />} />
               
            </Route>

            {/* 3. 에러 페이지 */}
            <Route path="*" element={<ErrorPage />} />
        </Routes>
    );
}

export default MainRouter;

/*const userType = useAuthStore((state) => state.getUserType()); */
