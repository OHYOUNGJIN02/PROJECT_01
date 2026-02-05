import React from "react";

function ChipButton({ label = "chip", onClick, disabled = false }) {
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
                        : "bg-gray-95 border-gray-80 text-gray-10 hover:bg-gray-90 active:bg-gray-80 cursor-pointer"
                }
            `}>
            {label}
        </button>
    );
}

export default ChipButton;
