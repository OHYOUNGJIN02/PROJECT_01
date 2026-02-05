import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiArrowRight, HiArrowLeft } from "react-icons/hi";

// =================================================================
// 🛠️ 유틸리티 함수
// =================================================================

/**
 * D-Day 계산 함수
 * - 입력된 날짜(dateString)와 오늘 날짜의 차이를 일(Day) 단위로 반환
 * - Math.abs: 과거/미래 상관없이 절대값 차이 계산
 * - Math.ceil: 소수점 올림 처리
 */
const getDday = (dateString) => {
    const today = new Date();
    const targetDate = new Date(dateString);
    const diffTime = Math.abs(today - targetDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
};

// =================================================================
// 📚 하위 컴포넌트: 개별 책 아이템 (BookItem)
// =================================================================

const BookItem = ({ book, isOldMode }) => {
    // ✅ Hover 상태 관리
    // CSS hover 대신 React State를 사용하는 이유:
    // 초기 렌더링 시나 새로고침 시 스타일이 튀는 현상(FOUC) 방지 및 애니메이션 제어권 확보
    const [isHovered, setIsHovered] = useState(false);

    // 오래된 책 모드일 때만 D-Day 계산
    const dDay = isOldMode ? getDday(book.lastDate) : 0;

    // 1. 컨테이너 애니메이션 설정
    const containerVariants = {
        rest: {},
        hover: {},
    };

    // 2. 이미지 애니메이션 설정 (확대 + 블러 + 어두워짐)
    const imageVariants = {
        rest: { scale: 1, filter: "blur(0px) brightness(1)" },
        hover: { scale: 1.1, filter: "blur(4px) brightness(0.7)" },
    };

    // 3. 텍스트 오버레이 애니메이션 설정 (투명도 조절)
    const overlayVariants = {
        rest: { opacity: 0 },
        hover: { opacity: 1 },
    };

    return (
        <motion.div
            className="relative w-[105px] h-[155px] flex-shrink-0 cursor-pointer rounded-lg overflow-hidden shadow-md bg-gray-80"
            // 마우스 이벤트로 State 변경
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            // State에 따라 'hover' 또는 'rest' 애니메이션 실행
            initial="rest"
            animate={isHovered ? "hover" : "rest"}
            variants={containerVariants}
            // ✅ 성능 최적화: 브라우저에게 변형이 일어날 것임을 미리 알림 (GPU 가속 유도)
            style={{ willChange: "transform" }}>
            {/* 1. 이미지 레이어 */}
            <motion.img
                src={book.cover}
                alt={book.title}
                // ✅ transform-gpu: 하드웨어 가속을 강제하여 이미지 떨림(Jitter) 현상 방지
                className="w-full h-full object-cover transform-gpu"
                variants={imageVariants}
                transition={{ duration: 0.2, ease: "linear" }}
                // ✅ 렌더링 힌트 제공 (떨림 방지 핵심)
                style={{
                    willChange: "transform, filter",
                    backfaceVisibility: "hidden",
                }}
            />

            {/* 2. 텍스트 오버레이 레이어 */}
            <motion.div
                // opacity-0: JS 로딩 전 기본적으로 숨김 처리 (이중 안전장치)
                className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center p-2 text-center z-10 opacity-0"
                variants={overlayVariants}
                transition={{ duration: 0.2, ease: "linear" }}>
                {/* 책 제목: 두 줄 넘어가면 말줄임(...) 처리 */}
                <span className="text-gray-5 text-[13px] font-bold leading-tight line-clamp-2 break-keep mb-2">
                    {book.title}
                </span>

                {/* 모드에 따른 하단 텍스트 분기 처리 */}
                {isOldMode ? (
                    <div className="flex flex-col">
                        <span className="text-red-300 text-[11px] font-medium">
                            안읽은지
                        </span>
                        <span className="text-white text-[16px] font-black leading-none mt-0.5">
                            {dDay}일째
                        </span>
                    </div>
                ) : (
                    <div className="mt-1 px-2 py-1 bg-blue-500/80 rounded-full text-white text-[11px] font-bold">
                        인기 급상승 🔥
                    </div>
                )}
            </motion.div>
        </motion.div>
    );
};

// =================================================================
// 🎛️ 메인 컴포넌트: 위젯 (OldBookSwitchWidget)
// =================================================================

const OldBookSwitchWidget = () => {
    // 현재 모드: 'OLD' (오래된 책) vs 'NEW' (새로운 책)
    const [mode, setMode] = useState("OLD");
    // 슬라이드 방향: 1 (오른쪽에서 등장) vs -1 (왼쪽에서 등장)
    const [direction, setDirection] = useState(0);

    // 📂 더미 데이터 (추후 API 연동 시 교체)
    const oldBooks = [
        {
            id: 1,
            title: "코스모스",
            cover: "https://image.aladin.co.kr/product/87/9/cover200/s412032094_1.jpg",
            lastDate: "2023-01-15",
            status: "STOP",
        },
        {
            id: 2,
            title: "총균쇠",
            cover: "https://image.aladin.co.kr/product/31629/43/cover200/8934942460_1.jpg",
            lastDate: "2023-05-20",
            status: "STOP",
        },
        {
            id: 3,
            title: "사피엔스",
            cover: "https://image.aladin.co.kr/product/30863/24/cover200/8934943238_1.jpg",
            lastDate: "2023-08-10",
            status: "READING",
        },
        {
            id: 4,
            title: "죄와 벌1",
            cover: "https://image.aladin.co.kr/product/1621/17/cover200/8937462842_3.jpg",
            lastDate: "2023-11-01",
            status: "STOP",
        },
        {
            id: 5,
            title: "데일 카네기 인간관계론",
            cover: "https://image.aladin.co.kr/product/20945/79/cover200/s652933016_2.jpg",
            lastDate: "2023-12-05",
            status: "READING",
        },
    ];

    const newBooks = [
        {
            id: 6,
            title: "다이브",
            cover: "https://image.aladin.co.kr/product/29547/15/cover500/893645711x_1.jpg",
        },
        {
            id: 7,
            title: "양면의 조개껍데기",
            cover: "https://image.aladin.co.kr/product/37024/77/cover500/k482030732_2.jpg",
        },
        {
            id: 8,
            title: "모우어",
            cover: "https://image.aladin.co.kr/product/35099/68/cover500/k442934507_1.jpg",
        },
        {
            id: 9,
            title: "개의 설계사",
            cover: "https://image.aladin.co.kr/product/31862/9/cover500/k592833420_1.jpg",
        },
        {
            id: 10,
            title: "안녕이라 그랬어",
            cover: "https://image.aladin.co.kr/product/36566/52/cover200/k462039240_3.jpg?RS=170",
        },
    ];

    // 모드 전환 핸들러
    const handleSwitch = (targetMode) => {
        if (mode === targetMode) return;
        // NEW로 갈 땐 오른쪽(1), OLD로 갈 땐 왼쪽(-1) 방향 설정
        const newDirection = targetMode === "NEW" ? 1 : -1;
        setDirection(newDirection);
        setMode(targetMode);
    };

    // 슬라이더 애니메이션 Variants
    const slideVariants = {
        enter: (dir) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }), // 들어올 때 위치
        center: { x: 0, opacity: 1 }, // 중앙 정지
        exit: (dir) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }), // 나갈 때 위치
    };

    return (
        // ✅ [전체 레이아웃 스타일]
        // Flexbox, 높이 200px, 패딩, 둥근 모서리, 배경색 등 Tailwind 설정
        <div className="w-full h-[200px] px-6 py-4 flex items-start gap-5 self-stretch bg-gray-95 border border-gray-80 rounded-xl relative overflow-hidden shadow-lg select-none">
            {/* 1. Left Section: [오래된 책] 버튼 영역 */}
            {/* 상단 정렬 (justify-start) */}
            <div className="w-[140px] h-full flex flex-col justify-start z-20">
                <button
                    onClick={() => handleSwitch("OLD")}
                    className={`text-left transition-all duration-300 group flex flex-col items-start cursor-pointer ${
                        mode === "OLD"
                            ? "opacity-100" // 활성화 상태
                            : "opacity-40 hover:opacity-80" // 비활성화 상태
                    }`}>
                    <div className="flex items-center gap-1 mb-2">
                        <HiArrowLeft
                            className={`text-sm ${mode === "OLD" ? "text-gray-5" : "text-gray-50"}`}
                        />
                        <span className="text-[11px] text-gray-40 font-medium group-hover:text-gray-20 transition-colors">
                            오래된 책
                        </span>
                    </div>
                    <span
                        className={`text-[22px] font-black leading-none whitespace-nowrap ${mode === "OLD" ? "text-gray-5" : "text-gray-50"}`}>
                        가로 막혔니?
                    </span>
                </button>
            </div>

            {/* 2. Center Section: 책 리스트 슬라이더 */}
            <div className="flex-1 h-full relative flex items-center justify-center overflow-hidden">
                {/* AnimatePresence: 컴포넌트가 사라질 때(exit) 애니메이션을 가능하게 함 */}
                <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.div
                        key={mode} // key가 바뀌면 컴포넌트가 새로 생성되며 애니메이션 실행
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                        }}
                        className="absolute flex gap-4 items-center justify-center w-full px-2"
                        style={{ zIndex: 10 }}>
                        {/* 현재 모드에 따라 데이터 매핑 */}
                        {(mode === "OLD" ? oldBooks : newBooks).map((book) => (
                            <BookItem
                                key={book.id}
                                book={book}
                                isOldMode={mode === "OLD"}
                            />
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* 3. Right Section: [새로운 책] 버튼 영역 */}
            {/* 하단 정렬 (justify-end) */}
            <div className="w-[140px] h-full flex flex-col justify-end items-end z-20">
                <button
                    onClick={() => handleSwitch("NEW")}
                    className={`text-right transition-all duration-300 group flex flex-col items-end cursor-pointer ${
                        mode === "NEW"
                            ? "opacity-100"
                            : "opacity-40 hover:opacity-80"
                    }`}>
                    <span
                        className={`text-[22px] font-black leading-none whitespace-nowrap mb-2 ${mode === "NEW" ? "text-blue-200" : "text-gray-50"}`}>
                        새로 읽으면 돼!
                    </span>
                    <div className="flex items-center justify-end gap-1">
                        <span className="text-[11px] text-gray-40 font-medium group-hover:text-gray-20 transition-colors">
                            새로운 책
                        </span>
                        <HiArrowRight
                            className={`text-sm ${mode === "NEW" ? "text-blue-200" : "text-gray-50"}`}
                        />
                    </div>
                </button>
            </div>
        </div>
    );
};

export default OldBookSwitchWidget;
