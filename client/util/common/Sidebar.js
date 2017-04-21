import { fetchUserSelector } from '../../modules/Login/LoginReducer';
import React from "react";
import { Link } from "react-router";
import { isEmpty } from "lodash";
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  fetchUserSelector: fetchUserSelector(state),
});

export class Sidebar extends React.Component {
  render() {
    return (
      <div className="page-sidebar-wrapper">
        <div className="page-sidebar navbar-collapse collapse">
          <ul className="page-sidebar-menu page-sidebar-menu-closed"
              data-keep-expanded="false"
              data-auto-scroll="true"
              data-slide-speed="200">
            <li className="nav-item start open">
              <Link to="/settingUser" className="nav-link nav-toggle">
                <i className="fa fa-user"/>
                <span className="title">Setting Users</span>
                <span className="arrow"/>
              </Link>
              <Link to="/settingConnection" className="nav-link nav-toggle">
                <i className="fa fa-users"/>
                <span className="title">Setting Connections</span>
                <span className="arrow"/>
              </Link>
              <Link to="/settingElement" className="nav-link nav-toggle">
                <i className="fa fa-tree"/>
                <span className="title">Setting Elements</span>
                <span className="arrow"/>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Sidebar);
