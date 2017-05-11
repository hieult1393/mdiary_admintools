import React from 'react';
import DatePicker from 'react-bootstrap-date-picker';
import {  getDateTimeValue } from '../helper/dateTime';
import moment from 'moment';

export default class EnhanceDatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateValue: this.props.dateValueCreated ? this.props.dateValueCreated : null,
    }
  }
  
  handleChangeDatePicker(e, fieldName) {
    const { change, setErrorDatePicker } = this.props;
    this.setState({ dateValue: getDateTimeValue(e) });
    change(fieldName, getDateTimeValue(e));
    if (moment() - moment(getDateTimeValue(e)) < 18)
      setErrorDatePicker('Vui lòng kiểm tra lại năm sinh!');
  }
  
  render() {
    const { fieldName } = this.props;
    return (
      <DatePicker className="form-control input-medium"
                  value={this.state.dateValue}
                  showClearButton={false}
                  dateFormat="DD/MM/YYYY"
                  weekStartsOnMonday={true}
                  onChange={e => this.handleChangeDatePicker(e, fieldName)}/>
    );
  }
}
