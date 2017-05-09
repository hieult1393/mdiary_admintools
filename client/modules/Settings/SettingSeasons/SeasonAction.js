import axios from 'axios';
import { attachTokenAxios } from '../../../util/setAuthorizationToken';

export const FETCH_SEASON_DATA_SUCCESS = 'FETCH_SEASON_DATA_SUCCESS';
export const CREATE_SEASON_SUCCESS = 'CREATE_SEASON_SUCCESS';
export const CREATE_SEASON_FAILURE = 'CREATE_SEASON_FAILURE';
export const UPDATE_SEASON_SUCCESS = 'UPDATE_SEASON_SUCCESS';
export const UPDATE_SEASON_FAILURE = 'UPDATE_SEASON_FAILURE';
export const DELETE_SEASON_SUCCESS = 'DELETE_SEASON_SUCCESS';
export const DELETE_SEASON_FAILURE = 'DELETE_SEASON_FAILURE';
export const INIT_DATA_FOR_UPDATE_SEASON_FORM = 'INIT_DATA_FOR_UPDATE_SEASON_FORM';
import config from '../../../../configs/config';

export function fetchSeasonData(id) {
  return (dispatch, getState) => {
    const url = `${config.api_url}api/seasons/getAll`;
    const params = { element_id: id };
    const configs = {
      headers: attachTokenAxios(getState),
    };
    axios.post(url, params, configs)
      .then(response => {
        if (response.data.success) {
          dispatch({
            type: FETCH_SEASON_DATA_SUCCESS,
            payload: response.data.payload
          })
        }
      })
  }
}

export function createSeason(data) {
  return (dispatch, getState) => {
    const url = `${config.api_url}api/seasons/create`;
    const params = data;
    const configs = {
      headers: attachTokenAxios(getState),
    };
    axios.post(url, params, configs)
      .then(response => {
        if (response.data.success) {
          dispatch({
            type: CREATE_SEASON_SUCCESS,
            payload: response.data.payload
          })
        } else dispatch({
          type: CREATE_SEASON_FAILURE,
          payload: {}
        })
      })
  }
}

export function updateSeason(id, data) {
  return (dispatch, getState) => {
    const url = `${config.api_url}api/seasons/update/${id}`;
    const params = data;
    const configs = {
      headers: attachTokenAxios(getState),
    };
    axios.put(url, params, configs)
      .then(response => {
        if (response.data.success) {
          dispatch({
            type: UPDATE_SEASON_SUCCESS,
            payload: response.data.payload
          })
        } else dispatch({
          type: UPDATE_SEASON_FAILURE,
          payload: {}
        })
      })
  }
}

export function deleteSeason(id) {
  return (dispatch, getState) => {
    const url = `${config.api_url}api/seasons/delete/${id}`;
    const configs = {
      headers: attachTokenAxios(getState),
    };
    axios.delete(url, configs)
      .then(response => {
        if (response.data.success) {
          dispatch({
            type: DELETE_SEASON_SUCCESS,
            payload: id
          })
        } else dispatch({
          type: DELETE_SEASON_FAILURE,
          payload: {}
        })
      })
  }
}

export function initDataForUpdateSeasonForm(data) {
  return {
    type: INIT_DATA_FOR_UPDATE_SEASON_FORM,
    payload: data,
  };
}
