import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import ContextDelivery from '../context/Context';

function CardCheckout({ id, productName, productPrice }) {
  const [quantity, setQuantity] = useState(0);
  const { cart, setCart } = useContext(ContextDelivery);

  const removeProduct = () => {
    const haveProd = cart.filter((product) => product.id !== id);
    setCart([...haveProd]);
  };

  useEffect(() => {
    localStorage.setItem('deliveryCart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem('deliveryCart'))) {
      setCart([]);
    } else {
      setCart(JSON.parse(localStorage.getItem('deliveryCart')));
      const qttyProduct = JSON.parse(localStorage.getItem('deliveryCart'))
        .find((p) => id === p.id);
      if (qttyProduct) {
        setQuantity(qttyProduct.quantity);
      }
    }
  }, []);

  return (
    <div>
      <p
        data-testid={ `customer_products__element-card-price-${id}` }
        key={ id }
      >
        {`R$ ${productPrice.replace('.', ',')}`}
      </p>
      <p
        data-testid={ `customer_products__element-card-title-${id}` }
      >
        {productName}
      </p>
      <div
        // data-testid={ `customer_products__input-card-quantity-${id}` }
        id={ productPrice }
        name={ productName }
        value={ quantity }
        type="text"
      >
        {quantity}

      </div>
      <button
        onClick={ () => removeProduct() }
        type="button"
      >
        Remove

      </button>
    </div>
  );
}

CardCheckout.propTypes = {
  id: PropTypes.number,
  productImg: PropTypes.string,
  productName: PropTypes.string,
  productPrice: PropTypes.string,
  i: PropTypes.number,
}.isRequired;

export default CardCheckout;
