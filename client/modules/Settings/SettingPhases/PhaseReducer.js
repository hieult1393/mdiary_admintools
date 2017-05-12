import {
  FETCH_PHASE_DATA_SUCCESS,
  CREATE_PHASE_SUCCESS,
  CREATE_PHASE_FAILURE,
  UPDATE_PHASE_SUCCESS,
  UPDATE_PHASE_FAILURE,
  DELETE_PHASE_SUCCESS,
  DELETE_PHASE_FAILURE,
  INIT_DATA_FOR_UPDATE_PHASE_FORM
} from './PhaseAction';
import { get, compact, orderBy, findIndex } from 'lodash';

const initialState = { data: [] };
const PhaseReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PHASE_DATA_SUCCESS:
      return { ...state, data: orderBy(get(action, 'payload', []), ['order'], ['asc']) };
    case CREATE_PHASE_SUCCESS:
      return {
        ...state,
        data: orderBy(compact([...state.data, action.payload]), ['order'], ['asc']),
        createPhaseSuccess: true,
      };
    case CREATE_PHASE_FAILURE:
      return { ...state, createPhaseSuccess: false };
    case UPDATE_PHASE_SUCCESS: {
      const phasesList = state.data;
      const index = findIndex(phasesList, phase => phase.id === action.payload.id);
      phasesList.splice(index, 1, action.payload);
      return { ...state, data: orderBy(phasesList, ['order'], ['asc']), updatePhaseSuccess: true };
    }
    case UPDATE_PHASE_FAILURE:
      return { ...state, updatePhaseSuccess: false };
    case DELETE_PHASE_SUCCESS:
      return {
        ...state,
        data: [...state.data.filter(phase => phase.id !== action.payload)],
        deletePhaseSuccess: true,
      };
    case DELETE_PHASE_FAILURE:
      return { ...state, deleteSuccess: false };
    case INIT_DATA_FOR_UPDATE_PHASE_FORM:
      return { ...state, initDataForUpdatePhaseForm: get(action, 'payload', {}) };
    case '@ReduxToastr/toastr/CLEAN':
      return { ...state, createPhaseSuccess: null, updatePhaseSuccess: null, deletePhaseSuccess: null };
    default:
      return state;
  }
};
export const phasesListSelector = state => state.PhaseReducer.data;
export const createPhaseSuccessSelector = state => state.PhaseReducer.createPhaseSuccess;
export const updatePhaseSuccessSelector = state => state.PhaseReducer.updatePhaseSuccess;
export const deletePhaseSuccessSelector = state => state.PhaseReducer.deletePhaseSuccess;
export const initDataForUpdatePhaseFormSelector = state => state.PhaseReducer.initDataForUpdatePhaseForm;
export default PhaseReducer;

