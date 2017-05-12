import{
  Form,
  FormRow,
  FormColumn,
  SaveButton,
  CancelButton,
  Input,
  FieldInput,
  Select,
  FieldSelect,
  FieldDatePicker,
} from '../../../../util/common/Form';
import React from 'react';
import { browserHistory } from 'react-router';
import { isEmpty } from 'lodash';

const requiredForInput = value => value ? undefined : 'Please do not leave it blank!';
const requiredForSelect = value => isEmpty(value) ? 'Please do not leave it blank!' : undefined;
const maxLength = max => value => value && value.length > max ? `Please enter below${max}characters!` : undefined;
const optionDefault = () => (<option value='' disabled>Select your option</option>);
const gendersList = [{ id: 1, name: 'male' }, { id: 2, name: 'female' }];

export const BuyerCreateForm = (props) => {
  const { handleSubmit, createBuyer } = props;
  return (
    <Form onSubmit={handleSubmit(values => {
      values.company_name = null;
      values.company_address = null;
      values.company_trading_name = null;
      values.company_tax = null;
      values.company_representative = null;
      values.company_startday = null;
      values.company_grantday = null;
      createBuyer(values);
      browserHistory.goBack();
    })}>
      <FormRow>
        <div className="col-md-4">
          {FieldInput('Name *', 'name', Input, [requiredForInput, maxLength(20)], 'text', 'Input name')}
          {FieldSelect('Gender *', 'gender', Select, gendersList, requiredForSelect, optionDefault())}
          {FieldInput('Address *', 'address', Input, [requiredForInput], 'text', 'Input address')}
        </div>
        <div className="col-md-4">
          {FieldInput('PhoneNo *', 'phone', Input, [requiredForInput], 'number', 'Input phoneNo')}
          {FieldDatePicker('BirthDay *', 'birthday', props)}
        </div>
      </FormRow>
      <FormRow>
        <div style={{ float: 'right', marginRight: '3%' }}>
          <CancelButton style={{ width: '70px', height: '34px' }}
                        onClick={() => browserHistory.goBack()}/>
          <SaveButton style={{ marginLeft: '5px' }}/>
        </div>
      </FormRow>
    </Form>
  );
};
