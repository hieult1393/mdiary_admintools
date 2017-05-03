import React from 'react';
import { get, isEmpty } from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { activeHeader, activeSidebar } from '../../modules/App/AppActions';

export class AddButton extends React.Component {
  render() {
    return (
      <button id="sample_editable_1_new"
              className="btn green"
              style={this.props.style}
              onClick={this.props.onClick}>
        <i className="fa fa-plus" style={{ padding: '0px 5px' }}/>
        Add
      </button>
    );
  }
}
export class BackButton extends React.Component {
  render() {
    return (
      <button id="sample_editable_1_new"
              className="btn green"
              onClick={this.props.onClick}>
        <i className="fa fa-undo" style={{ padding: '0px 5px' }}/>
        Back
      </button>
    )
  }
}

export class HeaderPageContent extends React.Component {
  render() {
    const { titlePageContent } = this.props;
    return (
      <div className="portlet-title">
        <div className="caption">
          <i className="fa fa-leaf font-green-jungle"/>
          <span className="caption-subject font-green-jungle sbold uppercase">
            {titlePageContent}
          </span>
        </div>
        <div className="btn-group" style={{ float: 'right' }}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

class PageContent extends React.Component {
  componentWillMount() {
    const { activeHeader, activeSidebar } = this.props;
    activeHeader();
    activeSidebar();
  }

  render() {
    return (
      <div style={{ width: '100%', display: 'flex' }}>
        <div className="page-content-wrapper" style={{ display: 'inline-flex' }}>
          <div className="page-content"
               style={{ width: '100%', height: 'auto', backgroundColor: '#f5f5f5', margin: '0' }}>
            <div className="row" style={{ marginTop: '-10px' }}>
              <div className="col-md-12">
                <div className="portlet light portlet-fit bordered">
                  {this.props.children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  activeHeader,
  activeSidebar,
}, dispatch);

export default connect(null, mapDispatchToProps)(PageContent);






















