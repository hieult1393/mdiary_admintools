import {
  FETCH_USER_DATA_SUCCESS,
  CREATE_FARMER_SUCCESS,
  CREATE_FARMER_FAILURE,
  CREATE_BUYER_SUCCESS,
  CREATE_BUYER_FAILURE,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
  INIT_DATA_FOR_UPDATE_USER_FORM,
  GET_CURRENT_USER_DATA,
  GET_USER_TYPE,
} from './UserAction';
import{ get, orderBy, compact }from 'lodash';

const initialState = { data: [] };
const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_DATA_SUCCESS:
      return { ...state, data: get(action, 'payload', []) };
    case GET_CURRENT_USER_DATA:
      return { ...state, currentUserData: get(action, 'payload', {}) };
    case GET_USER_TYPE :
      return { ...state, userType: action.payload };
    case CREATE_FARMER_SUCCESS:
      return {
        ...state,
        data: orderBy(compact([...state.data, action.payload]), ['id'], ['desc']),
        createUserSuccess: true,
      };
    case CREATE_FARMER_FAILURE:
      return { ...state, createUserSuccess: false };
    case CREATE_BUYER_SUCCESS:
      return {
        ...state,
        data: orderBy(compact([...state.data, action.payload]), ['id'], ['desc']),
        createUserSuccess: true,
      };
    case CREATE_BUYER_FAILURE:
      return { ...state, createUserSuccess: false };
    default:
      return state;
  }
};
export const usersListSelector = state => state.UserReducer.data;
export const currentUserDataSelector = state => state.UserReducer.currentUserData;
export const userTypeSelector = state => state.UserReducer.userType;
export const createUserSuccessSelector = state => state.UserReducer.createUserSuccess;
export default UserReducer;
