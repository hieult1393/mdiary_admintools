import React from 'react'
class CancelButton extends React.Component {
  render() {
    return (
      <button type="button" className="btn default"
              onClick={this.props.onClick}>
        Cancel
      </button>
    );
  }
}
export default CancelButton;

