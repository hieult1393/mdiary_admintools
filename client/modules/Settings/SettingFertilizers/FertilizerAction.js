import axios from 'axios';
import { attachTokenAxios } from '../../../util/setAuthorizationToken';
import config from '../../../../configs/config';

export const FETCH_FERTILIZER_DATA_SUCCESS = 'FETCH_FERTILIZER_DATA_SUCCESS';
export const CREATE_FERTILIZER_SUCCESS = 'CREATE_FERTILIZER_SUCCESS';
export const CREATE_FERTILIZER_FAILURE = 'CREATE_FERTILIZER_FAILURE';
export const UPDATE_FERTILIZER_SUCCESS = 'UPDATE_FERTILIZER_SUCCESS';
export const UPDATE_FERTILIZER_FAILURE = 'UPDATE_FERTILIZER_FAILURE';
export const DELETE_FERTILIZER_SUCCESS = 'DELETE_FERTILIZER_SUCCESS';
export const DELETE_FERTILIZER_FAILURE = 'DELETE_FERTILIZER_FAILURE';
export const INIT_DATA_FOR_UPDATE_FERTILIZER_FORM = 'INIT_DATA_FOR_UPDATE_FERTILIZER_FORM';

export function fetchFertilizerData() {
  return (dispatch, getState) => {
    const url = `${config.api_url}api/fertilizers/getAll`;
    const configs = {
      headers: attachTokenAxios(getState),
    };
    axios.get(url, configs)
      .then(response => {
        if (response.data.success) {
          dispatch({
            type: FETCH_FERTILIZER_DATA_SUCCESS,
            payload: response.data.payload
          })
        }
      })
  }
}

export function createFertilizer(data) {
  return (dispatch, getState) => {
    const url = `${config.api_url}api/fertilizers/create`;
    const params = data;
    const configs = {
      headers: attachTokenAxios(getState),
    };
    axios.post(url, params, configs)
      .then(response => {
        if (response.data.success) {
          dispatch({
            type: CREATE_FERTILIZER_SUCCESS,
            payload: response.data.payload
          })
        } else dispatch({
          type: CREATE_FERTILIZER_FAILURE,
          payload: {}
        })
      })
  }
}

export function updateFertilizer(id, data) {
  return (dispatch, getState) => {
    const url = `${config.api_url}api/fertilizers/update/${id}`;
    const params = data;
    const configs = {
      headers: attachTokenAxios(getState),
    };
    axios.put(url, params, configs)
      .then(response => {
        if (response.data.success) {
          dispatch({
            type: UPDATE_FERTILIZER_SUCCESS,
            payload: response.data.payload
          })
        } else dispatch({
          type: UPDATE_FERTILIZER_FAILURE,
          payload: {}
        })
      })
  }
}

export function deleteFertilizer(id) {
  return (dispatch, getState) => {
    const url = `${config.api_url}api/fertilizers/delete/${id}`;
    const configs = {
      headers: attachTokenAxios(getState),
    };
    axios.delete(url, configs)
      .then(response => {
        if (response.data.success) {
          dispatch({
            type: DELETE_FERTILIZER_SUCCESS,
            payload: id
          })
        } else dispatch({
          type: DELETE_FERTILIZER_FAILURE,
          payload: {}
        })
      })
  }
}

export function initDataForUpdateFertilizerForm(data) {
  return {
    type: INIT_DATA_FOR_UPDATE_FERTILIZER_FORM,
    payload: data,
  };
}
