import {
  FETCH_ELEMENT_DATA_SUCCESS,
  CREATE_ELEMENT_SUCCESS,
  CREATE_ELEMENT_FAILURE,
  UPDATE_ELEMENT_SUCCESS,
  UPDATE_ELEMENT_FAILURE,
  DELETE_ELEMENT_SUCCESS,
  DELETE_ELEMENT_FAILURE,
  INIT_DATA_FOR_UPDATE_ELEMENT_FORM,
  GET_CURRENT_COLOR,
} from './ElementAction';

import { get, compact, orderBy, findIndex } from 'lodash';
const initialState = { data: [] };
const ElementReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ELEMENT_DATA_SUCCESS:
      return { ...state, data: orderBy(get(action, 'payload', []), ['id'], ['desc']) };
    case CREATE_ELEMENT_SUCCESS:
      return {
        ...state,
        data: orderBy(compact([...state.data, action.payload]), ['id'], ['desc']),
        createElementSuccess: true,
      };
    case CREATE_ELEMENT_FAILURE:
      return { ...state, createElementSuccess: false };
    case UPDATE_ELEMENT_SUCCESS: {
      const elementsList = state.data;
      const index = findIndex(elementsList, element => element.id === action.payload.id);
      elementsList.splice(index, 1, action.payload);
      return { ...state, data: orderBy(elementsList, ['id'], ['desc']), updateElementSuccess: true };
    }
    case UPDATE_ELEMENT_FAILURE:
      return { ...state, updateElementSuccess: false };
    case DELETE_ELEMENT_SUCCESS:
      return {
        ...state,
        data: [...state.data.filter(element => element.id !== action.payload)],
        deleteElementSuccess: true,
      };
    case DELETE_ELEMENT_FAILURE:
      return { ...state, deleteElementSuccess: false };
    case INIT_DATA_FOR_UPDATE_ELEMENT_FORM:
      return { ...state, initDataForUpdateElementForm: get(action, 'payload', {}) };
    case GET_CURRENT_COLOR:
      return { ...state, colorValue: action.payload };
    case '@ReduxToastr/toastr/CLEAN':
      return { ...state, createElementSuccess: null, updateElementSuccess: null, deleteElementSuccess: null };
    default:
      return state;
  }
};
export const elementsListSelector = state => state.ElementReducer.data;
export const createElementSuccessSelector = state => state.ElementReducer.createElementSuccess;
export const updateElementSuccessSelector = state => state.ElementReducer.updateElementSuccess;
export const deleteElementSuccessSelector = state => state.ElementReducer.deleteElementSuccess;
export const initDataForUpdateElementFormSelector = state => state.ElementReducer.initDataForUpdateElementForm;
export const colorValueSelector = state => state.ElementReducer.colorValue;
export default ElementReducer;
