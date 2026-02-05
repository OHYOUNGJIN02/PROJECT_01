import React from 'react';

const VerticalSpotifyWidget = ({ className = "" }) => {
    const playlistId = '5wUY9vjhyCiDHEDgn6rwbd';
    const embedUrl = `https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`;

    return (
        <div className={`${className} w-full h-full flex flex-col bg-[#121212] rounded-[12px] p-[8px] box-border`}>
            <div className="mb-[4px]">
                <p className="font-bold text-gray-5 text-[16px]"></p>
                <p className="text-gray-40 text-[12px] font-normal"></p>
            </div>

            <div className="flex-1 w-full rounded-[8px] overflow-hidden">
                <iframe 
                    src={embedUrl}
                    width="100%" 
                    height="100%" 
                    frameBorder="0" 
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                    style={{ border: 'none', minHeight: '352px' }} 
                    loading="lazy"
                    title="Spotify Vertical Playlist"
                />
            </div>
        </div>
    );
};

export default VerticalSpotifyWidget;