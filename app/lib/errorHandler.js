/**
 * Error Handling and Logging Utilities
 */

import React from "react";
import { MESSAGE_TYPES } from "./constants";

// Logger Levels
const LOG_LEVELS = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
};

// Current log level (can be set via environment variable)
const CURRENT_LOG_LEVEL =
  typeof process !== "undefined" && process.env.NEXT_PUBLIC_LOG_LEVEL
    ? LOG_LEVELS[process.env.NEXT_PUBLIC_LOG_LEVEL.toUpperCase()] ||
      LOG_LEVELS.INFO
    : LOG_LEVELS.INFO;

/**
 * Logger Class
 */
class Logger {
  constructor(namespace = "App") {
    this.namespace = namespace;
  }

  /**
   * Format log message with timestamp and namespace
   */
  _format(level, message) {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${this.namespace}] [${level}] ${message}`;
  }

  /**
   * Debug level logging
   */
  debug(message, data = null) {
    if (CURRENT_LOG_LEVEL <= LOG_LEVELS.DEBUG) {
      console.debug(this._format("DEBUG", message), data || "");
    }
  }

  /**
   * Info level logging
   */
  info(message, data = null) {
    if (CURRENT_LOG_LEVEL <= LOG_LEVELS.INFO) {
      console.info(this._format("INFO", message), data || "");
    }
  }

  /**
   * Warning level logging
   */
  warn(message, data = null) {
    if (CURRENT_LOG_LEVEL <= LOG_LEVELS.WARN) {
      console.warn(this._format("WARN", message), data || "");
    }
  }

  /**
   * Error level logging
   */
  error(message, error = null) {
    if (CURRENT_LOG_LEVEL <= LOG_LEVELS.ERROR) {
      console.error(this._format("ERROR", message), error || "");
    }
  }

  /**
   * Group related logs
   */
  group(groupName, callback) {
    console.group(this._format("GROUP", groupName));
    callback();
    console.groupEnd();
  }

  /**
   * Log performance metrics
   */
  time(label) {
    console.time(this._format("TIMER", label));
  }

  timeEnd(label) {
    console.timeEnd(this._format("TIMER", label));
  }

  /**
   * Table formatted logs
   */
  table(data) {
    console.table(data);
  }
}

/**
 * Create logger instance with namespace
 */
export function createLogger(namespace) {
  return new Logger(namespace);
}

/**
 * Global logger instance
 */
export const logger = new Logger("TerraVest");

/**
 * Error Handler Class
 */
export class ErrorHandler {
  /**
   * Handle API errors
   */
  static handleAPIError(error) {
    const log = createLogger("APIError");

    if (error.response) {
      // Server responded with error status
      log.error(`API Error: ${error.response.status}`, {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers,
      });

      const message = error.response.data?.message || error.response.statusText;
      return {
        status: error.response.status,
        message,
        data: error.response.data,
      };
    } else if (error.request) {
      // Request made but no response
      log.error("No response from server", error.request);
      return {
        status: null,
        message: "No response from server. Please check your connection.",
      };
    } else {
      // Error occurred in request setup
      log.error("Request error", error.message);
      return {
        status: null,
        message: error.message || "An error occurred during the request.",
      };
    }
  }

  /**
   * Handle validation errors
   */
  static handleValidationError(errors) {
    const log = createLogger("ValidationError");
    log.warn("Validation failed", errors);

    return Object.entries(errors).reduce((acc, [field, message]) => {
      acc[field] = message;
      return acc;
    }, {});
  }

  /**
   * Handle unknown errors
   */
  static handleUnknownError(error) {
    const log = createLogger("UnknownError");
    log.error("Unknown error occurred", {
      message: error.message,
      stack: error.stack,
      type: error.constructor.name,
    });

    return {
      status: "unknown",
      message: "An unexpected error occurred. Please try again.",
    };
  }

  /**
   * Generic error handler
   */
  static handle(error) {
    if (error.response || error.request) {
      return this.handleAPIError(error);
    }
    return this.handleUnknownError(error);
  }
}

/**
 * Toast/Notification System
 */
class NotificationManager {
  constructor() {
    this.listeners = [];
    this.notifications = [];
  }

  /**
   * Subscribe to notifications
   */
  subscribe(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter((cb) => cb !== callback);
    };
  }

  /**
   * Show notification
   */
  show(message, type = MESSAGE_TYPES.INFO, duration = 5000) {
    const id = Date.now();
    const notification = {
      id,
      message,
      type,
      duration,
      timestamp: new Date(),
    };

    this.notifications.push(notification);
    this.listeners.forEach((cb) => cb(notification, "add"));

    if (duration) {
      setTimeout(() => {
        this.dismiss(id);
      }, duration);
    }

    return id;
  }

  /**
   * Show success notification
   */
  success(message, duration = 5000) {
    return this.show(message, MESSAGE_TYPES.SUCCESS, duration);
  }

  /**
   * Show error notification
   */
  error(message, duration = 8000) {
    logger.error(message);
    return this.show(message, MESSAGE_TYPES.ERROR, duration);
  }

  /**
   * Show warning notification
   */
  warning(message, duration = 6000) {
    logger.warn(message);
    return this.show(message, MESSAGE_TYPES.WARNING, duration);
  }

  /**
   * Show info notification
   */
  info(message, duration = 5000) {
    logger.info(message);
    return this.show(message, MESSAGE_TYPES.INFO, duration);
  }

  /**
   * Dismiss notification
   */
  dismiss(id) {
    const index = this.notifications.findIndex((n) => n.id === id);
    if (index > -1) {
      const notification = this.notifications.splice(index, 1)[0];
      this.listeners.forEach((cb) => cb(notification, "remove"));
    }
  }

  /**
   * Dismiss all notifications
   */
  dismissAll() {
    const notificationsCopy = [...this.notifications];
    this.notifications = [];
    notificationsCopy.forEach((notification) => {
      this.listeners.forEach((cb) => cb(notification, "remove"));
    });
  }

  /**
   * Get all notifications
   */
  getAll() {
    return [...this.notifications];
  }
}

// Global notification manager
export const notificationManager = new NotificationManager();

/**
 * Error Boundary Component (React)
 */
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    const log = createLogger("ErrorBoundary");
    log.error("React Error Boundary caught an error", {
      error: error.toString(),
      errorInfo,
    });

    // Send error to logging service in production
    if (
      typeof window !== "undefined" &&
      window.location.hostname !== "localhost"
    ) {
      // Could send to Sentry, LogRocket, etc.
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-red-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
            <h1 className="text-2xl font-bold text-red-600 mb-4">
              Something went wrong
            </h1>
            <p className="text-gray-700 mb-4">
              {this.state.error?.message || "An unexpected error occurred"}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Assert/Error throwing utility
 */
export function assert(condition, message) {
  if (!condition) {
    const error = new Error(message || "Assertion failed");
    logger.error(error.message);
    throw error;
  }
}

/**
 * Retry utility for failed operations
 */
export async function retry(fn, maxAttempts = 3, delay = 1000, backoff = true) {
  let lastError;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      logger.warn(
        `Attempt ${attempt}/${maxAttempts} failed. ${backoff ? "Retrying..." : ""}`,
      );

      if (attempt < maxAttempts) {
        const waitTime = backoff ? delay * Math.pow(2, attempt - 1) : delay;
        await new Promise((resolve) => setTimeout(resolve, waitTime));
      }
    }
  }

  throw lastError;
}

/**
 * Safe JSON parse
 */
export function safeJsonParse(jsonString, fallback = null) {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    logger.warn("JSON parse failed", { string: jsonString, error });
    return fallback;
  }
}

/**
 * Safe JSON stringify
 */
export function safeJsonStringify(obj, fallback = "{}") {
  try {
    return JSON.stringify(obj);
  } catch (error) {
    logger.warn("JSON stringify failed", { obj, error });
    return fallback;
  }
}
