// src/utils/colorUtils.js
import ColorThief from "colorthief";

/**
 * 이미지 URL에서 주 색상을 추출합니다.
 */
export async function getDominantColor(imageUrl) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = imageUrl;

        img.onload = () => {
            try {
                const colorThief = new ColorThief();
                // getColor는 [R, G, B] 배열을 반환합니다.
                const [r, g, b] = colorThief.getColor(img);
                const hexColor = `#${((1 << 24) + (r << 16) + (g << 8) + b)
                    .toString(16)
                    .slice(1)}`;
                resolve(hexColor);
            } catch (error) {
                reject(error);
            }
        };

        img.onerror = (error) => reject(error);
    });
}

/**
 * 배경색 밝기에 따라 텍스트 색상(검정/흰색) 결정
 */
export function getContrastTextColor(hexColor) {
    if (!hexColor) return "white";
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    const brightness = r * 0.299 + g * 0.587 + b * 0.114;
    return brightness > 186 ? "black" : "white";
}
