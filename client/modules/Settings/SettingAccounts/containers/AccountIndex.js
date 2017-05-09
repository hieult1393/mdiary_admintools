import PageContent, { HeaderPageContent, AddButton, BackButton } from '../../../../util/common/PageContent';
import { Table, TableRow, TableColumn, UpdateButton, DeleteButton } from '../../../../util/common/Table';
import { currentUserDataSelector } from '../../SettingUsers/UserReducer';
import Toast from '../../../../util/common/Toast';
import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { compose, lifecycle } from 'recompose';

const tableHeaderList = [
  'STT', 'User Name', 'Password', 'Type', 'Options',
];

const AccountIndex = (props) => {
  const { currentUserData } = props;
  const titleName = `${currentUserData.name}`;
  Toast(CreateAccountSuccess, UpdateAccountSuccess, DeleteAccountSuccess)
  return (
    <PageContent>
      <HeaderPageContent titlePageContent={titleName}>
        <AddButton style={{ marginRight: '5px' }}
                   onClick={() => browserHistory.push(`/settingAccount/create`)}/>
        <BackButton onClick={() => browserHistory.goBack()}/>
      </HeaderPageContent>
      <Table tableHeaderList={tableHeaderList}>
        <TableRow >
          <TableColumn value={1}/>
          <TableColumn value={currentUserData.username}/>
          <TableColumn value={currentUserData.password}/>
          <TableColumn value={currentUserData.type_id}/>
          <TableColumn value={
            <div>
              <UpdateButton/>
              <DeleteButton/>
            </div>
          }/>
        </TableRow>
      </Table>
    </PageContent>
  );
};

const EnhanceAccountIndex = compose(
  connect(
    state => ({
      currentUserData: currentUserDataSelector(state),
    })
  )
)(AccountIndex);
export default EnhanceAccountIndex;
