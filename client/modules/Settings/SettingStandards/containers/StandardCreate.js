import PageContent, { HeaderPageContent } from '../../../../util/common/PageContent';
import { Form, FormRow, FormColumn, CancelButton, SaveButton, Input, FieldInput } from '../../../../util/common/Form';
import { createStandard } from '../StandardAction';
import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { reduxForm } from 'redux-form';
import { isEmpty, find } from 'lodash';
import { compose } from 'recompose';

const requiredForInput = value => value ? undefined : 'Vui lòng không để trống!';
const maxLength = max => value => value && value.length > max ? `Vui lòng nhập dưới ${max} kí tự!` : undefined;

const StandardCreate = (props) => {
  const { handleSubmit, createStandard } = props;
  const titleName = 'Setting standards';
  return (
    <PageContent>
      <HeaderPageContent titlePageContent={titleName}/>
      <Form onSubmit={handleSubmit(values => {
        createStandard(values);
        browserHistory.goBack();
      })}>
        <FormRow>
          <FormColumn style={{ marginLeft: '5%' }}>
            {FieldInput('Standard Name *', 'name', Input, requiredForInput, 'text', 'Input standard name')}
            {FieldInput('Description *', 'description', Input, null, 'text', 'Input description')}
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

const EnhanceStandardCreate = compose(
  connect(
    state => ({}),
    ({
      createStandard,
    })
  ),
  reduxForm({
    form: 'standardCreate',
  }),
)
(StandardCreate);

export default EnhanceStandardCreate;
