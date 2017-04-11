import React from 'react';

export class AddButton extends React.Component {
  render() {
    return (
      <button id="sample_editable_1_new"
              className="btn green"
              style={this.props.style}
              onClick={this.props.onClick}>
        <i className="fa fa-plus" style={{ padding: '0px 5px' }}/>
        Thêm
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
        Quay lại
      </button>
    );
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

export default class PageContent extends React.Component {
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
