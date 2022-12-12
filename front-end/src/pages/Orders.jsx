import React, { useContext } from 'react';
import NavBar from '../components/NavBar';
import ContextDelivery from '../context/Context';

function Orders() {
  const { cart } = useContext(ContextDelivery);
  return (
    <div>
      <NavBar />
      <h1>Detalhes do Pedido</h1>
      <div>
        <h3>Pedido  007</h3>
        <h5>P Vend:</h5>
        <button type="button">MARCAR COMO ENTREGUE</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
          </tr>
        </thead>
        <tbody>
          {cart?.map((p, i) => (
            <tr key={ i }>
              <td
                data-testid={
                  `customer_checkout__element-order-table-item-number-${i}`
                }
              >
                {i + 1}

              </td>
              <td
                data-testid={
                  `customer_checkout__element-order-table-name-${i}`
                }
              >
                {p.name}
              </td>
              <td
                data-testid={
                  `customer_checkout__element-order-table-quantity-${i}`
                }
              >
                {p.quantity}
              </td>
              <td
                data-testid={
                  `customer_checkout__element-order-table-unit-price-${i}`
                }
              >
                {`R$ ${p.price.replace('.', ',')}`}

              </td>
              <td
                data-testid={
                  `customer_checkout__element-order-table-sub-total-${i}`
                }
              >
                {p.totalValues.replace('.', ',')}

              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div
        data-testid="customer_checkout__element-order-total-price"
      >
        {`Total: ${cart
          .reduce((acc, curr) => acc + Number(curr.totalValues), 0)
          .toFixed(2).replace('.', ',')}`}

      </div>
    </div>
  );
}

export default Orders;
