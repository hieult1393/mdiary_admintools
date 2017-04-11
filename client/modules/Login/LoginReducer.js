import { get, compact, sortBy, findIndex, isEmpty } from 'lodash';
import {
  INIT_LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SET_USER_DATA,
  UPDATE_FARMER_SUCCESS,
  LOG_OUT,
  LOG_IN,
  SET_FAILURE_MESSAGE
} from './LoginActions';
import { REHYDRATE } from 'redux-persist/constants';

const initialState = { data: {} };
const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_LOGIN:
      return {
        ...state, data: {
          ...state.data, isLogin: false,
        }
      };
    case REHYDRATE:
      return {
        ...state, data: {
          ...state.data, user_from_store: get(action, 'payload.LoginReducer.data.user_from_store', {}),
        },
      };
    case LOGIN_SUCCESS :
      return {
        ...state, data: { ...state.data, user: get(action, 'payload', {}), loginFailMessage: false }
      };
    case LOGIN_FAILURE:
      return { ...state, loginFailMessage: action.payload };
    case SET_FAILURE_MESSAGE:
      return { ...state, message: action.payload };
    case SET_USER_DATA:
      return {
        ...state, data: {
          ...state.data, user: get(action, 'payload', {}), user_from_store: get(action, 'payload', {}),
        },
      };
    case UPDATE_FARMER_SUCCESS:
    {
      const userData = state.data.user ? state.data.user : state.data.user_from_store;
      userData.person = get(action, 'payload', {});
      return { ...state, data: { ...state.data, user: userData }, updateFarmerSuccess: true };
    }

    case LOG_OUT:
      return { ...state, data: {} };
    case LOG_IN:
      return {
        ...state, data: {
          ...state.data, isLogin: get(action.payload),
        },
      };
    case '@ReduxToastr/toastr/REMOVE':
      return { ...state, updateFarmerSuccess: null };
    default:
      return state;
  }
};

/*Selector*/
export const fetchUserDataSelector = state => state.LoginReducer.data.user;

export const isLoginSelector = state => get(state.LoginReducer.data.isLogin);
export const fetchUserSelector = state =>
  isEmpty(state.LoginReducer.data.user) ? get(state.LoginReducer.data, 'user_from_store', {}) : get(state.LoginReducer.data, 'user', {});
export const loginFailSelector = state => state.LoginReducer.loginFailMessage;
export default LoginReducer;
