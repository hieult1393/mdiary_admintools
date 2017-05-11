import axios from 'axios';
import { attachTokenAxios } from '../../../util/setAuthorizationToken';
import config from '../../../../configs/config';

export const FETCH_PESTICIDE_DATA_SUCCESS = 'FETCH_PESTICIDE_DATA_SUCCESS';
export const CREATE_PESTICIDE_SUCCESS = 'CREATE_PESTICIDE_SUCCESS';
export const CREATE_PESTICIDE_FAILURE = 'CREATE_PESTICIDE_FAILURE';
export const UPDATE_PESTICIDE_SUCCESS = 'UPDATE_PESTICIDE_SUCCESS';
export const UPDATE_PESTICIDE_FAILURE = 'UPDATE_PESTICIDE_FAILURE';
export const DELETE_PESTICIDE_SUCCESS = 'DELETE_PESTICIDE_SUCCESS';
export const DELETE_PESTICIDE_FAILURE = 'DELETE_PESTICIDE_FAILURE';
export const INIT_DATA_FOR_UPDATE_PESTICIDE_FORM = 'INIT_DATA_FOR_UPDATE_PESTICIDE_FORM';

export function fetchPesticideData() {
  return (dispatch, getState) => {
    const url = `${config.api_url}api/pesticides/getAll`;
    const configs = {
      headers: attachTokenAxios(getState),
    };
    axios.get(url, configs)
      .then(response => {
        if (response.data.success) {
          dispatch({
            type: FETCH_PESTICIDE_DATA_SUCCESS,
            payload: response.data.payload
          })
        }
      })
  }
}

export function createPesticide(data) {
  return (dispatch, getState) => {
    const url = `${config.api_url}api/pesticides/create`;
    const params = data;
    const configs = {
      headers: attachTokenAxios(getState),
    };
    axios.post(url, params, configs)
      .then(response => {
        if (response.data.success) {
          dispatch({
            type: CREATE_PESTICIDE_SUCCESS,
            payload: response.data.payload
          })
        } else dispatch({
          type: CREATE_PESTICIDE_FAILURE,
          payload: {}
        })
      })
  }
}

export function updatePesticide(id, data) {
  return (dispatch, getState) => {
    const url = `${config.api_url}api/pesticides/update/${id}`;
    const params = data;
    const configs = {
      headers: attachTokenAxios(getState),
    };
    axios.put(url, params, configs)
      .then(response => {
        if (response.data.success) {
          dispatch({
            type: UPDATE_PESTICIDE_SUCCESS,
            payload: response.data.payload
          })
        } else dispatch({
          type: UPDATE_PESTICIDE_FAILURE,
          payload: {}
        })
      })
  }
}

export function deletePesticide(id) {
  return (dispatch, getState) => {
    const url = `${config.api_url}api/pesticides/delete/${id}`;
    const configs = {
      headers: attachTokenAxios(getState),
    };
    axios.delete(url, configs)
      .then(response => {
        if (response.data.success) {
          dispatch({
            type: DELETE_PESTICIDE_SUCCESS,
            payload: id
          })
        } else dispatch({
          type: DELETE_PESTICIDE_FAILURE,
          payload: {}
        })
      })
  }
}

export function initDataForUpdatePesticideForm(data) {
  return {
    type: INIT_DATA_FOR_UPDATE_PESTICIDE_FORM,
    payload: data,
  };
}
