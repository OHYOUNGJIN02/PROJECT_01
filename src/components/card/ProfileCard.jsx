import React from "react";



export default function ProfileCard() {

    return (

        <div className="bg-gray-95 flex flex-col gap-[40px] items-start overflow-clip px-[32px] py-[24px] relative rounded-[12px] w-full">

            <div className="flex gap-[40px] items-start relative shrink-0 w-full">

                {/* Profile Image Section */}

                <div className="bg-gray-80 flex flex-col items-center justify-center overflow-clip p-[20px] relative rounded-full shrink-0 size-[100px]">

                    <p className="font-medium leading-normal not-italic relative shrink-0 text-[20px] text-center text-white">

                        프로필

                    </p>

                </div>



                {/* Profile Details Section */}

                <div className="flex flex-[1_0_0] flex-col gap-[8px] items-start min-h-px min-w-px relative">

                    <div className="flex flex-col gap-[16px] items-start leading-normal not-italic relative shrink-0">

                        <p className="font-medium relative shrink-0 text-gray-40 text-[16px]">

                            내 프로필

                        </p>

                        <div className="flex flex-col gap-[px] items-start relative shrink-0">

                            <div className="flex font-medium gap-[16px] items-center relative shrink-0">

                                <p className="relative shrink-0 text-[20px] text-white">

                                    불모산영창드리프트

                                </p>

                                <button className="opacity-50 relative shrink-0 text-gray-50 text-[16px] hover:opacity-100 transition-opacity">

                                    변경

                                </button>

                            </div>

                        </div>

                    </div>



                    {/* Action Links */}

                    <div className="flex flex-row gap-[20px] items-start leading-normal not-italic relative shrink-0">

                        <button className="font-medium relative shrink-0 text-gray-50 text-[16px] hover:underline">

                            로그아웃

                        </button>

                        <button className="font-medium relative shrink-0 text-red-50 text-[16px] hover:underline">

                            서비스 탈퇴

                        </button>

                    </div>

                </div>

                <div className="flex font-regular gap-[20px] items-end justify-end leading-normal not-italic relative self-stretch shrink-0 text-gray-50 text-[16px]">

                    <button className="relative shrink-0 hover:text-gray-40 transition-colors">

                        고객센터

                    </button>

                    <button className="relative shrink-0 hover:text-gray-40 transition-colors">

                        약관 및 정책

                    </button>

                </div>

            </div>

        </div>

    );

}