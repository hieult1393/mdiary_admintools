import React from 'react';

export default class AddButton extends React.Component {
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
