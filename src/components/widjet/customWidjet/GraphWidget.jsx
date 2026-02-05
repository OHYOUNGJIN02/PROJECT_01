import React from "react";

export default function GraphWidget({ className }) {
    const stats = [
        {
            label: "읽는 중",
            value: 10,
            color: "var(--blue50)", // 반드시 var()로 감싸기
            textColor: "var(--blue10)",
        },
        {
            label: "완료",
            value: 10,
            color: "var(--yellow50)",
            textColor: "var(--yellow10)",
        },
        {
            label: "읽지 않은 도서",
            value: 20,
            color: "var(--green50)",
            textColor: "var(--green10)",
        },
    ];

    const total = stats.reduce((acc, curr) => acc + curr.value, 0);

    const size = 180;
    const center = size / 2;
    const strokeWidth = 16;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;

    let cumulativeOffset = 0;

    return (
        <div
            className={`${className} flex gap-[20px] shadow-lg overflow-hidden`}
            style={{
                width: "389px",
                height: "252px",
                fontFamily: '"Pretendard Variable", sans-serif',
            }}>
            {/* 왼쪽 정보 영역 */}
            <div className="flex flex-col h-full justify-between">
                <div>
                    <p className="font-bold text-gray-5 text-[20px]">나의 독서 그래프</p>
                    <p className="text-gray-50 text-[16px] font-medium">등록된 도서</p>
                </div>

                <div className="flex flex-col gap-[12px] text-[12px]">
                    {stats.map((item, idx) => (
                        <div key={idx} className="flex items-center">
                            <div className="flex items-center gap-[8px]">
                                {/* ● 아이콘 색상 (그래프 색상과 동일) */}
                                <span style={{ color: item.color }}>●</span>

                                {/* 라벨 색상 (지정하신 textColor 적용) */}
                                <span
                                    className="whitespace-nowrap font-medium transition-colors duration-300"
                                    style={{ color: item.textColor }}>
                                    {item.label}
                                </span>
                            </div>

                            {/* 숫자 색상 (지정하신 textColor 적용) */}
                            <span
                                className="ml-[12px] font-medium transition-colors duration-300"
                                style={{ color: item.textColor }}>
                                {item.value}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* 오른쪽 그래프 영역 */}
            <div className="flex-1 flex items-center justify-center relative">
                <svg width={size} height={size} className="rotate-[-90deg]">
                    <circle
                        cx={center}
                        cy={center}
                        r={radius}
                        stroke="#201f1e"
                        strokeWidth={strokeWidth}
                        fill="transparent"
                    />
                    {stats.map((item, idx) => {
                        const ratio = total === 0 ? 0 : item.value / total;
                        const strokeDasharray = ratio * circumference;
                        const offset = (cumulativeOffset / total) * circumference;
                        cumulativeOffset += item.value;

                        return (
                            <circle
                                key={idx}
                                cx={center}
                                cy={center}
                                r={radius}
                                fill="transparent"
                                stroke={item.color}
                                strokeWidth={strokeWidth}
                                strokeDasharray={`${strokeDasharray} ${circumference}`}
                                strokeDashoffset={-offset}
                                strokeLinecap="butt"
                                className="transition-all duration-700 ease-in-out"
                            />
                        );
                    })}
                </svg>

                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[40px] font-bold text-white">{total}</span>
                </div>
            </div>
        </div>
    );
}
