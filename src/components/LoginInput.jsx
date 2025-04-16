import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

function LoginInput({ login }) {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  const onSubmitLogin = (event) => {
    event.preventDefault();
    login({ email, password });
  };

  return (
    <form className="login-input" onSubmit={onSubmitLogin}>
      <input
        type="email"
        value={email}
        onChange={onEmailChange}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={onPasswordChange}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    </form>
  );
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginInput;
