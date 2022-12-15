import React from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Product from './pages/Product';
import Register from './pages/Register';
import Checkout from './pages/Checkout';
import OrdersDetails from './pages/OrdersDetails';
import Orders from './pages/Orders';
import SellerOrders from './pages/SellerOrder';
import OrdersSellerDetails from './pages/OrdersSellerDetails';

export default function App() {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
      <Route exact path="/login" component={ Login } />
      <Route exact path="/register" component={ Register } />
      <Route exact path="/customer/products" component={ Product } />
      <Route exact path="/customer/checkout" component={ Checkout } />
      <Route exact path="/customer/orders" component={ Orders } />
      <Route exact path="/customer/orders/:id" component={ OrdersDetails } />
      <Route exact path="/seller/orders" component={ SellerOrders } />
      <Route exact path="/seller/orders/:id" component={ OrdersSellerDetails } />
    </Switch>
  );
}
