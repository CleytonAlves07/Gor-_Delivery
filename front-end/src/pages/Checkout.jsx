import React from 'react';
import NavBar from '../components/NavBar';
import CardCheckout from '../components/CardCheckout';
import ClientDetails from '../components/ClientDetails';

function Checkout() {
  return (
    <div>
      <NavBar />

      <p>
        Finalizar Pedido
      </p>
      <div>

        <CardCheckout />

      </div>
      <div>
        <p>
          Detalhes e Endereço para Entrega
        </p>
        <ClientDetails />
        <button
          type="submit"
          data-testid="customer_checkout__button-submit-order"
        >
          FINALIZAR PEDIDO
        </button>
      </div>

    </div>
  );
}

export default Checkout;
