import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AlertCircle, ChevronLeft } from "lucide-react";

const MY1100_WithDraw = () => {
    const navigate = useNavigate();

    // 1. 유저 정보 조회 (이메일 비교용)
    const { data: user } = useGetPrincipalQuery();

    // 2. 회원 탈퇴 Mutation (성공 시 알림, 로그아웃, 리다이렉트까지 내부에서 처리됨)
    const { mutate: deleteUser, isPending } = useDeleteUserMutation();

    // React Hook Form 설정
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        mode: "onChange",
    });

    const handleCancel = () => {
        navigate("/mypage");
    };

    const onSubmit = (data) => {
        // 1. 이메일 프론트엔드 검증
        if (user?.email && data.email !== user.email) {
            alert("입력한 이메일이 현재 로그인된 계정과 일치하지 않습니다.");
            return;
        }

        // 2. 탈퇴 실행 (Mutation 호출)
        // onSuccess 로직은 useDeleteUserMutation 내부에 이미 정의되어 있으므로 여기선 호출만 하면 됨
        deleteUser();
    };

    return (
        <div className="flex-1 h-full flex flex-col px-16 animate-in fade-in duration-500 overflow-hidden">
            {/* 상단 내비게이션 */}
            <div className="w-full flex justify-between items-center pt-0 pb-6 flex-shrink-0">
                <div
                    onClick={handleCancel}
                    className="flex items-center gap-3 cursor-pointer text-gray-40 hover:text-gray-10 transition-colors">
                    <ChevronLeft size={24} strokeWidth={2.5} />
                    <span className="text-[20px] font-pretendard tracking-tight font-bold">
                        마이 페이지
                    </span>
                </div>
            </div>

            {/* 메인 컨텐츠 */}
            <div className="flex-1 flex flex-col items-center justify-center pb-24 overflow-y-auto">
                <div className="w-full max-w-[480px] flex flex-col items-center">
                    <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
                        <AlertCircle size={36} className="text-red-500" />
                    </div>

                    <h2 className="text-[28px] font-pretendard font-bold text-gray-5 mb-3 tracking-tight">
                        정말 탈퇴하시겠어요?
                    </h2>

                    <p className="text-gray-50 font-pretendard text-[16px] text-center leading-relaxed mb-10">
                        탈퇴 시 모든 독서 기록과 데이터가 영구 삭제됩니다.
                        <br />
                        계정 확인을 위해 아래 정보를 입력해 주세요.
                    </p>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="w-full flex flex-col gap-6">
                        <div className="w-full bg-gray-90 p-8 rounded-3xl border border-gray-80 flex flex-col gap-6 shadow-xl">
                            {/* 이메일 입력 */}
                            <div className="flex flex-col gap-2">
                                <label className="text-gray-40 font-pretendard text-[13px] ml-1 font-semibold">
                                    이메일 확인
                                </label>
                                <input
                                    type="text"
                                    placeholder="본인의 이메일을 입력하세요."
                                    disabled={isPending}
                                    className={`w-full bg-gray-95 border rounded-xl py-4 px-5 text-gray-10 text-[15px] focus:outline-none transition-all placeholder:text-gray-60 font-pretendard
                                        ${
                                            errors.email
                                                ? "border-red-500 focus:border-red-500"
                                                : "border-gray-80 focus:border-red-500/50"
                                        }
                                    `}
                                    {...register("email", {
                                        required: "이메일을 입력해주세요.",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message:
                                                "올바른 이메일 형식이 아닙니다.",
                                        },
                                        validate: (value) =>
                                            value === user?.email ||
                                            "로그인된 이메일과 일치하지 않습니다.",
                                    })}
                                />
                                {errors.email && (
                                    <span className="text-red-500 text-[12px] ml-1 font-medium">
                                        {errors.email.message}
                                    </span>
                                )}
                            </div>

                            {/* 확인 문구 입력 */}
                            <div className="flex flex-col gap-2">
                                <label className="text-gray-40 font-pretendard text-[13px] ml-1 font-semibold">
                                    회원 탈퇴 확인
                                </label>
                                <input
                                    type="text"
                                    placeholder='"회원 탈퇴를 하겠습니다" 문구를 정확히 입력해주세요.'
                                    disabled={isPending}
                                    className={`w-full bg-gray-95 border rounded-xl py-4 px-5 text-gray-10 text-[15px] focus:outline-none transition-all placeholder:text-gray-60 font-pretendard
                                        ${
                                            errors.confirmText
                                                ? "border-red-500 focus:border-red-500"
                                                : "border-gray-80 focus:border-red-500/50"
                                        }
                                    `}
                                    {...register("confirmText", {
                                        required: "확인 문구를 입력해주세요.",
                                        validate: (value) =>
                                            value ===
                                                "회원 탈퇴를 하겠습니다" ||
                                            "문구가 정확하지 않습니다.",
                                    })}
                                />
                                {errors.confirmText && (
                                    <span className="text-red-500 text-[12px] ml-1 font-medium">
                                        {errors.confirmText.message}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* 하단 버튼 */}
                        <div className="flex w-full gap-4 mb-4">
                            <button
                                type="submit"
                                disabled={!isValid || isPending}
                                className={`
                                    flex-1 py-4 font-pretendard rounded-2xl text-[16px] shadow-lg shadow-gray-95/20 font-bold
                                    transition-all duration-300 ease-in-out border
                                    ${
                                        isValid && !isPending
                                            ? "bg-gray-80 text-[#B03D3D] cursor-pointer hover:bg-[#B03D3D] hover:text-gray-5 border-gray-70"
                                            : "bg-gray-80 text-[#B03D3D]/30 cursor-not-allowed border-transparent opacity-70"
                                    }
                                `}>
                                {isPending ? "처리 중..." : "탈퇴하기"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MY1100_WithDraw;
