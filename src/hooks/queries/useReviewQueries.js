import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { reviewApi } from "../../api"; // ✅ 통합 Import
import { queryKeys } from "../../utils/queryKeys";

// 1. 독후감 상세 조회 훅
export const useReviewDetailQuery = (reviewId) => {
    return useQuery({
        queryKey: queryKeys.review.detail(reviewId),
        queryFn: async () => {
            const data = await reviewApi.getReviewDetail(reviewId);
            return data;
        },
        enabled: !!reviewId,
    });
};

// 2. 내 독후감 목록 조회
export const useMyReviewsQuery = () => {
    return useQuery({
        queryKey: queryKeys.review.myList(),
        queryFn: async () => {
            const data = await reviewApi.getMyReviews();
            return data; // { reviews: [...] }
        },
    });
};

// 3. 내가 좋아요한 독후감 목록
export const useMyLikedReviewsQuery = () => {
    return useQuery({
        queryKey: queryKeys.review.likedList(),
        queryFn: async () => {
            const data = await reviewApi.getMyLikedReviews();
            return data;
        },
    });
};

// 4. 독후감 생성 Mutation
export const useCreateReviewMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data) => reviewApi.createReview(data),
        onSuccess: () => {
            // 독후감 작성 시 -> 서재 상태(hasReview 등)가 바뀔 수 있으므로 갱신
            queryClient.invalidateQueries({
                queryKey: queryKeys.library.myBooks(),
            });
            queryClient.invalidateQueries({
                queryKey: queryKeys.review.myList(),
            });
        },
    });
};

// 5. 독후감 수정 Mutation
export const useModifyReviewMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ reviewId, data }) =>
            reviewApi.modifyReview(reviewId, data),
        onSuccess: (data, variables) => {
            // 상세 데이터 갱신
            queryClient.invalidateQueries({
                queryKey: queryKeys.review.detail(variables.reviewId),
            });
            queryClient.invalidateQueries({
                queryKey: queryKeys.review.myList(),
            });
        },
    });
};

// 6. 독후감 삭제 Mutation
export const useDeleteReviewMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (reviewId) => reviewApi.deleteReview(reviewId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.library.myBooks(),
            });
            queryClient.invalidateQueries({
                queryKey: queryKeys.review.myList(),
            });
        },
    });
};

// 7. 좋아요 토글 (등록/취소)
export const useReviewLikeMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ reviewId, isLiked }) => {
            // 현재 좋아요 상태면 취소, 아니면 등록
            return isLiked
                ? reviewApi.unlikeReview(reviewId)
                : reviewApi.likeReview(reviewId);
        },
        onSuccess: (data, variables) => {
            // 상세 정보(좋아요 수) 및 좋아요 목록 갱신
            queryClient.invalidateQueries({
                queryKey: queryKeys.review.detail(variables.reviewId),
            });
            queryClient.invalidateQueries({
                queryKey: queryKeys.review.likedList(),
            });
        },
    });
};

// 8. AI 체크
export const useAiCheckMutation = () => {
    return useMutation({
        mutationFn: (data) => reviewApi.checkReviewWithAI(data),
    });
};
