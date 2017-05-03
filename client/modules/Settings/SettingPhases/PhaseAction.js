import axios from 'axios';
import { attachTokenAxios } from '../../../util/setAuthorizationToken';

export const FETCH_PHASE_DATA_SUCCESS = 'FETCH_PHASE_DATA_SUCCESS';
export const CREATE_PHASE_SUCCESS = 'CREATE_PHASE_SUCCESS';
export const CREATE_PHASE_FAILURE = 'CREATE_PHASE_FAILURE';
export const UPDATE_PHASE_SUCCESS = 'UPDATE_PHASE_SUCCESS';
export const UPDATE_PHASE_FAILURE = 'UPDATE_PHASE_FAILURE';
export const DELETE_PHASE_SUCCESS = 'DELETE_PHASE_SUCCESS';
export const DELETE_PHASE_FAILURE = 'DELETE_PHASE_FAILURE';
export const INIT_DATA_FOR_UPDATE_PHASE_FORM = 'INIT_DATA_FOR_UPDATE_PHASE_FORM';

export function fetchPhaseData(id) {
  return (dispatch, getState) => {
    const url = `http://devapimdiary.mimosatek.com/api/phases/getAll`;
    const params = { season_id: id };
    const configs = {
      headers: attachTokenAxios(getState),
    };
    axios.post(url, params, configs)
      .then(response => {
        if (response.data.success) {
          dispatch({
            type: FETCH_PHASE_DATA_SUCCESS,
            payload: response.data.payload
          })
        }
      })
  }
}

export function createPhase(data) {
  return (dispatch, getState) => {
    const url = `http://devapimdiary.mimosatek.com/api/phases/create`;
    const params = data;
    const configs = {
      headers: attachTokenAxios(getState),
    };
    axios.post(url, params, configs)
      .then(response => {
        console.log('response: ', response);
        if (response.data.success) {
          dispatch({
            type: CREATE_PHASE_SUCCESS,
            payload: response.data.payload
          })
        } else dispatch({
          type: CREATE_PHASE_FAILURE,
          payload: {}
        })
      })
  }
}

export function updatePhase(id, data) {
  return (dispatch, getState) => {
    const url = `http://devapimdiary.mimosatek.com/api/phases/update/${id}`;
    const params = data;
    const configs = {
      headers: attachTokenAxios(getState),
    };
    axios.put(url, params, configs)
      .then(response => {
        if (response.data.success) {
          dispatch({
            type: UPDATE_PHASE_SUCCESS,
            payload: response.data.payload
          })
        } else dispatch({
          type: UPDATE_PHASE_FAILURE,
          payload: {}
        })
      })
  }
}

export function deletePhase(id) {
  return (dispatch, getState) => {
    const url = `http://devapimdiary.mimosatek.com/api/phases/delete/${id}`;
    const configs = {
      headers: attachTokenAxios(getState),
    };
    axios.delete(url, configs)
      .then(response => {
        if (response.data.success) {
          dispatch({
            type: DELETE_PHASE_SUCCESS,
            payload: id
          })
        } else dispatch({
          type: DELETE_PHASE_FAILURE,
          payload: {}
        })
      })
  }
}

export function initDataForUpdatePhaseForm(data) {
  return {
    type: INIT_DATA_FOR_UPDATE_PHASE_FORM,
    payload: data,
  };
}
