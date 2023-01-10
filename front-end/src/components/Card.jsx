import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import ContextDelivery from '../context/Context';
import { setLocalCart } from '../services/localStorage';

function Card({ id, productImg, productName, productPrice, i }) {
  const [quantity, setQuantity] = useState(0);
  const { cart, setCart } = useContext(ContextDelivery);
  const px = '95px';

  const getToLocalCart = (qttyProducts) => {
    const qttyProductAtt = Number(qttyProducts);
    const objProduct = {
      id, name: productName, urlImage: productImg, price: productPrice,
    };
    const haveProduct = cart.find((obj) => objProduct.id === obj.id);

    if (!haveProduct && qttyProductAtt > 0) {
      setCart([...cart, { ...objProduct,
        quantity: qttyProductAtt,
        totalValues: (qttyProductAtt * Number(objProduct.price)).toFixed(2) }]);
    }

    if (haveProduct) {
      setCart(
        cart.map((obj) => (obj.id === objProduct.id
          ? { ...haveProduct,
            quantity: qttyProductAtt,
            totalValues: (qttyProductAtt * Number(objProduct.price)).toFixed(2) } : obj)),
      );
    }

    if (qttyProductAtt === 0) {
      const deleteProduct = cart.filter((prod) => prod.id !== objProduct.id);
      setCart([...deleteProduct]);
    }

    setLocalCart(cart);
  };

  const handleChangeInput = ({ target: { value } }) => {
    let qttyUpdate = Number(value);
    if (Number(value) < 0 || Number.isNaN(Number(value))) {
      qttyUpdate = 0;
    }
    setQuantity(qttyUpdate);
    getToLocalCart(qttyUpdate);
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

  const incrementProduct = () => {
    setQuantity((pState) => pState + 1);
    getToLocalCart(quantity + 1);
  };

  const decrementProduct = () => {
    setQuantity((pState) => (pState - 1 < 0 ? 0 : pState - 1));
    getToLocalCart(quantity - 1);
  };

  return (
    <div className="card" style={ { width: '18rem' } }>
      <img
        className="card-img-top"
        data-testid={ `customer_products__img-card-bg-image-${id}` }
        src={ productImg }
        alt="productsImage"
        width={ px }
      />
      <div className="card-body">
        <h5
          className="card-title"
          data-testid={ `customer_products__element-card-title-${id}` }
        >
          {productName}
        </h5>
        <p
          className="card-text"
          data-testid={ `customer_products__element-card-price-${id}` }
          key={ id }
        >
          { `R$ ${productPrice.replace('.', ',')}` }
        </p>
        <div className="input-group mb-3">
          <button
            className="btn btn-primary"
            data-testid={ `customer_products__button-card-rm-item-${id}` }
            name={ id }
            type="button"
            value={ productPrice }
            onClick={ decrementProduct }
          >
            -
          </button>
          <input
            className="form-control"
            data-testid={ `customer_products__input-card-quantity-${id}` }
            id={ productPrice }
            name={ productName }
            value={ quantity }
            onChange={ (event) => handleChangeInput(event) }
            type="text"
          />
          <button
            className="btn btn-primary"
            data-testid={ `customer_products__button-card-add-item-${id}` }
            name={ id }
            id={ i }
            type="button"
            value={ productPrice }
            onClick={ incrementProduct }
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

Card.propTypes = {
  id: PropTypes.number.isRequired,
  productImg: PropTypes.string.isRequired,
  productName: PropTypes.string.isRequired,
  productPrice: PropTypes.string.isRequired,
  i: PropTypes.number.isRequired,
};

export default Card;
