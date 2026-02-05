import React from "react";

function TextField({
    placeholder = "PlaceHolder",
    value,
    onChange,
    state = "enabled",
    size = "l",
    subText,
    showSub = false,
}) {
    const baseInputStyles =
        "w-full h-[36px] px-[16px] py-[8px] rounded-[8px] flex items-center gap-[4px] border border-solid transition-colors duration-200 outline-none font-['Pretendard'] text-[16px]";

    let stateStyles = "";
    let textColor = "text-gray-10";
    let placeholderColor = "placeholder:text-gray-50";

    switch (state) {
        case "focused":
        case "typing":
            stateStyles = "bg-gray-80 border-blue-50";
            break;
        case "bad":
            stateStyles = "bg-gray-80 border-red-50";
            break;
        case "good":
            stateStyles = "bg-gray-80 border-green-50";
            break;
        case "disabled":
            stateStyles = "bg-gray-95 border-gray-80 cursor-not-allowed";
            textColor = "text-gray-80";
            break;
        case "enabled":
        default:
            stateStyles = "bg-gray-80 border-gray-60 hover:border-gray-50";
            break;
    }

    return (
        <div className="flex flex-col items-start gap-[8px] w-[320px]">
            <div className={`w-full relative flex items-center`}>
                <input
                    type="text"
                    placeholder={placeholder}
                    // value={value}
                    onChange={onChange}
                    disabled={state === "disabled"}
                    className={`
                        ${baseInputStyles}
                        ${stateStyles}
                        ${textColor}
                        ${placeholderColor}
                        bg-transparent
                    `}
                />
                {/* Icons can be added here if needed */}
            </div>

            {(showSub || subText) && (
                <div className="px-[20px]">
                    <p
                        className={`text-[12px] font-['Pretendard'] ${state === "bad" ? "text-red-50" : "text-gray-50"}`}>
                        {subText || "subText"}
                    </p>
                </div>
            )}
        </div>
    );
}

export default TextField;
