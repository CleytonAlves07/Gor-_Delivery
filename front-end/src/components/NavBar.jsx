import React from 'react';
import { useHistory } from 'react-router-dom';
import { getUserLogged } from '../services/localStorage';

function NavBar() {
  const { push } = useHistory();
  const { name } = getUserLogged();
  const userRole = JSON.parse(localStorage.getItem('user'));

  const handleClickProducts = async (event) => {
    event.preventDefault();
    if (userRole) {
      if (userRole.role === 'seller') {
        push('/seller/orders');
      } else {
        push('/customer/products');
      }
    }
  };

  const handleClickOrders = async (event) => {
    event.preventDefault();
    if (userRole) {
      if (userRole.role === 'seller') {
        push('/seller/orders');
      } else {
        push('/customer/orders');
      }
    }
  };

  const handleClickProfile = async (event) => {
    event.preventDefault();
    if (userRole) {
      if (userRole.role === 'seller') {
        push('/seller/profile');
      } else {
        push('/customer/profile');
      }
    }
  };

  const handleClickLoggout = () => {
    localStorage.removeItem('user');

    push('/login');
  };

  return (
    <nav className="navbar bg-light">
      <div className="container-fluid justify-content-start">
        <button
          className="btn btn-outline-primary me-2"
          data-testid="customer_products__element-navbar-link-products"
          type="button"
          onClick={ handleClickProducts }
        >
          Produtos
        </button>
        <button
          className="btn btn-outline-primary me-2"
          data-testid="customer_products__element-navbar-link-orders"
          type="button"
          onClick={ handleClickOrders }
        >
          Pedidos
        </button>
        <button
          className="btn btn-outline-primary me-2"
          data-testid="customer_products__element-navbar-user-full-name"
          type="button"
          onClick={ handleClickProfile }
        >
          { name }
        </button>
        <button
          className="btn btn-outline-primary me-2"
          data-testid="customer_products__element-navbar-link-logout"
          type="button"
          onClick={ handleClickLoggout }
        >
          Sair
        </button>
      </div>
    </nav>
  );
}

export default NavBar;
