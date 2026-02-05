import React from "react";
import Icon from "../property/Icon";
import { Navigate, useNavigate } from "react-router-dom";

export default function NavigationBarItem({
    
    type = "body",
    label,
    icon,
    isActive = false,
    onClick,
}) {
    const navigate = useNavigate();
    // 1. 헤더타입: Logo + Greeting + Category Label
    if (type === "header") {
        return (
            <div className="flex flex-col w-full">
                {/* 로고 영역 */}
                <div className="flex flex-col p-[40px] pb-[32px] gap-[20px]">
                    <img
                        src="/img/logoL.png"
                        alt="Logo"
                        className="w-[34px] h-[34px] object-contain" // Adjusted based on standard logo aspect ratio, or use auto
                    />
                    <div className="flex flex-col gap-[8px]">
                        <div className="flex flex-col">
                            <span className="text-[20px] font-medium text-gray-10 font-['Pretendard']">
                                안녕하세요
                            </span>
                            <span className="text-[20px] font-medium text-gray-10 font-['Pretendard']">
                                XX님!
                            </span>
                        </div>
                        <span className="text-[20px] font-medium text-gray-40 font-['Pretendard']">
                            책 읽기 좋은 날이네요
                        </span>
                    </div>
                </div>

                {/* 카테고리 라벨 구분선 */}
                <div className="px-[40px] pb-[12px]">
                    <span className="text-[16px] text-gray-20 font-regular font-['Pretendard']">
                        카테고리
                    </span>
                </div>
            </div>
        );
    }

    // 2. 푸터 타입: 프로필 / 사용자 동작
    if (type === "footer") {
        return (
            <div onClick={() => navigate("/mypage")} className="flex items-center gap-[12px] px-[40px] py-[20px] w-full mt-auto cursor-pointer hover:bg-blue-90/50 transition-colors">
                {/* Placeholder for Avatar - using a circle for now as per design intention usually */}
                <div className="w-[40px] h-[40px] rounded-full bg-gray-80 flex items-center justify-center shrink-0">
                    <Icon type="BiSolidUser" size="m" isActived={false} />{" "}
                    {/* Assuming Generic User Icon */}
                </div>
                <div className="flex flex-col">
                    <span className="text-[16px] text-gray-10 font-medium">오영진</span>
                    <span className="text-[12px] text-gray-40">로그아웃</span>
                </div>
            </div>
        );
    }

    // 3. 바디 타입: 메뉴 링크 (기본)
    return (
        <div className="px-[20px] w-full">
            <button
                onClick={onClick}
                className={`
            flex items-center gap-[12px] w-full px-[20px] py-[16px] rounded-[12px] transition-colors
            ${isActive ? "bg-blue-50" : "hover:bg-blue-90"}
          `}>
                <Icon
                    type={icon}
                    size="m"
                    isActived={true} // Icons in nav are usually solid/active style or controlled by parent
                />
                <span
                    className={`text-[16px] font-medium ${isActive ? "text-white" : "text-gray-50"}`}>
                    {label}
                </span>
            </button>
        </div>
    );
}
