import {useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {FaUser, FaEnvelope, FaUnlockAlt} from "react-icons/fa";
import InputWithLabel from "./InputWithLabel";

const SignUpForm = ({onSignUp, onSetMessage}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");

  const handleSignUp = (e) => {
    e.preventDefault();
    if (!username) {
      onSetMessage("Please provide a username.");
    } else if (!email) {
      onSetMessage("Please provide your email.");
    } else if (username.length < 6 || username.length > 15) {
      onSetMessage("Username must be between 6 and 15 characters.");
    } else if (!password || password !== password1) {
      onSetMessage("The passwords entered do not match or are missing.");
    } else if (password.length < 8 || password.length > 32) {
      onSetMessage("Password must be between 8 and 32 characters.");
    } else {
      onSignUp(username, email, password);
      setUsername("");
      setEmail("");
      setPassword("");
      setPassword1("");
    }
  };

  return (
    <>
      <Form onSubmit={handleSignUp}>
        <InputWithLabel
          isFocused
          name='username'
          type='text'
          value={username}
          placeholder='Username'
          onSetValue={setUsername}>
          <FaUser />
        </InputWithLabel>
        <InputWithLabel
          name='email'
          type='email'
          value={email}
          placeholder='Email'
          onSetValue={setEmail}>
          <FaEnvelope />
        </InputWithLabel>
        <InputWithLabel
          name='password'
          type='password'
          value={password}
          placeholder='Password'
          onSetValue={setPassword}>
          <FaUnlockAlt />
        </InputWithLabel>
        <InputWithLabel
          name='password1'
          type='password'
          value={password1}
          placeholder='Confirm password'
          onSetValue={setPassword1}>
          <FaUnlockAlt />
        </InputWithLabel>
        <p className='h6 mb-4 text-secondary'>
          Username should be 6 to 15 characters, and password at least one of
          uppercase, lowercase, digit and special (!@$%&?) character.
        </p>
        <Button
          as='input'
          type='submit'
          value='Sign Up'
          variant='outline-secondary'
        />
      </Form>
    </>
  );
};

export default SignUpForm;
