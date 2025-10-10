// src/api/axiosClient.ts
import axios from "axios";
import type {
    AxiosInstance,
    AxiosRequestConfig,
    AxiosError,
    AxiosResponse,
} from "axios";
import { showToast } from "./toast";


interface CustomAxiosRequestConfig extends AxiosRequestConfig {
    _retry?: boolean;
}

const api: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE || "http://localhost:5000/api",
    timeout: 10000,
});

// Request interceptor
api.interceptors.request.use(
    (config: any) => {
        const token = localStorage.getItem("accessToken");

        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        config.headers = {
            ...config.headers,
            Accept: "application/json",
        };

        return config;
    },
    (error: AxiosError) => {
        // Optional: show toast for request errors
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    (response: AxiosResponse) => {
        // ✅ Only show toast if server sends "message"
        if ((response.data as any)?.message) {
            showToast((response.data as any).message, "success");
        }
        return response;
    },
    async (error: AxiosError) => {
        const originalRequest = error.config as CustomAxiosRequestConfig;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem("refreshToken");

                if (refreshToken) {
                    const res: AxiosResponse<{ accessToken: string; message?: string }> =
                        await axios.post("http://localhost:5000/api/auth/refresh", {
                            token: refreshToken,
                        });

                    localStorage.setItem("accessToken", res.data.accessToken);

                    if (res.data.message) {
                        showToast(res.data.message, "success");
                    }

                    if (originalRequest.headers) {
                        originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;
                    }

                    return api(originalRequest);
                }
            } catch {
                localStorage.clear();
                showToast("Session expired. Please login again.", "error");
                window.location.href = "/login";
            }
        }

        // ✅ Show error toast only if server sends "message"
        const serverMessage = (error.response?.data as any)?.message;
        if (serverMessage) {
            showToast(serverMessage, "error");
        }

        return Promise.reject(error);
    }
);

export default api;
