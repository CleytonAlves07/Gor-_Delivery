import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { requestLogin, setToken } from '../services/requests';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [wrongLogin, setWrongLogin] = useState(false);
  const { push } = useHistory();
  const userRole = JSON.parse(localStorage.getItem('user'));

  const validEmail = () => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };

  function validLogin() {
    const minimumPassword = 6;
    const emailValid = validEmail();
    const passwordValid = password.length >= minimumPassword;

    return emailValid && passwordValid;
  }

  const handleClickLogin = async (event) => {
    event.preventDefault();

    try {
      const { userInfo, token } = await requestLogin('/login', { email, password });
      setToken(token);
      userInfo.token = token;

      localStorage.setItem('user', JSON.stringify(userInfo));
      setWrongLogin(false);
      if (userInfo.role === 'seller') {
        console.log(userInfo);
        push('/seller/orders');
      } else {
        push('/customer/products');
      }
    } catch (error) {
      setWrongLogin(true);
    }
  };

  const handleClickRegister = async (event) => {
    event.preventDefault();

    push('/register');
  };

  useEffect(() => {
    if (userRole) {
      if (userRole.role === 'seller') {
        push('/seller/orders');
      } else {
        push('/customer/products');
      }
    }
  }, []);

  return (
    <main className="form-signin w-100 m-auto">
      <form>
        <img className="mb-4" src="../cup-straw.svg" alt="cup" width="72" height="57" />
        <h1 className="h3 mb-3 fw-normal">DELIVERY DRINKS APP</h1>
        <div className="form-floating">
          <input
            className="form-control"
            data-testid="common_login__input-email"
            id="login"
            type="email"
            name="login"
            placeholder="Seu email"
            onChange={ (event) => setEmail(event.target.value) }
          />
          <label htmlFor="login">E-mail</label>
        </div>
        <div className="form-floating">
          <input
            className="form-control"
            data-testid="common_login__input-password"
            id="password"
            type="password"
            name="password"
            placeholder="Sua senha"
            onChange={ (event) => setPassword(event.target.value) }
          />
          <label htmlFor="password">Senha</label>
        </div>
        { wrongLogin ? (
          <p data-testid="common_login__element-invalid-email">
            Email ou senha incorretos.
          </p>
        ) : null }
        <button
          className="w-100 btn btn-lg btn-primary"
          data-testid="common_login__button-login"
          type="submit"
          disabled={ !validLogin() }
          onClick={ (event) => handleClickLogin(event) }
        >
          Entrar
        </button>
        <button
          className="w-100 btn btn-lg btn-secondary"
          data-testid="common_login__button-register"
          type="submit"
          onClick={ (event) => handleClickRegister(event) }
        >
          Registrar
        </button>
      </form>
    </main>
  );
}

export default Login;
