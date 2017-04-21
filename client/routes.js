import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './modules/App/App';
import Login from './modules/Login/containers/Login';
import UserIndex from './modules/Settings/SettingUsers/containers/UserIndex';
import UserCreate from './modules/Settings/SettingUsers/containers/UserCreate';
import AccountIndex from './modules/Settings/SettingAccounts/containers/AccountIndex';

if (typeof require.ensure !== 'function') {
  require.ensure = function requireModule(deps, callback) {
    callback(require);
  };
}

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Login}/>
    <Route path="/settingUser" component={UserIndex}/>
    <Route path="/settingUser/userCreate" component={UserCreate}/>
    <Route path="/settingAccount" component={AccountIndex}/>
  </Route>
);
