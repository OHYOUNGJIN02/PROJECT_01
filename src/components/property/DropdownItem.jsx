import React from "react";
import Icon from "./Icon";

function DropdownItem({ label, iconType, onClick, isActive = false }) {

    return (
        <div
            onClick={onClick}
            className={`
        flex w-full items-center gap-1 px-3 py-1.5 cursor-pointer transition-colors
        text-[16px] font-medium text-gray-20
        ${isActive ? "bg-gray-90" : "bg-gray-95 hover:bg-gray-90"}
      `}>
            <Icon size="m" type={iconType} isActived={isActive} />
            <span className="leading-normal">{label}</span>
        </div>
    );
}

export default DropdownItem;
