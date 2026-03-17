import { API_ENDPOINTS } from "./config";
import { apiGet, apiPost, apiPut, apiDelete } from "./client";

/**
 * Authentication Service
 */
export const authService = {
  login: (email, password) =>
    apiPost(API_ENDPOINTS.AUTH.LOGIN, { email, password }),

  signup: (userData) => apiPost(API_ENDPOINTS.AUTH.SIGNUP, userData),

  logout: () => apiPost(API_ENDPOINTS.AUTH.LOGOUT),

  refreshToken: () => apiPost(API_ENDPOINTS.AUTH.REFRESH),

  verifyEmail: (token) => apiPost(API_ENDPOINTS.AUTH.VERIFY_EMAIL, { token }),
};

/**
 * Properties Service
 */
export const propertyService = {
  listProperties: (filters = {}) =>
    apiGet(API_ENDPOINTS.PROPERTIES.LIST, { params: new URLSearchParams(filters) }),

  getProperty: (id) => apiGet(API_ENDPOINTS.PROPERTIES.GET_ONE(id)),

  createProperty: (propertyData) =>
    apiPost(API_ENDPOINTS.PROPERTIES.CREATE, propertyData),

  updateProperty: (id, propertyData) =>
    apiPut(API_ENDPOINTS.PROPERTIES.UPDATE(id), propertyData),

  deleteProperty: (id) => apiDelete(API_ENDPOINTS.PROPERTIES.DELETE(id)),

  searchProperties: (query, filters = {}) =>
    apiGet(API_ENDPOINTS.PROPERTIES.SEARCH, {
      params: new URLSearchParams({ q: query, ...filters }),
    }),

  getPropertiesByOwner: (ownerId) =>
    apiGet(API_ENDPOINTS.PROPERTIES.BY_OWNER(ownerId)),
};

/**
 * Reviews Service
 */
export const reviewService = {
  getReviews: (propertyId) =>
    apiGet(API_ENDPOINTS.REVIEWS.LIST(propertyId)),

  createReview: (propertyId, reviewData) =>
    apiPost(API_ENDPOINTS.REVIEWS.CREATE(propertyId), reviewData),

  updateReview: (propertyId, reviewId, reviewData) =>
    apiPut(
      API_ENDPOINTS.REVIEWS.UPDATE(propertyId, reviewId),
      reviewData
    ),

  deleteReview: (propertyId, reviewId) =>
    apiDelete(API_ENDPOINTS.REVIEWS.DELETE(propertyId, reviewId)),
};

/**
 * Trust Score Service
 */
export const trustScoreService = {
  calculateScore: (propertyId, scoreData) =>
    apiPost(API_ENDPOINTS.TRUST_SCORE.CALCULATE(propertyId), scoreData),

  getScore: (propertyId) =>
    apiGet(API_ENDPOINTS.TRUST_SCORE.GET(propertyId)),
};

/**
 * Hazard Analysis Service
 */
export const hazardService = {
  analyze: (location) =>
    apiPost(API_ENDPOINTS.HAZARD.ANALYZE, location),

  getHazardData: (propertyId) =>
    apiGet(API_ENDPOINTS.HAZARD.GET(propertyId)),

  getLocationHazards: (lat, lon) =>
    apiGet(API_ENDPOINTS.HAZARD.LOCATIONS, {
      params: new URLSearchParams({ lat, lon }),
    }),
};

/**
 * Documents Service
 */
export const documentService = {
  uploadDocument: (propertyId, file, documentType) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", documentType);
    formData.append("propertyId", propertyId);
    return apiPost(API_ENDPOINTS.DOCUMENTS.UPLOAD, formData);
  },

  getDocuments: (propertyId) =>
    apiGet(API_ENDPOINTS.DOCUMENTS.GET(propertyId)),

  deleteDocument: (documentId) =>
    apiDelete(API_ENDPOINTS.DOCUMENTS.DELETE(documentId)),
};

/**
 * Geospatial Service
 */
export const geospatialService = {
  getNearby: (lat, lon, radius = 5) =>
    apiGet(API_ENDPOINTS.GEOSPATIAL.NEARBY, {
      params: new URLSearchParams({ lat, lon, radius }),
    }),

  calculateDistance: (lat1, lon1, lat2, lon2) =>
    apiGet(API_ENDPOINTS.GEOSPATIAL.DISTANCE, {
      params: new URLSearchParams({ lat1, lon1, lat2, lon2 }),
    }),

  getAccessibility: (lat, lon) =>
    apiGet(API_ENDPOINTS.GEOSPATIAL.ACCESSIBILITY(lat, lon)),
};

/**
 * Users Service
 */
export const userService = {
  getProfile: () => apiGet(API_ENDPOINTS.USERS.GET_PROFILE),

  updateProfile: (userData) =>
    apiPut(API_ENDPOINTS.USERS.UPDATE_PROFILE, userData),

  getUserById: (id) => apiGet(API_ENDPOINTS.USERS.GET_BY_ID(id)),
};

/**
 * Ministry Approvals Service
 */
export const approvalService = {
  getPendingApprovals: () =>
    apiGet(API_ENDPOINTS.APPROVALS.PENDING),

  approveProperty: (propertyId, adminNotes = "") =>
    apiPost(API_ENDPOINTS.APPROVALS.APPROVE(propertyId), { adminNotes }),

  rejectProperty: (propertyId, reason = "") =>
    apiPost(API_ENDPOINTS.APPROVALS.REJECT(propertyId), { reason }),
};
