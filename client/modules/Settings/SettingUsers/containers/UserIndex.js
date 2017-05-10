import PageContent, { HeaderPageContent, AddButton } from '../../../../util/common/PageContent';
import { Table, TableRow, TableColumn, UpdateButton, DeleteButton, AccountButton } from '../../../../util/common/Table';
import { Toast } from '../../../../util/common/Toast';
import Confirm from '../../../../util/common/Confirm';
import { fetchUserData, getCurrentUserData, deleteUser } from '../UserAction';
import {
  usersListSelector,
  createUserSuccessSelector,
  deleteUserSuccessSelector,
} from '../UserReducer';
import React from 'react';
import { compose, withState, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

const tableHeaderList = [
  'STT', 'Name', 'Type', 'User Name', 'Options',
];
const showConfirm = (userId, deleteUser, setDeleting) => {
  return (
    <Confirm
      onConfirm={() => {
        deleteUser(userId);
        setDeleting(false);
      }}
      onCancel={() => setDeleting(false)}/>
  );
};

const UserIndex = (props) => {
  let titleName = 'Setting users';
  const { usersList, getCurrentUserData, setCurrentUserId, currentUserId, setDeleting, deleting, deleteUser } = props;
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
            <TableColumn value={user.type_id}/>
            <TableColumn value={user.username}/>
            <TableColumn value={
              <div>
                <UpdateButton/>
                <DeleteButton onClick={() => {
                  setCurrentUserId(user.id);
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
      {deleting ? showConfirm(currentUserId, deleteUser, setDeleting) : null}
    </PageContent>
  )
};
const EnhanceUserIndex = compose(
  connect(
    state => ({
      usersList: usersListSelector(state),
      createUserSuccess: createUserSuccessSelector(state),
      deleteUserSuccess: deleteUserSuccessSelector(state),
    }),
    ({
      fetchUserData,
      deleteUser,
      getCurrentUserData,
    })
  ),
  withState('deleting', 'setDeleting', false),
  withState('currentUserId', 'setCurrentUserId', null),
  lifecycle({
    componentDidMount(){
      const { fetchUserData } = this.props;
      fetchUserData();
    },
    componentWillReceiveProps(nextProps){
      const { createUserSuccess, deleteUserSuccess } = nextProps;
      Toast(createUserSuccess, null, deleteUserSuccess);
    }
  })
)(UserIndex);
export default EnhanceUserIndex;

