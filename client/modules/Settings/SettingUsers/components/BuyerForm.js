import{ Form, FormRow, FormColumn, SaveButton, CancelButton, Input, FieldInput } from '../../../../util/common/Form';
import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { compose, lifecycle } from 'recompose';
import { reduxForm } from 'redux-form';

const requiredForInput = value => value ? undefined : 'Please do not leave it blank!';
const minValue = min => value => value && value <= min ? `Value must be greater than 0!` : undefined;
const maxLength = max => value => value && value.length > max ? `Please enter below${max}characters!` : undefined;

const BuyerForm = (props) => {
  return (
    <Form>
      <FormRow>
        <FormColumn style={{ marginLeft: '5%' }}>
          {FieldInput('Name *', 'name', Input, [requiredForInput, maxLength(20)], 'text', 'Input name')}
          {FieldInput('Gender *', 'gender', Input, [requiredForInput], 'text', 'Input gender')}
          {FieldInput('Address *', 'address', Input, [requiredForInput], 'number', 'Input address')}
        </FormColumn>
        <FormColumn>
          {FieldInput('PhoneNo *', 'phone', Input, [requiredForInput], 'number', 'Input phoneNo')}
          {FieldInput('BirthDay *', 'birthday', Input, [requiredForInput], 'number', 'Input birthday')}
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

const EnhanceBuyerForm = compose(
  connect(),
  reduxForm({
    form: 'BuyerFormCreate',
  })
)(BuyerForm);

export default EnhanceBuyerForm;
