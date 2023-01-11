import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Card from '../components/Card';
import ContextDelivery from '../context/Context';
import { getDataProducts } from '../services/requests';

function Product() {
  const [totalCart, setTotalCart] = useState(0);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const { push } = useHistory();
  const { getProducts, setGetProducts, cart } = useContext(ContextDelivery);

  const getFetchProducts = async () => {
    const productsEndpoint = await getDataProducts('/products');
    setGetProducts(productsEndpoint);
  };

  const sumDeliveryCart = () => {
    const sumCart = cart
      .reduce((acc, curr) => acc + Number(curr.totalValues), 0)
      .toFixed(2)
      .replace('.', ',');

    if (sumCart !== '0,00') {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
    setTotalCart(sumCart);
  };

  const handleClickCart = async (event) => {
    event.preventDefault();
    push('/customer/checkout');
  };

  useEffect(() => {
    sumDeliveryCart();
  }, [cart]);

  useEffect(() => {
    getFetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <NavBar />
      <div>
        <h1 style={ { margin: '50px' } }>CERVEJAS</h1>
      </div>
      <div className="card-group">
        <div className="row justify-content-center">
          { getProducts?.map((p, i) => (
            <Card
              key={ i }
              i={ i }
              className="col-2"
              productName={ p.name }
              productImg={ p.url_image }
              productPrice={ p.price }
              id={ p.id }
            />
          ))}
        </div>
      </div>
      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
        <button
          className="btn btn-primary"
          type="button"
          data-testid="customer_products__button-cart"
          disabled={ buttonDisabled }
          onClick={ handleClickCart }
        >
          Total
          <p
            className=""
            data-testid="customer_products__checkout-bottom-value"
          >
            {`R$ ${totalCart}`}
          </p>
        </button>
      </div>
    </div>
  );
}

export default Product;
