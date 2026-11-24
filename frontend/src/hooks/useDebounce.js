import { useEffect, useState } from "react";

/**
 * Returns a debounced copy of `value` that only updates once
 * the value has stopped changing for `delay` ms.
 */
export default function useDebounce(value, delay = 1000) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
