import {useEffect, useRef} from "react";

const JobTableInput = ({isFocused, name, type, value, onSetValue}) => {
  const inputRef = useRef();

  useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
    <input
      ref={inputRef}
      className='no-style w-100'
      name={name}
      type={type}
      value={value}
      onChange={(e) => onSetValue(e.target.value)}
    />
  );
};

export default JobTableInput;
