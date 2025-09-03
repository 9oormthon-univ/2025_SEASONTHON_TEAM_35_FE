import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

// 디버깅을 위해 현재 설정된 baseURL을 콘솔에 출력
console.log("API Base URL:", API_BASE_URL);

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: { "Content-Type": "application/json" },
    withCredentials: false,
});

// 인증 토큰 로직
apiClient.interceptors.request.use(
    (config) => {
        // localStorage에서 저장된 토큰을 가져옴
        const token = localStorage.getItem("accessToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiClient;