import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { bookApi } from "../../api"; // ✅ 통합 Import
import { queryKeys } from "../../utils/queryKeys";

// ============================================================
// 1. 외부 도서 검색 (알라딘) & 캐싱
// ============================================================

/**
 * 알라딘 검색
 */
export const useAladinSearchQuery = (
    keyword,
    start = 1,
    maxResults = 10,
    enabled = true,
) => {
    return useQuery({
        queryKey: queryKeys.book.aladinSearch(keyword, start, maxResults),
        queryFn: () => bookApi.searchAladin(keyword, start, maxResults),
        enabled: Boolean(enabled && keyword && keyword.trim().length > 0),
        staleTime: 1000 * 60 * 5, // 5분 캐시
    });
};

/**
 * 알라딘 상세 저장 (DB 캐싱)
 */
export const useSaveAladinDetailMutation = () => {
    return useMutation({
        mutationFn: (isbn) => bookApi.saveAladinDetailToCache(isbn),
    });
};

// ============================================================
// 2. 내 서재 (Library) 조회 & 관리
// ============================================================

/**
 * 내 서재 목록 조회
 */
export const useMyBookListQuery = () => {
    return useQuery({
        queryKey: queryKeys.library.myBooks(),
        queryFn: async () => {
            const data = await bookApi.getMyBookList();
            return data.books || [];
        },
    });
};

/**
 * 내 서재 상세 조회 (읽기 상태, 독후감 정보 포함)
 */
export const useMyBookDetailQuery = (myBookId, options = {}) => {
    return useQuery({
        queryKey: queryKeys.library.myBookDetail(myBookId),
        queryFn: async () => {
            const data = await bookApi.getMyBookDetail(myBookId);
            return data || null;
        },
        enabled: !!myBookId,
        ...options,
    });
};

/**
 * 내 서재 내부 검색
 */
export const useSearchMyBooksQuery = (keyword, options = {}) => {
    return useQuery({
        queryKey: queryKeys.library.search(keyword),
        queryFn: async () => {
            const data = await bookApi.searchMyBooks(keyword);
            return data.books || [];
        },
        enabled: !!keyword && keyword.trim().length > 0,
        ...options,
    });
};

/**
 * [통합됨] 검색된 도서(book_tb) -> 내 서재(my_book_tb) 추가 Mutation
 */
export const useAddToMyLibraryMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (bookId) => bookApi.addSearchedBookToMyLibrary(bookId),
        onSuccess: () => {
            // 서재 목록 갱신
            queryClient.invalidateQueries({
                queryKey: queryKeys.library.myBooks(),
            });
        },
    });
};

/**
 * 개인 도서 직접 추가 (알라딘에 없는 책)
 */
export const useAddPersonalBookMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (bookData) => bookApi.addPersonalBook(bookData),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.library.myBooks(),
            });
        },
    });
};

/**
 * 도서 정보 수정 (코멘트 등)
 */
export const useModifyMyBookMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ myBookId, data }) =>
            bookApi.modifyMyBook(myBookId, data),
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.library.myBookDetail(variables.myBookId),
            });
            queryClient.invalidateQueries({
                queryKey: queryKeys.library.myBooks(),
            });
        },
    });
};

/**
 * 도서 삭제
 */
export const useDeleteMyBookMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (myBookId) => bookApi.deleteMyBook(myBookId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.library.myBooks(),
            });
            queryClient.invalidateQueries({
                queryKey: queryKeys.reading.books(),
            }); // 읽고 있는 책일 수도 있으니 갱신
        },
    });
};

// ============================================================
// 3. 도서 추천 & 위젯 데이터 (Dashboard & Recommendation)
// ============================================================

/**
 * AI 도서 추천 (Gemini)
 * - 2025년 베스트셀러 등 AI가 추천한 데이터를 가져옵니다.
 * - AI 호출 비용 절감을 위해 staleTime을 길게(24시간) 설정
 */
export const useAiRecommendBooksQuery = () => {
    return useQuery({
        queryKey: queryKeys.book.aiRecommend(),
        queryFn: async () => {
            const data = await bookApi.getAiRecommendBooks();
            return data; // 응답 구조에 따라 data.result 혹은 data 바로 반환
        },
        staleTime: 1000 * 60 * 60 * 24, // 24시간 동안 캐시 유지
        retry: 0, // 실패 시 재시도 하지 않음 (AI 할당량 보호)
        refetchOnWindowFocus: false, // 창 전환 시 재요청 방지
    });
};

/**
 * 사용자 선호 카테고리 기반 추천
 * - 사용자가 설정한 카테고리(예: 소설, 경제) 기반 인기 도서 5권
 */
export const useCategoryRecommendBooksQuery = () => {
    return useQuery({
        queryKey: queryKeys.book.categoryRecommend(),
        queryFn: async () => {
            const data = await bookApi.getRecommendBooksByCategory();
            return data;
        },
        staleTime: 1000 * 60 * 60, // 1시간 캐시
    });
};

/**
 * 읽다 만 가장 오래된 책 조회 (OldBookSwitchWidget용)
 * - status가 BEFORE(읽기 전) 또는 IN_PROGRESS(읽는 중)인 책 중 가장 오래된 것
 */
export const useOldestBooksQuery = () => {
    return useQuery({
        queryKey: queryKeys.book.oldest(),
        queryFn: async () => {
            const data = await bookApi.getOldestBooksByStatus();
            return data; // List<MyBook> 반환
        },
        // 서재 데이터가 변경(삭제/완독)되면 invalidateQueries로 갱신되어야 함
    });
};
