import PageContent, { HeaderPageContent } from '../../../../util/common/PageContent';
import { Form, FormRow, FormColumn, CancelButton, SaveButton, Input, FieldInput } from '../../../../util/common/Form';
import { updateStandard } from '../StandardAction';
import { initDataForUpdateStandardFormSelector } from '../StandardReducer';
import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { reduxForm } from 'redux-form';
import { isEmpty, find } from 'lodash';
import { compose } from 'recompose';

const requiredForInput = value => value ? undefined : 'Vui lòng không để trống!';
const maxLength = max => value => value && value.length > max ? `Vui lòng nhập dưới ${max} kí tự!` : undefined;

const StandardUpdate = (props) => {
  const { handleSubmit, updateStandard } = props;
  const titleName = 'Setting standards';
  return (
    <PageContent>
      <HeaderPageContent titlePageContent={titleName}/>
      <Form onSubmit={handleSubmit(values => {
        updateStandard(values.id, values);
        browserHistory.goBack();
      })}>
        <FormRow>
          <FormColumn style={{ marginLeft: '5%' }}>
            {FieldInput('Standard Name *', 'name', Input, [requiredForInput, maxLength(20)], 'text', 'Input standard name')}
            {FieldInput('Description *', 'description', Input, requiredForInput, 'text', 'Input description')}
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

const EnhanceStandardUpdate = compose(
  connect(
    state => ({
      initialValues: initDataForUpdateStandardFormSelector(state),
    }),
    ({
      updateStandard,
    })
  ),
  reduxForm({
    form: 'standardUpdate',
  }),
)
(StandardUpdate);

export default EnhanceStandardUpdate;
