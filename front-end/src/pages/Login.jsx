import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { requestLogin, setToken } from '../services/requests';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [wrongLogin, setWrongLogin] = useState(false);
  const { push } = useHistory();

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
      push('/customer/products');
    } catch (error) {
      console.log('O Error é :', error);
      setWrongLogin(true);
    }
  };

  const handleClickRegister = async (event) => {
    event.preventDefault();

    push('/register');
  };

  return (
    <form>
      <h1>BeerPoint</h1>
      <label htmlFor="login">
        Login
        <input
          data-testid="common_login__input-email"
          id="login"
          type="email"
          name="login"
          placeholder="Seu email"
          onChange={ (event) => setEmail(event.target.value) }
        />
      </label>
      <label htmlFor="password">
        Senha
        <input
          data-testid="common_login__input-password"
          id="password"
          type="password"
          name="password"
          placeholder="Sua senha"
          onChange={ (event) => setPassword(event.target.value) }
        />
      </label>
      { wrongLogin ? (
        <p data-testid="common_login__element-invalid-email">
          Email ou senha incorretos.
        </p>
      ) : null }
      <button
        data-testid="common_login__button-login"
        type="submit"
        disabled={ !validLogin() }
        onClick={ (event) => handleClickLogin(event) }
      >
        Entrar
      </button>
      <button
        data-testid="common_login__button-register"
        type="submit"
        onClick={ (event) => handleClickRegister(event) }
      >
        Registrar
      </button>
    </form>
  );
}

export default Login;
