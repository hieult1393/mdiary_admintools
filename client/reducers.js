import { combineReducers } from 'redux';
import { reducers as apiReducers } from 'redux-api-call';
import { reducer as formReducer } from 'redux-form';
import { reducer as toastrReducer } from 'react-redux-toastr';
import { routerReducer } from 'react-router-redux';
// Import Reducers
import LoginReducer from './modules/Login/LoginReducer';
import AppReducer from './modules/App/AppReducer';
import UserReducer from './modules/Settings/SettingUsers/UserReducer';
import ElementReducer from './modules/Settings/SettingElements/ElementReducer';
import SeasonReducer from './modules/Settings/SettingSeasons/SeasonReducer';
import PhaseReducer from './modules/Settings/SettingPhases/PhaseReducer';

const rootReducer = combineReducers({
  LoginReducer,
  AppReducer,
  UserReducer,
  ElementReducer,
  SeasonReducer,
  PhaseReducer,
  routing: routerReducer,
  form: formReducer,
  toastr: toastrReducer,
  ...apiReducers,
});
export default rootReducer;
