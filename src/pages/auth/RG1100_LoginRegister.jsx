import React from "react";
import { FcGoogle } from "react-icons/fc";
import { SiNaver } from "react-icons/si";

const RG1100_LoginRegister = () => {
    const handleOAuth2 = (provider) => {
        // 로그인/회원가입 모두 동일한 엔드포인트 사용
        // 백엔드에서 사용자 상태를 확인하여 자동으로 처리
        // VITE_API_BASE_URL 환경변수를 사용하거나 기본값 사용
        const baseURL =
            import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";
        window.location.href = `${baseURL}/oauth2/authorization/${provider}`;
    };

    return (
        <div className=" flex w-screen h-screen bg-gray-90">
            <div className="flex flex-col w-full max-w-[450px] h-full bg-gray-95 px-12 py-12 border-r border-gray-5/5 ">
                <div className="flex flex-col flex-grow justify-center pb-20">
                    <div className="mb-5 cursor-pointer w-full">
                        <img
                            src={"/img/logoL.png"}
                            alt="로고"
                            className="h-12 w-auto object-contain object-left"
                        />
                    </div>
                    <div className="mb-14">
                        <h1 className="text-gray-5 text-[32px] text-left font-bold leading-snug m-0">
                            가로읽다 막히면
                            <br />
                            <span className="text-gray-10 font-medium">
                                새로 읽으면 됩니다
                            </span>
                        </h1>
                        <p className="text-gray-50 font-medium mt-5">
                            3초만에 시작하고 독서 기록을 관리하세요.
                        </p>
                    </div>
                    <div className="flex flex-col gap-3.5">
                        <button
                            onClick={() => handleOAuth2("google")}
                            className="w-full h-[54px] bg-gray-5 rounded-lg flex items-center justify-center gap-3 text-[15px] font-semibold text-gray-95 hover:bg-gray-10 transition-all cursor-pointer">
                            <FcGoogle size={22} />
                            구글로 시작하기
                        </button>

                        <button
                            onClick={() => handleOAuth2("naver")}
                            className="w-full h-[54px] bg-gray-5 rounded-lg flex items-center justify-center gap-3 text-[15px] font-semibold text-gray-95 hover:bg-gray-10 transition-all cursor-pointer">
                            <SiNaver size={22} color="#03A94D" />
                            네이버로 시작하기
                        </button>
                    </div>
                </div>
                <div className="text-gray-70 text-[12px]">
                    © 2026 가막새읽. All rights reserved.
                </div>
            </div>
            <div className="flex-1 flex items-center justify-center bg-gray-90">
                <h2 className="text-gray-80 font-bold text-2xl tracking-widest opacity-20 select-none">
                    오어스 로그인창
                </h2>
            </div>
        </div>
    );
};

export default RG1100_LoginRegister;
