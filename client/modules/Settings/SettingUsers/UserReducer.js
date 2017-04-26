import { FETCH_UD_SUCCESS, FETCH_UD_FAILURE } from './UserAction';
import{ get, orderBy }from 'lodash';
const initialState = { data: [] };
const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_UD_SUCCESS: {
      return { ...state, data: get(action, 'payload', []), abc: 'success' };
    }
    case FETCH_UD_FAILURE: {
      return { ...state, abc: 'failure' };
    }
    default:
      return state;
    
    
  }
};
export const userDataSelector = state => state.UserReducer.data;
export const fetchUserDataSelector = state => state.UserReducer.abc;
export default UserReducer;
