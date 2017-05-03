import React from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';

export default class Confirm extends React.Component {
  render() {
    return (
      <SweetAlert warning
                  showCancel
                  confirmBtnText='Yes'
                  cancelBtnText='No'
                  confirmBtnBsStyle='danger'
                  cancelBtnBsStyle='default'
                  title='Are you sure?'
                  onConfirm={this.props.onConfirm}
                  onCancel={this.props.onCancel}>
        The information will be deleted completely!
        {/*Thông tin đã chọn sẽ bị xóa hoàn toàn!*/}
      </SweetAlert>
    );
  }
}
