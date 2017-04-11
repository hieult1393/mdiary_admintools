import React from 'react';
import DatePicker from 'react-bootstrap-date-picker';

export default class EnhanceDatePicker extends React.Component {
  render() {
    const dayLabels = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
    const monthLabels = [
      'Tháng 1 /', 'Tháng 2 /', 'Tháng 3 /', 'Tháng 4 /', 'Tháng 5 /', 'Tháng 6 /',
      'Tháng 7 /', 'Tháng 8 /', 'Tháng 9 /', 'Tháng 10 /', 'Tháng 11 /', 'Tháng 12 /',
    ];
    return (
      <DatePicker className="form-control input-medium"
                  value={this.props.value}
                  showClearButton={false}
                  dateFormat="DD/MM/YYYY"
                  dayLabels={dayLabels}
                  monthLabels={monthLabels}
                  weekStartsOnMonday={true}
                  onChange={this.props.onChange}/>
    );
  }
}
