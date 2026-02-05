import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { PiMouseScrollLight } from "react-icons/pi";

const slides = [
    {
        step: "소지하고 있는 책을 등록하세요!",
        title: "도서 검색을 통해 내 서재에 등록하기",
        description: "검색한 도서를 내 서재에 등록해주세요.",
        imageUrl:
            "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1200&auto=format&fit=crop",
        // 예시 이미지
    },
    {
        step: "독서를 시작하세요!",
        title: "내서재의 등록 도서를 읽어주세요",
        description: "내 서재에 등록한 도서를 읽기 등록하세요.",
        imageUrl:
            "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1200&auto=format&fit=crop",
        // 예시 이미지
    },
    {
        step: "기록하고, 확인하세요!",
        title: "읽은 페이지를 기록, 캘린더로 확인하세요.",
        description: "도서별로 읽은 페이지를 입력, 캘린더로 확인하세요.",
        imageUrl:
            "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=1200&auto=format&fit=crop",
        // 예시 이미지
    },
    {
        step: "시작하기",
        title: "준비되셨나요?",
        description: "오른쪽 이미지를 클릭해서 시작하세요!",
        imageUrl:
            "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop",
        // 예시 이미지
        isStartSlide: true,
    },
];

const GuidePage = () => {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);
    const wheelLockRef = useRef(false);
    const isLast = currentIndex === slides.length - 1;

    const handleNext = () => {
        setCurrentIndex((prev) => Math.min(prev + 1, slides.length - 1));
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
    };

    const handleStart = () => {
        localStorage.setItem("showWelcome", "true");
        navigate("/", { replace: true });
    };

    const handleWheel = (event) => {
        if (wheelLockRef.current) return;
        wheelLockRef.current = true;

        if (event.deltaY > 0) {
            handleNext();
        } else if (event.deltaY < 0) {
            handlePrev();
        }

        window.setTimeout(() => {
            wheelLockRef.current = false;
        }, 700);
    };

    return (
        <div className="flex flex-col w-screen h-screen bg-gray-90">
            <div className="flex-1 flex items-center justify-center px-12">
                <div className="w-full max-w-[1600px]">
                    <div className="text-center mb-16">
                        <p className="text-gray-40 text-base font-bold mb-3">
                            가막새읽 이용 가이드
                        </p>
                        <h1 className="text-4xl font-black text-gray-5">
                            소장하고 있는 도서를 등록하고 읽기
                        </h1>
                    </div>

                    <div className="grid grid-cols-12 gap-4 items-center">
                        <div className="col-span-6">
                            <div className="space-y-10">
                                {slides.map((slide, idx) => {
                                    const isActive = idx === currentIndex;
                                    return (
                                        <button
                                            key={slide.step}
                                            type="button"
                                            onClick={() => setCurrentIndex(idx)}
                                            className={`w-full text-left transition-colors ${
                                                isActive
                                                    ? "text-gray-20"
                                                    : "text-gray-50"
                                            }`}>
                                            <div className="flex gap-4 items-start pl-60">
                                                <span
                                                    className={`mt-1.5 w-6 h-6 rounded-full border flex items-center justify-center text-sm font-bold ${
                                                        isActive
                                                            ? "border-gray-10 text-gray-10"
                                                            : "border-gray-50 text-gray-50"
                                                    }`}>
                                                    {idx + 1}
                                                </span>
                                                <div className="flex-1">
                                                    <p
                                                        className={`text-2xl font-semibold ${
                                                            isActive
                                                                ? "text-gray-10"
                                                                : "text-gray-50"
                                                        }`}>
                                                        {slide.step}
                                                    </p>
                                                    <p className="text-lg mt-3">
                                                        {slide.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="col-span-6 relative pr-20">
                            <div
                                onWheel={handleWheel}
                                onClick={
                                    slides[currentIndex].isStartSlide
                                        ? handleStart
                                        : undefined
                                }
                                className={`h-[450px] flex items-center justify-center overflow-hidden relative rounded-3xl ${
                                    slides[currentIndex].isStartSlide
                                        ? "cursor-pointer hover:scale-101 transition-transform duration-300"
                                        : ""
                                }`}
                                style={{
                                    cursor: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23E4E2DF' stroke-width='0'%3E%3Cpath d='M12 5C11.4477 5 11 5.44772 11 6V10C11 10.5523 11.4477 11 12 11C12.5523 11 13 10.5523 13 10V6C13 5.44772 12.5523 5 12 5Z' fill='%23E4E2DF'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M4 8C4 3.58172 7.58172 0 12 0C16.4183 0 20 3.58172 20 8V16C20 20.4183 16.4183 24 12 24C7.58172 24 4 20.4183 4 16V8ZM18 8V16C18 19.3137 15.3137 22 12 22C8.68629 22 6 19.3137 6 16V8C6 4.68629 8.68629 2 12 2C15.3137 2 18 4.68629 18 8Z' fill='%23E4E2DF'/%3E%3C/svg%3E") 12 12, auto`,
                                }}>
                                <AnimatePresence mode="wait">
                                    <motion.img
                                        key={slides[currentIndex].imageUrl}
                                        src={slides[currentIndex].imageUrl}
                                        alt={slides[currentIndex].step}
                                        initial={{ opacity: 0, scale: 0.97 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 1.02 }}
                                        transition={{
                                            duration: 0.4,
                                            ease: "easeOut",
                                        }}
                                        className="w-full h-full object-cover rounded-3xl"
                                    />
                                </AnimatePresence>
                                {slides[currentIndex].isStartSlide && (
                                    // 커스텀 커서
                                    <div className="absolute inset-0 flex items-center justify-center bg-gray-95/20 rounded-[28px] pointer-events-none">
                                        <div className="text-center animate-pulse">
                                            <div className="text-gray-5 text-6xl font-bold mb-4">
                                                시작하기
                                            </div>
                                            <div className="text-gray-5 text-xl">
                                                클릭하여 시작하세요 👆
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="absolute -right-0 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3 pr-12">
                                {slides.map((_, idx) => (
                                    <span
                                        key={idx}
                                        className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                                            idx === currentIndex
                                                ? "bg-gray-40"
                                                : "bg-gray-70"
                                        }`}
                                        onClick={() => setCurrentIndex(idx)}
                                    />
                                ))}
                                <PiMouseScrollLight className="text-gray-40 text-xl mt-2" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GuidePage;
