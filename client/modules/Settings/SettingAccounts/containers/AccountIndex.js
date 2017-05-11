import PageContent, { HeaderPageContent, AddButton, BackButton } from '../../../../util/common/PageContent';
import { Table, TableRow, TableColumn, UpdateButton, DeleteButton } from '../../../../util/common/Table';
import Confirm from '../../../../util/common/Confirm';
import { fetchAccountData, deleteAccount, initDataForUpdateAccountForm } from '../AccountAction';
import {
  accountsListSelector,
  createAccountSuccessSelector,
  updateAccountSuccessSelector,
  deleteAccountSuccessSelector
} from '../AccountReducer';
import { currentUserDataSelector } from '../../SettingUsers/UserReducer';
import { Toast } from '../../../../util/common/Toast';
import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { compose, lifecycle, withState } from 'recompose';

const showTypeName = (typeId) => {
  if (typeId === 1)
    return 'Buyer';
  return 'Farmer';
};

const showConfirm = (accountId, deleteAccount, setDeleting) => {
  return (
    <Confirm
      onConfirm={() => {
        deleteAccount(accountId);
        setDeleting(false);
      }}
      onCancel={() => setDeleting(false)}/>
  );
};

const AccountIndex = (props) => {
  const {
    accountsList, currentUserData, setCurrentAccountId,
    currentAccountId, setDeleting, deleting, deleteAccount,
    initDataForUpdateAccountForm
  } = props;
  const titleName = `${currentUserData.name}`;
  const tableHeaderList = [
    'STT', 'Name', 'Type Name', 'User Name', 'Password', 'Options',
  ];
  return (
    <PageContent>
      <HeaderPageContent titlePageContent={titleName}>
        <AddButton style={{ marginRight: '5px' }}
                   onClick={() => browserHistory.push(`/settingAccount/create`)}/>
        <BackButton onClick={() => browserHistory.goBack()}/>
      </HeaderPageContent>
      <Table tableHeaderList={tableHeaderList}>
        {accountsList.map((account, index) => (
          <TableRow key={index}>
            <TableColumn value={index + 1}/>
            <TableColumn value={account.name}/>
            <TableColumn value={showTypeName(currentUserData.type_id)}/>
            <TableColumn value={account.username}/>
            <TableColumn value={account.password}/>
            <TableColumn value={
              <div>
                <UpdateButton onClick={() => {
                  initDataForUpdateAccountForm(account);
                  browserHistory.push(`/settingAccount/update`);
                }}/>
                <DeleteButton onClick={() => {
                  setCurrentAccountId(account.id);
                  setDeleting(true);
                }
                }/>
              </div>
            }/>
          </TableRow>
        ))}
      </Table>
      {deleting ? showConfirm(currentAccountId, deleteAccount, setDeleting) : null}
    </PageContent>
  );
};

const EnhanceAccountIndex = compose(
  connect(
    state => ({
      accountsList: accountsListSelector(state),
      currentUserData: currentUserDataSelector(state),
      createAccountSuccess: createAccountSuccessSelector(state),
      updateAccountSuccess: updateAccountSuccessSelector(state),
      deleteAccountSuccess: deleteAccountSuccessSelector(state),
    }),
    ({
      fetchAccountData,
      deleteAccount,
      initDataForUpdateAccountForm,
    })
  ),
  withState('deleting', 'setDeleting', false),
  withState('currentAccountId', 'setCurrentAccountId', null),
  lifecycle({
    componentDidMount(){
      const { fetchAccountData, currentUserData } = this.props;
      fetchAccountData({ person_id: currentUserData.id, type_id: currentUserData.type_id });
    },
    componentWillReceiveProps(nextProps){
      const { createAccountSuccess, updateAccountSuccess, deleteAccountSuccess } = nextProps;
      Toast(createAccountSuccess, updateAccountSuccess, deleteAccountSuccess);
    },
  })
)(AccountIndex);
export default EnhanceAccountIndex;
