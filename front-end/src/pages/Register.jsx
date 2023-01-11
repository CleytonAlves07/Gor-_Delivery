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
      const register = await requestLogin('/register', { name, email, password });
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
        <h2 className="h3 mb-3 fw-normal">Cadastro</h2>
      </header>
      <main className="form-signin w-100 m-auto">
        <form>
          <div className="form-floating">
            <input
              data-testid="common_register__input-name"
              className="form-control"
              type="text"
              placeholder="Insira seu nome"
              onChange={ (event) => setName(event.target.value) }
            />
          </div>
          <label htmlFor="nome">Nome</label>
          <div className="form-floating">
            <input
              data-testid="common_register__input-email"
              className="form-control"
              type="text"
              placeholder="Insira seu email"
              onChange={ (event) => setEmail(event.target.value) }
            />
          </div>
          <label htmlFor="email">Email</label>
          <div className="form-floating">
            <input
              data-testid="common_register__input-password"
              className="form-control"
              type="password"
              placeholder="Insira sua senha"
              onChange={ (event) => setPassword(event.target.value) }
            />
          </div>
          <label htmlFor="senha">Senha</label>

          { personalDataWrong ? (
            <p
              data-testid="common_register__element-invalid_register"
            >
              Favor corrigir seus dados
            </p>
          ) : null }

          <button
            data-testid="common_register__button-register"
            className="w-100 btn btn-lg btn-primary"
            type="button"
            disabled={ !validLogin() }
            onClick={ (event) => handleClick(event) }
          >
            Cadastrar
          </button>
        </form>
      </main>
    </div>
  );
}
export default Register;
