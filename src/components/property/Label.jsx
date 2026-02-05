import React from "react";

function Label({ label = "label", size = "s", isActived = true }) {
    const baseStyles =
        "flex items-center justify-center rounded-[4px] border-1 border-solid border-gray-80 bg-gray-95 font-['Pretendard'] font-semibold leading-normal shrink-0 transition-colors duration-200";

    // Size styles
    const sizeClasses =
        size === "m" ? "px-[4px] py-[2px] text-[16px]" : "px-[4px] py-[2px] text-[12px]";

    // Active state styles
    const stateClasses = isActived ? "text-gray-20" : "text-gray-80";

    return <div className={`${baseStyles} ${sizeClasses} ${stateClasses}`}>{label}</div>;
}

export default Label;
