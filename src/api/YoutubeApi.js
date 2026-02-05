// src/api/youtubeApi.js
const API_KEY = 'AIzaSyAXVvMRCLoz5CYVnZylHiRE9JHnuyQXHDc';

export async function getPlaylistTracks(playlistId) {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=10&playlistId=${playlistId}&key=${API_KEY}`
    );
    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error("유튜브 데이터를 가져오는데 실패했습니다:", error);
    return [];
  }
}