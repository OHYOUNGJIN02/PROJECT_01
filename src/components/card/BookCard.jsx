import React, { useEffect, useState } from "react";
import BookCardItem from "./BookCardItem";
import BookCardContainer from "./BookCardContainer";
import Icon from "../property/Icon";
import { getDominantColor, getContrastTextColor } from "../../utils/colorUtils";

const filterAuthor = (author) => {
    if (!author) return "";
    
    const index = author.indexOf('(');
    if (index !== -1) {
        return author.substring(0, index).trim();
    }
    return author;
};

const Book3D = ({ imageUrl, title, author, children, isRotated }) => {
    const [spineBgColor, setSpineBgColor] = useState("");
    const [spineTextColor, setSpineTextColor] = useState("");

    useEffect(() => {
        if (!imageUrl) return;
        getDominantColor(imageUrl)
            .then((color) => {
                setSpineBgColor(color);
                setSpineTextColor(getContrastTextColor(color));
            })
            .catch((err) => console.error("Color extraction failed", err));
    }, [imageUrl]);

    return (
        <div className="relative w-[120px] h-[178px] rounded-[8px] overflow-visible">
            <div className="[perspective:900px] w-full h-full">
                <div
                    className="relative w-full h-full transition-transform duration-700 ease-out [transform-style:preserve-3d] bg-gray-90 rounded-[8px]"
                    style={{ transform: isRotated ? "rotateY(30deg)" : "rotateY(0deg)" }}
                >
                    <div className="absolute inset-0 z-10 h-full w-full [backface-visibility:hidden] overflow-hidden rounded-[8px]">
                        {imageUrl ? (
                            <img src={imageUrl} alt={title} className="absolute inset-0 h-full w-full object-cover" />
                        ) : (
                            <div className="absolute inset-0 h-full w-full bg-gray-800" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70" />
                        <div className="relative z-20 h-full w-full flex flex-col justify-between p-2">
                            {children}
                        </div>
                    </div>

                    
                    <div
                        className="absolute top-0 left-[-30px] flex h-full w-[30px] [transform-origin:right] [transform:rotateY(-90deg)] items-center justify-center shadow-[inset_-8px_0_18px_rgba(0,0,0,0.30)] [backface-visibility:hidden]"
                        style={{ backgroundColor: spineBgColor || "#2B2B2B" }}
                    >
                        <div
                            className="flex flex-col items-center gap-2 px-1 text-[10px] font-medium tracking-tighter [text-orientation:mixed] [writing-mode:vertical-rl]"
                            style={{ color: spineTextColor || "#e4e2df" }}
                        >
                            <span className="whitespace-nowrap truncate max-h-[140px]">{title}</span>
                            <span className="text-[8px] whitespace-nowrap opacity-80">
                                {filterAuthor(author)} 저
                            </span>
                        </div>
                    </div>

                    <div className={`absolute -bottom-4 left-3 h-3 w-[80%] rounded-full bg-black/10 blur-xl transition-opacity duration-700 ${isRotated ? "opacity-100" : "opacity-0"}`} />
                </div>
            </div>
        </div>
    );
};

function BookCard({ size = "l", state = "default", book = {}, showInfo = true }) {
    const {
        title = "Title",
        author = "Author", 
        genre = "Genre",
        totalPage = 300,
        currentPage = 0,
        coverImage = "",
        status = "before",
    } = book;

    const [isHovered, setIsHovered] = useState(false);

    
    const show3D = state === "3D" || isHovered;
    const displayAuthor = show3D ? filterAuthor(author) : author;

    if (size === "m" || size === "s") {
        const sizeClasses = { m: "w-[55px] h-[80px] rounded-[6px]", s: "w-[22px] h-[32px] rounded-[2px]" };
        return (
            <div className={`${sizeClasses[size]} bg-gray-90 border border-gray-80 overflow-hidden relative`}>
                {coverImage && <img src={coverImage} alt={title} className="w-full h-full object-cover" />}
            </div>
        );
    }

    const cardContent = (
        <>
            <div className="text-white opacity-80 shadow-black drop-shadow-md">
                <Icon type="book" size="l" isActived={true} />
            </div>
            <div className="flex flex-col gap-2 w-full">
                <BookCardItem state={status} currentPage={currentPage} totalPage={totalPage} />
            </div>
        </>
    );

    return (
        <button
            className="flex flex-col items-start gap-4 shrink-0 hover:brightness-110 transition-all group cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            
            <Book3D imageUrl={coverImage} title={title} author={displayAuthor} isRotated={show3D}>
                {cardContent}
            </Book3D>

            {showInfo && (
                <BookCardContainer
                    title={title}
                    author={displayAuthor}
                    genre={genre}
                    isHovered={isHovered}
                />
            )}
        </button>
    );
}

export default BookCard;