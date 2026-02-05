import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SiGooglegemini } from "react-icons/si";
import { Sparkles, X } from "lucide-react";
import { bookApi } from "../../../api";

const MotionGemini = motion(SiGooglegemini);

function AiRecommandWidjet({ size = "small" }) {
    const [isHovered, setIsHovered] = useState(false);
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showBooks, setShowBooks] = useState(false);

    const sizeClasses = {
        full: "w-[1100px] h-[240px]",
        large: "w-[600px] h-[220px]",
        medium: "w-[280px] h-[340px]",
        small: "w-[220px] h-[220px]"
    };

    const textSizeClasses = {
        full: { title: "text-[32px]", subtitle: "text-[16px]" },
        large: { title: "text-[28px]", subtitle: "text-[14px]" },
        medium: { title: "text-[24px]", subtitle: "text-[13px]" },
        small: { title: "text-[20px]", subtitle: "text-[12px]" }
    };

    const iconSizeClasses = {
        full: "w-[100px] h-[100px]",
        large: "w-[70px] h-[70px]",
        medium: "w-[60px] h-[60px]",
        small: "w-[50px] h-[50px]"
    };

    const iconPixelSize = {
        full: 70,
        large: 56,
        medium: 48,
        small: 40
    }[size];

    // 오버레이 자동 닫기 후 도서 표시
    useEffect(() => {
        if (!isOverlayOpen) return;

        // 오버레이 자동 닫기 (2.5초 후)
        const overlayTimer = setTimeout(() => {
            setIsOverlayOpen(false);
            // 오버레이가 닫힌 후 도서 목록 표시
            setShowBooks(true);
        }, 2500);

        return () => clearTimeout(overlayTimer);
    }, [isOverlayOpen]);

    // API 호출 함수
    const fetchRecommendedBooks = async () => {
        setIsLoading(true);
        try {
            const response = await bookApi.getAiRecommendBooks();
            // API 응답 구조에 따라 데이터 추출 (data 필드가 있을 수 있음)
            const data = response?.data || response || [];
            setBooks(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("[AI 추천] 도서 추천 API 호출 실패:", error);
            setBooks([]);
        } finally {
            setIsLoading(false);
        }
    };

    // 위젯 클릭 시 API 호출
    const handleClick = () => {
        setShowBooks(false); // 도서 목록 초기화
        setIsOverlayOpen(true);
        fetchRecommendedBooks();
    };

    return (
        <div
            className={`
                    ${sizeClasses[size]}
                    relative overflow-hidden
                    rounded-2xl
                    bg-gray-95
                    shadow-xl
                    group cursor-pointer
                    transition-all duration-300
                    hover:scale-[1.01]
                `}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleClick}
        >
            {/* 별 - 오버레이나 도서 목록 표시 중에는 숨김 */}
            {!isOverlayOpen && !showBooks && (
                <div className="absolute inset-0">
                    <Sparkles className="absolute top-20 right-30 w-4 h-4 text-purple-400 group-hover:animate-pulse" />
                    <Sparkles className="absolute bottom-22 right-16 w-3 h-3 text-purple-400 group-hover:animate-pulse" />
                </div>
            )}

            {/* 기본 UI - 오버레이가 닫혀있고 도서 목록을 표시하지 않을 때만 */}
            {!isOverlayOpen && !showBooks && (
                <div className="relative z-10 flex items-center justify-between h-full px-12">
                    {/* 텍스트 */}
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <h3
                                className={`${textSizeClasses[size].title} text-gray-5`}
                            >
                                AI 추천 도서
                            </h3>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="px-2.5 py-0.5 text-[14px] bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-full">
                                    Gemini AI
                                </span>
                            </div>
                        </div>
                        <p
                            className={`${textSizeClasses[size].subtitle} text-gray-30`}
                        >
                            당신의 취향을 분석해서 딱 맞는 책을 추천해드려요!
                        </p>
                    </div>

                    {/* Gemini 아이콘 */}
                    <button
                        className={`
                                ${iconSizeClasses[size]}
                                flex items-center justify-center
                                rounded-2xl
                                group-hover:scale-110
                                transition-all
                            `}
                    >
                        <MotionGemini
                            size={iconPixelSize}
                            className="text-purple-400"
                            animate={isHovered ? {
                                opacity: [1, 0.5, 1]
                            } : {}}
                            transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                    </button>
                </div>
            )}

            {/* 도서 추천 결과 - 오버레이가 닫혀있고 showBooks가 true일 때만 */}
            {!isOverlayOpen && showBooks && (
                <div className="relative z-10 flex flex-col justify-center h-full px-8 py-6">
                    {/* 닫기 버튼 */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setShowBooks(false);
                        }}
                        className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-80 transition-colors z-10"
                        aria-label="도서 목록 닫기"
                    >
                        <X className="w-5 h-5 text-gray-5" />
                    </button>

                    <h3 className={`${textSizeClasses[size].title} text-gray-5 mb-4 text-center`}>
                        AI가 추천한 도서 3가지에요!
                    </h3>
                    <div className="flex flex-col gap-3">
                        {isLoading ? (
                            <div className="text-center text-gray-30">도서를 추천받는 중...</div>
                        ) : books.length > 0 ? (
                            books.map((book, index) => (
                                <div
                                    key={index}
                                    className="text-gray-20 text-center"
                                    style={{ fontSize: size === "small" ? "14px" : "16px" }}
                                >
                                    {book.title} - {book.author} - {book.publisher}
                                </div>
                            ))
                        ) : (
                            <div className="text-center text-gray-30">추천 도서를 불러올 수 없습니다.</div>
                        )}
                    </div>
                </div>
            )}

            {/* 오버레이 */}
            <AnimatePresence>
                {isOverlayOpen && (
                    <motion.div
                        className="absolute inset-0 z-50 flex items-center justify-center bg-gray-95/90 backdrop-blur-sm rounded-2xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.4 }}
                            className="text-gray-5 text-2xl text-center px-8"
                        >
                            AI가 도서를 추천해드릴게요!
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default AiRecommandWidjet;