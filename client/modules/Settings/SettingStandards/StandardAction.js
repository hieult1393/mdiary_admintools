import axios from 'axios';
import { attachTokenAxios } from '../../../util/setAuthorizationToken';
import config from '../../../../configs/config';

export const FETCH_STANDARD_DATA_SUCCESS = 'FETCH_STANDARD_DATA_SUCCESS';
export const CREATE_STANDARD_SUCCESS = 'CREATE_STANDARD_SUCCESS';
export const CREATE_STANDARD_FAILURE = 'CREATE_STANDARD_FAILURE';
export const UPDATE_STANDARD_SUCCESS = 'UPDATE_STANDARD_SUCCESS';
export const UPDATE_STANDARD_FAILURE = 'UPDATE_STANDARD_FAILURE';
export const DELETE_STANDARD_SUCCESS = 'DELETE_STANDARD_SUCCESS';
export const DELETE_STANDARD_FAILURE = 'DELETE_STANDARD_FAILURE';
export const INIT_DATA_FOR_UPDATE_STANDARD_FORM = 'INIT_DATA_FOR_UPDATE_STANDARD_FORM';

export function fetchStandardData() {
  return (dispatch, getState) => {
    const url = `${config.api_url}api/standards/getAll`;
    const configs = {
      headers: attachTokenAxios(getState),
    };
    axios.get(url, configs)
      .then(response => {
        if (response.data.success) {
          dispatch({
            type: FETCH_STANDARD_DATA_SUCCESS,
            payload: response.data.payload
          })
        }
      })
  }
}

export function createStandard(data) {
  return (dispatch, getState) => {
    const url = `${config.api_url}api/standards/create`;
    const params = data;
    const configs = {
      headers: attachTokenAxios(getState),
    };
    axios.post(url, params, configs)
      .then(response => {
        if (response.data.success) {
          dispatch({
            type: CREATE_STANDARD_SUCCESS,
            payload: response.data.payload
          })
        } else dispatch({
          type: CREATE_STANDARD_FAILURE,
          payload: {}
        })
      })
  }
}

export function updateStandard(id, data) {
  return (dispatch, getState) => {
    const url = `${config.api_url}api/standards/update/${id}`;
    const params = data;
    const configs = {
      headers: attachTokenAxios(getState),
    };
    axios.put(url, params, configs)
      .then(response => {
        if (response.data.success) {
          dispatch({
            type: UPDATE_STANDARD_SUCCESS,
            payload: response.data.payload
          })
        } else dispatch({
          type: UPDATE_STANDARD_FAILURE,
          payload: {}
        })
      })
  }
}

export function deleteStandard(id) {
  return (dispatch, getState) => {
    const url = `${config.api_url}api/standards/delete/${id}`;
    const configs = {
      headers: attachTokenAxios(getState),
    };
    axios.delete(url, configs)
      .then(response => {
        if (response.data.success) {
          dispatch({
            type: DELETE_STANDARD_SUCCESS,
            payload: id
          })
        } else dispatch({
          type: DELETE_STANDARD_FAILURE,
          payload: {}
        })
      })
  }
}

export function initDataForUpdateStandardForm(data) {
  return {
    type: INIT_DATA_FOR_UPDATE_STANDARD_FORM,
    payload: data,
  };
}
