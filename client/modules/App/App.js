import { showSidebarSelector, showHeaderSelector } from './AppReducer';
import { activeHeader, activeSidebar, deActiveHeader, deActiveSidebar } from './AppActions';
import { fetchUserSelector } from '../Login/LoginReducer';
import Header from '../../../client/util/common/Header';
import SideBar from '../../../client/util/common/Sidebar';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { isEmpty } from 'lodash';
import Toast from 'react-redux-toastr';
import links from '../../util/links.json';
import Helmet from 'react-helmet';

const mapStateToProps = (state) => ({
  showSidebar: showSidebarSelector(state),
  showHeader: showHeaderSelector(state),
  user: fetchUserSelector(state),
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  activeHeader: activeHeader,
  activeSidebar: activeSidebar,
  deActiveHeader: deActiveHeader,
  deActiveSidebar: deActiveSidebar,
}, dispatch);

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const fixStyle = this.props.showHeader === false ? { marginTop: '0' } : {};
    return (
      <div>
        <Helmet
          title="MDiary"
          titleTemplate="%s"
          meta={[
            { charset: 'utf-8' },
            {
              'http-equiv': 'X-UA-Compatible',
              content: 'IE=edge',
            },
            {
              name: 'viewport',
              content: 'width=device-width, initial-scale=1',
            },
          ]}
          link={links}
          script={[
            {
              src: '../layout/assets/global/plugins/jquery.min.js',
              type: 'text/javascript',
            },
          ]}
        />
        <Toast
          timeOut={3000}
          newestOnTop={false}
          preventDuplicates={true}
          position="bottom-right"
          transitionIn="bounceIn"
          transitionOut="bounceOut"/>
        <div className="page-container" style={fixStyle}>
          <div className="page-content-wrapper">
            <div className="page-wrapper">
              {this.props.showHeader === true ? <Header/> : null}
              <div className="clearfix"/>
              <div className="page-container"
                   style={{ width: '100%', minHeight: '95vh !important', marginTop: '0', display: 'flex' }}>
                { this.props.showSidebar === true ? <SideBar/> : null}
                {this.props.children}
              </div>
              <div className="page-footer">
                <div className="scroll-to-top">
                  <i className="icon-arrow-up"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
