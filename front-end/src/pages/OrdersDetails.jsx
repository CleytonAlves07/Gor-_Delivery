import React, { useContext, useEffect } from 'react';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import api, { updtSale } from '../services/requests';
import NavBar from '../components/NavBar';
import ContextDelivery from '../context/Context';
import { getUserLogged } from '../services/localStorage';

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

  const handleDelivered = async () => {
    const { token } = getUserLogged();
    const { userId, sellerId, totalPrice, deliveryAddress,
      deliveryNumber, saleDate } = orderDetail;
    const updtObj = {
      userId,
      sellerId,
      totalPrice,
      deliveryAddress,
      deliveryNumber,
      saleDate,
      status: 'Entregue',
    };
    const newUpdt = { ...updtObj };
    await updtSale(token, id, newUpdt);
    ordersId();
  };

  const data = moment(orderDetail.saleDate).format('DD/MM/YYYY');
  const totalPrice = orderDetail.totalPrice?.replace('.', ',');
  const arraySale = saleProducts[0]?.product;
  const dataTest = 'customer_order_details__element-order-details-label-delivery-status';

  return (
    <section>
      <NavBar />
      <h1>Detalhes do Pedido</h1>
      <div>
        <ul className="list-group">
          <li
            className="list-group-item"
            data-testid="customer_order_details__element-order-details-label-order-id"
          >
            {`Pedido: ${orderDetail.id}`}

          </li>
          <li
            className="list-group-item"
            data-testid="customer_order_details__element-order-details-label-seller-name"
          >
            {`Pedido Vendedor: ${orderDetail.seller_id?.name}`}

          </li>
          <li
            className="list-group-item"
            data-testid={ dataTest }
          >
            {`Status: ${orderDetail.status}`}

          </li>
          <li
            className="list-group-item"
            data-testid="customer_order_details__element-order-details-label-order-date"
          >
            {`Data Venda: ${data}`}
          </li>
        </ul>

        <button
          type="button"
          className="btn btn-outline-primary me-2"
          data-testid="customer_order_details__button-delivery-check"
          onClick={ handleDelivered }
          disabled={ orderDetail.status !== 'Em Trânsito' }
        >
          MARCAR COMO ENTREGUE
        </button>
      </div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Item</th>
            <th scope="col">Descrição</th>
            <th scope="col">Quantidade</th>
            <th scope="col">Valor Unitário</th>
            <th scope="col">Sub-total</th>
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
        className="h5"
      >
        {`Total: R$ ${totalPrice}`}
      </div>
    </section>
  );
}

export default OrdersDetails;
