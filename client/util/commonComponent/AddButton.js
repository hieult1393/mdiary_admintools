import React from 'react'
class AddButton extends React.Component {
  render() {
    return (
      <button type="button" className="btn btn-success"
              onClick={this.props.onClick}>
        ADD
      </button>
    );
  }
}
export default AddButton;


