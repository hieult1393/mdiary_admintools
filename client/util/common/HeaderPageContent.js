import React from 'react';

export default class HeaderPageContent extends React.Component {
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
