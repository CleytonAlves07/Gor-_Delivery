import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import ContextDelivery from '../context/Context';
import { requestLogin } from '../services/requests';

function Register() {
  const { setUser, name, setName } = useContext(ContextDelivery);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [personalDataWrong, setPersonalDataWrong] = useState(false);
  const { push } = useHistory();

  const validEmail = () => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };

  const validName = () => {
    const minimumName = 12;
    const okName = name.length >= minimumName;
    return okName;
  };

  function validLogin() {
    const minimumPassword = 6;
    const emailValid = validEmail();
    const nameValid = validName();
    const passwordValid = password.length >= minimumPassword;

    return emailValid && passwordValid && nameValid;
  }

  const handleClick = async (event) => {
    event.preventDefault();
    try {
      const register = await requestLogin('/register', { email, password });
      setUser(register);
      localStorage.setItem('user', JSON.stringify(register));
      setPersonalDataWrong(false);

      push('/customer/products');
    } catch (error) {
      console.log(error);
      setPersonalDataWrong(true);
    }
  };

  return (

    <div>
      <header>
        <h2>Cadastro</h2>
      </header>
      <div>
        <form>
          <label htmlFor="nome">
            Nome
            <input
              data-testid="common_register__input-name"
              type="text"
              placeholder="Insira seu nome"
              onChange={ (event) => setName(event.target.value) }
            />
          </label>

          <label htmlFor="email">
            Email
            <input
              data-testid="common_register__input-email"
              type="text"
              placeholder="Insira seu email"
              onChange={ (event) => setEmail(event.target.value) }
            />
          </label>

          <label htmlFor="senha">
            Senha
            <input
              data-testid="common_register__input-password"
              type="password"
              placeholder="Insira sua senha"
              onChange={ (event) => setPassword(event.target.value) }
            />
          </label>

          { personalDataWrong ? (
            <p
              data-testid="common_register__element-invalid_register"
            >
              Favor corrigir seus dados
            </p>
          ) : null }

          <button
            data-testid="common_register__button-register"
            type="button"
            disabled={ !validLogin() }
            onClick={ (event) => handleClick(event) }
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
export default Register;
