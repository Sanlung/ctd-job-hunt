import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

const Authentication = ({isLogin, onLogin, onSignUp, onSetMessage}) => (
  <div className='welcome shadow-lg rounded p-5 mx-auto mb-5'>
    <div className='auth-form'>
      {isLogin ? (
        <LoginForm onLogin={onLogin} onSetMessage={onSetMessage} />
      ) : (
        <>
          <SignUpForm onSignUp={onSignUp} onSetMessage={onSetMessage} />
        </>
      )}
    </div>
  </div>
);

export default Authentication;
