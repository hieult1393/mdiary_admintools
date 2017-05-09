import {
  FETCH_USER_DATA_SUCCESS,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
  INIT_DATA_FOR_UPDATE_USER_FORM,
  GET_CURRENT_USER_DATA,
  GET_USER_TYPE,
} from './UserAction';
import{ get, orderBy }from 'lodash';

const initialState = { data: [] };
const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_DATA_SUCCESS:
      return { ...state, data: get(action, 'payload', []) };
    case GET_CURRENT_USER_DATA:
      return { ...state, currentUserData: get(action, 'payload', {}) };
    case GET_USER_TYPE :
      return { ...state, userType: action.payload };
    default:
      return state;
  }
};
export const usersListSelector = state => state.UserReducer.data;
export const currentUserDataSelector = state => state.UserReducer.currentUserData;
export const userTypeSelector = state => state.UserReducer.userType;
export default UserReducer;
