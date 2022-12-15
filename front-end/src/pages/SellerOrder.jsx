import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getOrdersSellerById } from '../services/requests';
import { getUserLogged } from '../services/localStorage';

const moment = require('moment');

function Orders() {
  const [ordersSeller, setOrdersSeller] = useState([]);
  const forMagicNumber = 4;

  const getOrdersSellerId = async (token) => {
    const data = await getOrdersSellerById(token);
    setOrdersSeller(data.data);
  };

  useEffect(() => {
    const { token } = getUserLogged();
    getOrdersSellerId(token);
    console.log(ordersSeller);
  }, []);

  return (
    <main>
      <h1>PEDIDOS</h1>
      <div>
        {
          ordersSeller?.map((o) => (
            <section key={ o.id }>
              <Link to={ `/seller/orders/${o.id}` }>
                <div
                  data-testid={ `seller_orders__element-order-id-${o.id}` }
                >
                  <p>
                    PEDIDO
                  </p>
                  <p>
                    {String(o.id).padStart(forMagicNumber, 0)}
                  </p>
                </div>
                <div
                  data-testid={ `seller_orders__element-delivery-status-${o.id}` }
                >
                  <p>{o.status}</p>
                </div>
                <div>
                  <div
                    data-testid={ `seller_orders__element-order-date-${o.id}` }
                  >
                    { moment(o.saleDate).format('DD/MM/YYYY') }
                  </div>
                  <div
                    data-testid={ `seller_orders__element-card-price-${o.id}` }
                  >
                    R$
                    {o.totalPrice.replace('.', ',')}
                  </div>
                </div>
              </Link>
            </section>
          ))
        }
      </div>
    </main>
  );
}

export default Orders;
