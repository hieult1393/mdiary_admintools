import React from 'react'
class AccountButton extends React.Component {
  render() {
    return (
      <button type="button" className="btn btn-circle green-haze"
              onClick={this.props.onClick}>
        Account
      </button>
    );
  }
}
export default AccountButton;


