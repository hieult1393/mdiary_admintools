import axios from 'axios';
import { attachTokenAxios } from '../../../util/setAuthorizationToken';
import config from '../../../../configs/config';
export const CREATE_USER_ACCOUNT_SUCCESS = 'CREATE_USER_ACCOUNT_SUCCESS';
export const CREATE_USER_ACCOUNT_FAILURE = 'CREATE_USER_ACCOUNT_FAILURE';
export function createUserAccount() {
  return (dispatch, getState) => {
    const url = `${config.api_url}api/users/create`;
    const configs = {
      headers: attachTokenAxios(getState),
    };
    axios.get(url, configs)
      .then(response => {
        if (response.data.success) {
          dispatch({
            type: CREATE_USER_ACCOUNT_SUCCESS,
            payload: response.data.payload
          })
        }
        else dispatch({
          type: CREATE_USER_ACCOUNT_FAILURE,
        })
      })
  }
  
}
