import React from "react";
import IconItem from "./IconItem";

function Icon({ size = "l", type = "BiArrowBack", isActived = true }) {
    const getSizeInPixels = (sizeVariant) => {
        switch (sizeVariant) {
            case "l":
                return 24;
            case "m":
                return 20;
            case "s":
                return 12;
            default:
                return 24;
        }
    };

    const pixelSize = getSizeInPixels(size);
    const iconSize =
        {
            l: 20,
            m: 16,
            s: 12,
        }[size] || 20;

    const containerSize =
        {
            l: "w-[24px] h-[24px]",
            m: "w-[20px] h-[20px]",
            s: "w-[12px] h-[12px]",
        }[size] || "w-[24px] h-[24px]";

    const paddingClass = size === "s" ? "" : "p-[2px]";

    return (
        <div className={`flex items-center justify-center ${containerSize} ${paddingClass}`}>
            <IconItem type={type} isActived={isActived} size={iconSize} />
        </div>
    );
}

export default Icon;
