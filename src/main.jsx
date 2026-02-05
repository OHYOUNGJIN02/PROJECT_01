import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient"; // 만들어둔 클라이언트 import
import App from "./App";
import "./index.css"; // Tailwind 등 스타일 파일

ReactDOM.createRoot(document.getElementById("root")).render(
    <QueryClientProvider client={queryClient}>
        {/* ✅ 앱 전체를 BrowserRouter로 감싸야 Routes가 작동합니다 */}
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </QueryClientProvider>,
);
