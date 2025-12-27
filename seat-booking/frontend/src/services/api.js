import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    console.log("api.interceptors.response", error);

    if (
      error.response?.status === 401 &&
      error.response?.data?.message === "Invalid token" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const res = await api.post("/auth/refresh-token");
      const newToken = res.data.accessToken;

      localStorage.setItem("userToken", newToken);
      originalRequest.headers.Authorization = `Bearer ${newToken}`;

      return api(originalRequest);
    }

    return Promise.reject(error);
  }
);

export default api;