import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './modules/App/App';
import Login from './modules/Login/Login';
import AdminHomePage from './modules/Admin/HomePage';

if (typeof require.ensure !== 'function') {
  require.ensure = function requireModule(deps, callback) {
    callback(require);
  };
}

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Login}/>
    <Route path="/admin" component={AdminHomePage}/>
  </Route>
);
