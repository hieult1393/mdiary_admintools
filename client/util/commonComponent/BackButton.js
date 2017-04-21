import React from 'react'
class BackButton extends React.Component {
  render() {
    return (
      <button type="button" className="btn default"
              onClick={this.props.onClick}>
        BACK
      </button>
    );
  }
}
export default BackButton;

