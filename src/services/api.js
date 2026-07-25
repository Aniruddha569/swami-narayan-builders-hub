// Centralized API service for frontend-backend communication
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

// Helper function for API calls
const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }
  
  return response.json();
};

// Projects API
export const projectsAPI = {
  getAll: () => apiCall("/projects"),
  getById: (id) => apiCall(`/projects/${id}`),
  create: (data) => apiCall("/projects", { method: "POST", body: JSON.stringify(data) }),
  update: (id, data) => apiCall(`/projects/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  delete: (id) => apiCall(`/projects/${id}`, { method: "DELETE" }),
};

// Reviews API
export const reviewsAPI = {
  getApproved: () => apiCall("/reviews?approved=true"),
  getAll: () => apiCall("/reviews"),
  submit: (data) => apiCall("/reviews", { method: "POST", body: JSON.stringify(data) }),
  approve: (id) => apiCall(`/reviews/${id}/approve", { method: "PATCH" }),
  reject: (id) => apiCall(`/reviews/${id}/reject", { method: "PATCH" }),
  delete: (id) => apiCall(`/reviews/${id}", { method: "DELETE" }),
};

// Enquiries API
export const enquiriesAPI = {
  submit: (data) => apiCall("/enquiries", { method: "POST", body: JSON.stringify(data) }),
  getAll: () => apiCall("/enquiries"),
  markAsRead: (id) => apiCall(`/enquiries/${id}/read", { method: "PATCH" }),
  delete: (id) => apiCall(`/enquiries/${id}", { method: "DELETE" }),
};

// Flats API
export const flatsAPI = {
  getByProject: (projectId) => apiCall(`/projects/${projectId}/flats`),
  getAll: () => apiCall("/flats"),
  create: (data) => apiCall("/flats", { method: "POST", body: JSON.stringify(data) }),
  update: (id, data) => apiCall(`/flats/${id}", { method: "PUT", body: JSON.stringify(data) }),
  delete: (id) => apiCall(`/flats/${id}", { method: "DELETE" }),
};

// Authentication API
export const authAPI = {
  signIn: (email, password) => apiCall("/auth/signin", { method: "POST", body: JSON.stringify({ email, password }) }),
  signUp: (email, password) => apiCall("/auth/signup", { method: "POST", body: JSON.stringify({ email, password }) }),
  signOut: () => apiCall("/auth/signout", { method: "POST" }),
  getSession: () => apiCall("/auth/session"),
  checkAdminRole: (userId) => apiCall(`/admin/check-role/${userId}`),
};

export default { projectsAPI, reviewsAPI, enquiriesAPI, flatsAPI, authAPI };