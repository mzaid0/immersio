import axios from "axios";
import { cookies } from "next/headers";

const axiosServer = axios.create({
    baseURL: process.env.SERVER_BASE_URL || "http://localhost:5000/api/v1",
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosServer.interceptors.request.use(async (config) => {
    const cookieStore = await cookies();
    const authToken = cookieStore.get("authToken")?.value;

    if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
});

axiosServer.interceptors.response.use(
    (response) => response,
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosServer;