/**
 * Application Constants
 */

// User Roles
export const USER_ROLES = {
  INVESTOR: "investor",
  OWNER: "owner",
  MINISTRY: "ministry",
  ADMIN: "admin",
};

// Property Status
export const PROPERTY_STATUS = {
  DRAFT: "draft",
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
  LISTED: "listed",
  SOLD: "sold",
  ARCHIVED: "archived",
};

// Review Ratings
export const RATING_STARS = {
  EXCELLENT: 5,
  GOOD: 4,
  AVERAGE: 3,
  POOR: 2,
  TERRIBLE: 1,
};

// Trust Score Tiers
export const TRUST_SCORE_TIERS = {
  EXCELLENT: { min: 85, max: 100, label: "Excellent", color: "#10b981" },
  GOOD: { min: 70, max: 84, label: "Good", color: "#3b82f6" },
  AVERAGE: { min: 55, max: 69, label: "Average", color: "#f59e0b" },
  POOR: { min: 40, max: 54, label: "Poor", color: "#f97316" },
  CRITICAL: { min: 0, max: 39, label: "Critical", color: "#ef4444" },
};

// Hazard Risk Levels
export const HAZARD_RISK_LEVELS = {
  CRITICAL: { min: 80, max: 100, label: "Critical", color: "#dc2626" },
  HIGH: { min: 60, max: 79, label: "High", color: "#ea580c" },
  MODERATE: { min: 40, max: 59, label: "Moderate", color: "#eab308" },
  LOW: { min: 20, max: 39, label: "Low", color: "#84cc16" },
  VERY_LOW: { min: 0, max: 19, label: "Very Low", color: "#22c55e" },
};

// Document Types
export const DOCUMENT_TYPES = {
  DEED: "deed",
  SURVEY_MAP: "survey_map",
  TAX_CERTIFICATE: "tax_certificate",
  POLLUTION_CLEARANCE: "pollution_clearance",
  BOUNDARY_MARKED: "boundary_marked",
  OWNERSHIP_PROOF: "ownership_proof",
  PURCHASE_AGREEMENT: "purchase_agreement",
  ENVIRONMENTAL_REPORT: "environmental_report",
};

// Anonymity Levels
export const ANONYMITY_LEVELS = {
  FULL: "full",
  PARTIAL: "partial",
  NONE: "none",
};

// Accessibility Score Factors
export const ACCESSIBILITY_FACTORS = {
  SCHOOLS: { weight: 15, label: "Schools" },
  HOSPITALS: { weight: 15, label: "Hospitals" },
  TRANSPORT: { weight: 15, label: "Public Transport" },
  ROADS: { weight: 15, label: "Road Quality" },
  MARKETS: { weight: 15, label: "Markets" },
  WATER: { weight: 15, label: "Water Access" },
  ELECTRICITY: { weight: 10, label: "Electricity" },
};

// Zoning Types
export const ZONING_TYPES = [
  "Agricultural",
  "Residential",
  "Commercial",
  "Industrial",
  "Mixed Use",
  "Recreational",
  "Protected Area",
];

// Hazard Categories
export const HAZARD_CATEGORIES = {
  FLOODING: "flooding",
  SEISMIC: "seismic",
  SOIL_QUALITY: "soil_quality",
  POLLUTION: "pollution",
  INDUSTRY_PROXIMITY: "industry_proximity",
  DEFORESTATION: "deforestation",
};

// Hazard Levels
export const HAZARD_SEVERITY = {
  CRITICAL: "critical",
  HIGH: "high",
  MODERATE: "moderate",
  LOW: "low",
  NONE: "none",
};

// Message Types
export const MESSAGE_TYPES = {
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning",
  INFO: "info",
};

// Pagination Defaults
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
};

// Validation Rules
export const VALIDATION_RULES = {
  MIN_PASSWORD_LENGTH: 8,
  MIN_USERNAME_LENGTH: 3,
  MAX_USERNAME_LENGTH: 30,
  MIN_PROPERTY_PRICE: 1000,
  MAX_PROPERTY_PRICE: 1000000000,
  MIN_PROPERTY_ACRES: 0.1,
  MAX_PROPERTY_ACRES: 100000,
};

// Upload Constraints
export const UPLOAD_CONSTRAINTS = {
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_IMAGE_TYPES: ["image/jpeg", "image/png", "image/webp"],
  ALLOWED_DOCUMENT_TYPES: ["application/pdf", "image/jpeg", "image/png"],
  MAX_IMAGES: 10,
  MAX_DOCUMENTS: 5,
};

// Feature Flags
export const FEATURES = {
  ANONYMITY_ENABLED: true,
  HAZARD_ANALYSIS: true,
  TRUST_SCORE: true,
  REVIEWS: true,
  GEOSPATIAL: true,
  DOCUMENT_UPLOAD: true,
  PROPERTY_COMPARISON: false,
  AUCTION_SYSTEM: false,
};

// Notifications
export const NOTIFICATION_TYPES = {
  PROPERTY_VIEWED: "property_viewed",
  REVIEW_RECEIVED: "review_received",
  OFFER_RECEIVED: "offer_received",
  APPROVAL_STATUS: "approval_status",
  MESSAGE_RECEIVED: "message_received",
};

// Sort Options
export const SORT_OPTIONS = {
  PRICE_LOW: "price_asc",
  PRICE_HIGH: "price_desc",
  NEWEST: "created_desc",
  OLDEST: "created_asc",
  MOST_REVIEWS: "reviews_desc",
  HIGHEST_RATED: "rating_desc",
  HIGHEST_TRUST: "trust_score_desc",
};

// Price Ranges for Filters
export const PRICE_RANGES = [
  { min: 0, max: 100000, label: "Under $100K" },
  { min: 100000, max: 500000, label: "$100K - $500K" },
  { min: 500000, max: 1000000, label: "$500K - $1M" },
  { min: 1000000, max: 5000000, label: "$1M - $5M" },
  { min: 5000000, max: Infinity, label: "$5M+" },
];

// Acre Ranges for Filters
export const ACRE_RANGES = [
  { min: 0, max: 10, label: "Under 10 acres" },
  { min: 10, max: 50, label: "10 - 50 acres" },
  { min: 50, max: 100, label: "50 - 100 acres" },
  { min: 100, max: 500, label: "100 - 500 acres" },
  { min: 500, max: Infinity, label: "500+ acres" },
];

// Colors (matching Tailwind config)
export const COLORS = {
  PRIMARY: "#9afb21", // Lime Green
  DARK: "#0f0f11", // Dark Background
  SUCCESS: "#10b981",
  WARNING: "#f59e0b",
  DANGER: "#ef4444",
  INFO: "#3b82f6",
};

// API Response Delays (for testing)
export const API_DELAYS = {
  FAST: 100,
  NORMAL: 500,
  SLOW: 1000,
};

// Security
export const SECURITY = {
  TOKEN_EXPIRY: 24 * 60 * 60 * 1000, // 24 hours
  REFRESH_TOKEN_EXPIRY: 7 * 24 * 60 * 60 * 1000, // 7 days
  SESSION_TIMEOUT: 30 * 60 * 1000, // 30 minutes
  MAX_LOGIN_ATTEMPTS: 5,
  LOCKOUT_DURATION: 15 * 60 * 1000, // 15 minutes
};
