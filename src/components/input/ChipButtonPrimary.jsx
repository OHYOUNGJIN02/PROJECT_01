import React from "react";

import Icon from "../property/Icon";

function ChipButtonPrimary({
    label = "chip",
    onClick,
    disabled = false,
    showIcon = false,
    iconType = "BiCheck",
}) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`
                flex items-center justify-center px-[8px] py-[6px] rounded-[8px] border-1 border-solid transition-colors duration-200
                text-[16px] font-semibold leading-normal font-['Pretendard']
                ${
                    disabled
                        ? "bg-gray-95 border-gray-80 text-gray-80 cursor-not-allowed"
                        : "bg-gray-10 border-gray-80 text-gray-80 hover:bg-gray-20 active:bg-gray-30 cursor-pointer"
                }
                gap-1
            `}>
            {showIcon && <Icon type={iconType} size="s" isActived={true} color="text-gray-80" />}
            {label}
        </button>
    );
}

export default ChipButtonPrimary;
