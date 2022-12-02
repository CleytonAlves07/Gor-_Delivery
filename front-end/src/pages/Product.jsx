import React, { useEffect, useContext } from 'react';
import NavBar from '../components/NavBar';
import Card from '../components/Card';
import ContextDelivery from '../context/Context';
import { getDataProducts } from '../services/requests';

function Product() {
  const { getProducts, setGetProducts } = useContext(ContextDelivery);

  const getFetchProducts = async () => {
    const productsEndpoint = await getDataProducts('/products');
    setGetProducts(productsEndpoint);
  };

  useEffect(() => {
    getFetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <NavBar />
      <div>
        <p>APAREÇA PRODUTOS</p>
      </div>
      <div>
        { getProducts?.map((p, i) => (
          <Card
            key={ i }
            index={ i }
            productName={ p.name }
            productImg={ p.url_image }
            productPrice={ p.price }
            id={ p.id }
          />
        )) }
      </div>
    </div>
  );
}

export default Product;
