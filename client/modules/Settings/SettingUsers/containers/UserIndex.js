import PageContent, { HeaderPageContent, AddButton } from '../../../../util/common/PageContent';
import { Table, TableRow, TableColumn, UpdateButton, DeleteButton, AccountButton } from '../../../../util/common/Table';
import { Toast } from '../../../../util/common/Toast';
import Confirm from '../../../../util/common/Confirm';
import { formatDate } from '../../../../util/helper/dateTime';
import {
  fetchUserData,
  getCurrentUserData,
  deleteBuyer,
  deleteFarmer,
  initDataForUpdateBuyerForm,
  initDataForUpdateFarmerForm,
} from '../UserAction';
import {
  usersListSelector,
  createUserSuccessSelector,
  updateUserSuccessSelector,
  deleteUserSuccessSelector,
} from '../UserReducer';
import React from 'react';
import { compose, withState, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

const showTypeName = (typeId) => {
  if (typeId === 1)
    return 'Buyer';
  return 'Farmer';
};

const showConfirm = (currentUser, deleteBuyer, deleteFarmer, setDeleting) => {
  return (
    <Confirm
      onConfirm={() => {
        if (currentUser.type_id == 1)
          deleteBuyer(currentUser.id);
        if (currentUser.type_id == 2)
          deleteFarmer(currentUser.id);
        setDeleting(false);
      }}
      onCancel={() => setDeleting(false)}/>
  );
};

const UserIndex = (props) => {
  const {
    usersList, getCurrentUserData, setCurrentUser, currentUser, setDeleting, deleting, deleteBuyer, deleteFarmer,
    initDataForUpdateBuyerForm, initDataForUpdateFarmerForm,
  } = props;
  const titleName = 'Setting Users';
  const tableHeaderList = [
    'STT', 'Name', 'Type Name', 'Birthday', 'Phone', 'Address', 'Options',
  ];
  return (
    <PageContent>
      <HeaderPageContent titlePageContent={titleName}>
        <AddButton style={{ marginRight: '5px' }}
                   onClick={() => browserHistory.push(`/settingUser/create`)}/>
      </HeaderPageContent>
      <Table tableHeaderList={tableHeaderList}>
        {usersList.map((user, index) => (
          <TableRow key={index}>
            <TableColumn value={index + 1}/>
            <TableColumn value={user.name}/>
            <TableColumn value={showTypeName(user.type_id)}/>
            <TableColumn value={formatDate(user.birthday)}/>
            <TableColumn value={user.phone}/>
            <TableColumn value={user.address}/>
            <TableColumn value={
              <div>
                <UpdateButton onClick={() => {
                  if (user.type_id == 1)
                    initDataForUpdateBuyerForm(user);
                  if (user.type_id == 2)
                    initDataForUpdateFarmerForm(user);
                  browserHistory.push(`/settingUser/update`);
                }}/>
                <DeleteButton onClick={() => {
                  setCurrentUser(user);
                  setDeleting(true);
                }}/>
                <AccountButton onClick={() => {
                  getCurrentUserData(user);
                  browserHistory.push(`/settingAccount`);
                }}/>
              </div>
            }/>
          </TableRow>
        ))}
      </Table>
      {deleting ? showConfirm(currentUser, deleteBuyer, deleteFarmer, setDeleting) : null}
    </PageContent>
  )
};
const EnhanceUserIndex = compose(
  connect(
    state => ({
      usersList: usersListSelector(state),
      createUserSuccess: createUserSuccessSelector(state),
      updateUserSuccess: updateUserSuccessSelector(state),
      deleteUserSuccess: deleteUserSuccessSelector(state),
    }),
    ({
      fetchUserData,
      getCurrentUserData,
      initDataForUpdateBuyerForm,
      initDataForUpdateFarmerForm,
      deleteBuyer,
      deleteFarmer,
    })
  ),
  withState('deleting', 'setDeleting', false),
  withState('currentUser', 'setCurrentUser', null),
  lifecycle({
    componentDidMount(){
      const { fetchUserData } = this.props;
      fetchUserData();
    },
    componentWillReceiveProps(nextProps){
      const { createUserSuccess, updateUserSuccess, deleteUserSuccess } = nextProps;
      Toast(createUserSuccess, updateUserSuccess, deleteUserSuccess);
    }
  })
)(UserIndex);
export default EnhanceUserIndex;



