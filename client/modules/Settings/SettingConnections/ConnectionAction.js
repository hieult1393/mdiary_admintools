import axios from 'axios';
import { attachTokenAxios } from '../../../util/setAuthorizationToken';
import config from '../../../../configs/config';

export const FETCH_CONNECTION_DATA_SUCCESS = 'FETCH_CONNECTION_DATA_SUCCESS';
export const CREATE_CONNECTION_SUCCESS = 'CREATE_CONNECTION_SUCCESS';
export const CREATE_CONNECTION_FAILURE = 'CREATE_CONNECTION_FAILURE';
export const UPDATE_CONNECTION_SUCCESS = 'UPDATE_CONNECTION_SUCCESS';
export const UPDATE_CONNECTION_FAILURE = 'UPDATE_CONNECTION_FAILURE';
export const DELETE_CONNECTION_SUCCESS = 'DELETE_CONNECTION_SUCCESS';
export const DELETE_CONNECTION_FAILURE = 'DELETE_CONNECTION_FAILURE';
export const INIT_DATA_FOR_UPDATE_CONNECTION_FORM = 'INIT_DATA_FOR_UPDATE_CONNECTION_FORM';

export function fetchConnectionData() {
  return (dispatch, getState) => {
    const url = `${config.api_url}api/connections/getAll`;
    const configs = {
      headers: attachTokenAxios(getState),
    };
    axios.get(url, configs)
      .then(response => {
        if (response.data.success) {
          dispatch({
            type: FETCH_CONNECTION_DATA_SUCCESS,
            payload: response.data.payload
          })
        }
      })
  }
}

export function createConnection(data) {
  return (dispatch, getState) => {
    const url = `${config.api_url}api/connections/create`;
    const params = data;
    const configs = {
      headers: attachTokenAxios(getState),
    };
    axios.post(url, params, configs)
      .then(response => {
        if (response.data.success) {
          dispatch({
            type: CREATE_CONNECTION_SUCCESS,
            payload: response.data.payload
          })
        } else dispatch({
          type: CREATE_CONNECTION_FAILURE,
          payload: {}
        })
      })
  }
}

export function updateConnection(id, data) {
  return (dispatch, getState) => {
    const url = `${config.api_url}api/connections/update/${id}`;
    const params = data;
    const configs = {
      headers: attachTokenAxios(getState),
    };
    axios.put(url, params, configs)
      .then(response => {
        if (response.data.success) {
          dispatch({
            type: UPDATE_CONNECTION_SUCCESS,
            payload: response.data.payload
          })
        } else dispatch({
          type: UPDATE_CONNECTION_FAILURE,
          payload: {}
        })
      })
  }
}

export function deleteConnection(id) {
  return (dispatch, getState) => {
    const url = `${config.api_url}api/connections/delete/${id}`;
    const configs = {
      headers: attachTokenAxios(getState),
    };
    axios.delete(url, configs)
      .then(response => {
        if (response.data.success) {
          dispatch({
            type: DELETE_CONNECTION_SUCCESS,
            payload: id
          })
        } else dispatch({
          type: DELETE_CONNECTION_FAILURE,
          payload: {}
        })
      })
  }
}

export function initDataForUpdateConnectionForm(data) {
  return {
    type: INIT_DATA_FOR_UPDATE_CONNECTION_FORM,
    payload: data,
  };
}



