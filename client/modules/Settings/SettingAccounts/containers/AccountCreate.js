import PageContent, { HeaderPageContent } from '../../../../util/common/PageContent';
import { Form, FormRow, FormColumn, CancelButton, SaveButton } from '../../../../util/common/Form';
import { Input, FieldInput, Select, FieldSelect } from '../../../../util/common/Form';
import { createUserAccount } from '../AccountAction';
import { find, isEmpty } from 'lodash';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { browserHistory } from 'react-router';
import { compose } from 'recompose';
import React from 'react';
const optionDefault = () => (<option value='' key={0}>Choose type name</option>);
const titleName = 'UserAccount';
const typeStateList = [{ id: 0, name: 'not connect' }, { id: 1, name: 'connect' }];

const requiredForInput = value => value ? undefined : 'Please do not leave it blank!';
const requiredForSelect = value => isEmpty(value) ? 'Please do not leave it blank!' : undefined;
const maxLength = max => value => value && value.length > max ? `Please enter below${max}characters!` : undefined;

const AccountCreate = (props) => {
  const { handleSubmit, createNewAccount }=props;
  return (
    <PageContent>
      <HeaderPageContent titlePageContent={titleName}/>
      <Form onSubmit={handleSubmit(values => {
        values.type_name = find(typeStateList, { id: parseInt(values.type_id) }).name;
        //console.log('values', values);
        createNewAccount(values);
        browserHistory.goBack();
      })}>
        <FormRow>
          <FormColumn style={{ marginLeft: '5px' }}>
            {FieldInput('NAME*', 'name', Input, [requiredForInput, maxLength(20)], 'text', 'please write your name')}
            {FieldInput('USER NAME*', 'username', Input, [requiredForInput, maxLength(20)], 'text', 'please write your username')}
            {FieldInput('PASSWORD*', 'password', Input, [requiredForInput, maxLength(20)], 'text', 'input password')}
            {FieldSelect('STATUS *', 'status', Select, typeStateList, requiredForSelect, optionDefault())}
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
  //connect(mapStateToProps(selector like props),mapDispatchToProps(foraxtions like props))
  connect(
    state => ({}),
    ({
      createUserAccount,
    })
  ),
  reduxForm({
    form: 'accountCreate',
  })
)(AccountCreate);
export default EnhanceAccountCreate;
