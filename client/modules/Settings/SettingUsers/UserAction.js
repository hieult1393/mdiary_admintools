import axios from 'axios';
export const FETCH_USER_DATA_SUCCESS = 'FETCH_USER_DATA_SUCCESS';
export const FETCH_USER_DATA_FAILURE = 'FETCH_USER_DATA_FAILURE';
export const GET_CURRENT_USER_DATA = 'GET_CURRENT_USER_DATA';

export function fetchUserData() {
  return (dispatch) => {
    const url = `http://devapimdiary.mimosatek.com/api/users/getAllFarmersOrBuyersByType`;
    let author = {
      Authorization: 'tezPs13792ddfc14f18213c8f15e4b02f5d32eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImZhcm1lciIsImlhdCI6MTQ5MzA4NzY3NiwiZXhwIjoxNDk1Njc5Njc2fQ.XhqP1YMpJxlcDMZZZ9mW4wGCO1mblf2RwOPL13kqID0',
    };
    const config = {
      headers: author
    };
    axios.get(url, config)
      .then(response => {
        if (response.data.success) {
          dispatch({
            type: FETCH_USER_DATA_SUCCESS,
            payload: response.data.payload
          })
        } else dispatch({
          type: FETCH_USER_DATA_FAILURE,
          payload: []
        })
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

