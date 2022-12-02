import React from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Product from './pages/Product';
import Register from './pages/Register';

export default function App() {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
      <Route exact path="/login" component={ Login } />
      <Route path="/register" component={ Register } />
      <Route path="/customer/products" component={ Product } />
    </Switch>
  );
}
