import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { readingApi } from "../../api"; // ✅ 통합 Import
import { queryKeys } from "../../utils/queryKeys";

/**
 * 읽고 있는 책 목록 조회
 */
export const useReadingBooksQuery = () => {
    return useQuery({
        queryKey: queryKeys.reading.books(),
        queryFn: async () => {
            const data = await readingApi.getReadingBooks();
            return data.readingBooks || [];
        },
    });
};

/**
 * 읽기 시작 Mutation
 */
export const useStartReadingMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (myBookId) => readingApi.startReading(myBookId),
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.reading.books(),
            });
            queryClient.invalidateQueries({
                queryKey: queryKeys.library.myBooks(),
            });
            queryClient.invalidateQueries({
                queryKey: queryKeys.library.myBookDetail(variables),
            });
        },
    });
};

/**
 * 독서 기록(페이지 업데이트) Mutation
 */
export const useRecordProgressMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload) => readingApi.recordProgress(payload),
        onSuccess: () => {
            // ✅ 기록 저장 시 -> 책 목록, 서재, 달력(통계), 일별로그, 주간통계 모두 갱신
            queryClient.invalidateQueries({
                queryKey: queryKeys.reading.books(),
            });
            queryClient.invalidateQueries({
                queryKey: queryKeys.library.myBooks(),
            });
            queryClient.invalidateQueries({
                queryKey: queryKeys.reading.calendar(),
            });
            queryClient.invalidateQueries({
                queryKey: queryKeys.reading.daily(),
            });
            queryClient.invalidateQueries({
                queryKey: queryKeys.reading.weekly(),
            });
        },
    });
};

/**
 * 완독/중단 처리 Mutation
 */
export const useStopReadingMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ readingBookId, completed }) =>
            readingApi.stopReading(readingBookId, completed),
        onSuccess: (data) => {
            const myBookId = data?.myBookId;
            queryClient.invalidateQueries({
                queryKey: queryKeys.reading.books(),
            });
            queryClient.invalidateQueries({
                queryKey: queryKeys.library.myBooks(),
            });
            queryClient.invalidateQueries({
                queryKey: queryKeys.reading.calendar(),
            });
            queryClient.invalidateQueries({
                queryKey: queryKeys.reading.weekly(),
            });

            if (myBookId) {
                queryClient.invalidateQueries({
                    queryKey: queryKeys.library.myBookDetail(myBookId),
                });
            }
        },
    });
};

/**
 * 월간 통계 조회 훅
 */
export const useCalendarStatQuery = (year, month) => {
    return useQuery({
        // ✅ ["reading", "stats", ...] 였던 것을 calendar로 통일
        queryKey: queryKeys.reading.calendar(year, month),
        queryFn: async () => {
            const data = await readingApi.getCalendarData(year, month);
            return data;
        },
        keepPreviousData: true,
    });
};

/**
 * 특정 날짜 기록 조회 훅
 */
export const useDailyProgressQuery = (date) => {
    return useQuery({
        queryKey: queryKeys.reading.daily(date),
        queryFn: async () => {
            const data = await readingApi.getDailyProgress(date);
            return data;
        },
    });
};

/**
 * 주간 독서 통계 (전체 or 특정 책)
 */
export const useWeeklyProgressQuery = (readingBookId = null) => {
    return useQuery({
        queryKey: queryKeys.reading.weekly(readingBookId),
        queryFn: async () => {
            if (readingBookId) {
                return await readingApi.getWeeklyProgressByBook(readingBookId);
            }
            return await readingApi.getWeeklyProgress();
        },
    });
};
