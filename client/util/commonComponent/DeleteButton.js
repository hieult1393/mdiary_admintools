import React from 'react'
class DeleteButton extends React.Component {
  render() {
    return (
      <button type="button" className="btn btn-circle green-haze"
              onClick={this.props.onClick}>
        Delete
      </button>
    );
  }
}
export default DeleteButton;
