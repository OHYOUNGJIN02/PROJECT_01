// src/api/index.js
// 통합 export: 화면 팀이 import 경로를 단순하게 쓸 수 있도록 re-export

export { default as axiosInstance } from "./axiosInstance";
export { request } from "./resp";

// 도메인별 API
export * as authApi from "./authApi";
export * as accountApi from "./accountApi";
export * as bookApi from "./bookApi";
export * as readingApi from "./readingApi";
export * as reviewApi from "./reviewApi";


/** 
 * index.js 없었을 때(기존): 도메인 파일에서 "직접" import
 * import { getMyBookList, getMyBookDetail } from "../api/bookApi";
 * import { createReview } from "../api/reviewApi";
 * import { getMe } from "../api/accountApi";
 *  */  


/**
 * index.js 있었을 때(현재): 한 곳에서 "모아서" import
 *  import { bookApi, reviewApi, accountApi } from "../api";
 * 
 *  const books = await bookApi.getMyBookList();
 *  const me = await accountApi.getMe();
 *  */
