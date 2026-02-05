// src/api/spotifyApi.js

// ⚠️ 주의: 토큰은 노출되면 위험하므로 실제 서비스 시에는 .env 파일에 보관해야 합니다.
const token = 'BQAJ_A6qCczB5y53RZ0pVoo2Fd3V5X6_5fjGqTiuGRfOQUePekvbcHzg6BSK8WzIi13wr4r9cQcfYrL6m5Dp1NUgTj0jkV2e3nE0QIUQ3ac8GUFsSWUIkcmp4pmGqfo8j0CCOR2tsaBoZVXupYVJtnPpr0SRooTZYEyr3G_PisjGKIG6i0ra4KhgvF88f7w7CawmXJUB3QBXSq2dQBy0T-1hDcouyLBR7VAJ_JR8Tsg5F76dJoBYohGXYoHB11mYwyc15D2WQBZimGSyP-Lt3kgyeiLmHxzRpLdN9dhQhdcBijoOr0A8sWphyytC5xUqy6UPTuVI;

async function fetchWebApi(endpoint, method, body) {
  // 실제 스포티파이 API 주소로 수정했습니다.
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body: body ? JSON.stringify(body) : undefined
  });
  return await res.json();
}

export async function getSpecificPlaylistTracks() {
  const playlistId = '6Z3uxpbljVln9eANYWgtmo'; // 보내주신 ID값
  // 곡 정보, 가수, 앨범 이미지를 가져오기 위해 필드를 지정 (limit은 10곡으로 설정)
  const response = await fetchWebApi(`v1/playlists/${playlistId}/tracks?limit=10`, 'GET');
  return response.items || [];
}