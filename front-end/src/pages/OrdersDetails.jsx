import React, { useContext, useEffect } from 'react';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import api from '../services/requests';
import NavBar from '../components/NavBar';
import ContextDelivery from '../context/Context';

function OrdersDetails() {
  const {
    setOrderDetail,
    orderDetail,
    setsaleProducts,
    saleProducts,
  } = useContext(ContextDelivery);
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

  const saleProductId = async () => {
    const saleproduct = await api
      .get(`/sales_product/${id}`);
    setsaleProducts(saleproduct.data);
  };
  useEffect(() => {
    saleProductId();
  }, []);

  const data = moment(orderDetail.saleDate).format('DD/MM/YYYY');
  const totalPrice = orderDetail.totalPrice?.replace('.', ',');
  const arraySale = saleProducts[0]?.product;
  const dataTest = 'customer_order_details__element-order-details-label-delivery-status';

  return (
    <section>
      <NavBar />
      <h1>Detalhes do Pedido</h1>
      <div>
        <h3
          data-testid="customer_order_details__element-order-details-label-order-id"
        >
          Pedido:
          {orderDetail.id}
        </h3>
        <h5
          data-testid="customer_order_details__element-order-details-label-seller-name"
        >
          P Vend:
          {orderDetail.seller_id?.name}
        </h5>
        <div
          data-testid={ dataTest }
        >
          Status:
          { orderDetail.status }
        </div>
        <div
          data-testid="customer_order_details__element-order-details-label-order-date"
        >
          Data Venda:
          { data }
        </div>
        <button
          type="button"
          data-testid="customer_order_details__button-delivery-check"
          disabled
        >
          MARCAR COMO ENTREGUE
        </button>
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
          {arraySale?.map((p, i) => (
            <tr key={ i }>
              <td
                data-testid={
                  `customer_order_details__element-order-table-item-number-${i}`
                }
              >
                {i + 1}
              </td>
              <td
                data-testid={
                  `customer_order_details__element-order-table-name-${i}`
                }
              >
                {p.name}

              </td>
              <td
                data-testid={
                  `customer_order_details__element-order-table-quantity-${i}`
                }
              >
                {p.SaleProduct.quantity}
              </td>
              <td
                data-testid={
                  `customer_order_details__element-order-table-unit-price-${i}`
                }
              >
                {(p.price).replace('.', ',')}

              </td>
              <td
                data-testid={
                  `customer_order_details__element-order-table-sub-total-${i}`
                }
              >
                {(p.SaleProduct.quantity * p.price)
                  .toFixed(2)
                  .replace('.', ',')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div
        data-testid="customer_order_details__element-order-total-price"
      >
        Total:
        { totalPrice }
      </div>
    </section>
  );
}

export default OrdersDetails;
