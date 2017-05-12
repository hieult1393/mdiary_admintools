import PageContent, { HeaderPageContent } from '../../../../util/common/PageContent';
import { getUserType, createBuyer, createFarmer } from '../UserAction';
import { userTypeSelector } from '../UserReducer';
import React from 'react';
import { connect } from 'react-redux';
import { compose, withState, lifecycle } from 'recompose';
import { reduxForm } from 'redux-form';
import { BuyerCreateForm } from '../components/BuyerCreateForm';
import { FarmerCreateForm } from '../components/FarmerCreateForm';
import { UserTypeSelect } from '../components/UserTypeSelect';
const typeNameList = [{ id: 1, name: 'Buyer' }, { id: 2, name: 'Farmer' }];

const showForm = (userType, props) => {
  if (userType == 1)
    return BuyerCreateForm(props);
  else if (userType == 2)
    return FarmerCreateForm(props);
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
  withState('errorDatePicker', 'setErrorDatePicker', null),
  reduxForm({
    form: 'userCreate',
  }),
  lifecycle({
    componentDidMount(){
      const { getUserType } = this.props;
      getUserType('undefined');
    }
  })
)(UserCreate);

export default EnhanceUserCreate;


