import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import MyContext from './Context';

function Provider({ children }) {
  const [name, setName] = useState('');
  const [user, setUser] = useState('');
  const [getProducts, setGetProducts] = useState();
  const [cart, setCart] = useState(JSON
    .parse(localStorage.getItem('deliveryCart')) || []);
  const [orderDetail, setOrderDetail] = useState([]);

  const context = useMemo(() => ({
    name,
    setName,
    user,
    setUser,
    getProducts,
    setGetProducts,
    cart,
    setCart,
    orderDetail,
    setOrderDetail,
  }), [name, user, getProducts, cart, orderDetail]);
  return (
    <MyContext.Provider value={ context }>
      { children }
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default Provider;
