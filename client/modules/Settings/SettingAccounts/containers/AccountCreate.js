import PageContent, { HeaderPageContent } from '../../../../util/common/PageContent';
import { Form, FormRow, FormColumn, CancelButton, SaveButton } from '../../../../util/common/Form';
import { Input, FieldInput } from '../../../../util/common/Form';
import { createAccount } from '../AccountAction';
import { currentUserDataSelector } from '../../SettingUsers/UserReducer';
import React from 'react';
import { find, isEmpty } from 'lodash';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { browserHistory } from 'react-router';
import { compose } from 'recompose';

const requiredForInput = value => value ? undefined : 'Please do not leave it blank!';
const maxLength = max => value => value && value.length > max ? `Please enter below${max}characters!` : undefined;

const AccountCreate = (props) => {
  const { handleSubmit, createAccount, currentUserData } = props;
  const titleName = 'Setting account';
  return (
    <PageContent>
      <HeaderPageContent titlePageContent={titleName}/>
      <Form onSubmit={handleSubmit(values => {
        values.person_id = currentUserData.id;
        values.type_id = currentUserData.type_id;
        values.name = currentUserData.name;
        createAccount(values);
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
      currentUserData: currentUserDataSelector(state),
    }),
    ({
      createAccount,
    })
  ),
  reduxForm({
    form: 'accountCreate',
  })
)(AccountCreate);
export default EnhanceAccountCreate;
