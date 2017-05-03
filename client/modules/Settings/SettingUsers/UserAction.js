import axios from 'axios';
export const FETCH_USER_DATA_SUCCESS = 'FETCH_USER_DATA_SUCCESS';
export const FETCH_USER_DATA_FAILURE = 'FETCH_USER_DATA_FAILURE';
export const GET_CURRENT_USER_DATA = 'GET_CURRENT_USER_DATA';

export function fetchUserData() {
  return (dispatch) => {
    const url = `http://devapimdiary.mimosatek.com/api/users/getAll`;
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

