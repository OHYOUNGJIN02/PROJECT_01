import React from "react";
import Label from "../property/Label";

/**
 * BookCardContainer
 * Displays title, author, and genre label.
 * Maps to Figma 'BookCardContainerItem'.
 */
function BookCardContainer({ title, author, genre }) {
    return (
        <div className="flex flex-col gap-2 w-full px-3 pb-0">
            {/* Title */}
            <div className="flex items-center justify-start w-full">
                <h3 className="text-white text-[16px] font-bold font-['Pretendard'] truncate leading-normal">
                    {title}
                </h3>
            </div>

            {/* Author and Genre */}
            <div className="flex items-center gap-1 w-full">
                <span className="text-gray-50 text-[12px] font-medium font-['Pretendard'] truncate max-w-[80px]">
                    {author}
                </span>
                <Label label={genre} size="s" isActived={true} />
                {/* Note: Label 'isActived' true gives text-gray-20. matches design? 
            Design says Label text is #e4e2df (gray20). So isActived=true is correct.
        */}
            </div>
        </div>
    );
}

export default BookCardContainer;
