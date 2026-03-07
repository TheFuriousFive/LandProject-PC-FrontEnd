import { VALIDATION_RULES } from "./constants";
import { validationUtils } from "./helpers";

/**
 * Property Validation Schema
 */
export const propertyValidationSchema = {
  title: {
    required: "Property title is required",
    minLength: {
      value: 5,
      message: "Title must be at least 5 characters",
    },
    maxLength: {
      value: 100,
      message: "Title cannot exceed 100 characters",
    },
  },
  description: {
    required: "Description is required",
    minLength: {
      value: 20,
      message: "Description must be at least 20 characters",
    },
    maxLength: {
      value: 2000,
      message: "Description cannot exceed 2000 characters",
    },
  },
  price: {
    required: "Price is required",
    validate: (value) => {
      const price = parseFloat(value);
      if (price < VALIDATION_RULES.MIN_PROPERTY_PRICE) {
        return `Price must be at least $${VALIDATION_RULES.MIN_PROPERTY_PRICE}`;
      }
      if (price > VALIDATION_RULES.MAX_PROPERTY_PRICE) {
        return `Price cannot exceed $${VALIDATION_RULES.MAX_PROPERTY_PRICE}`;
      }
      return true;
    },
  },
  acres: {
    required: "Acres is required",
    validate: (value) => {
      const acres = parseFloat(value);
      if (acres < VALIDATION_RULES.MIN_PROPERTY_ACRES) {
        return `Acres must be at least ${VALIDATION_RULES.MIN_PROPERTY_ACRES}`;
      }
      if (acres > VALIDATION_RULES.MAX_PROPERTY_ACRES) {
        return `Acres cannot exceed ${VALIDATION_RULES.MAX_PROPERTY_ACRES}`;
      }
      return true;
    },
  },
  location: {
    required: "Location is required",
  },
  latitude: {
    required: "Latitude is required",
    validate: (value) => {
      const lat = parseFloat(value);
      if (lat < -90 || lat > 90) {
        return "Latitude must be between -90 and 90";
      }
      return true;
    },
  },
  longitude: {
    required: "Longitude is required",
    validate: (value) => {
      const lon = parseFloat(value);
      if (lon < -180 || lon > 180) {
        return "Longitude must be between -180 and 180";
      }
      return true;
    },
  },
  zoningType: {
    required: "Zoning type is required",
  },
};

/**
 * User Registration Validation Schema
 */
export const registrationValidationSchema = {
  email: {
    required: "Email is required",
    validate: (value) => {
      if (!validationUtils.isEmail(value)) {
        return "Please enter a valid email address";
      }
      return true;
    },
  },
  password: {
    required: "Password is required",
    minLength: {
      value: VALIDATION_RULES.MIN_PASSWORD_LENGTH,
      message: `Password must be at least ${VALIDATION_RULES.MIN_PASSWORD_LENGTH} characters`,
    },
    validate: (value) => {
      if (!validationUtils.isStrongPassword(value)) {
        return "Password must contain uppercase, lowercase, number, and special character";
      }
      return true;
    },
  },
  confirmPassword: {
    required: "Please confirm your password",
    validate: (value, formValues) => {
      if (value !== formValues.password) {
        return "Passwords do not match";
      }
      return true;
    },
  },
  fullName: {
    required: "Full name is required",
    minLength: {
      value: 2,
      message: "Name must be at least 2 characters",
    },
    maxLength: {
      value: 50,
      message: "Name cannot exceed 50 characters",
    },
  },
  phone: {
    validate: (value) => {
      if (value && !validationUtils.isPhone(value)) {
        return "Please enter a valid phone number";
      }
      return true;
    },
  },
  terms: {
    required: "You must accept the terms and conditions",
  },
};

/**
 * Login Validation Schema
 */
export const loginValidationSchema = {
  email: {
    required: "Email is required",
    validate: (value) => {
      if (!validationUtils.isEmail(value)) {
        return "Please enter a valid email address";
      }
      return true;
    },
  },
  password: {
    required: "Password is required",
    minLength: {
      value: VALIDATION_RULES.MIN_PASSWORD_LENGTH,
      message: "Password is incorrect",
    },
  },
};

/**
 * Review Validation Schema
 */
export const reviewValidationSchema = {
  rating: {
    required: "Please select a rating",
    validate: (value) => {
      const rating = parseInt(value);
      if (rating < 1 || rating > 5) {
        return "Rating must be between 1 and 5 stars";
      }
      return true;
    },
  },
  comment: {
    required: "Please write a review",
    minLength: {
      value: 10,
      message: "Review must be at least 10 characters",
    },
    maxLength: {
      value: 1000,
      message: "Review cannot exceed 1000 characters",
    },
  },
};

/**
 * Custom Validation Functions
 */
export const customValidators = {
  // Validate property coordinates
  validateCoordinates: (lat, lon) => {
    const latitude = parseFloat(lat);
    const longitude = parseFloat(lon);

    if (latitude < -90 || latitude > 90) {
      return { valid: false, message: "Latitude must be between -90 and 90" };
    }
    if (longitude < -180 || longitude > 180) {
      return {
        valid: false,
        message: "Longitude must be between -180 and 180",
      };
    }
    return { valid: true };
  },

  // Validate file upload
  validateFile: (file, maxSize, allowedTypes) => {
    if (!file) {
      return { valid: false, message: "File is required" };
    }

    if (file.size > maxSize) {
      return {
        valid: false,
        message: `File size must be less than ${maxSize / (1024 * 1024)}MB`,
      };
    }

    if (!allowedTypes.includes(file.type)) {
      return {
        valid: false,
        message: `File type not allowed. Allowed types: ${allowedTypes.join(", ")}`,
      };
    }

    return { valid: true };
  },

  // Validate price range
  validatePriceRange: (price, min, max) => {
    const p = parseFloat(price);
    if (p < min || p > max) {
      return {
        valid: false,
        message: `Price must be between $${min} and $${max}`,
      };
    }
    return { valid: true };
  },

  // Validate acres range
  validateAcresRange: (acres, min, max) => {
    const a = parseFloat(acres);
    if (a < min || a > max) {
      return {
        valid: false,
        message: `Acres must be between ${min} and ${max}`,
      };
    }
    return { valid: true };
  },

  // Validate unique email (would call API)
  validateUniqueEmail: async (email) => {
    try {
      const response = await fetch(`/api/users/check-email?email=${email}`);
      if (!response.ok) {
        return {
          valid: false,
          message: "This email is already registered",
        };
      }
      return { valid: true };
    } catch {
      return { valid: true };
    }
  },

  // Validate document uploads
  validateDocuments: (documents, requiredDocs) => {
    const uploadedTypes = documents.map((doc) => doc.type);
    const missing = requiredDocs.filter((req) => !uploadedTypes.includes(req));

    if (missing.length > 0) {
      return {
        valid: false,
        message: `Missing required documents: ${missing.join(", ")}`,
      };
    }

    return { valid: true };
  },

  // Validate property completeness
  validatePropertyCompletion: (property) => {
    const required = [
      "title",
      "description",
      "price",
      "acres",
      "location",
      "latitude",
      "longitude",
    ];
    const missing = required.filter((field) => !property[field]);

    if (missing.length > 0) {
      return {
        valid: false,
        message: `Missing required fields: ${missing.join(", ")}`,
        missing,
      };
    }

    return { valid: true };
  },
};
