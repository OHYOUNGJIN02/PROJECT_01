import React, { useEffect } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children, onClose }) => {
    // ESC 키로 닫기
    useEffect(() => {
        const onKeyDown = (e) => {
            if (e.key === "Escape") onClose?.();
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [onClose]);

    // body 스크롤 막기 (모달 떴을 때 뒤에 배경 스크롤 방지)
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "unset";
        };
    }, []);

    // Portal을 사용하여 document.body에 직접 렌더링
    return createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop (배경 어둡게) */}
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Content (실제 모달 내용) */}
            <div className="relative z-10 bg-gray-95 border border-gray-80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
                {children}
            </div>
        </div>,
        document.body,
    );
};

export default Modal;
