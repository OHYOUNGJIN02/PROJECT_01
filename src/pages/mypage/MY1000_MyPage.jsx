import React from "react";
import { useNavigate } from "react-router-dom";

// ✅ Hooks & Store
import { useAuthStore } from "../../store/useAuthStore";
import { useGetPrincipalQuery } from "../../hooks/queries/useAuthQueries";
import { useMyLikedReviewsQuery } from "../../hooks/queries/useReviewQueries";
import ProfileCard from "../../components/card/ProfileCard";
import ReviewCard from "../../components/card/ReviewCard";

const MY1000_MyPage = () => {
    const navigate = useNavigate();
    const { setLogout } = useAuthStore();

    const { data: user, isLoading: userLoading } = useGetPrincipalQuery();
    const { data: likedReviewsData, isLoading: reviewsLoading } = useMyLikedReviewsQuery();

    const mockReviews = [
        { id: "m1", bookTitle: "클린 코드(Clean Code)", bookThumbnail: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1000&auto=format&fit=crop", authorName: "로버트 마틴", content: "가독성이 좋은 코드를 작성하는 것이 얼마나 중요한지 깨닫게 해준 책입니다." },
        { id: "m2", bookTitle: "리액트 디자인 패턴", bookThumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1000&auto=format&fit=crop", authorName: "프론트엔드", content: "컴포넌트 합성과 커스텀 훅을 어떻게 설계해야 효율적일지 알려줍니다." },
        { id: "m3", bookTitle: "드리프트의 역사", bookThumbnail: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=1000&auto=format&fit=crop", authorName: "자동차 매니아", content: "드리프트의 기원을 찾아 떠나는 흥미진진한 여정입니다." },
        { id: "m4", bookTitle: "리액트 디자인 패턴 2", bookThumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1000&auto=format&fit=crop", authorName: "프론트엔드", content: "반복되는 패턴을 익히기에 좋습니다." },
        { id: "m4", bookTitle: "리액트 디자인 패턴 2", bookThumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1000&auto=format&fit=crop", authorName: "프론트엔드", content: "반복되는 패턴을 익히기에 좋습니다." },
        { id: "m4", bookTitle: "리액트 디자인 패턴 2", bookThumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1000&auto=format&fit=crop", authorName: "프론트엔드", content: "반복되는 패턴을 익히기에 좋습니다." },
        { id: "m4", bookTitle: "리액트 디자인 패턴 2", bookThumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1000&auto=format&fit=crop", authorName: "프론트엔드", content: "반복되는 패턴을 익히기에 좋습니다." },
        
    ];

    const likedReviews = (likedReviewsData && likedReviewsData.length > 0) ? likedReviewsData : mockReviews;

    const handleLogout = () => {
        setLogout();
        navigate("/auth/login", { replace: true });
    };

    if (userLoading) return <div className="flex items-center justify-center h-full text-gray-40">정보 로딩 중...</div>;

    return (
        <div className="w-full h-full text-gray-5 font-pretendard items-center animate-in fade-in duration-500 flex flex-col">
            
            <div className="w-full max-w-[720px] flex flex-col h-full">
                
                {/* 유저 정보 섹션 */}
                <section className="mb-8 flex-shrink-0">
                    <h2 className="text-gray-50 text-[16px] font-regular font-pretendard mb-3 uppercase tracking-wider ml-1">
                        유저 정보
                    </h2>
                    <ProfileCard user={user} onLogout={handleLogout} />
                </section>

                {/* 좋아요한 독후감 리스트 섹션 */}
                <div className="flex-1 flex flex-col min-h-0">
                    <div className="flex items-center gap-[20px] mb-4 ml-1 flex-shrink-0">
                        <h2 className="text-gray-50 text-[16px] font-pretendard font-regular">
                            내가 좋아요 한 독후감
                        </h2>
                        <span className="text-gray-60 font-medium text-[18px] font-pretendard">
                            {likedReviews.length}건
                        </span>
                    </div>

                    <div className="grid grid-cols-1 gap-3 overflow-y-auto pb-10 scrollbar-hide pr-1">
                        {likedReviews.map((review) => (
                            <div key={review.id} onClick={() => navigate(`/review/${review.id}`)} className="cursor-pointer">
                                <ReviewCard 
                                    book={{ title: review.bookTitle, coverImage: review.bookThumbnail }} 
                                    userName={review.authorName || user?.nickname || "User"} 
                                    content={review.content} 
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MY1000_MyPage;