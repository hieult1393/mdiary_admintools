import {
  FETCH_PESTICIDE_DATA_SUCCESS,
  CREATE_PESTICIDE_SUCCESS,
  CREATE_PESTICIDE_FAILURE,
  UPDATE_PESTICIDE_SUCCESS,
  UPDATE_PESTICIDE_FAILURE,
  DELETE_PESTICIDE_SUCCESS,
  DELETE_PESTICIDE_FAILURE,
  INIT_DATA_FOR_UPDATE_PESTICIDE_FORM,
} from './PesticideAction';

import { get, compact, orderBy, findIndex } from 'lodash';
const initialState = { data: [] };
const PesticideReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PESTICIDE_DATA_SUCCESS:
      return { ...state, data: orderBy(get(action, 'payload', []), ['id'], ['desc']) };
    case CREATE_PESTICIDE_SUCCESS:
      return {
        ...state,
        data: orderBy(compact([...state.data, action.payload]), ['id'], ['desc']),
        createPesticideSuccess: true,
      };
    case CREATE_PESTICIDE_FAILURE:
      return { ...state, createPesticideSuccess: false };
    case UPDATE_PESTICIDE_SUCCESS: {
      const pesticidesList = state.data;
      const index = findIndex(pesticidesList, element => element.id === action.payload.id);
      pesticidesList.splice(index, 1, action.payload);
      return { ...state, data: orderBy(pesticidesList, ['id'], ['desc']), updatePesticideSuccess: true };
    }
    case UPDATE_PESTICIDE_FAILURE:
      return { ...state, updatePesticideSuccess: false };
    case DELETE_PESTICIDE_SUCCESS:
      return {
        ...state,
        data: [...state.data.filter(element => element.id !== action.payload)],
        deletePesticideSuccess: true,
      };
    case DELETE_PESTICIDE_FAILURE:
      return { ...state, deletePesticideSuccess: false };
    case INIT_DATA_FOR_UPDATE_PESTICIDE_FORM:
      return { ...state, initDataForUpdatePesticideForm: get(action, 'payload', {}) };
    case '@ReduxToastr/toastr/CLEAN':
      return { ...state, createPesticideSuccess: null, updatePesticideSuccess: null, deletePesticideSuccess: null };
    default:
      return state;
  }
};
export const pesticidesListSelector = state => state.PesticideReducer.data;
export const createPesticideSuccessSelector = state => state.PesticideReducer.createPesticideSuccess;
export const updatePesticideSuccessSelector = state => state.PesticideReducer.updatePesticideSuccess;
export const deletePesticideSuccessSelector = state => state.PesticideReducer.deletePesticideSuccess;
export const initDataForUpdatePesticideFormSelector = state => state.PesticideReducer.initDataForUpdatePesticideForm;
export default PesticideReducer;
