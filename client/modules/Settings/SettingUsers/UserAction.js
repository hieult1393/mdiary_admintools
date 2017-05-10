import axios from 'axios';
import { attachTokenAxios } from '../../../util/setAuthorizationToken';
import config from '../../../../configs/config';

export const FETCH_USER_DATA_SUCCESS = 'FETCH_USER_DATA_SUCCESS';
export const CREATE_FARMER_SUCCESS = 'CREATE_FARMER_SUCCESS';
export const CREATE_FARMER_FAILURE = 'CREATE_FARMER_FAILURE';
export const CREATE_BUYER_SUCCESS = 'CREATE_BUYER_SUCCESS';
export const CREATE_BUYER_FAILURE = 'CREATE_BUYER_FAILURE';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_FAILURE = 'DELETE_USER_FAILURE';
export const INIT_DATA_FOR_UPDATE_USER_FORM = 'INIT_DATA_FOR_UPDATE_USER_FORM';
export const GET_CURRENT_USER_DATA = 'GET_CURRENT_USER_DATA';
export const GET_USER_TYPE = 'GET_USER_TYPE';

export function fetchUserData() {
  return (dispatch, getState) => {
    const url = `${config.api_url}/api/users/getAllFarmersOrBuyersByType`;
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

export function createFarmer(data) {
  return (dispatch, getState) => {
    const url = `${config.api_url}api/farmers/create`;
    const params = data;
    const configs = {
      headers: attachTokenAxios(getState),
    };
    axios.post(url, params, configs)
      .then(response => {
        console.log('response: ', response);
        if (response.data.success) {
          dispatch({
            type: CREATE_FARMER_SUCCESS,
            payload: response.data.payload
          })
        } else dispatch({
          type: CREATE_FARMER_FAILURE,
          payload: {}
        })
      })
  }
}
export function createBuyer(data) {
  return (dispatch, getState) => {
    const url = `${config.api_url}api/buyers/create`;
    const params = data;
    const configs = {
      headers: attachTokenAxios(getState),
    };
    axios.post(url, params, configs)
      .then(response => {
        console.log('response: ', response);
        if (response.data.success) {
          dispatch({
            type: CREATE_BUYER_SUCCESS,
            payload: response.data.payload
          })
        } else dispatch({
          type: CREATE_BUYER_FAILURE,
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
        console.log('response :', response);
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

