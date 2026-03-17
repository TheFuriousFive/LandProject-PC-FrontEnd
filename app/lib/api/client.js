import { API_BASE_URL, API_TIMEOUT, HTTP_STATUS } from "./config";

// Custom Error Class
export class APIError extends Error {
  constructor(status, message, data = null) {
    super(message);
    this.status = status;
    this.data = data;
    this.name = "APIError";
  }
}

/**
 * Generic fetch wrapper with error handling and timeout
 * @param {string} endpoint - API endpoint
 * @param {object} options - Fetch options (method, body, headers, etc.)
 * @returns {Promise<object>} Parsed response data
 */
export async function apiCall(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  // Set default headers
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  // Add token if available
  const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  // Create abort controller for timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

  try {
    const response = await fetch(url, {
      headers,
      signal: controller.signal,
      ...options,
    });

    clearTimeout(timeoutId);

    // Parse response
    const data = await response.json().catch(() => null);

    // Handle error responses
    if (!response.ok) {
      const errorMessage = data?.message || `HTTP ${response.status}`;
      throw new APIError(response.status, errorMessage, data);
    }

    return data;
  } catch (error) {
    clearTimeout(timeoutId);

    if (error instanceof APIError) {
      throw error;
    }

    if (error.name === "AbortError") {
      throw new APIError(null, "Request timeout");
    }

    // Network error
    throw new APIError(null, error.message || "Network error");
  }
}

/**
 * GET request wrapper
 */
export async function apiGet(endpoint, options = {}) {
  return apiCall(endpoint, {
    method: "GET",
    ...options,
  });
}

/**
 * POST request wrapper
 */
export async function apiPost(endpoint, body = {}, options = {}) {
  return apiCall(endpoint, {
    method: "POST",
    body: JSON.stringify(body),
    ...options,
  });
}

/**
 * PUT request wrapper
 */
export async function apiPut(endpoint, body = {}, options = {}) {
  return apiCall(endpoint, {
    method: "PUT",
    body: JSON.stringify(body),
    ...options,
  });
}

/**
 * PATCH request wrapper
 */
export async function apiPatch(endpoint, body = {}, options = {}) {
  return apiCall(endpoint, {
    method: "PATCH",
    body: JSON.stringify(body),
    ...options,
  });
}

/**
 * DELETE request wrapper
 */
export async function apiDelete(endpoint, options = {}) {
  return apiCall(endpoint, {
    method: "DELETE",
    ...options,
  });
}

/**
 * Handle API errors with user-friendly messages
 */
export function getErrorMessage(error) {
  if (error instanceof APIError) {
    if (error.status === HTTP_STATUS.UNAUTHORIZED) {
      return "Your session has expired. Please login again.";
    }
    if (error.status === HTTP_STATUS.FORBIDDEN) {
      return "You don't have permission to perform this action.";
    }
    if (error.status === HTTP_STATUS.NOT_FOUND) {
      return "The requested resource was not found.";
    }
    if (error.status === HTTP_STATUS.BAD_REQUEST) {
      return error.data?.message || "Invalid request. Please check your input.";
    }
    return error.message;
  }
  return "An unexpected error occurred. Please try again.";
}
