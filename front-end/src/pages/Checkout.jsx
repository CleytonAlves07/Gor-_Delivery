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
      {/* <div>{wrongSales ? <p>Deu ruim!</p> : <p>Bom trabalho</p>}</div> */}
      <div>
        <p>
          Detalhes e Endereço para Entrega
        </p>
        <ClientDetails />
      </div>

    </div>
  );
}

export default Checkout;
