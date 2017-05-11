import {
  FETCH_FERTILIZER_DATA_SUCCESS,
  CREATE_FERTILIZER_SUCCESS,
  CREATE_FERTILIZER_FAILURE,
  UPDATE_FERTILIZER_SUCCESS,
  UPDATE_FERTILIZER_FAILURE,
  DELETE_FERTILIZER_SUCCESS,
  DELETE_FERTILIZER_FAILURE,
  INIT_DATA_FOR_UPDATE_FERTILIZER_FORM,
} from './FertilizerAction';

import { get, compact, orderBy, findIndex } from 'lodash';
const initialState = { data: [] };
const FertilizerReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FERTILIZER_DATA_SUCCESS:
      return { ...state, data: orderBy(get(action, 'payload', []), ['id'], ['desc']) };
    case CREATE_FERTILIZER_SUCCESS:
      return {
        ...state,
        data: orderBy(compact([...state.data, action.payload]), ['id'], ['desc']),
        createFertilizerSuccess: true,
      };
    case CREATE_FERTILIZER_FAILURE:
      return { ...state, createFertilizerSuccess: false };
    case UPDATE_FERTILIZER_SUCCESS: {
      const fertilizersList = state.data;
      const index = findIndex(fertilizersList, element => element.id === action.payload.id);
      fertilizersList.splice(index, 1, action.payload);
      return { ...state, data: orderBy(fertilizersList, ['id'], ['desc']), updateFertilizerSuccess: true };
    }
    case UPDATE_FERTILIZER_FAILURE:
      return { ...state, updateFertilizerSuccess: false };
    case DELETE_FERTILIZER_SUCCESS:
      return {
        ...state,
        data: [...state.data.filter(element => element.id !== action.payload)],
        deleteFertilizerSuccess: true,
      };
    case DELETE_FERTILIZER_FAILURE:
      return { ...state, deleteFertilizerSuccess: false };
    case INIT_DATA_FOR_UPDATE_FERTILIZER_FORM:
      return { ...state, initDataForUpdateFertilizerForm: get(action, 'payload', {}) };
    case '@ReduxToastr/toastr/CLEAN':
      return { ...state, createFertilizerSuccess: null, updateFertilizerSuccess: null, deleteFertilizerSuccess: null };
    default:
      return state;
  }
};
export const fertilizersListSelector = state => state.FertilizerReducer.data;
export const createFertilizerSuccessSelector = state => state.FertilizerReducer.createFertilizerSuccess;
export const updateFertilizerSuccessSelector = state => state.FertilizerReducer.updateFertilizerSuccess;
export const deleteFertilizerSuccessSelector = state => state.FertilizerReducer.deleteFertilizerSuccess;
export const initDataForUpdateFertilizerFormSelector = state => state.FertilizerReducer.initDataForUpdateFertilizerForm;
export default FertilizerReducer;
