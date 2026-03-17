// API Configuration and Constants
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";
const API_TIMEOUT = 30000; // 30 seconds

export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: "/auth/login",
    SIGNUP: "/auth/signup",
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh",
    VERIFY_EMAIL: "/auth/verify-email",
  },

  // Properties
  PROPERTIES: {
    LIST: "/properties",
    GET_ONE: (id) => `/properties/${id}`,
    CREATE: "/properties",
    UPDATE: (id) => `/properties/${id}`,
    DELETE: (id) => `/properties/${id}`,
    SEARCH: "/properties/search",
    BY_OWNER: (ownerId) => `/properties/owner/${ownerId}`,
  },

  // Reviews and Ratings
  REVIEWS: {
    LIST: (propertyId) => `/properties/${propertyId}/reviews`,
    CREATE: (propertyId) => `/properties/${propertyId}/reviews`,
    UPDATE: (propertyId, reviewId) => `/properties/${propertyId}/reviews/${reviewId}`,
    DELETE: (propertyId, reviewId) => `/properties/${propertyId}/reviews/${reviewId}`,
  },

  // Trust Score
  TRUST_SCORE: {
    CALCULATE: (propertyId) => `/properties/${propertyId}/trust-score`,
    GET: (propertyId) => `/properties/${propertyId}/trust-score`,
  },

  // Hazard Analysis
  HAZARD: {
    ANALYZE: "/hazard/analyze",
    GET: (propertyId) => `/properties/${propertyId}/hazard`,
    LOCATIONS: "/hazard/locations",
  },

  // Documents
  DOCUMENTS: {
    UPLOAD: "/documents/upload",
    GET: (propertyId) => `/properties/${propertyId}/documents`,
    DELETE: (documentId) => `/documents/${documentId}`,
  },

  // Geospatial
  GEOSPATIAL: {
    NEARBY: "/geospatial/nearby",
    DISTANCE: "/geospatial/distance",
    ACCESSIBILITY: (lat, lon) => `/geospatial/accessibility?lat=${lat}&lon=${lon}`,
  },

  // Users
  USERS: {
    GET_PROFILE: "/users/profile",
    UPDATE_PROFILE: "/users/profile",
    GET_BY_ID: (id) => `/users/${id}`,
  },

  // Ministry Approvals
  APPROVALS: {
    PENDING: "/approvals/pending",
    APPROVE: (propertyId) => `/approvals/${propertyId}/approve`,
    REJECT: (propertyId) => `/approvals/${propertyId}/reject`,
  },
};

// HTTP Methods
export const HTTP_METHOD = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
};

// Response Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_ERROR: 500,
};

export { API_BASE_URL, API_TIMEOUT };
