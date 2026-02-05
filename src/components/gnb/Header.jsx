import React from "react";
import Icon from "../property/Icon";
import TextField from "../input/TextField";

/**
 * Header
 * Top navigation header with back button, title, and optional search.
 */
export default function Header({ title = "섹션명", showSearch = true, onBack, onSearch }) {
    return (
        <div className="w-full h-[96px] flex items-center justify-between px-[40px] py-[10px] bg-blue-90">
            {/* Left Section: Back Button & Title */}
            <div className="flex items-center gap-[12px]">
                <button
                    onClick={onBack}
                    className="p-1 rounded-full hover:bg-gray-80 transition-colors group">
                    <Icon type="BiArrowBack" size="m" isActived={true} />
                </button>
                <h1 className="text-[20px] font-bold text-gray-20 font-['Pretendard']">{title}</h1>
            </div>

            {/* Right Section: Search Input */}
            {showSearch && (
                <div className="w-[320px] relative">
                    <TextField
                        placeholder="검색어를 입력하세요"
                        state="enabled"
                        onChange={onSearch}
                    />
                    {/* Search Icon Overlay (since TextField doesn't support icon prop yet) */}
                    <div className="absolute right-[12px] top-1/2 -translate-y-1/2 pointer-events-none text-gray-50">
                        <Icon type="AiOutlineSearch" size="s" isActived={true} />
                    </div>
                </div>
            )}
        </div>
    );
}
