import React from "react";

function BoxButton({ size = "l", state = "enabled", label = "BoxButton", onClick }) {
    const baseStyles =
        "flex items-center justify-center rounded-[8px] border-1 border-solid transition-colors font-['Pretendard'] font-semibold leading-normal shrink-0";

    const sizeStyles = {
        l: "w-[480px] h-[64px] px-[32px] py-[8px] text-[20px]",
        m: "w-[400px] h-[52px] px-[32px] py-[8px] text-[20px]",
        ms: "w-[356px] h-[40px] px-[32px] py-[8px] text-[16px]",
        s: "w-[320px] h-[48px] px-[32px] py-[8px] text-[20px]",
    };

    let stateClasses = "";

    if (state === "disabled") {
        stateClasses = "bg-gray-95 border-gray-80 text-gray-80 cursor-not-allowed";
    } else {
        stateClasses =
            "bg-gray-95 border-gray-80 text-gray-10 cursor-pointer hover:border-gray-50 active:bg-gray-90";
    }

    return (
        <button
            className={`${baseStyles} ${sizeStyles[size]} ${stateClasses}`}
            onClick={state !== "disabled" ? onClick : undefined}
            disabled={state === "disabled"}>
            {label}
        </button>
    );
}

export default BoxButton;
