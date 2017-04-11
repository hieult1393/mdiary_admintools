import { makeFetchAction } from 'redux-api-call';
import config from '../../../configs/config';
import { isEmpty } from 'lodash';

export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';
export const INIT_LOGIN = 'INIT_LOGIN';
export const SET_USER_DATA = 'SET_USER_DATA';
export const UPDATE_FARMER_SUCCESS = 'UPDATE_FARMER_SUCCESS';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOG_OUT = 'LOG_OUT';
export const LOG_IN = 'LOG_IN';

import headerAttachToken, { randomString }  from '../../util/setAuthorizationToken';

export function initLogin() {
  return {
    type: INIT_LOGIN,
    payload: [],
  };
}

export function checkUserLogin(userData) {
  const {
    actionCreator: checkUserLogin,
  } = makeFetchAction(
    'checkUserLogin',
    () => ({
      endpoint: config.api_url + 'public_api/users/login',
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(userData),
    })
  );
  return checkUserLogin();
}

export function setUserData(userData) {
  return {
    type: SET_USER_DATA,
    payload: userData,
  };
}

export function updateFarmer(id, data) {
  if (isEmpty(data.images))
    data.images = null;
  const {
    actionCreator: updateFarmer,
  } = makeFetchAction(
    'updateFarmer',
    () => ({
      endpoint: `${config.api_url}api/farmers/update/${id}`,
      headers: headerAttachToken,
      method: 'PUT',
      body: JSON.stringify(data),
    })
  );
  return updateFarmer();
}

export function logOut() {
  return {
    type: LOG_OUT,
    payload: false,
  };
}

export function logIn() {
  return {
    type: LOG_IN,
    payload: true,
  };
}
