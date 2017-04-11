import React from "react";
import { Link, browserHistory } from "react-router";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { isEmpty } from "lodash";
import config from '../../../../configs/config';
import { logOut } from '../../Login/LoginActions';
import { persistStore } from 'redux-persist';
import { configureStore } from '../../../store';

class Header extends React.Component {

  logOut() {
    const { logOut } =this.props;
    logOut();
    const store = configureStore(window.__INITIAL_STATE__);
    const persistor = persistStore(store);
    persistor.purge();
    browserHistory.push('/');
  }

  render() {
    return (
      <div className="page-header navbar navbar-fixed-top">
        <div className="page-header-inner ">
          <div className="page-logo">
            <Link to="/admin">
              <img src="img/header_logo.png" alt="logo" className="logo-default" height="35px"
                   style={{ marginTop: "5px" }}/>
            </Link>
            <div className="menu-toggler sidebar-toggler">
              <span/>
            </div>
          </div>
          <a href="javascript" className="menu-toggler responsive-toggler" data-toggle="collapse"
             data-target=".navbar-collapse">
            <span/>
          </a>
          <div style={{ display: "block" }}>
            <h3
              style={{
                margin: "10px 20px",
                color: "#FFF",
                textTranform: "uppercase",
                fontSize: "28px",
                fontWeight: "400",
                display: "block",
                float: "left",
                textTransform: "uppercase"
              }}>ADMINISTRATOR</h3>
          </div>
          <div className="top-menu">
            <ul className="nav navbar-nav pull-right">
              <li className="dropdown dropdown-user">
                <a href="javascript" className="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown"
                   data-close-others="true">
                  <img alt="" className="img-circle" src=""/>
                  <span className="username username-hide-on-mobile"> Admin </span>
                  <i className="fa fa-angle-down"/>
                </a>
                <ul className="dropdown-menu dropdown-menu-default">
                  <li onClick={this.logOut.bind(this)}>
                    <a>
                      <i className="icon-key"/> Đăng xuất </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({
    logOut
  }, dispatch)
);
export default connect(null, mapDispatchToProps)(Header);
