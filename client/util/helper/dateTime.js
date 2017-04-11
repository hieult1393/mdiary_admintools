import moment from 'moment';
import { isEmpty } from 'lodash';

export const formatDate = (date) => {
  return isEmpty(date) ? '' : moment(date, [ 'YYYY-MM-DD' ], 'vi').format('DD/MM/YYYY');
};

export const getDateTimeValue = (value) => {
  let dateTimeValue = moment(value);
  const now = moment();
  dateTimeValue.set({
    hour: now.get('hour'),
    minute: now.get('minute'),
    second: now.get('second'),
  });
  let dateValue = dateTimeValue.format('YYYY-MM-DD');
  let timeValue = dateTimeValue.format('HH:mm:ss');
  return dateValue.toString() + 'T' + timeValue.toString() + 'Z';
};
