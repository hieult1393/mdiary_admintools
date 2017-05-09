import axios from 'axios';
import { attachTokenAxios } from '../../../util/setAuthorizationToken';
import config from '../../../../configs/config';

export const FETCH_USER_DATA_SUCCESS = 'FETCH_USER_DATA_SUCCESS';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const CREATE_USER_FAILURE = 'CREATE_USER_FAILURE';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_FAILURE = 'DELETE_USER_FAILURE';
export const INIT_DATA_FOR_UPDATE_USER_FORM = 'INIT_DATA_FOR_UPDATE_USER_FORM';
export const GET_CURRENT_USER_DATA = 'GET_CURRENT_USER_DATA';
export const GET_USER_TYPE = 'GET_USER_TYPE';

export function fetchUserData() {
  return (dispatch, getState) => {
    const url = `${config.api_url}api/users/getAllFarmersOrBuyersByType`;
    const configs = {
      headers: attachTokenAxios(getState),
    };
    axios.get(url, configs)
      .then(response => {
        if (response.data.success) {
          dispatch({
            type: FETCH_USER_DATA_SUCCESS,
            payload: response.data.payload
          })
        }
      })
  }
}

export function getCurrentUserData(userData) {
  return {
    type: GET_CURRENT_USER_DATA,
    payload: userData,
  }
}

export function createUser(data) {
  return (dispatch, getState) => {
    const url = `${config.api_url}api/users/create`;
    const params = data;
    const configs = {
      headers: attachTokenAxios(getState),
    };
    axios.post(url, params, configs)
      .then(response => {
        console.log('response: ', response);
        if (response.data.success) {
          dispatch({
            type: CREATE_USER_SUCCESS,
            payload: response.data.payload
          })
        } else dispatch({
          type: CREATE_USER_FAILURE,
          payload: {}
        })
      })
  }
}

export function updateUser(id, data) {
  return (dispatch, getState) => {
    const url = `${config.api_url}api/elements/update/${id}`;
    const params = data;
    const configs = {
      headers: attachTokenAxios(getState),
    };
    axios.put(url, params, configs)
      .then(response => {
        if (response.data.success) {
          dispatch({
            type: UPDATE_USER_SUCCESS,
            payload: response.data.payload
          })
        } else dispatch({
          type: UPDATE_USER_FAILURE,
          payload: {}
        })
      })
  }
}

export function deleteUser(id) {
  return (dispatch, getState) => {
    const url = `${config.api_url}api/users/delete/${id}`;
    const configs = {
      headers: attachTokenAxios(getState),
    };
    axios.delete(url, configs)
      .then(response => {
        if (response.data.success) {
          dispatch({
            type: DELETE_USER_SUCCESS,
            payload: id
          })
        } else dispatch({
          type: DELETE_USER_FAILURE,
          payload: {}
        })
      })
  }
}

export function initDataForUpdateUserForm(data) {
  return {
    type: INIT_DATA_FOR_UPDATE_USER_FORM,
    payload: data,
  };
}

export function getUserType(typeId) {
  return {
    type: GET_USER_TYPE,
    payload: typeId
  }
}

