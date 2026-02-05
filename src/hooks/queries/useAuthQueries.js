import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { accountApi } from "../../api"; // ✅ 통합 Import
import { useAuthStore } from "../../store/useAuthStore";
import { useEffect } from "react";
import { queryKeys } from "../../utils/queryKeys";

/**
 * 내 정보 조회 훅
 * - 데이터를 가져오면 Zustand Store(principal)에도 업데이트합니다.
 */
export const useGetPrincipalQuery = () => {
    const { setPrincipal, isLoggedIn } = useAuthStore();

    const queryResult = useQuery({
        queryKey: queryKeys.account.me(),
        queryFn: async () => {
            const data = await accountApi.getMe();
            return data;
        },
        enabled: isLoggedIn, // 로그인이 되어있을 때만 실행
        staleTime: 1000 * 60 * 30, // 30분간 캐시 유지
        retry: 0,
    });

    // 데이터가 로드되면 스토어에 동기화
    useEffect(() => {
        if (queryResult.data) {
            setPrincipal(queryResult.data);
        }
    }, [queryResult.data, setPrincipal]);

    return queryResult;
};

/**
 * 닉네임 변경 Mutation
 */
export const useModifyNicknameMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (nickname) => accountApi.modifyNickname({ nickname }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.account.me() });
            alert("닉네임이 변경되었습니다.");
        },
    });
};

/**
 * 프로필 이미지 변경 Mutation
 */
export const useModifyProfileImgMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (profileImage) =>
            accountApi.modifyProfileImg({ profileImage }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.account.me() });
        },
    });
};

/**
 * 회원 탈퇴 Mutation
 */
export const useDeleteUserMutation = () => {
    const { setLogout } = useAuthStore();

    return useMutation({
        mutationFn: () => accountApi.deleteUser(),
        onSuccess: () => {
            alert("회원 탈퇴가 완료되었습니다. 이용해 주셔서 감사합니다.");
            setLogout();
            window.location.href = "/"; // 메인으로 강제 이동
        },
    });
};
