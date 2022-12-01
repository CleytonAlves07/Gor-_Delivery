import React, { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
      <button
        data-testid="common_login__button-login"
        type="submit"
        disabled={ !validLogin() }
      >
        Entrar
      </button>
      <button
        data-testid="common_login__button-register"
        type="submit"
      >
        Registrar
      </button>
    </form>
  );
}

export default Login;
