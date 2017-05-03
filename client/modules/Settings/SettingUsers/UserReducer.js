import { FETCH_USER_DATA_SUCCESS, FETCH_USER_DATA_FAILURE, GET_CURRENT_USER_DATA } from './UserAction';
import{ get, orderBy }from 'lodash';
const initialState = { data: [] };
const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_DATA_SUCCESS:
      return { ...state, data: get(action, 'payload', []), abc: 'success' };
    case FETCH_USER_DATA_FAILURE:
      return { ...state, abc: 'failure' };
    case GET_CURRENT_USER_DATA:
      return { ...state, currentUserData: get(action, 'payload', {}) };
    default:
      return state;
  }
};
export const userDataSelector = state => state.UserReducer.data;
export const fetchUserDataSelector = state => state.UserReducer.abc;
export const currentUserDataSelector = state => state.UserReducer.currentUserData;
export default UserReducer;
