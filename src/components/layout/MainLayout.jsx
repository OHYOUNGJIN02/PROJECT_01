import React from "react";
import { Outlet } from "react-router-dom";
import NavigationBar from "../gnb/NavigationBar";
import Header from "../gnb/Header";

/**
 * MainLayout
 * 공통 레이아웃 컴포넌트입니다.
 * 왼쪽에 NavigationBar를 고정하고, 오른쪽 영역에 Header와 콘텐츠(Outlet)를 배치합니다.
 */
const MainLayout = () => {
    return (
        <div className="flex h-screen w-full bg-blue-50 overflow-hidden">
            {/* 왼쪽 네비게이션 바 */}
            <NavigationBar />

            {/* 오른쪽 메인 영역 */}
            <div className="flex flex-col flex-1 h-full overflow-hidden">
                {/* 상단 공통 헤더 */}
                <Header title="가이드" />

                {/* 페이지별 콘텐츠 영역 */}
                <main className="flex-1 overflow-y-auto px-[40px] custom-scrollbar">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
