import PageContent, { HeaderPageContent } from '../../../../util/common/PageContent';
import { Form, FormRow, FormColumn, CancelButton, SaveButton, Input, FieldInput } from '../../../../util/common/Form';
import { getUserType, createBuyer, createFarmer } from '../UserAction';
import { userTypeSelector } from '../UserReducer';
import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { compose, withState } from 'recompose';
import { reduxForm } from 'redux-form';
import { BuyerForm } from '../components/BuyerForm';
import { FarmerForm } from '../components/FarmerForm';
import { UserTypeSelect } from '../components/UserTypeSelect';

const requiredForInput = value => value ? undefined : 'Vui lòng không để trống!';
const maxLength = max => value => value && value.length > max ? `Vui lòng nhập dưới ${max} kí tự!` : undefined;
const optionDefault = () => (<option value='' key={0}>Choose type name</option>);
const typeNameList = [{ id: 1, name: 'Buyer' }, { id: 2, name: 'Farmer' }];

const showForm = (userType, props) => {
  if (userType == 1)
    return BuyerForm(props);
  else if (userType == 2)
    return FarmerForm(props);
  return null
};

const UserCreate = (props) => {
  let titleName = 'Setting users';
  const { userType } = props;
  return (
    <PageContent>
      <HeaderPageContent titlePageContent={titleName}/>
      {UserTypeSelect(typeNameList, props)}
      {showForm(userType, props)}
    </PageContent>
  );
};

const EnhanceUserCreate = compose(
  connect(
    state => ({
      userType: userTypeSelector(state),
    }),
    ({
      getUserType,
      createBuyer,
      createFarmer,
    })
  ),
  reduxForm({
    form: 'userCreate',
  })
)(UserCreate);

export default EnhanceUserCreate;


