import {
  FETCH_SEASON_DATA_SUCCESS,
  CREATE_SEASON_SUCCESS,
  CREATE_SEASON_FAILURE,
  UPDATE_SEASON_SUCCESS,
  UPDATE_SEASON_FAILURE,
  DELETE_SEASON_SUCCESS,
  DELETE_SEASON_FAILURE,
  INIT_DATA_FOR_UPDATE_SEASON_FORM
} from './SeasonAction';
import { get, compact, orderBy, findIndex } from 'lodash';

const initialState = { data: [] };
const SeasonReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SEASON_DATA_SUCCESS:
      return { ...state, data: orderBy(get(action, 'payload', []), ['order'], ['asc']) };
    case CREATE_SEASON_SUCCESS:
      return {
        ...state,
        data: orderBy(compact([...state.data, action.payload]), ['order'], ['asc']),
        createSeasonSuccess: true,
      };
    case CREATE_SEASON_FAILURE:
      return { ...state, createSeasonSuccess: false };
    case UPDATE_SEASON_SUCCESS: {
      const seasonsList = state.data;
      const index = findIndex(seasonsList, season => season.id === action.payload.id);
      seasonsList.splice(index, 1, action.payload);
      return { ...state, data: orderBy(seasonsList, ['order'], ['asc']), updateSeasonSuccess: true };
    }
    case UPDATE_SEASON_FAILURE:
      return { ...state, updateSeasonSuccess: false };
    case DELETE_SEASON_SUCCESS:
      return {
        ...state,
        data: [...state.data.filter(season => season.id !== action.payload)],
        deleteSeasonSuccess: true,
      };
    case DELETE_SEASON_FAILURE:
      return { ...state, deleteSuccess: false };
    case INIT_DATA_FOR_UPDATE_SEASON_FORM:
      return { ...state, initDataForUpdateSeasonForm: action.payload };
    case '@ReduxToastr/toastr/CLEAN':
      return { ...state, createSeasonSuccess: null, updateSeasonSuccess: null, deleteSeasonSuccess: null };
    default:
      return state;
  }
};
export const seasonsListSelector = state => state.SeasonReducer.data;
export const createSeasonSuccessSelector = state => state.SeasonReducer.createSeasonSuccess;
export const updateSeasonSuccessSelector = state => state.SeasonReducer.updateSeasonSuccess;
export const deleteSeasonSuccessSelector = state => state.SeasonReducer.deleteSeasonSuccess;
export const initDataForUpdateSeasonFormSelector = state => state.SeasonReducer.initDataForUpdateSeasonForm;
export default SeasonReducer;

