import React from 'react';

const SmallSpotifyWidget = ({ className = "" }) => {
    const playlistId = '6Z3uxpbljVln9eANYWgtmo';
    const embedUrl = `https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`;

    return (
        <div className={`${className} w-full h-full flex flex-col bg-[#121212] rounded-[12px] p-[16px] box-border`}>
            <div className="mb-[12px]">
                <p className="font-bold text-gray-5 text-[16px]">오늘의 독서 BGM</p>
                <p className="text-gray-50 text-[12px] font-normal"></p>
            </div>

            <div className="flex-1 w-full min-h-[170px] rounded-[8px] overflow-hidden">
                <iframe 
                    src={embedUrl}
                    width="100%" 
                    height="100%" 
                    frameBorder="0" 
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                    style={{ border: 'none' }}
                    loading="lazy"
                    title="Spotify Playlist"
                />
            </div>
        </div>
    );
};

export default SmallSpotifyWidget;