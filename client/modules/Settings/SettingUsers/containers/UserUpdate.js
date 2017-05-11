import PageContent, { HeaderPageContent } from '../../../../util/common/PageContent';
import { updateBuyer, updateFarmer } from '../UserAction';
import { initDataForUpdateUserFormSelector } from '../UserReducer';
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { reduxForm } from 'redux-form';
import { BuyerUpdateForm } from '../components/BuyerUpdateForm';
import { FarmerUpdateForm } from '../components/FarmerUpdateForm';

const showForm = (initData, props) => {
  if (initData.type_id == 1)
    return BuyerUpdateForm(props);
  else if (initData.type_id == 2)
    return FarmerUpdateForm(props);
  return null
};

const UserUpdate = (props) => {
  let titleName = 'Setting users';
  const { initData } = props;
  return (
    <PageContent>
      <HeaderPageContent titlePageContent={titleName}/>
      {showForm(initData, props)}
    </PageContent>
  );
};

const EnhanceUserUpdate = compose(
  connect(
    state => ({
      initData: initDataForUpdateUserFormSelector(state),
      initialValues: initDataForUpdateUserFormSelector(state),
    }),
    ({
      updateBuyer,
      updateFarmer,
    })
  ),
  reduxForm({
    form: 'userUpdate',
  })
)(UserUpdate);

export default EnhanceUserUpdate;


