import{ Form, FormRow, FormColumn, SaveButton, CancelButton, Input, FieldInput } from '../../../../util/common/Form';
import React from 'react';
import { browserHistory } from 'react-router';
const requiredForInput = value => value ? undefined : 'Please do not leave it blank!';
const minValue = min => value => value && value <= min ? `Value must be greater than 0!` : undefined;
const maxLength = max => value => value && value.length > max ? `Please enter below${max}characters!` : undefined;

export const BuyerForm = (props) => {
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
      console.log('values :',values);
      createBuyer(values);
      browserHistory.goBack();
    })}>
      <FormRow>
        <FormColumn style={{ marginLeft: '5%' }}>
          {FieldInput('Name *', 'name', Input, [requiredForInput, maxLength(20)], 'text', 'Input name')}
          {FieldInput('Gender *', 'gender', Input, [requiredForInput], 'text', 'Input gender')}
          {FieldInput('Address *', 'address', Input, [requiredForInput], 'text', 'Input address')}
        </FormColumn>
        <FormColumn>
          {FieldInput('PhoneNo *', 'phone', Input, [requiredForInput], 'number', 'Input phoneNo')}
          {FieldInput('BirthDay *', 'birthday', Input, [requiredForInput], 'text', 'Input birthday')}
        </FormColumn>
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
