import React from 'react';
export default class BackButton extends React.Component {
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
