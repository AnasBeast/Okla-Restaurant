/**
 * API Service Layer
 * Centralized API calls with consistent error handling
 */
import axios from "axios";

// Create axios instance with default config
const api = axios.create({
  baseURL: process.env.REACT_APP_DOMAIN,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["x-access-token"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor - handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;

    // Handle specific error codes
    if (response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("accessToken");
      // Redirect to login if not already there
      if (!window.location.pathname.includes("/login")) {
        window.location.href = "/login";
      }
    }

    // Create a user-friendly error message
    const message =
      response?.data?.message ||
      response?.data ||
      error.message ||
      "Une erreur est survenue";

    return Promise.reject({
      status: response?.status,
      message,
      originalError: error,
    });
  },
);

// ========================================
// Auth API
// ========================================
export const authAPI = {
  login: (email, password) => api.post("/api/admin/login", { email, password }),

  register: (email, password) =>
    api.post("/api/admin/register", { email, password }),

  checkUser: (token) => api.post("/api/admin/checkuser", { token }),

  logout: () => api.post("/api/admin/logout"),
};

// ========================================
// Products API
// ========================================
export const productsAPI = {
  getAll: (params = {}) => api.get("/api/product", { params }),

  getById: (id) => api.get(`/api/product/${id}`),

  getByType: (type) =>
    api.post("/api/product/filter", null, { params: { type } }),

  create: (formData) =>
    api.post("/api/product", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  update: (id, formData) =>
    api.put(`/api/product/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  delete: (id) => api.delete(`/api/product/${id}`),

  search: (query) =>
    api.post("/api/product/search", null, { params: { query } }),
};

// ========================================
// Blogs API
// ========================================
export const blogsAPI = {
  getAll: (params = {}) => api.get("/api/blogs", { params }),

  getById: (id) => api.get(`/api/blogs/${id}`),

  create: (data) => api.post("/api/blogs", data),

  update: (id, data) => api.put(`/api/blogs/${id}`, data),

  delete: (id) => api.delete(`/api/blogs/${id}`),

  search: (query) => api.post("/api/blogs/search", null, { params: { query } }),
};

export default api;
