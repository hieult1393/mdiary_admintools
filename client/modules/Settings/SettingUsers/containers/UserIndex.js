import PageContent from '../../../../util/common/PageContent';
import HeaderPageContent from '../../../../util/common/HeaderPageContent';
import AddButton from '../../../../util/common/AddButton';
import { Table, TableRow, TableColumn, UpdateButton, DeleteButton, AccountButton } from '../../../../util/common/Table';
import { fetchUserData, getCurrentUserData } from '../UserAction';
import React from 'react';
import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import { userDataSelector, fetchUserDataSelector } from '../UserReducer';
import { browserHistory } from 'react-router';

const tableHeaderList = [
  'STT', 'Name', 'Type', 'User Name', 'Options',
];

const UserIndex = (props) => {
  let titleName = 'Setting users';
  const { userListSelector, fetchUserDataSelector, getCurrentUserData } = props;
  return (
    <PageContent>
      <HeaderPageContent titlePageContent={titleName}>
        <AddButton style={{ marginRight: '5px' }}
                   onClick={() => browserHistory.push(`/settingUser/userCreate`)}/>
      </HeaderPageContent>
      <Table tableHeaderList={tableHeaderList}>
        {userListSelector.map((user, index) => (
          <TableRow key={index}>
            <TableColumn value={index + 1}/>
            <TableColumn value={user.name}/>
            <TableColumn value={user.type_id}/>
            <TableColumn value={user.username}/>
            <TableColumn value={
              <div>
                <UpdateButton/>
                <DeleteButton/>
                <AccountButton onClick={() => {
                  getCurrentUserData(user);
                  browserHistory.push(`/settingAccount`)
                }}/>
              </div>
            }/>
          </TableRow>
        ))}
      </Table>
    </PageContent>
  )
};
const EnhanceUserIndex = compose(
  connect(
    state => ({
      userListSelector: userDataSelector(state),
      fetchUserDataSelector: fetchUserDataSelector(state),
    }),
    ({
      fetchUserData, getCurrentUserData
    })
  ),
  lifecycle({
    componentDidMount(){
      const { fetchUserData } = this.props;
      fetchUserData();
    }
  })
)(UserIndex);
export default EnhanceUserIndex;

