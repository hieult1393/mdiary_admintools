import PageContent, { HeaderPageContent } from '../../../../util/common/PageContent';
import { Form, FormRow, FormColumn, CancelButton, SaveButton } from '../../../../util/common/Form';
import {
  Select,
  FieldSelect,
  FieldDatePicker,
} from '../../../../util/common/Form';
import { createConnection } from '../ConnectionAction';
import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { reduxForm } from 'redux-form';
import { isEmpty, find } from 'lodash';
import { compose, withState } from 'recompose';

const requiredForSelect = value => isEmpty(value) ? 'Vui lòng không để trống!' : undefined;
const optionDefault = () => (<option value='' disabled>Select your option</option>);
const typeNameList = [{ id: 1, name: 'Dài ngày' }, { id: 2, name: 'Ngắn ngày' }];

const ConnectionCreate = (props) => {
  const { handleSubmit, createConnection } = props;
  const titleName = 'Setting Connections';
  return (
    <PageContent>
      <HeaderPageContent titlePageContent={titleName}/>
      <Form onSubmit={handleSubmit(values => {
        values.type_name = find(typeNameList, { id: parseInt(values.type_id) }).name;
        createConnection(values);
        browserHistory.goBack();
      })}>
        <FormRow>
          <FormColumn style={{ marginLeft: '5%' }}>
            {FieldSelect('Buyer', 'buyer_id', Select, typeNameList, requiredForSelect, optionDefault())}
            {FieldSelect('Farmer *', 'farmer_id', Select, typeNameList, requiredForSelect, optionDefault())}
            {FieldDatePicker('BirthDay *', 'birthday', props, getDateTimeValue(initData.birthday))}
            {FieldSelect('Status *', 'status', Select, typeNameList, requiredForSelect, optionDefault())}
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
    </PageContent>
  )
};

const EnhanceConnectionCreate = compose(
  connect(
    state => ({}),
    ({
      createConnection,
    })
  ),
  withState('showColor', 'setShowColor', false),
  withState('errorDatePicker', 'setErrorDatePicker', null),
  reduxForm({
    form: 'connectionCreate',
  }),
)
(ConnectionCreate);

export default EnhanceConnectionCreate;

