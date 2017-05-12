import {
  FETCH_ACCOUNT_DATA,
  CREATE_ACCOUNT_SUCCESS,
  CREATE_ACCOUNT_FAILURE,
  UPDATE_ACCOUNT_SUCCESS,
  UPDATE_ACCOUNT_FAILURE,
  DELETE_ACCOUNT_SUCCESS,
  DELETE_ACCOUNT_FAILURE,
  INIT_DATA_FOR_UPDATE_ACCOUNT_FORM,
} from './AccountAction';
import { compact, orderBy, get, findIndex } from 'lodash';

const initialState = { data: [] };
const AccountReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ACCOUNT_DATA:
      return { ...state, data: orderBy(get(action, 'payload', []), ['id'], ['desc']) };
    case CREATE_ACCOUNT_SUCCESS:
      return {
        ...state,
        data: orderBy(compact([...state.data, action.payload]), ['id'], ['desc']),
        createAccountSuccess: true
      };
    case CREATE_ACCOUNT_FAILURE:
      return { ...state, createAccountSuccess: false };
    case UPDATE_ACCOUNT_SUCCESS: {
      const accountsList = state.data;
      const index = findIndex(accountsList, element => element.id === action.payload.id);
      accountsList.splice(index, 1, action.payload);
      return { ...state, data: orderBy(accountsList, ['id'], ['desc']), updateAccountSuccess: true };
    }
    case UPDATE_ACCOUNT_FAILURE:
      return { ...state, updateAccountSuccess: false };
    case DELETE_ACCOUNT_SUCCESS:
      return {
        ...state,
        data: [...state.data.filter(account => account.id !== action.payload)],
        deleteAccountSuccess: true,
      };
    case DELETE_ACCOUNT_FAILURE:
      return { ...state, deleteAccountSuccess: false };
    case INIT_DATA_FOR_UPDATE_ACCOUNT_FORM:
      return { ...state, initDataForUpdateAccountForm: get(action, 'payload', {}) };
    case '@ReduxToastr/toastr/CLEAN':
      return { ...state, createAccountSuccess: null, updateAccountSuccess: null, deleteAccountSuccess: null };
    default:
      return state;
  }
};
export const accountsListSelector = state => state.AccountReducer.data;
export const createAccountSuccessSelector = state => state.AccountReducer.createAccountSuccess;
export const updateAccountSuccessSelector = state => state.AccountReducer.updateAccountSuccess;
export const deleteAccountSuccessSelector = state => state.AccountReducer.deleteAccountSuccess;
export const initDataForUpdateAccountFormSelector = state => state.AccountReducer.initDataForUpdateAccountForm;
export default AccountReducer;
