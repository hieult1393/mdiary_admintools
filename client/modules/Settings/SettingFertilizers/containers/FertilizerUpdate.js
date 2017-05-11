import PageContent, { HeaderPageContent } from '../../../../util/common/PageContent';
import { Form, FormRow, FormColumn, CancelButton, SaveButton, Input, FieldInput } from '../../../../util/common/Form';
import { updateFertilizer } from '../FertilizerAction';
import { initDataForUpdateFertilizerFormSelector } from '../FertilizerReducer';
import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { reduxForm } from 'redux-form';
import { isEmpty, find } from 'lodash';
import { compose } from 'recompose';

const requiredForInput = value => value ? undefined : 'Vui lòng không để trống!';
const maxLength = max => value => value && value.length > max ? `Vui lòng nhập dưới ${max} kí tự!` : undefined;

const FertilizerUpdate = (props) => {
  const { handleSubmit, updateFertilizer } = props;
  const titleName = 'Setting fertilizers';
  return (
    <PageContent>
      <HeaderPageContent titlePageContent={titleName}/>
      <Form onSubmit={handleSubmit(values => {
        updateFertilizer(values.id, values);
        browserHistory.goBack();
      })}>
        <FormRow>
          <FormColumn style={{ marginLeft: '5%' }}>
            {FieldInput('Fertilizer Name *', 'name', Input, [requiredForInput, maxLength(20)], 'text', 'Input fertilizer name')}
            {FieldInput('Ingredients *', 'ingredients', Input, requiredForInput, 'text', 'Input Ingredients')}
            {FieldInput('Use For *', 'use_for', Input, requiredForInput, 'text', 'Input use for')}
          </FormColumn>
          <FormColumn>
            {FieldInput('Dosage *', 'dosage', Input, requiredForInput, 'text', 'Input dosage')}
            {FieldInput('Usage *', 'usage', Input, requiredForInput, 'text', 'Input Usage')}
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

const EnhanceFertilizerUpdate = compose(
  connect(
    state => ({
      initialValues: initDataForUpdateFertilizerFormSelector(state),
    }),
    ({
      updateFertilizer,
    })
  ),
  reduxForm({
    form: 'fertilizerUpdate',
  }),
)
(FertilizerUpdate);

export default EnhanceFertilizerUpdate;
