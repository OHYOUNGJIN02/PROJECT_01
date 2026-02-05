import React, { useEffect, useState } from "react";
import { getDominantColor, getContrastTextColor } from "../../utils/colorUtils";

const Book3D = ({ imageUrl, title, author }) => {
    // 사용자가 테스트한 기본값 설정
    const [spineBgColor, setSpineBgColor] = useState("");
    const [spineTextColor, setSpineTextColor] = useState("");

    useEffect(() => {
        if (imageUrl) {
            getDominantColor(imageUrl)
                .then((color) => {
                    setSpineBgColor(color);
                    setSpineTextColor(getContrastTextColor(color));
                })
                .catch((err) => {
                    console.error(
                        "Color extraction failed, using default",
                        err,
                    );
                });
        }
    }, [imageUrl]);

    return (
        <div className="[perspective:1000px]">
            {/* 사용자 코드의 group, transform 방식 그대로 유지 */}
            <div className="group relative h-[300px] w-[200px] cursor-pointer transition-transform duration-700 ease-out [transform-style:preserve-3d] hover:[transform:rotateY(35deg)]">
                {/* Front Cover: 앞표지 */}
                <div className="absolute inset-0 z-10 h-full w-full shadow-md transition-shadow duration-700 [backface-visibility:hidden] group-hover:shadow-2xl">
                    <img
                        src={imageUrl}
                        alt={title}
                        className="h-full w-full rounded-l-none rounded-r-md object-cover"
                    />
                </div>

                {/* Book Spine: 책등 (사용자 코드의 수치와 origin 방식 100% 동일) */}
                <div
                    className="absolute top-0 left-[-40px] flex h-full w-[40px] [transform-origin:right] [transform:rotateY(-90deg)] items-center justify-center shadow-[inset_-10px_0_20px_rgba(0,0,0,0.3)] [backface-visibility:hidden]"
                    style={{ backgroundColor: spineBgColor }}>
                    <div
                        className="flex flex-col items-center gap-2 px-1 text-[11px] font-medium tracking-tighter [text-orientation:mixed] [writing-mode:vertical-rl]"
                        style={{ color: spineTextColor }}>
                        <span className="whitespace-nowrap">{title}</span>
                        <span className="text-[9px] whitespace-nowrap opacity-80">
                            {author} 저
                        </span>
                    </div>
                </div>

                {/* Shadow: 그림자 */}
                <div className="absolute -bottom-6 left-4 h-4 w-[80%] rounded-full bg-black/10 opacity-50 blur-xl transition-opacity duration-700 group-hover:opacity-100"></div>
            </div>
        </div>
    );
};

export default Book3D;
