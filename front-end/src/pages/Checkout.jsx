import React from 'react';
import NavBar from '../components/NavBar';
import CardCheckout from '../components/CardCheckout';

function Checkout() {
  return (
    <div>
      <NavBar />

      <p>
        Finalizar Pedido
      </p>
      <p>
        Detalhes e Endereço para Entrega
      </p>
      <div>

        <CardCheckout />

      </div>
      <button
        data-testid="customer_checkout__button-submit-order"
        type="button"
      >
        Cadastrar
      </button>
    </div>
  );
}

export default Checkout;
