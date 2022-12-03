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
        <h1>CERVEJAS</h1>
      </div>
      <div>
        { getProducts?.map((p, i) => (
          <Card
            key={ i }
            i={ i }
            productName={ p.name }
            productImg={ p.url_image }
            productPrice={ p.price }
            id={ p.id }
          />
        )) }
      </div>
      <div>
        <button
          type="button"
          data-testid="customer_products__button-cart"
          disabled={ buttonDisabled }
          onClick={ handleClickCart }
        >
          <p
            data-testid="customer_products__checkout-bottom-value"
          >
            { totalCart }
          </p>
        </button>
      </div>
    </div>
  );
}

export default Product;
