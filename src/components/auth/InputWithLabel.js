import {useEffect, useRef} from "react";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";

const InputWithLabel = ({
  isFocused,
  name,
  type,
  value,
  placeholder,
  onSetValue,
  children,
}) => {
  const inputRef = useRef();

  useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
    <Form.Group className='mb-4'>
      <Form.Label className='visually-hidden'>{name}</Form.Label>
      <InputGroup>
        <InputGroup.Text className='bg-secondary text-light'>
          {children}
        </InputGroup.Text>
        <Form.Control
          ref={inputRef}
          name={name}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onSetValue(e.target.value)}
        />
      </InputGroup>
    </Form.Group>
  );
};

export default InputWithLabel;
