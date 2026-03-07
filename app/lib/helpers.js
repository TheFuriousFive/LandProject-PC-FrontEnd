/**
 * String Utilities
 */
export const stringUtils = {
  // Capitalize first letter
  capitalize: (str) => str.charAt(0).toUpperCase() + str.slice(1),

  // Convert to title case
  toTitleCase: (str) =>
    str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" "),

  // Truncate string
  truncate: (str, maxLength = 100) =>
    str.length > maxLength ? `${str.substring(0, maxLength)}...` : str,

  // Slugify string for URLs
  slugify: (str) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_]+/g, "-")
      .replace(/^-+|-+$/g, ""),

  // Format currency
  formatCurrency: (amount, currency = "USD") =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(amount),

  // Format phone number
  formatPhone: (phone) => {
    const cleaned = phone.replace(/\D/g, "");
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
    return phone;
  },

  // Format email for display
  maskEmail: (email) => {
    const [local, domain] = email.split("@");
    return `${local[0]}${"*".repeat(local.length - 2)}${local[local.length - 1]}@${domain}`;
  },
};

/**
 * Number Utilities
 */
export const numberUtils = {
  // Round to decimal places
  round: (num, decimals = 2) =>
    Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals),

  // Format large numbers with K, M, B suffix
  formatLarge: (num) => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1) + "B";
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  },

  // Range checker
  inRange: (num, min, max) => num >= min && num <= max,

  // Percentage calculation
  percentage: (value, total) => (value / total) * 100,

  // Generate random number
  random: (min, max) => Math.floor(Math.random() * (max - min + 1)) + min,
};

/**
 * Date Utilities
 */
export const dateUtils = {
  // Format date as "Jan 15, 2024"
  format: (date, format = "MMM DD, YYYY") => {
    const d = new Date(date);
    const options = { year: "numeric", month: "short", day: "numeric" };
    return d.toLocaleDateString("en-US", options);
  },

  // Get relative time (e.g., "2 hours ago")
  relative: (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    if (seconds < 60) return "just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`;
    return dateUtils.format(date);
  },

  // Days until date
  daysUntil: (date) => {
    const today = new Date();
    const target = new Date(date);
    const diff = target - today;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  },

  // Check if date is in past
  isPast: (date) => new Date(date) < new Date(),

  // Check if date is today
  isToday: (date) => {
    const today = new Date();
    const d = new Date(date);
    return (
      d.getFullYear() === today.getFullYear() &&
      d.getMonth() === today.getMonth() &&
      d.getDate() === today.getDate()
    );
  },
};

/**
 * Array Utilities
 */
export const arrayUtils = {
  // Unique values
  unique: (arr) => [...new Set(arr)],

  // Unique by property
  uniqueBy: (arr, key) =>
    Array.from(new Map(arr.map((item) => [item[key], item])).values()),

  // Flatten array
  flatten: (arr) => arr.reduce((acc, val) => acc.concat(val), []),

  // Group by property
  groupBy: (arr, key) =>
    arr.reduce((acc, item) => {
      const group = item[key];
      if (!acc[group]) acc[group] = [];
      acc[group].push(item);
      return acc;
    }, {}),

  // Sort by property
  sortBy: (arr, key, order = "asc") => {
    return [...arr].sort((a, b) => {
      if (a[key] < b[key]) return order === "asc" ? -1 : 1;
      if (a[key] > b[key]) return order === "asc" ? 1 : -1;
      return 0;
    });
  },

  // Chunk array
  chunk: (arr, size) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  },

  // Sum values
  sum: (arr, key) =>
    arr.reduce((acc, item) => acc + (key ? item[key] : item), 0),

  // Average
  average: (arr, key) => arrayUtils.sum(arr, key) / arr.length,

  // Remove duplicates
  removeDuplicates: (arr) => Array.from(new Set(arr)),
};

/**
 * Object Utilities
 */
export const objectUtils = {
  // Deep clone
  deepClone: (obj) => JSON.parse(JSON.stringify(obj)),

  // Merge objects
  merge: (target, ...sources) => {
    if (!sources.length) return target;
    const source = sources.shift();
    if (typeof source === "object" && source !== null) {
      for (const key in source) {
        if (typeof source[key] === "object" && source[key] !== null) {
          if (!target[key]) Object.assign(target, { [key]: {} });
          objectUtils.merge(target[key], source[key]);
        } else {
          Object.assign(target, { [key]: source[key] });
        }
      }
    }
    return objectUtils.merge(target, ...sources);
  },

  // Pick properties
  pick: (obj, keys) =>
    keys.reduce((acc, key) => {
      if (key in obj) acc[key] = obj[key];
      return acc;
    }, {}),

  // Omit properties
  omit: (obj, keys) =>
    Object.keys(obj).reduce((acc, key) => {
      if (!keys.includes(key)) acc[key] = obj[key];
      return acc;
    }, {}),

  // Check if object is empty
  isEmpty: (obj) => Object.keys(obj).length === 0,

  // Get nested property
  getPath: (obj, path) => {
    return path.split(".").reduce((acc, part) => acc?.[part], obj);
  },

  // Set nested property
  setPath: (obj, path, value) => {
    const keys = path.split(".");
    let current = obj;
    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];
      if (!current[key]) current[key] = {};
      current = current[key];
    }
    current[keys[keys.length - 1]] = value;
    return obj;
  },
};

/**
 * Validation Utilities
 */
export const validationUtils = {
  // Email validation
  isEmail: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),

  // Phone validation
  isPhone: (phone) =>
    /^[\d\s\-\+\(\)]+$/.test(phone) && phone.replace(/\D/g, "").length >= 10,

  // URL validation
  isUrl: (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },

  // Strong password check
  isStrongPassword: (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      password,
    ),

  // Postal code validation (US)
  isPostalCode: (code) => /^\d{5}(-\d{4})?$/.test(code),

  // Credit card validation
  isCreditCard: (card) => /^\d{13,19}$/.test(card.replace(/\D/g, "")),

  // Required field check
  isRequired: (value) => value !== null && value !== undefined && value !== "",
};

/**
 * Color Utilities
 */
export const colorUtils = {
  // Convert hex to RGB
  hexToRgb: (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  },

  // Convert RGB to Hex
  rgbToHex: (r, g, b) =>
    `#${[r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("")}`,

  // Get contrasting text color
  getContrastColor: (hex) => {
    const rgb = colorUtils.hexToRgb(hex);
    if (!rgb) return "#000";
    const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
    return brightness > 128 ? "#000" : "#fff";
  },

  // Lighten color
  lighten: (hex, percent) => {
    const rgb = colorUtils.hexToRgb(hex);
    if (!rgb) return hex;
    const amount = Math.round(2.55 * percent);
    return colorUtils.rgbToHex(
      Math.min(rgb.r + amount, 255),
      Math.min(rgb.g + amount, 255),
      Math.min(rgb.b + amount, 255),
    );
  },

  // Darken color
  darken: (hex, percent) => {
    const rgb = colorUtils.hexToRgb(hex);
    if (!rgb) return hex;
    const amount = Math.round(2.55 * percent);
    return colorUtils.rgbToHex(
      Math.max(rgb.r - amount, 0),
      Math.max(rgb.g - amount, 0),
      Math.max(rgb.b - amount, 0),
    );
  },
};
