import {
  FETCH_CONNECTION_DATA_SUCCESS,
  CREATE_CONNECTION_SUCCESS,
  CREATE_CONNECTION_FAILURE,
  UPDATE_CONNECTION_SUCCESS,
  UPDATE_CONNECTION_FAILURE,
  DELETE_CONNECTION_SUCCESS,
  DELETE_CONNECTION_FAILURE,
  INIT_DATA_FOR_UPDATE_CONNECTION_FORM,
} from './ConnectionAction';
import { get, orderBy, compact, findIndex } from 'lodash';

const initialState = { data: [] };
const ConnectionReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CONNECTION_DATA_SUCCESS:
      return { ...state, data: orderBy(get(action, 'payload', []), ['id'], ['desc']) };
    case CREATE_CONNECTION_SUCCESS:
      return { ...state, data: orderBy(compact(...state.data, action.payload), ['id'], ['desc']), createConnectionSuccess: true };
    case CREATE_CONNECTION_FAILURE:
      return { ...state, createConnectionSuccess: false };
    case UPDATE_CONNECTION_SUCCESS: {
      const connectionsList = state.data;
      const index = findIndex(connectionsList, connection => connection.id === action.payload.id);
      connectionsList.splice(index, 1, action.payload);
      return { ...state, data: orderBy(connectionsList, ['id'], ['desc']), updateConnectionSuccess: true };
    }
    case UPDATE_CONNECTION_FAILURE:
      return { ...state, updateConnectionSuccess: false };
    case DELETE_CONNECTION_SUCCESS:
      return {
        ...state,
        data: [...state.data.filter(connection => connection.id !== action.payload)],
        deleteConnectionSuccess: true,
      };
    case DELETE_CONNECTION_FAILURE:
      return { ...state, deleteConnectionSuccess: false };
    case INIT_DATA_FOR_UPDATE_CONNECTION_FORM:
      return { ...state, initDataForUpdateConnectionForm: get(action, 'payload', {}) };
    case '@ReduxToastr/toastr/CLEAN':
      return { ...state, createConnectionSuccess: null, updateConnectionSuccess: null, deleteConnectionSuccess: null };
    default:
      return state;

  }
};
export const connectionsListSelector = state => state.ConnectionReducer.data;
export const createConnectionSuccessSelector = state => state.ConnectionReducer.createConnectionSuccess;
export const updateConnectionSuccessSelector = state => state.ConnectionReducer.updateConnectionSuccess;
export const deleteConnectionSuccessSelector = state => state.ConnectionReducer.deleteConnectionSuccess;
export const initDataForUpdateConnectionFormSelector = state => state.ConnectionReducer.initDataForUpdateConnectionForm;
export default ConnectionReducer;
