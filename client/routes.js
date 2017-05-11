import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './modules/App/App';
import Login from './modules/Login/containers/Login';
import UserIndex from './modules/Settings/SettingUsers/containers/UserIndex';
import UserCreate from './modules/Settings/SettingUsers/containers/UserCreate';
import AccountIndex from './modules/Settings/SettingAccounts/containers/AccountIndex';
import AccountCreate from './modules/Settings/SettingAccounts/containers/AccountCreate';
import UserUpdate from './modules/Settings/SettingUsers/containers/UserUpdate';
import ElementIndex from './modules/Settings/SettingElements/containers/ElementIndex';
import ElementCreate from './modules/Settings/SettingElements/containers/ElementCreate';
import ElementUpdate from './modules/Settings/SettingElements/containers/ElementUpdate';
import SeasonIndex from './modules/Settings/SettingSeasons/containers/SeasonIndex';
import SeasonCreate from './modules/Settings/SettingSeasons/containers/SeasonCreate';
import SeasonUpdate from './modules/Settings/SettingSeasons/containers/SeasonUpdate';
import PhaseIndex from './modules/Settings/SettingPhases/containers/PhaseIndex';
import PhaseCreate from './modules/Settings/SettingPhases/containers/PhaseCreate';
import PhasesUpdate from './modules/Settings/SettingPhases/containers/PhasesUpdate';

if (typeof require.ensure !== 'function') {
  require.ensure = function requireModule(deps, callback) {
    callback(require);
  };
}

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Login}/>
    <Route path="/settingUser" component={UserIndex}/>
    <Route path="/settingUser/create" component={UserCreate}/>
    <Route path="/settingAccount" component={AccountIndex}/>
    <Route path="/settingAccount/create" component={AccountCreate}/>
    <Route path="/settingUser/update" component={UserUpdate}/>
    <Route path="/settingElement" component={ElementIndex}/>
    <Route path="/settingElement/create" component={ElementCreate}/>
    <Route path="/settingElement/update" component={ElementUpdate}/>
    <Route path="/settingSeason/:elementId" component={SeasonIndex}/>
    <Route path="/settingSeason/:elementId/create" component={SeasonCreate}/>
    <Route path="/settingSeason/:elementId/update" component={SeasonUpdate}/>
    <Route path="/settingSeason/:elementId/settingPhase/:seasonId" component={PhaseIndex}/>
    <Route path="/settingSeason/:elementId/settingPhase/:seasonId/create" component={PhaseCreate}/>
    <Route path="/settingSeason/:elementId/settingPhase/:seasonId/update" component={PhasesUpdate}/>
  </Route>
);
