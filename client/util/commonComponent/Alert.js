import React from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';

export default class Alert extends React.Component {
  render() {
    return (
      <SweetAlert warning
                  showCancel
                  confirmBtnText='Có'
                  cancelBtnText='Không'
                  confirmBtnBsStyle='danger'
                  cancelBtnBsStyle='default'
                  title='Bạn có chắc chắn?'
                  onConfirm={this.props.onConfirm}
                  onCancel={this.props.onCancel}>
        Thông tin đã chọn sẽ bị xóa hoàn toàn!
      </SweetAlert>
    );
  }
}
