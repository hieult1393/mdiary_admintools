import {
  CREATE_USER_ACCOUNT_SUCCESS,
  CREATE_USER_ACCOUNT_FAILURE,
} from './AccountAction';
import { compact, orderBy } from 'lodash';
const initialState = { data: [] };
const AccountReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_USER_ACCOUNT_SUCCESS:
      return { ...state, data: orderBy(compact(...state.data, action.payload, []),['id'], ['asc']), createUserAccountSuccess: true };
    case CREATE_USER_ACCOUNT_FAILURE:
      return { ...state, createUserAccountSuccess: false };
    default:
      return state;
  }
};
export const createUserAccountSuccessSelector = state => state.AccountReducer.createUserAccountSuccess;
export default AccountReducer;
