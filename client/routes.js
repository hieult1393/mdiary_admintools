import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './modules/App/App';
import Login from './modules/Login/containers/Login';
import UserIndex from './modules/Settings/SettingUsers/containers/UserIndex';
import UserCreate from './modules/Settings/SettingUsers/containers/UserCreate';
import UserUpdate from './modules/Settings/SettingUsers/containers/UserUpdate';
import AccountIndex from './modules/Settings/SettingAccounts/containers/AccountIndex';
import AccountCreate from './modules/Settings/SettingAccounts/containers/AccountCreate';
import AccountUpdate from './modules/Settings/SettingAccounts/containers/AccountUpdate';
import ConnectionIndex from './modules/Settings/SettingConnections/containers/ConnectionIndex';
import ConnectionCreate from './modules/Settings/SettingConnections/containers/ConnectionCreate';
import ConnectionUpdate from './modules/Settings/SettingConnections/containers/ConnectionUpdate';
import ElementIndex from './modules/Settings/SettingElements/containers/ElementIndex';
import ElementCreate from './modules/Settings/SettingElements/containers/ElementCreate';
import ElementUpdate from './modules/Settings/SettingElements/containers/ElementUpdate';
import SeasonIndex from './modules/Settings/SettingSeasons/containers/SeasonIndex';
import SeasonCreate from './modules/Settings/SettingSeasons/containers/SeasonCreate';
import SeasonUpdate from './modules/Settings/SettingSeasons/containers/SeasonUpdate';
import PhaseIndex from './modules/Settings/SettingPhases/containers/PhaseIndex';
import PhaseCreate from './modules/Settings/SettingPhases/containers/PhaseCreate';
import PhasesUpdate from './modules/Settings/SettingPhases/containers/PhasesUpdate';
import StandardIndex from './modules/Settings/SettingStandards/containers/StandardIndex';
import StandardCreate from './modules/Settings/SettingStandards/containers/StandardCreate';
import StandardUpdate from './modules/Settings/SettingStandards/containers/StandardUpdate';
import PesticideIndex from './modules/Settings/SettingPesticides/containers/PesticideIndex';
import PesticideCreate from './modules/Settings/SettingPesticides/containers/PesticideCreate';
import PesticideUpdate from './modules/Settings/SettingPesticides/containers/PesticideUpdate';
import FertilizerIndex from './modules/Settings/SettingFertilizers/containers/FertilizerIndex';
import FertilizerCreate from './modules/Settings/SettingFertilizers/containers/FertilizerCreate';
import FertilizerUpdate from './modules/Settings/SettingFertilizers/containers/FertilizerUpdate';

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
    <Route path="/settingUser/update" component={UserUpdate}/>
    <Route path="/settingAccount" component={AccountIndex}/>
    <Route path="/settingAccount/create" component={AccountCreate}/>
    <Route path="/settingAccount/update" component={AccountUpdate}/>
    <Route path="/settingConnection" component={ConnectionIndex}/>
    <Route path="/settingConnection/create" component={ConnectionCreate}/>
    <Route path="/settingConnection/update" component={ConnectionUpdate}/>
    <Route path="/settingElement" component={ElementIndex}/>
    <Route path="/settingElement/create" component={ElementCreate}/>
    <Route path="/settingElement/update" component={ElementUpdate}/>
    <Route path="/settingSeason/:elementId" component={SeasonIndex}/>
    <Route path="/settingSeason/:elementId/create" component={SeasonCreate}/>
    <Route path="/settingSeason/:elementId/update" component={SeasonUpdate}/>
    <Route path="/settingSeason/:elementId/settingPhase/:seasonId" component={PhaseIndex}/>
    <Route path="/settingSeason/:elementId/settingPhase/:seasonId/create" component={PhaseCreate}/>
    <Route path="/settingSeason/:elementId/settingPhase/:seasonId/update" component={PhasesUpdate}/>
    <Route path="/settingStandard" component={StandardIndex}/>
    <Route path="/settingStandard/create" component={StandardCreate}/>
    <Route path="/settingStandard/update" component={StandardUpdate}/>
    <Route path="/settingPesticide" component={PesticideIndex}/>
    <Route path="/settingPesticide/create" component={PesticideCreate}/>
    <Route path="/settingPesticide/update" component={PesticideUpdate}/>
    <Route path="/settingFertilizer" component={FertilizerIndex}/>
    <Route path="/settingFertilizer/create" component={FertilizerCreate}/>
    <Route path="/settingFertilizer/update" component={FertilizerUpdate}/>

  </Route>
);


