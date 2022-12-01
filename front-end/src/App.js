import React from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';

export default function App() {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
      <Route exact path="/login" component={ Login } />
    </Switch>
  );
}
