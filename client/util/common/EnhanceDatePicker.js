import React from 'react';
import DatePicker from 'react-bootstrap-date-picker';
import { getDateTimeValue } from '../helper/dateTime';
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
    //567648000000 là con số 18 tuổi được tính bằng: 24*60*60*365*18*1000
    if (moment() - moment(getDateTimeValue(e)) < 567648000000)//đơn vị của phép tính là millisecond
      setErrorDatePicker('Năm sinh phải lớn hơn hoặc bằng 18 tuổi!');
    else setErrorDatePicker(null);
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
