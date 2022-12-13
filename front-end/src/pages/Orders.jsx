import React, { useContext, useEffect } from 'react';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import api from '../services/requests';
import NavBar from '../components/NavBar';
import ContextDelivery from '../context/Context';

function Orders() {
  const { cart, setOrderDetail, orderDetail } = useContext(ContextDelivery);
  const { id } = useParams();

  const ordersId = async () => {
    const orders = await api.get(
      `/sales/${id}`,
    );
    setOrderDetail(orders.data);
  };

  useEffect(() => {
    ordersId();
  }, []);

  useEffect(() => {
    console.log(orderDetail);
  }, [orderDetail]);

  const data = moment(orderDetail.saleDate).format('DD/MM/YYYY');
  const totalPrice = orderDetail.totalPrice?.replace('.', ',');

  return (
    <div>
      <NavBar />
      <h1>Detalhes do Pedido</h1>
      <div>
        <h3>
          Pedido:
          {orderDetail.id}
        </h3>
        <h5>
          P Vend:
          {orderDetail.seller_id?.name}
        </h5>
        <div>
          Status:
          { orderDetail.status }
        </div>
        <div>
          Data Venda:
          { data }
        </div>
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
        Total:
        { totalPrice }
      </div>
    </div>
  );
}

export default Orders;
