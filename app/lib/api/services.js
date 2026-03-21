import { API_ENDPOINTS } from "./config";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

// -------------------- HEADERS --------------------
function getHeaders(isFormData = false) {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token") || localStorage.getItem("authToken")
      : null;

  const headers = {};

  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
}

// -------------------- HELPER --------------------
async function handleResponse(response, errorMessage) {
  if (!response.ok) {
    throw new Error((await response.text()) || errorMessage);
  }
  return response.json();
}

// -------------------- AUTH --------------------
export const login = (email, password) =>
  fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ email, password }),
  }).then((res) => handleResponse(res, "Login failed"));

export const signup = (data) =>
  fetch(`${API_BASE_URL}/auth/signup`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  }).then((res) => handleResponse(res, "Signup failed"));

export const logout = () =>
  fetch(`${API_BASE_URL}/auth/logout`, {
    method: "POST",
    headers: getHeaders(),
  }).then((res) => handleResponse(res, "Logout failed"));

export const refreshToken = () =>
  fetch(`${API_BASE_URL}/auth/refresh`, {
    method: "POST",
    headers: getHeaders(),
  }).then((res) => handleResponse(res, "Refresh failed"));

export const verifyEmail = (token) =>
  fetch(`${API_BASE_URL}/auth/verify-email`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ token }),
  }).then((res) => handleResponse(res, "Verification failed"));

// -------------------- PROPERTIES --------------------
export const listProperties = (filters = {}) => {
  const params = new URLSearchParams(filters).toString();
  return fetch(`${API_BASE_URL}/properties?${params}`, {
    headers: getHeaders(),
  }).then((res) => handleResponse(res, "Fetch properties failed"));
};

export const getProperty = (id) =>
  fetch(`${API_BASE_URL}/properties/${id}`, {
    headers: getHeaders(),
  }).then((res) => handleResponse(res, "Fetch property failed"));

export const createProperty = (data) =>
  fetch(`${API_BASE_URL}/properties`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  }).then((res) => handleResponse(res, "Create property failed"));

export const updateProperty = (id, data) =>
  fetch(`${API_BASE_URL}/properties/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(data),
  }).then((res) => handleResponse(res, "Update failed"));

export const deleteProperty = (id) =>
  fetch(`${API_BASE_URL}/properties/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  }).then((res) => handleResponse(res, "Delete failed"));

export const searchProperties = (query, filters = {}) => {
  const params = new URLSearchParams({ q: query, ...filters }).toString();
  return fetch(`${API_BASE_URL}/properties/search?${params}`, {
    headers: getHeaders(),
  }).then((res) => handleResponse(res, "Search failed"));
};

// -------------------- REVIEWS --------------------
export const getReviews = (propertyId) =>
  fetch(`${API_BASE_URL}/properties/${propertyId}/reviews`, {
    headers: getHeaders(),
  }).then((res) => handleResponse(res, "Fetch reviews failed"));

export const createReview = (propertyId, data) =>
  fetch(`${API_BASE_URL}/properties/${propertyId}/reviews`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  }).then((res) => handleResponse(res, "Create review failed"));

export const updateReview = (propertyId, reviewId, data) =>
  fetch(`${API_BASE_URL}/properties/${propertyId}/reviews/${reviewId}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(data),
  }).then((res) => handleResponse(res, "Update review failed"));

export const deleteReview = (propertyId, reviewId) =>
  fetch(`${API_BASE_URL}/properties/${propertyId}/reviews/${reviewId}`, {
    method: "DELETE",
    headers: getHeaders(),
  }).then((res) => handleResponse(res, "Delete review failed"));

// -------------------- DOCUMENTS --------------------
export const uploadDocument = (propertyId, file, type) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("type", type);

  return fetch(`${API_BASE_URL}/properties/${propertyId}/documents`, {
    method: "POST",
    headers: getHeaders(true),
    body: formData,
  }).then((res) => handleResponse(res, "Upload failed"));
};

export const getDocuments = (propertyId) =>
  fetch(`${API_BASE_URL}/properties/${propertyId}/documents`, {
    headers: getHeaders(),
  }).then((res) => handleResponse(res, "Fetch documents failed"));

export const deleteDocument = (id) =>
  fetch(`${API_BASE_URL}/documents/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  }).then((res) => handleResponse(res, "Delete document failed"));

// -------------------- USERS --------------------
export const getProfile = () =>
  fetch(`${API_BASE_URL}/users/me`, {
    headers: getHeaders(),
  }).then((res) => handleResponse(res, "Fetch profile failed"));

export const updateProfile = (data) =>
  fetch(`${API_BASE_URL}/users/me`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(data),
  }).then((res) => handleResponse(res, "Update profile failed"));

export const getUserById = (id) =>
  fetch(`${API_BASE_URL}/users/${id}`, {
    headers: getHeaders(),
  }).then((res) => handleResponse(res, "Fetch user failed"));

// -------------------- GEO --------------------
export const getNearby = (lat, lon, radius = 5) => {
  const params = new URLSearchParams({ lat, lon, radius }).toString();
  return fetch(`${API_BASE_URL}/geo/nearby?${params}`, {
    headers: getHeaders(),
  }).then((res) => handleResponse(res, "Nearby failed"));
};

export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const params = new URLSearchParams({ lat1, lon1, lat2, lon2 }).toString();
  return fetch(`${API_BASE_URL}/geo/distance?${params}`, {
    headers: getHeaders(),
  }).then((res) => handleResponse(res, "Distance failed"));
};

// -------------------- APPOINTMENTS --------------------
export const createAppointment = (data) =>
  fetch(`${API_BASE_URL}/appointments`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  }).then((res) => handleResponse(res, "Create appointment failed"));

export const getAppointments = () =>
  fetch(`${API_BASE_URL}/appointments`, {
    headers: getHeaders(),
  }).then((res) => handleResponse(res, "Fetch appointments failed"));

export const updateAppointment = (id, data) =>
  fetch(`${API_BASE_URL}/appointments/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(data),
  }).then((res) => handleResponse(res, "Update appointment failed"));

export const deleteAppointment = (id) =>
  fetch(`${API_BASE_URL}/appointments/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  }).then((res) => handleResponse(res, "Delete appointment failed"));

// -------------------- LAND LISTINGS --------------------
export const createLandListing = async (formData) => {
  const response = await fetch(`${API_BASE_URL}/landapp/owners/listings`, {
    method: "POST",
    headers: getHeaders(true),
    body: formData,
  });
  if (!response.ok) {
    throw new Error((await response.text()) || "Failed to create land listing");
  }
  return response.text();
};
