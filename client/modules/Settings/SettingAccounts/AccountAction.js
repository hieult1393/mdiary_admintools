import axios from 'axios';
import { attachTokenAxios } from '../../../util/setAuthorizationToken';
import config from '../../../../configs/config';

export const FETCH_ACCOUNT_DATA = 'FETCH_ACCOUNT_DATA';
export const CREATE_ACCOUNT_SUCCESS = 'CREATE_USER_ACCOUNT_SUCCESS';
export const CREATE_ACCOUNT_FAILURE = 'CREATE_USER_ACCOUNT_FAILURE';
export const UPDATE_ACCOUNT_SUCCESS = 'UPDATE_ACCOUNT_SUCCESS';
export const UPDATE_ACCOUNT_FAILURE = 'UPDATE_ACCOUNT_FAILURE';
export const DELETE_ACCOUNT_SUCCESS = 'DELETE_ACCOUNT_SUCCESS';
export const DELETE_ACCOUNT_FAILURE = 'DELETE_ACCOUNT_FAILURE';
export const INIT_DATA_FOR_UPDATE_ACCOUNT_FORM = 'INIT_DATA_FOR_UPDATE_ACCOUNT_FORM';

export function fetchAccountData(data) {
  return (dispatch, getState) => {
    const url = `${config.api_url}/api/users/getUserAccountsByIdAndType`;
    const params = data;
    const configs = {
      headers: attachTokenAxios(getState),
    };
    axios.post(url, params, configs)
      .then(response => {
        if (response.data.success) {
          dispatch({
            type: FETCH_ACCOUNT_DATA,
            payload: response.data.payload
          })
        }
      })
  }
}

export function createAccount(data) {
  return (dispatch, getState) => {
    const url = `${config.api_url}api/users/create`;
    const params = data;
    const configs = {
      headers: attachTokenAxios(getState),
    };
    axios.post(url, params, configs)
      .then(response => {
        if (response.data.success) {
          dispatch({
            type: CREATE_ACCOUNT_SUCCESS,
            payload: response.data.payload
          })
        } else dispatch({
          type: CREATE_ACCOUNT_FAILURE,
          payload: {}
        })
      })
  }
}

export function updateAccount(id, data) {
  return (dispatch, getState) => {
    const url = `${config.api_url}api/users/update/${id}`;
    const params = data;
    const configs = {
      headers: attachTokenAxios(getState),
    };
    axios.put(url, params, configs)
      .then(response => {
        if (response.data.success) {
          dispatch({
            type: UPDATE_ACCOUNT_SUCCESS,
            payload: response.data.payload
          })
        } else dispatch({
          type: UPDATE_ACCOUNT_FAILURE,
          payload: {}
        })
      })
  }
}

export function deleteAccount(id) {
  return (dispatch, getState) => {
    const url = `${config.api_url}api/users/delete/${id}`;
    const configs = {
      headers: attachTokenAxios(getState),
    };
    axios.delete(url, configs)
      .then(response => {
        if (response.data.success) {
          dispatch({
            type: DELETE_ACCOUNT_SUCCESS,
            payload: id
          })
        } else dispatch({
          type: DELETE_ACCOUNT_FAILURE,
          payload: {}
        })
      })
  }
}

export function initDataForUpdateAccountForm(data) {
  return {
    type: INIT_DATA_FOR_UPDATE_ACCOUNT_FORM,
    payload: data,
  };
}
