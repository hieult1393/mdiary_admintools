import PageContent, { HeaderPageContent } from '../../../../util/common/PageContent';
import { Form, FormRow, FormColumn, CancelButton, SaveButton, Input, FieldInput } from '../../../../util/common/Form';
import { createPesticide } from '../PesticideAction';
import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { reduxForm } from 'redux-form';
import { isEmpty, find } from 'lodash';
import { compose } from 'recompose';

const requiredForInput = value => value ? undefined : 'Vui lòng không để trống!';
const maxLength = max => value => value && value.length > max ? `Vui lòng nhập dưới ${max} kí tự!` : undefined;

const PesticideCreate = (props) => {
  const { handleSubmit, createPesticide } = props;
  const titleName = 'Setting pesticides';
  return (
    <PageContent>
      <HeaderPageContent titlePageContent={titleName}/>
      <Form onSubmit={handleSubmit(values => {
        createPesticide(values);
        browserHistory.goBack();
      })}>
        <FormRow>
          <FormColumn style={{ marginLeft: '5%' }}>
            {FieldInput('Pesticide Name *', 'name', Input, [requiredForInput, maxLength(20)], 'text', 'Input pesticide name')}
            {FieldInput('Active Substance *', 'active_substance', Input, requiredForInput, 'text', 'Input activity substance')}
            {FieldInput('Use For *', 'use_for', Input, requiredForInput, 'text', 'Input use for')}
            {FieldInput('Dosage *', 'dosage', Input, requiredForInput, 'text', 'Input dosage')}
          </FormColumn>
          <FormColumn>
            {FieldInput('Count *', 'count', Input, requiredForInput, 'number', 'Input count')}
            {FieldInput('Isolation(day) *', 'isolation', Input, requiredForInput, 'number', 'Input isolation')}
            {FieldInput('Unit *', 'unit', Input, requiredForInput, 'text', 'Input unit')}
          </FormColumn>
        </FormRow>
        <FormRow>
          <div style={{ float: 'right', marginRight: '3%' }}>
            <CancelButton style={{ width: '70px', height: '34px' }} onClick={() => browserHistory.goBack()}/>
            <SaveButton style={{ marginLeft: '5px' }}/>
          </div>
        </FormRow>
      </Form>
    </PageContent>
  )
};

const EnhancePesticideCreate = compose(
  connect(
    state => ({}),
    ({
      createPesticide,
    })
  ),
  reduxForm({
    form: 'pesticideCreate',
  }),
)
(PesticideCreate);

export default EnhancePesticideCreate;
