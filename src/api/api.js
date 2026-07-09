import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

// Request Interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Response Interceptor
api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config || {};

    const publicRoutes = [
      "/auth/login",
      "/auth/register",
      "/auth/forgot-password",
      "/auth/verify-reset-otp",
      "/auth/reset-password",
      "/auth/verify-email",
      "/auth/resend-email-verification",
      "/auth/refresh",
    ];

    const isPublicRoute = publicRoutes.some((route) =>
      originalRequest.url?.includes(route)
    );

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isPublicRoute
    ) {
      originalRequest._retry = true;

      try {
        const res = await axios.post(
          "http://localhost:5000/api/auth/refresh",
          {},
          {
            withCredentials: true,
          }
        );

        const newAccessToken = res.data.data.accessToken;

        localStorage.setItem("accessToken", newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch {

        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");

        const isAdminRoute =
          window.location.pathname.startsWith("/admin");

        window.location.href = isAdminRoute
          ? "/admin"
          : "/login";

        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default api;