import React, { useContext, useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import CardCheckout from '../components/CardCheckout';
import ContextDelivery from '../context/Context';

function Checkout() {
  const { cart, setCart } = useContext(ContextDelivery);
  // const [getProd, setTotalProd] = useState([]);

  // const TotalProd = () => {
  //   const totalProd = JSON.parse(localStorage.getItem('deliveryCart'));
  //   setTotalProd(totalProd);
  // };

  // useEffect(() => {
  //   TotalProd();
  // }, []);

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
        {cart?.map((p, i) => (
          <CardCheckout
            key={ i }
            i={ i }
            productName={ p.name }
            productImg={ p.url_image }
            productPrice={ p.price }
            id={ p.id }
          />
        ))}
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
