import React from 'react';

class UpdateButton extends React.Component {
  render() {
    return (
      <button type="button" className="btn btn-circle red"
              onClick={this.props.onClick}>
        Update
        {/*<i className="fa fa-pencil"/>*/}
      </button>
    );
  }
}

export default UpdateButton;
