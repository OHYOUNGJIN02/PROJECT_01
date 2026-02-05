import React, { useState, useEffect } from "react";
import PostAiCard from "../components/card/PostAiCard";

function MD1000_MainDashBoard() {
  const API_KEY = "AIzaSyAXVvMRCLoz5CYVnZylHiRE9JHnuyQXHDc"; 
  const bookTitle = "특이점이 온다";
  const author = "레이 커즈와일";

  const [videoId, setVideoId] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHighQualityVideo = async () => {
      if (!API_KEY || API_KEY.includes("발급받은")) return;

      try {
        setLoading(true);

        
        const searchParams = new URLSearchParams({
          part: "snippet",
          q: `${bookTitle} ${author} 분석`,
          maxResults: "10", 
          type: "video",
          videoEmbeddable: "true",
          relevanceLanguage: "ko",
          order: "relevance",
          key: API_KEY
        });

        const searchRes = await fetch(`https://www.googleapis.com/youtube/v3/search?${searchParams.toString()}`);
        const searchData = await searchRes.json();

        if (searchData.items && searchData.items.length > 0) {
          const videoIds = searchData.items.map(item => item.id.videoId).join(',');

          
          const statsParams = new URLSearchParams({
            part: "statistics",
            id: videoIds,
            key: API_KEY
          });

          const statsRes = await fetch(`https://www.googleapis.com/youtube/v3/videos?${statsParams.toString()}`);
          const statsData = await statsRes.json();

          
          const MIN_VIEW_COUNT = 10000;
          const bestVideo = statsData.items.find(video => 
            parseInt(video.statistics.viewCount) >= MIN_VIEW_COUNT
          );

          
          if (bestVideo) {
            setVideoId(bestVideo.id);
          } else {
            setVideoId(searchData.items[0].id.videoId);
          }
        }
      } catch (error) {
        console.error("데이터 로딩 에러:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHighQualityVideo();
  }, [bookTitle, author]);

  return (
    <>
      <div className="w-full min-h-screen flex flex-col items-center gap-[40px] justify-center bg-[#1a1a1a] py-10">
        
        <div className="text-center">
          <h2 className="text-blue-400 font-mono mb-2"></h2>
          <h1 className="text-white text-4xl font-extrabold mb-2">
          </h1>
          <p className="text-gray-400">테스트1</p>
        </div>

        {loading ? (
          <div className="text-white text-xl animate-spin">⌛</div>
        ) : videoId ? (
          <div 
            className="player-wrapper overflow-hidden border-2 border-white/10" 
            style={{ width: "854px", height: "480px", backgroundColor: "#000" }}
          >
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&controls=1&modestbranding=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <div className="text-white">조건에 맞는 영상을 찾을 수 없습니다.</div>
        )}

        <div className="w-full flex items-center justify-center">
        </div>
      </div>
    </>
  );
}

export default MD1000_MainDashBoard;