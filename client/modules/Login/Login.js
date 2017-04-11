import React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import setAuthorizationToken from "./setAuthorizationToken.js"
import config from '../../../configs/config.js';
const API_URL = config.api_url;
import styles from './Login.css';
import { isEmpty } from 'lodash';
import { compose, withState, lifecycle, withProps, branch, renderComponent } from 'recompose';
import { initLogin, checkUserLogin, setUserData, logIn } from './LoginActions';
import { fetchUserSelector, isLoginSelector, loginFailSelector } from './LoginReducer';
import { showHeaderSelector, showSidebarSelector } from '../App/AppReducer';
import { deActiveHeader, deActiveSidebar } from '../App/AppActions';
import { reduxForm, Field } from 'redux-form';

const required = value => value ? undefined : 'Vui lòng không để trống!';

// const Loading = () => (
//   <div>Loading...</div>
// );

const renderInput = ({ input, label, placeholder, type, meta: { touched, error } }) => (
  <div className={`form-group ${touched && error ? 'has-error' : ''}`}>
    <input {...input} type={type}
                      placeholder={placeholder} autoComplete="off"
                      className='form-control'/>
    <div className="help-block">
      {touched && ((error && <span>{error}</span>))}
    </div>
  </div>
);

const renderField = (fieldName, holder) => (
  <Field name={fieldName}
         ref={fieldName}
         component={renderInput}
         placeholder={holder}
         validate={required}
         type={fieldName === 'password' ? 'password' : 'text'} withRef/>
);

const NewLogin = (props) => {
  const { handleSubmit, checkUserLogin, loginFail } = props;

  return (
    <div className={styles.background}>
      <div className={styles.form_wrapper}>
        <div className={styles.logo}>
          <img src="../img/logo.png" width="100"/>
        </div>
        <div className="content">
          <div className="login-form">
            <h3 className="form-title font-green" style={{ textAlign: 'center' }}> Đăng nhập</h3>
            <form onSubmit={handleSubmit((values) => {
              checkUserLogin(values);
            })}>
              {renderField('username', 'Tên đăng nhập')}
              {renderField('password', 'Mật khẩu')}
              {(loginFail && loginFail.status === true) ? <h5 style={{color:'red'}}>{loginFail.message}</h5> : null}
              <button className="btn green uppercase full-width">Đăng nhập</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const EnhancedComponent = compose(
  connect(
    state => ({
      userData: fetchUserSelector(state),
      showHeader: showHeaderSelector(state),
      showSidebar: showSidebarSelector(state),
      isLogin: isLoginSelector(state),
      loginFail: loginFailSelector(state),
    }),
    ({
      initData: initLogin,
      checkUserLogin,
      deActiveHeader,
      deActiveSidebar,
      logIn,
    })
  ),
  reduxForm({
    form: 'loginForm',
  }),
  lifecycle({
    componentWillMount() {
      const { deActiveHeader, deActiveSidebar } = this.props;
      deActiveHeader();
      deActiveSidebar();
    },
  })
)(NewLogin);

export default EnhancedComponent;
