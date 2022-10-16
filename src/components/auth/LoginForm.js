import {useState} from "react";
import Form from "react-bootstrap/Form";
import {Button, ButtonGroup} from "react-bootstrap";
import {FaEnvelope, FaUnlockAlt} from "react-icons/fa";
import InputWithLabel from "./InputWithLabel";

const LoginForm = ({onLogin, onSetMessage}) => {
  const [email1, setEmail1] = useState("");
  const [password2, setPassword2] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email1 || !password2) {
      onSetMessage("Please provide both email and passowrd.");
    } else {
      onLogin(email1, password2);
      setEmail1("");
      setPassword2("");
    }
  };

  return (
    <>
      <Form
        role='presentation'
        className='mt-5 d-flex flex-column'
        onSubmit={handleLogin}>
        <p className='intro h4 text-secondary mb-4'>
          Track Your Job Applications and Keep the Status Up to Date ⏤
        </p>
        <InputWithLabel
          isFocused
          name='email'
          type='email'
          value={email1}
          placeholder='Email'
          onSetValue={setEmail1}>
          <FaEnvelope />
        </InputWithLabel>
        <InputWithLabel
          name='password'
          type='password'
          value={password2}
          placeholder='Password'
          onSetValue={setPassword2}>
          <FaUnlockAlt />
        </InputWithLabel>
        <ButtonGroup>
          <Button
            as='input'
            type='submit'
            value='Login'
            variant='outline-secondary'
          />
          <Button disabled variant='secondary' className='go-signup text-end'>
            Don't have an account?
          </Button>
          <Button href='/auth/register' variant='outline-secondary'>
            Sign Up
          </Button>
        </ButtonGroup>
      </Form>
    </>
  );
};

export default LoginForm;
