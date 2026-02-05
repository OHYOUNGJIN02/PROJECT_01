import React from "react";
import Icon from "../property/Icon";

/**
 * BookCardItem
 * Displays the status of the book (Before, Reading, Complete).
 * Matches Figma 'BookCardItem' component.
 *
 * @param {string} state - 'before' | 'reading' | 'complete'
 * @param {number} currentPage - Current page number (for reading state)
 * @param {number} totalPage - Total page number (for reading state)
 */
function BookCardItem({ state = "before", currentPage = 0, totalPage = 0 }) {
    // Styles
    // Before: Text Gray50
    // Reading: Icon Yellow50 + Text Yellow10
    // Complete: Icon Green50 + Text Green50 (Design text color seems match icon for complete, or check context)

    if (state === "reading") {
        // Figma: Ellipse icon (Yellow ish) + Text FEF9E6 (Yellow10)
        return (
            <div className="flex items-center gap-1 h-5">
                {/* Using a dot or specific icon. using BiRadioCircleMarked or similar as placeholder for reading indicator if needed, 
             or just a small colored circle. Figma used an image. I will use a simple circle div. */}
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-50" />
                <span className="text-yellow-10 text-[12px] font-semibold font-['Pretendard']">
                    {currentPage}/{totalPage}
                </span>
            </div>
        );
    }

    if (state === "complete") {
        // Figma: Check Icon + Text
        // Text color: Green50? "완료됨"
        // Icon: AiFillCheckCircle (Green50)
        return (
            <div className="flex items-center gap-1 h-5">
                <Icon type="AiFillCheckCircle" size="s" isActived={true} />
                <span className="text-green-50 text-[12px] font-semibold font-['Pretendard']">
                    완료됨
                </span>
            </div>
        );
    }

    // Default / Before
    return (
        <div className="flex items-center h-5">
            <span className="text-gray-50 text-[16px] font-semibold font-['Pretendard']">
                등록됨
            </span>
        </div>
    );
}

export default BookCardItem;
