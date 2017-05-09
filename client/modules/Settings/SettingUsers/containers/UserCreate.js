import PageContent, { HeaderPageContent } from '../../../../util/common/PageContent';
import { Form, FormRow, FormColumn, CancelButton, SaveButton, Input, FieldInput } from '../../../../util/common/Form';
import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Select, FieldSelect } from '../../../../util/common/Form';
import { compose, withState } from 'recompose';
import { reduxForm } from 'redux-form';
import BuyerForm from '../components/BuyerForm';
import FarmerForm from '../components/FarmerForm';

const requiredForInput = value => value ? undefined : 'Vui lòng không để trống!';
const maxLength = max => value => value && value.length > max ? `Vui lòng nhập dưới ${max} kí tự!` : undefined;
const optionDefault = () => (<option value='' key={0}>Choose type name</option>);
const typeNameList = [{ id: 1, name: 'Buyer' }, { id: 2, type_name: 'Farmer' }];

const showForm = (userType) => {
  if (userType === 1)
    return <BuyerForm/>;
    else
  return <FarmerForm/>;
};

const UserCreate = (props) => {
  let titleName = 'Setting users';
  const { userType } = props;
  console.log('userType :', userType);
  return (
    <PageContent>
      <HeaderPageContent titlePageContent={titleName}/>
      {showForm(userType)}
    </PageContent>
  );
};

const EnhanceUserCreate = compose(
  connect(
    state => ({}),
    ({})
  ),
  withState('userType', 'setUserType', 1),
  reduxForm({
    form: 'userCreate',
  })
)(UserCreate);

export default EnhanceUserCreate;


