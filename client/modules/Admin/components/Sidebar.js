import React from "react";
import { Link } from "react-router";
import { isEmpty } from "lodash";
import { connect } from 'react-redux';
import { fetchUserSelector } from '../../Login/LoginReducer';

const mapStateToProps = (state) => ({
  fetchUserSelector: fetchUserSelector(state),
});

export class Sidebar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (

      <div className="page-sidebar-wrapper">
        <div className="page-sidebar navbar-collapse collapse">
          <ul className="page-sidebar-menu page-sidebar-menu-closed" data-keep-expanded="false"
              data-auto-scroll="true"
              data-slide-speed="200">
            <li className="nav-item start open">
              <Link to="/admin" className="nav-link nav-toggle">
                <i className="icon-home"></i>
                <span className="title">GO TO HOMEPAGE</span>
                <span className="arrow"></span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Sidebar);
