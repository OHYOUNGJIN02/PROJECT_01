import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
    const navigate = useNavigate();

    const [errorIndex, setErrorIndex] = useState(0);
    const errorList = [
        { code: "404", msg: "NOT FOUND" },
        { code: "401", msg: "UNAUTHORIZED" },
        { code: "403", msg: "FORBIDDEN" },
        { code: "500", msg: "ERROR" },
    ];

    const BOOK_SCALE = 1.3;

    return (
        <div className="min-h-screen bg-gray-90 text-white flex flex-col justify-center items-center overflow-hidden font-pretendard select-none">
            <div className="max-w-7xl w-full px-6 md:px-12 lg:px-20 flex flex-col md:flex-row items-center justify-between">
                <div className="w-full md:w-5/12 flex flex-col items-center md:items-start text-center md:text-left z-10 mb-10 md:mb-0">
                    <div className="flex flex-col items-center md:items-start mb-6">
                        <h1 className="text-6xl md:text-8xl font-pretendard uppercase leading-none tracking-tighter -ml-1 md:-ml-3">
                            이런!
                        </h1>

                        <p className="mt-8 md:mt-8 text-sm md:text-lg font-pretendard tracking-[0.1em] text-zinc-400">
                            문제가 발생했습니다
                        </p>
                    </div>

                    <p className="text-gray-40 text-[10px] md:text-[15px] max-w-md font-pretendard leading-relaxed mb-10">
                        페이지가 존재하지 않거나, 사용할 수 없는 페이지입니다.
                        <br />
                        입력하신 주소가 정확한지 다시 한 번 확인해주세요.
                    </p>

                    <div className="flex gap-4">
                        <button
                            onClick={() => navigate("/")}
                            className="px-8 py-3 bg-gray-5 text-gray-95 rounded-full font-pretendard tracking-widest text-sm hover:bg-gray-20 transition-colors duration-300">
                            메인 페이지로
                        </button>

                        <button
                            onClick={() =>
                                setErrorIndex(
                                    (prev) => (prev + 1) % errorList.length,
                                )
                            }
                            className="px-6 py-3 border border-gray-70 rounded-full font-pretendard text-ms hover:bg-gray-80 transition-all">
                            상태 변경
                        </button>
                    </div>
                </div>

                <div className="w-full md:w-7/12 flex justify-center items-center relative">
                    <div
                        className="relative transition-transform duration-300 ease-out"
                        style={{
                            transform: `scale(${BOOK_SCALE})`,
                            transformOrigin: "center center",
                        }}>
                        <img
                            src="/img/404book2.png"
                            alt="404 Book Design"
                            className="w-full max-w-[600px] h-auto object-contain drop-shadow-2xl"
                        />

                        <div className="absolute top-[40%] left-[35%] -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                            <div className="text-gray-95 font-pretendard text-3xl md:text-5xl tracking-tighter leading-none mb-1">
                                {errorList[errorIndex].code}
                            </div>
                            <div className="text-gray-95 font-pretendard text-[10px] md:text-[12px] opacity-70 tracking-widest uppercase">
                                {errorList[errorIndex].msg}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;
