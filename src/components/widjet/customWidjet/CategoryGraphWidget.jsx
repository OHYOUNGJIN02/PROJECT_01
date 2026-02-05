import React, { useState } from "react";

export default function CategoryGraphWidget({ className }) {
    // 1. textColor 필드를 추가하여 각 항목의 글자 색상을 개별 지정했습니다.
    const [data, setData] = useState([
        {
            label: "판타지",
            value: 10,
            color: "var(--blue50)", // 반드시 var()로 감싸기
            textColor: "var(--blue10)",
        },
        {
            label: "SF",
            value: 12,
            color: "var(--yellow50)",
            textColor: "var(--yellow10)",
        },
        {
            label: "로맨스",
            value: 18,
            color: "var(--green50)",
            textColor: "var(--green10)",
        },
    ]);

    const total = data.reduce((acc, curr) => acc + curr.value, 0);

    const size = 180;
    const center = size / 2;
    const strokeWidth = 16;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;

    let cumulativeOffset = 0;

    return (
        <div
            className={`${className} flex gap-[20px] overflow-hidden`}
            style={{
                width: "389px",
                height: "252px",
                fontFamily: '"Pretendard Variable", sans-serif',
            }}>
            {/* 왼쪽 리스트 */}
            <div className="flex flex-col h-full justify-between">
                <div>
                    <p className="font-bold text-gray-5 text-[20px]">나의 도서 취향</p>
                    <p className="text-gray-50 text-[16px] font-medium">등록된 도서</p>
                </div>

                <div className="flex flex-col gap-[12px] text-[12px]">
                    {data.map((item, idx) => (
                        <div key={idx} className="flex items-center">
                            <div className="flex items-center gap-[8px]">
                                {/* ● 아이콘: 그래프 조각 색상과 매칭 */}
                                <span style={{ color: item.color }}>●</span>

                                {/* 라벨: 개별 textColor 적용 */}
                                <span
                                    className="font-medium whitespace-nowrap"
                                    style={{ color: item.textColor }}>
                                    {item.label}
                                </span>
                            </div>

                            {/* 숫자: 개별 textColor 적용 */}
                            <span
                                className="ml-[12px] font-medium"
                                style={{ color: item.textColor }}>
                                {item.value}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* 오른쪽 실시간 SVG 그래프 */}
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

                    {data.map((item, idx) => {
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
