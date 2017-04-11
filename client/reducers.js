import { combineReducers } from 'redux';
import { reducers as apiReducers } from 'redux-api-call';
import { reducer as formReducer } from 'redux-form';
import { reducer as toastrReducer } from 'react-redux-toastr';
import { routerReducer } from 'react-router-redux';
// Import Reducers
import LoginReducer from './modules/Login/LoginReducer';
import AppReducer from './modules/App/AppReducer';

const rootReducer = combineReducers({
  LoginReducer,
  AppReducer,
  routing: routerReducer,
  form: formReducer,
  toastr: toastrReducer,
  ...apiReducers,
});
export default rootReducer;
