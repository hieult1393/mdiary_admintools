import {
  FETCH_STANDARD_DATA_SUCCESS,
  CREATE_STANDARD_SUCCESS,
  CREATE_STANDARD_FAILURE,
  UPDATE_STANDARD_SUCCESS,
  UPDATE_STANDARD_FAILURE,
  DELETE_STANDARD_SUCCESS,
  DELETE_STANDARD_FAILURE,
  INIT_DATA_FOR_UPDATE_STANDARD_FORM,
} from './StandardAction';

import { get, compact, orderBy, findIndex } from 'lodash';
const initialState = { data: [] };
const StandardReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STANDARD_DATA_SUCCESS:
      return { ...state, data: orderBy(get(action, 'payload', []), ['id'], ['asc']) };
    case CREATE_STANDARD_SUCCESS:
      return {
        ...state,
        data: orderBy(compact([...state.data, action.payload]), ['id'], ['asc']),
        createStandardSuccess: true,
      };
    case CREATE_STANDARD_FAILURE:
      return { ...state, createStandardSuccess: false };
    case UPDATE_STANDARD_SUCCESS: {
      const standardsList = state.data;
      const index = findIndex(standardsList, element => element.id === action.payload.id);
      standardsList.splice(index, 1, action.payload);
      return { ...state, data: orderBy(standardsList, ['id'], ['asc']), updateStandardSuccess: true };
    }
    case UPDATE_STANDARD_FAILURE:
      return { ...state, updateStandardSuccess: false };
    case DELETE_STANDARD_SUCCESS:
      return {
        ...state,
        data: [...state.data.filter(element => element.id !== action.payload)],
        deleteStandardSuccess: true,
      };
    case DELETE_STANDARD_FAILURE:
      return { ...state, deleteStandardSuccess: false };
    case INIT_DATA_FOR_UPDATE_STANDARD_FORM:
      return { ...state, initDataForUpdateStandardForm: get(action, 'payload', {}) };
    case '@ReduxToastr/toastr/CLEAN':
      return { ...state, createStandardSuccess: null, updateStandardSuccess: null, deleteStandardSuccess: null };
    default:
      return state;
  }
};
export const standardsListSelector = state => state.StandardReducer.data;
export const createStandardSuccessSelector = state => state.StandardReducer.createStandardSuccess;
export const updateStandardSuccessSelector = state => state.StandardReducer.updateStandardSuccess;
export const deleteStandardSuccessSelector = state => state.StandardReducer.deleteStandardSuccess;
export const initDataForUpdateStandardFormSelector = state => state.StandardReducer.initDataForUpdateStandardForm;
export default StandardReducer;
