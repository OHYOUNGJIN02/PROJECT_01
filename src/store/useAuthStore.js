import { create } from "zustand";

export const useAuthStore = create((set) => ({
    isLoggedIn: !!localStorage.getItem("accessToken"),
    principal: null,
    loading: false, // 초기 로딩 상태

    setLogin: (token) => {
        localStorage.setItem("accessToken", token);
        set({ isLoggedIn: true });
    },
    setLogout: () => {
        localStorage.removeItem("accessToken");
        set({ isLoggedIn: false, principal: null });
    },
    setPrincipal: (data) => set({ principal: data }),
    setLoading: (bool) => set({ loading: bool }),
}));
