import 'rxjs';
import { combineEpics } from 'redux-observable';
import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  UPDATE_FARMER_SUCCESS,
  SET_USER_DATA,
  SET_FAILURE_MESSAGE
} from '../modules/Login/LoginActions';
import { logIn, setUserData } from '../modules/Login/LoginActions';
import { activeHeader, activeSidebar } from '../modules/App/AppActions';
import { browserHistory } from 'react-router';
import { dispatch } from 'react-redux';

const checkUserLoginEpic = actions$ => (
  actions$
    .filter((action) => {
      const { payload, type } = action;
      if (!payload)
        return false;
      const { name } = payload;
      return type === '@@api/FETCH_COMPLETE' && name === 'checkUserLogin';
    })
    .map(action => {
      if (action.payload.json.success) {
        return {
          type: LOGIN_SUCCESS,
          payload: action.payload.json.payload,
        };
      } else {
        const error_code = action.payload.json.error.code;
        switch (parseInt(error_code)) {
          case 403:
            return {
              type: LOGIN_FAILURE,
              payload: { status: true, message: 'Sai mật khẩu' },
            };
          case 404:
            return {
              type: LOGIN_FAILURE,
              payload: { status: true, message: 'Người dùng không tồn tại' },
            };
          default:
            return {
              type: LOGIN_FAILURE,
              payload: { status: true, message: 'Đăng nhập không thành công' },
            };
        }
      }
    })
);


const loginSuccessEpic = actions$ => (
  actions$
    .filter((action) => {
      const { payload, type } = action;
      if (!payload)
        return false;
      return type === 'LOGIN_SUCCESS';
    })
    .map(action => {
      const user = action.payload;
      const userType = user.type_id;
      switch (userType) {
        case 0:
          browserHistory.push('/settingUser');
          break;
        //case 1:
        //  browserHistory.push('/buyer');
        //  break;
        //case 2:
        //  browserHistory.push('/farmer');
        //  break;
      }
      return {
        type: 'SET_USER_DATA',
        payload: action.payload,
      };
    })
);

const updateFarmerEpic = actions$ => {
  return actions$
    .filter((action) => {
      const { payload, type } = action;
      if (!payload) return false;
      const { name } = payload;
      return type === '@@api/FETCH_COMPLETE' && name === 'updateFarmer';
    })
    .map(action => {
      return {
        type: UPDATE_FARMER_SUCCESS,
        payload: action.payload.json.payload,
      };
    });
};

export default combineEpics(
  checkUserLoginEpic,
  updateFarmerEpic,
  loginSuccessEpic
);
