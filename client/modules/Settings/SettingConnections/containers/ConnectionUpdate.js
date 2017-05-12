import PageContent, { HeaderPageContent } from '../../../../util/common/PageContent';
import { Form, FormRow, FormColumn, CancelButton, SaveButton } from '../../../../util/common/Form';
import {
  Select,
  FieldSelect,
  FieldDatePicker,
  FieldColor,
} from '../../../../util/common/Form';
import { updateConnection } from '../ConnectionAction';
import { initDataForUpdateElementFormSelector } from '../ConnectionReducer';
import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { reduxForm } from 'redux-form';
import { isEmpty, find } from 'lodash';
import { compose, withState } from 'recompose';

const requiredForSelect = value => isEmpty(value) ? 'Vui lòng không để trống!' : undefined;
const optionDefault = () => (<option value='' disabled>Select your option</option>);
const titleName = 'Setting Connections';
const typeNameList = [{ id: 1, name: 'Dài ngày' }, { id: 2, name: 'Ngắn ngày' }];

const ConnectionUpdate = (props) => {
  const { handleSubmit, updateConnection, initData } = props;
  return (
    <PageContent>
      <HeaderPageContent titlePageContent={titleName}/>
      <Form onSubmit={handleSubmit(values => {
        values.type_name = find(typeNameList, { id: parseInt(values.type_id) }).name;
        values.images = values.images ? values.images : null;
        values.description = values.description ? values.description : null;
        updateConnection(values.id, values);
        browserHistory.goBack();
      })}>
        <FormRow>
          <FormColumn style={{ marginLeft: '5%' }}>
            {FieldSelect('Buyer', 'buyer_id', Select, typeNameList, requiredForSelect, optionDefault())}
            {FieldSelect('Farmer *', 'farmer_id', Select, typeNameList, requiredForSelect, optionDefault())}
            {FieldDatePicker('BirthDay *', 'birthday', props, getDateTimeValue(initData.birthday))}
            {FieldSelect('Status *', 'status', Select, typeNameList, requiredForSelect, optionDefault())}
            {FieldColor('Color *', 'color', requiredForInput, props, initData.color)}
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

const EnhanceConnectionUpdate = compose(
  connect(
    state => ({
      initData: initDataForUpdateConnectionFormSelector(state),
      initialValues: initDataForUpdateConnectionFormSelector(state),
    }),
    ({
      updateConnection,
    })
  ),
  withState('showColor', 'setShowColor', false),
  reduxForm({
    form: 'connectionUpdate',
  })
)(ConnectionUpdate);

export default EnhanceConnectionUpdate;


