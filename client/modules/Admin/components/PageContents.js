import React from 'react';
import { get, isEmpty } from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { activeHeader, activeSidebar } from '../../App/AppActions';


const mapDispatchToProps = (dispatch) => bindActionCreators({
  activeHeader,
  activeSidebar,
}, dispatch);

export class PageContent extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { activeHeader, activeSidebar } = this.props;
    activeHeader();
    activeSidebar();
  }

  render() {
    return (
      <div className="page-content-wrapper" style={{ display: 'inline-flex' }}>
        <div className="page-content"
             style={{ width: '100%', height: 'auto', backgroundColor: '#f5f5f5', margin: '0', }}>
          <div>HELLO WORLD!!!</div>
        </div>
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(PageContent);
