import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { authApi } from "../../api";
import { useForm } from "react-hook-form";
import { getApiErrorMessage } from "../../utils/apiError";

const RG1100_OnboardingRegister = () => {
    const navigate = useNavigate();
    const { setLogin, setPrincipal } = useAuthStore();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const signupToken = localStorage.getItem("signupToken");

        if (!signupToken) {
            alert("회원가입 토큰이 없습니다. 다시 시도해주세요.");
            navigate("/auth/login");
            return;
        }

        setIsSubmitting(true);
        try {
            const responseData = await authApi.oauth2Signup({
                nickname: data.nickname,
                profileImage: null,
                signupToken: signupToken,
            });

            localStorage.removeItem("signupToken");

            const accessToken = responseData.accessToken;
            if (accessToken) {
                setLogin(accessToken);
            }

            if (responseData.user) {
                setPrincipal(responseData.user);
            }

            navigate("/guide", { replace: true });
        } catch (error) {
            console.error("회원가입 오류:", error);
            alert(getApiErrorMessage(error));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex w-screen h-screen bg-gray-90">
            {/* 좌측 입력 영역 */}
            <div className="flex flex-col w-full max-w-[450px] h-full bg-gray-95 px-12 py-12 border-r border-gray-80">
                {/* border-gray-5/5 -> border-gray-80 으로 변경 (확실한 색상) */}

                <div className="flex flex-col flex-grow justify-center pb-20">
                    {/* 로고 영역 */}
                    <div className="mb-10 cursor-pointer w-full">
                        <img
                            src={"/img/logoL.png"}
                            alt="로고"
                            className="h-9 w-auto object-contain object-left"
                        />
                    </div>

                    {/* 헤더 영역 */}
                    <div className="mb-14">
                        <h1 className="text-gray-5 text-[32px] text-left font-bold leading-snug m-0">
                            처음 오셨군요! 👋
                        </h1>
                        <p className="text-gray-40 font-medium mt-5">
                            서비스에서 사용할 멋진 닉네임을 정해주세요.
                        </p>
                    </div>

                    {/* 폼 영역 */}
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-gray-40 text-xs font-semibold uppercase tracking-wider ml-1">
                                닉네임
                            </label>
                            <input
                                {...register("nickname", {
                                    required: "닉네임은 비어있을 수 없습니다.",
                                    minLength: {
                                        value: 2,
                                        message: "최소 2자 이상 입력해주세요.",
                                    },
                                    maxLength: {
                                        value: 10,
                                        message: "최대 10자까지만 가능합니다.",
                                    },
                                })}
                                type="text"
                                placeholder="닉네임을 입력하세요 (2~10자)"
                                className={`w-full h-[54px] bg-gray-5/5 border rounded-lg px-4 text-gray-5 text-[15px] focus:outline-none focus:ring-1 transition-all ${
                                    errors.nickname
                                        ? "border-red-500 focus:ring-red-500"
                                        : "border-gray-5/10 focus:border-gray-5/30 focus:ring-gray-5/20"
                                }`}
                            />
                            {errors.nickname && (
                                <span className="text-red-500 text-xs mt-1 ml-1 font-medium">
                                    {errors.nickname.message}
                                </span>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full h-[54px] bg-gray-5 rounded-lg flex items-center justify-center text-[15px] font-bold text-gray-95 hover:bg-gray-20 transition-all cursor-pointer mt-4 ${
                                isSubmitting
                                    ? "opacity-50 cursor-not-allowed"
                                    : ""
                            }`}>
                            {isSubmitting ? "처리 중..." : "시작하기"}
                        </button>
                    </form>
                </div>

                {/* 하단 카피라이트 */}
                <div className="text-gray-60 text-[12px]">
                    © 2026 가막새읽. All rights reserved.
                </div>
            </div>

            {/* 우측 빈 공간 */}
            <div className="flex-1 flex items-center justify-center bg-gray-90">
                <h2 className="text-gray-80 font-bold text-2xl tracking-widest opacity-20 select-none uppercase">
                    Setup Profile
                </h2>
            </div>
        </div>
    );
};

export default RG1100_OnboardingRegister;
