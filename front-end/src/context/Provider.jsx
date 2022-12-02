import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import MyContext from './Context';

function Provider({ children }) {
  const [name, setName] = useState('');
  const [user, setUser] = useState('');
  const [getProducts, setGetProducts] = useState();

  const context = useMemo(() => ({
    name,
    setName,
    user,
    setUser,
    getProducts,
    setGetProducts,
  }), [name, user, getProducts]);
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
