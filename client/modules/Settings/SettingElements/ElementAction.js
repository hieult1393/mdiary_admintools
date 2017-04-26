import axios from 'axios';
export const FETCH_ELEMENT_DATA_SUCCESS = 'FETCH_ELEMENT_DATA_SUCCESS';
export const FETCH_ELEMENT_DATA_FAILURE = 'FETCH_ELEMENT_DATA_FAILURE';
export function fetchElementData() {
  return (dispatch) => {
    const url = `http://devapimdiary.mimosatek.com/api/elements/getAll`;
    let author = {
      authorization: 'tezPs13792ddfc14f18213c8f15e4b02f5d32eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImZhcm1lciIsImlhdCI6MTQ5MzA4NzY3NiwiZXhwIjoxNDk1Njc5Njc2fQ.XhqP1YMpJxlcDMZZZ9mW4wGCO1mblf2RwOPL13kqID0',
    };
    const config = {
      headers: author
    };
    axios.get(url, config)
      .then(response => {
        if (response.data.success) {
          dispatch({
            type: FETCH_ELEMENT_DATA_SUCCESS,
            payload: response.data.payload
          })
        } else dispatch({
          type: FETCH_ELEMENT_DATA_FAILURE,
          payload: []
        })
      })
  }
}

