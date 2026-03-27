/**
 * Hooks for Custom Logic and State Management
 */

import { useState, useCallback, useEffect, useRef } from "react";

const getErrorMessage = (err) =>
  err?.response?.data?.message || err?.message || "An error occurred";

/**
 * useAsync: Handle async operations with loading and error states
 */
export function useAsync(asyncFunction, immediate = true) {
  const [status, setStatus] = useState("idle");
  const [value, setValue] = useState(null);
  const [error, setError] = useState(null);

  const execute = useCallback(
    async (...args) => {
      setStatus("pending");
      setValue(null);
      setError(null);

      try {
        const response = await asyncFunction(...args);
        setValue(response);
        setStatus("success");
        return response;
      } catch (err) {
        setError(err);
        setStatus("error");
        throw err;
      }
    },
    [asyncFunction],
  );

  useEffect(() => {
    if (immediate) {
      const run = async () => {
        try {
          await execute();
        } catch {
          // Error already handled in execute
        }
      };
      run();
    }
  }, [execute, immediate]);

  return { execute, status, value, error };
}

/**
 * useFetch: Fetch data from API
 */
export function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) {
      setLoading(false);
      return;
    }

    let isMounted = true;

    const fetch = async () => {
      try {
        const response = await window.fetch(url, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        if (isMounted) {
          setData(result);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err);
          setData(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetch();

    return () => {
      isMounted = false;
    };
  }, [url, options]);

  return { data, loading, error };
}

/**
 * useLocalStorage: Persist state in localStorage
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        if (typeof window !== "undefined") {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      } catch (error) {
        console.error(error);
      }
    },
    [key, storedValue],
  );

  return [storedValue, setValue];
}

/**
 * useDebounce: Debounce a value
 */
export function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

/**
 * useThrottle: Throttle a function
 */
export function useThrottle(callback, delay = 500) {
  const lastRunRef = useRef(null);

  return useCallback(
    (...args) => {
      const now = Date.now();
      const lastRun = lastRunRef.current ?? now;

      if (now - lastRun >= delay) {
        callback(...args);
        lastRunRef.current = now;
      }
    },
    [callback, delay],
  );
}

/**
 * usePrevious: Get previous value
 * Note: Returns the previous value during render, ensuring updates reflect previous state
 */
export function usePrevious(value) {
  const [prevValue, setPrevValue] = useState(null);
  const [currentValue, setCurrentValue] = useState(value);

  if (currentValue !== value) {
    setPrevValue(currentValue);
    setCurrentValue(value);
  }

  return prevValue;
}

/**
 * useOnClickOutside: Detect clicks outside element
 */
export function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}

/**
 * useWindowSize: Get window dimensions
 */
export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1024,
    height: typeof window !== "undefined" ? window.innerHeight : 768,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}

/**
 * useScript: Load external script
 */
export function useScript(src) {
  const [status, setStatus] = useState(src ? "loading" : "idle");

  useEffect(() => {
    if (!src) {
      return;
    }

    let isActive = true;
    let script = document.querySelector(`script[src="${src}"]`);

    if (!script) {
      script = document.createElement("script");
      script.src = src;
      script.async = true;

      const handleLoad = () => {
        if (isActive) setStatus("ready");
      };
      const handleError = () => {
        if (isActive) setStatus("error");
      };

      script.addEventListener("load", handleLoad);
      script.addEventListener("error", handleError);
      document.head.appendChild(script);

      return () => {
        isActive = false;
        script.removeEventListener("load", handleLoad);
        script.removeEventListener("error", handleError);
      };
    } else {
      // Script already exists, mark as ready in next tick to avoid setState warning
      const timer = setTimeout(() => {
        if (isActive) setStatus("ready");
      }, 0);

      return () => {
        isActive = false;
        clearTimeout(timer);
      };
    }
  }, [src]);

  return status;
}

/**
 * useTimeout: Execute callback after delay
 */
export function useTimeout(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null || delay === undefined) return;

    const id = setTimeout(() => savedCallback.current?.(), delay);
    return () => clearTimeout(id);
  }, [delay]);
}

/**
 * useApi: Wrapper for API calls with loading and error handling
 */
export function useApi(apiFunction) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(
    async (...args) => {
      setLoading(true);
      setError(null);

      try {
        const result = await apiFunction(...args);
        setData(result);
        return result;
      } catch (err) {
        const message = getErrorMessage(err);
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [apiFunction],
  );

  return { data, loading, error, execute };
}
export function useAuth() {
  const [user, setUser] = useState({
    role: "investor",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUser({
        role: localStorage.getItem("userRole") || "investor",
      });
    }
  }, []);

  return { user };
}
