import React, { useState } from 'react';
import PropTypes from 'prop-types';

function Card({ id, productImg, productName, productPrice }) {
  const [quantity, setQuantity] = useState(0);
  const px = '70px';

  const decrementProduct = () => {
    setQuantity((pState) => pState - 1);
  };

  const incrementProduct = () => {
    setQuantity((pState) => pState + 1);
  };

  return (
    <div>
      <p
        data-testid={ `customer_products__element-card-price-${id}` }
        key={ id }
      >
        { `R$ ${productPrice.replace('.', ',')}` }
      </p>
      <img
        data-testid={ `customer_products__img-card-bg-image-${id}` }
        src={ productImg }
        alt="productsImage"
        height={ px }
        width={ px }
      />
      <p
        data-testid={ `customer_products__element-card-title-${id}` }
      >
        {productName}
      </p>
      <button
        data-testid={ `customer_products__button-card-rm-item-${id}` }
        type="button"
        onClick={ decrementProduct }
      >
        -
      </button>
      <input
        data-testid={ `customer_products__input-card-quantity-${id}` }
        type="number"
        value={ quantity }
      />
      <button
        data-testid={ `customer_products__button-card-add-item-${id}` }
        type="button"
        onClick={ incrementProduct }
      >
        +
      </button>
    </div>
  );
}

Card.propTypes = {
  id: PropTypes.number.isRequired,
  productImg: PropTypes.string.isRequired,
  productName: PropTypes.string.isRequired,
  productPrice: PropTypes.string.isRequired,
};

export default Card;
