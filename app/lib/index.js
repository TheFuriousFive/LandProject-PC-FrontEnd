/**
 * Central Export File for All Utilities
 * This allows easier imports throughout the application
 * Example: import { getProperty, createLogger } from '@/lib'
 */

// API Configuration
export {
  API_ENDPOINTS,
  API_BASE_URL,
  API_TIMEOUT,
  HTTP_METHOD,
  HTTP_STATUS,
} from "./api/config";

// API Services
export * from "./api/services";

// Helpers
export {
  stringUtils,
  numberUtils,
  dateUtils,
  arrayUtils,
  objectUtils,
  validationUtils,
  colorUtils,
} from "./helpers";

// Hooks
export {
  useAsync,
  useFetch,
  useLocalStorage,
  useDebounce,
  useThrottle,
  usePrevious,
  useOnClickOutside,
  useWindowSize,
  useScript,
  useTimeout,
  useApi,
} from "./hooks";

// Constants
export {
  USER_ROLES,
  PROPERTY_STATUS,
  RATING_STARS,
  TRUST_SCORE_TIERS,
  HAZARD_RISK_LEVELS,
  DOCUMENT_TYPES,
  ANONYMITY_LEVELS,
  ACCESSIBILITY_FACTORS,
  ZONING_TYPES,
  HAZARD_CATEGORIES,
  HAZARD_SEVERITY,
  MESSAGE_TYPES,
  PAGINATION,
  VALIDATION_RULES,
  UPLOAD_CONSTRAINTS,
  FEATURES,
  NOTIFICATION_TYPES,
  SORT_OPTIONS,
  PRICE_RANGES,
  ACRE_RANGES,
  COLORS,
  SECURITY,
} from "./constants";

// Validation
export {
  propertyValidationSchema,
  registrationValidationSchema,
  loginValidationSchema,
  reviewValidationSchema,
  customValidators,
} from "./validation";

// Error Handling and Logging
export {
  createLogger,
  logger,
  ErrorHandler,
  notificationManager,
  ErrorBoundary,
  assert,
  retry,
  safeJsonParse,
  safeJsonStringify,
} from "./errorHandler";
