import { API_ENDPOINTS } from "./config";
import { apiGet, apiPost, apiPut, apiDelete } from "./client";

/**
 * Authentication Service
 */
export const authService = {
  login: function(email, password) {
    let endpoint = API_ENDPOINTS.AUTH.LOGIN;
    let data = { email: email, password: password };
    let result = apiPost(endpoint, data);
    return result;
  },

  signup: function(userData) {
    let result = apiPost(API_ENDPOINTS.AUTH.SIGNUP, userData);
    return result;
  },

  logout: function() {
    let result = apiPost(API_ENDPOINTS.AUTH.LOGOUT);
    return result;
  },

  refreshToken: function() {
    let result = apiPost(API_ENDPOINTS.AUTH.REFRESH);
    return result;
  },

  verifyEmail: function(token) {
    let data = { token: token };
    let result = apiPost(API_ENDPOINTS.AUTH.VERIFY_EMAIL, data);
    return result;
  }
};

/**
 * Properties Service
 */
export const propertyService = {
  listProperties: function(filters) {
    if (filters === undefined) {
      filters = {};
    }
    let paramsObj = { params: new URLSearchParams(filters) };
    let result = apiGet(API_ENDPOINTS.PROPERTIES.LIST, paramsObj);
    return result;
  },

  getProperty: function(id) {
    let url = API_ENDPOINTS.PROPERTIES.GET_ONE(id);
    let result = apiGet(url);
    return result;
  },

  createProperty: function(propertyData) {
    let result = apiPost(API_ENDPOINTS.PROPERTIES.CREATE, propertyData);
    return result;
  },

  updateProperty: function(id, propertyData) {
    let url = API_ENDPOINTS.PROPERTIES.UPDATE(id);
    let result = apiPut(url, propertyData);
    return result;
  },

  deleteProperty: function(id) {
    let url = API_ENDPOINTS.PROPERTIES.DELETE(id);
    let result = apiDelete(url);
    return result;
  },

  searchProperties: function(query, filters) {
    if (filters === undefined) {
      filters = {};
    }
    let myParams = { q: query };
    for (let key in filters) {
      myParams[key] = filters[key];
    }
    let config = {
      params: new URLSearchParams(myParams)
    };
    let result = apiGet(API_ENDPOINTS.PROPERTIES.SEARCH, config);
    return result;
  },

  getPropertiesByOwner: function(ownerId) {
    let url = API_ENDPOINTS.PROPERTIES.BY_OWNER(ownerId);
    let result = apiGet(url);
    return result;
  }
};

/**
 * Reviews Service
 */
export const reviewService = {
  getReviews: function(propertyId) {
    let url = API_ENDPOINTS.REVIEWS.LIST(propertyId);
    let result = apiGet(url);
    return result;
  },

  createReview: function(propertyId, reviewData) {
    let url = API_ENDPOINTS.REVIEWS.CREATE(propertyId);
    let result = apiPost(url, reviewData);
    return result;
  },

  updateReview: function(propertyId, reviewId, reviewData) {
    let url = API_ENDPOINTS.REVIEWS.UPDATE(propertyId, reviewId);
    let result = apiPut(url, reviewData);
    return result;
  },

  deleteReview: function(propertyId, reviewId) {
    let url = API_ENDPOINTS.REVIEWS.DELETE(propertyId, reviewId);
    let result = apiDelete(url);
    return result;
  }
};

/**
 * Trust Score Service
 */
export const trustScoreService = {
  calculateScore: function(propertyId, scoreData) {
    let url = API_ENDPOINTS.TRUST_SCORE.CALCULATE(propertyId);
    let result = apiPost(url, scoreData);
    return result;
  },

  getScore: function(propertyId) {
    let url = API_ENDPOINTS.TRUST_SCORE.GET(propertyId);
    let result = apiGet(url);
    return result;
  }
};

/**
 * Hazard Analysis Service
 */
export const hazardService = {
  analyze: function(location) {
    let result = apiPost(API_ENDPOINTS.HAZARD.ANALYZE, location);
    return result;
  },

  getHazardData: function(propertyId) {
    let url = API_ENDPOINTS.HAZARD.GET(propertyId);
    let result = apiGet(url);
    return result;
  },

  getLocationHazards: function(lat, lon) {
    let paramsData = { lat: lat, lon: lon };
    let config = {
      params: new URLSearchParams(paramsData)
    };
    let result = apiGet(API_ENDPOINTS.HAZARD.LOCATIONS, config);
    return result;
  }
};

/**
 * Documents Service
 */
export const documentService = {
  uploadDocument: function(propertyId, file, documentType) {
    let formData = new FormData();
    formData.append("file", file);
    formData.append("type", documentType);
    formData.append("propertyId", propertyId);
    let result = apiPost(API_ENDPOINTS.DOCUMENTS.UPLOAD, formData);
    return result;
  },

  getDocuments: function(propertyId) {
    let url = API_ENDPOINTS.DOCUMENTS.GET(propertyId);
    let result = apiGet(url);
    return result;
  },

  deleteDocument: function(documentId) {
    let url = API_ENDPOINTS.DOCUMENTS.DELETE(documentId);
    let result = apiDelete(url);
    return result;
  }
};

/**
 * Geospatial Service
 */
export const geospatialService = {
  getNearby: function(lat, lon, radius) {
    if (radius === undefined) {
      radius = 5;
    }
    let paramsData = { lat: lat, lon: lon, radius: radius };
    let config = {
      params: new URLSearchParams(paramsData)
    };
    let result = apiGet(API_ENDPOINTS.GEOSPATIAL.NEARBY, config);
    return result;
  },

  calculateDistance: function(lat1, lon1, lat2, lon2) {
    let paramsData = { lat1: lat1, lon1: lon1, lat2: lat2, lon2: lon2 };
    let config = {
      params: new URLSearchParams(paramsData)
    };
    let result = apiGet(API_ENDPOINTS.GEOSPATIAL.DISTANCE, config);
    return result;
  },

  getAccessibility: function(lat, lon) {
    let url = API_ENDPOINTS.GEOSPATIAL.ACCESSIBILITY(lat, lon);
    let result = apiGet(url);
    return result;
  }
};

/**
 * Users Service
 */
export const userService = {
  getProfile: function() {
    let result = apiGet(API_ENDPOINTS.USERS.GET_PROFILE);
    return result;
  },

  updateProfile: function(userData) {
    let result = apiPut(API_ENDPOINTS.USERS.UPDATE_PROFILE, userData);
    return result;
  },

  getUserById: function(id) {
    let url = API_ENDPOINTS.USERS.GET_BY_ID(id);
    let result = apiGet(url);
    return result;
  }
};

/**
 * Ministry Approvals Service
 */
export const approvalService = {
  getPendingApprovals: function() {
    let result = apiGet(API_ENDPOINTS.APPROVALS.PENDING);
    return result;
  },

  approveProperty: function(propertyId, adminNotes) {
    if (adminNotes === undefined) {
      adminNotes = "";
    }
    let url = API_ENDPOINTS.APPROVALS.APPROVE(propertyId);
    let data = { adminNotes: adminNotes };
    let result = apiPost(url, data);
    return result;
  }
};
