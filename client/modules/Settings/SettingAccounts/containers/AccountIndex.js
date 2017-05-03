import PageContent from '../../../../util/common/PageContent';
import HeaderPageContent from '../../../../util/common/HeaderPageContent';
import AddButton from '../../../../util/common/AddButton';
import BackButton from '../../../../util/common/BackButton';
import { Table, TableRow, TableColumn, UpdateButton, DeleteButton } from '../../../../util/common/Table';
import { currentUserDataSelector } from '../../SettingUsers/UserReducer';
import React from 'react';
import { compose } from 'recompose'
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
const tableHeaderList = [
  'UserName', 'Password', 'Option'];


const AccountIndex = (props) => {
  const { currentUser }= props;
  const titleName = `${currentUser.name}`;
  return (
    <PageContent>
      <HeaderPageContent titlePageContent={titleName}>
        <AddButton style={{ marginRight: '5px' }} onClick={() => browserHistory.push(`/settingAccount/accountCreate`)}/>
        <BackButton onClick={() => browserHistory.goBack()}/>
      </HeaderPageContent>
      <Table tableHeaderList={tableHeaderList}>
        <TableRow>
          <TableColumn value={currentUser.username}/>
          <TableColumn value={currentUser.password}/>
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
  //state => (currentUser: getCurrentUserDataSelector), ({ getCurrentUserData })
  connect(
    state => ({
      currentUser: currentUserDataSelector(state),
    })
  )
)(AccountIndex);
export default EnhanceAccountIndex;
