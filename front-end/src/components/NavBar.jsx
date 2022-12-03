import React from 'react';
import { useHistory } from 'react-router-dom';
import { getUserLogged } from '../services/localStorage';

function NavBar() {
  const { push } = useHistory();
  const { name } = getUserLogged();

  const handleClickProducts = async (event) => {
    event.preventDefault();
    push('/customer/products');
  };

  const handleClickOrders = async (event) => {
    event.preventDefault();
    push('/customer/orders');
  };

  const handleClickProfile = async (event) => {
    event.preventDefault();
    push('/profile');
  };

  const handleClickLoggout = () => {
    localStorage.removeItem('user');

    push('/login');
  };

  return (
    <nav>
      <button
        data-testid="customer_products__element-navbar-link-products"
        type="button"
        onClick={ handleClickProducts }
      >
        Produtos
      </button>
      <button
        data-testid="customer_products__element-navbar-link-orders"
        type="button"
        onClick={ handleClickOrders }
      >
        Pedidos
      </button>
      <button
        data-testid="customer_products__element-navbar-user-full-name"
        type="button"
        onClick={ handleClickProfile }
      >
        { name }
      </button>
      <button
        data-testid="customer_products__element-navbar-link-logout"
        type="button"
        onClick={ handleClickLoggout }
      >
        Sair
      </button>
    </nav>
  );
}

export default NavBar;
