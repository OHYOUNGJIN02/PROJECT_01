import React from "react";
import ParallelReadingWidget from "./customWidjet/ParallelReadingWidget";

function FullWidjet({ type, isActive = true, onClick }) {
    const widjetComponents = {
        ParallelReadingWidget: <ParallelReadingWidget />,
    };

    const selectedWidjet = widjetComponents[type] || (
        <div className="w-full h-full flex items-center justify-center text-gray-50 bg-gray-90">
            위젯 타입({type})을 확인해주세요.
        </div>
    );

    return (
        <div className="w-[1100px] h-fit bg-gray-95 rounded-[12px] px-[24px] py-[16px]">
            {selectedWidjet}
        </div>
    );
}
export default FullWidjet;

