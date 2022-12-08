import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ContextDelivery from '../context/Context';

function CardCheckout() {
  const { cart, setCart } = useContext(ContextDelivery);

  const removeProduct = (p) => {
    const haveProd = cart.filter((prod) => prod.id !== p.id);
    setCart([...haveProd]);
    localStorage.setItem('deliveryCart', JSON.stringify(haveProd));
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
            <th>Remover Item</th>
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
              <td
                data-testid={
                  `customer_checkout__element-order-table-remove-${i}`
                }
              >
                <button
                  onClick={ () => removeProduct(p) }
                  type="button"
                >
                  Remove

                </button>
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

CardCheckout.propTypes = {
  id: PropTypes.number,
  productImg: PropTypes.string,
  productName: PropTypes.string,
  productPrice: PropTypes.string,
  quantity: PropTypes.number,
  i: PropTypes.number,
}.isRequired;

export default CardCheckout;
