import React from "react";
import NavigationBarItem from "./NavigationBarItem";
import SmallWidjet from "../widjet/SmallWidjet";

export default function NavigationBar() {
    const menuItems = [
        { label: "메인메뉴", icon: "BiHome", isActive: false },
        { label: "병렬서재", icon: "book", isActive: false },
        { label: "캘린더", icon: "AiOutlineCalendar", isActive: false },
    ];

    return (
        <div className="flex flex-col w-[320px] h-screen  bg-blue-50 border-r border-gray-80 shrink-0">
            {/* Header */}
            <NavigationBarItem type="header" />

            {/* Menu Body */}
            <div className="flex flex-col gap-[8px] w-full">
                {menuItems.map((item, index) => (
                    <NavigationBarItem
                        key={index}
                        type="body"
                        label={item.label}
                        icon={item.icon}
                        isActive={item.isActive}
                        onClick={() => console.log(`Clicked ${item.label}`)}
                    />
                ))}
            </div>


            {/* Footer - Pushed to very bottom */}
            <div className="mt-auto">
                <NavigationBarItem type="footer" />
            </div>
        </div>
    );
}
