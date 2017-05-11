import PageContent, { HeaderPageContent } from '../../../../util/common/PageContent';
import { Form, FormRow, FormColumn, CancelButton, SaveButton, Input, FieldInput } from '../../../../util/common/Form';
import { updateAccount } from '../AccountAction';
import { initDataForUpdateAccountFormSelector } from '../AccountReducer'
import React from 'react';
import { find, isEmpty } from 'lodash';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { browserHistory } from 'react-router';
import { compose } from 'recompose';

const requiredForInput = value => value ? undefined : 'Vui lòng không để trống!';
const maxLength = max => value => value && value.length > max ? `Vui lòng nhập dưới ${max} kí tự!` : undefined;

const AccountCreate = (props) => {
  const { handleSubmit, updateAccount, initData } = props;
  const titleName = 'Setting account';
  return (
    <PageContent>
      <HeaderPageContent titlePageContent={titleName}/>
      <Form onSubmit={handleSubmit(values => {
        updateAccount(values.id, values);
        browserHistory.goBack();
      })}>
        <FormRow>
          <FormColumn style={{ marginLeft: '5px' }}>
            {FieldInput('User Name *', 'username', Input, [requiredForInput, maxLength(20)], 'text', 'Input user name')}
            {FieldInput('Password *', 'password', Input, requiredForInput, 'text', 'Input password')}
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
const EnhanceAccountCreate = compose(
  connect(
    state => ({
      initData: initDataForUpdateAccountFormSelector(state),
      initialValues: initDataForUpdateAccountFormSelector(state),
    }),
    ({
      updateAccount,
    })
  ),
  reduxForm({
    form: 'accountUpdate',
  })
)(AccountCreate);
export default EnhanceAccountCreate;
