import axios from 'axios';

/**
 * Axios instance configured for backend API
 * Base URL points to Spring Boot backend
 */
export const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors
    if (error.response?.status === 401) {
      // Unauthorized - redirect to login
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API endpoints (to be implemented when backend is ready)
export const apiEndpoints = {
  // Products
  products: {
    getAll: '/products',
    getById: (id: number) => `/products/${id}`,
    getByCategory: (category: string) => `/products/category/${category}`,
    search: (query: string) => `/products/search?q=${query}`,
  },
  
  // Restaurants
  restaurants: {
    getAll: '/restaurants',
    getById: (id: number) => `/restaurants/${id}`,
    getByCategory: (category: string) => `/restaurants/category/${category}`,
  },
  
  // Categories
  categories: {
    getAll: '/categories',
  },
  
  // Orders
  orders: {
    create: '/orders',
    getByUser: (userId: number) => `/orders/user/${userId}`,
    getById: (id: number) => `/orders/${id}`,
  },
  
  // Users
  users: {
    login: '/auth/login',
    register: '/auth/register',
    profile: '/users/profile',
  },
};

export default api;
