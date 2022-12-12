import React from 'react';
import { useHistory } from 'react-router-dom';
import NavBar from '../components/NavBar';
import CardCheckout from '../components/CardCheckout';
import ClientDetails from '../components/ClientDetails';
import { createSales } from '../services/requests';

function Checkout() {
  // const { wrongSales, setWrongSales } = useState(false);
  // const [clientInfo, setClientInfo] = useState([]);
  const { push } = useHistory();
  const { id, name } = JSON.parse(localStorage.getItem('user'));

  const handleClick = async (event) => {
    event.preventDefault();
    try {
      await createSales('/sales', {
        id,
        name,
        totalPrice,
        deliveryAddress,
        deliveryNumber,
        saleDate,
      });

      // setWrongSales(false);
    } catch (error) {
      // setWrongSales(true);
    }
    push('/customer/orders');
  };
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

        <button
          type="submit"
          data-testid="customer_checkout__button-submit-order"
          onClick={ handleClick }
        >
          FINALIZAR PEDIDO
        </button>
      </div>

    </div>
  );
}

export default Checkout;
