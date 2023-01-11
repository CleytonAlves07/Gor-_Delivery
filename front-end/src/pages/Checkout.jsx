import React from 'react';
import NavBar from '../components/NavBar';
import CardCheckout from '../components/CardCheckout';
import ClientDetails from '../components/ClientDetails';

function Checkout() {
  return (
    <div>
      <NavBar />

      <h1 className="text-primary">
        Finalizar Pedido
      </h1>
      <div>

        <CardCheckout />

      </div>
      {/* <div>{wrongSales ? <p>Deu ruim!</p> : <p>Bom trabalho</p>}</div> */}
      <div>
        <h4>
          Detalhes e Endereço para Entrega
        </h4>
        <ClientDetails />
      </div>

    </div>
  );
}

export default Checkout;
