import React from 'react';
import RegisterInput from '../components/RegisterInput';
import { Link, useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { asyncRegisterUser } from '../states/users/action';

function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onRegister = ({ name, email, password }) => {
    dispatch(asyncRegisterUser({ name, email, password }));

    navigate('/');
  };

  return (
    <section className="register-page">
      <h2>Login</h2>
      <RegisterInput register={onRegister} />
      <p className="login-info">
        Sudah punya akun?
        {' '}
        <Link to="/">Masuk di sini.</Link>
      </p>
    </section>
  );
}

export default RegisterPage;
