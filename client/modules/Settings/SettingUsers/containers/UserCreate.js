import PageContent from '../../../../util/common/PageContent';
import HeaderPageContent from '../../../../util/common/HeaderPageContent';
import { Form, FormRow, FormColumn, CancelButton, SaveButton, Input, FieldInput } from '../../../../util/common/Form';
import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { compose } from 'recompose';
import { reduxForm } from 'redux-form';

const requiredForInput = value => value ? undefined : 'Vui lòng không để trống!';
const maxLength = max => value => value && value.length > max ? `Vui lòng nhập dưới ${max} kí tự!` : undefined;

const UserCreate = () => {
  let titleName = 'Setting users';
  return (
    <PageContent>
      <HeaderPageContent titlePageContent={titleName}/>
      <Form>
        <FormRow>
          <FormColumn style={{ marginLeft: '5%' }}>
            {FieldInput('Name *', 'name', Input, [requiredForInput, maxLength(20)], 'text', 'Input name')}
            {FieldInput('Gender *', 'gender', Input, [requiredForInput], 'text', 'Input gender')}
            {FieldInput('User type *', 'userType', Input, [requiredForInput, maxLength(20)], 'text', 'Input user type')}
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
  );
};

const EnhanceUserCreate = compose(
  reduxForm({
    form: 'userCreate',
  })
)(UserCreate);

export default EnhanceUserCreate;

