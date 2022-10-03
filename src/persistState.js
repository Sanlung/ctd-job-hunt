import {useState, useEffect, useRef} from "react";

const useSemiPersistentState = (key, initialState) => {
  const isMounted = useRef(false);
  const [value, setValue] = useState(
    JSON.parse(localStorage.getItem(key)) || initialState
  );
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [value, key]);

  return [value, setValue];
};

export default useSemiPersistentState;
