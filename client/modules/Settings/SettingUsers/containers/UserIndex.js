import PageContent, { HeaderPageContent, AddButton } from '../../../../util/common/PageContent';
import { Table, TableRow, TableColumn, UpdateButton, DeleteButton, AccountButton } from '../../../../util/common/Table';
import { fetchUserData, getCurrentUserData, initDataForUpdateElementForm } from '../UserAction';
import React from 'react';
import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import { usersListSelector } from '../UserReducer';
import { browserHistory } from 'react-router';

const tableHeaderList = [
  'STT', 'Name', 'Type', 'User Name', 'Options',
];

const UserIndex = (props) => {
  let titleName = 'Setting users';
  const { usersList, getCurrentUserData } = props;
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
                <DeleteButton/>
                <AccountButton onClick={() => {
                  getCurrentUserData(user);
                  browserHistory.push(`/settingAccount`);
                }}/>
              </div>
            }/>
          </TableRow>
        ))}
      </Table>
    </PageContent>
  );
};
const EnhanceUserIndex = compose(
  connect(
    state => ({
      usersList: usersListSelector(state),
    }),
    ({
      fetchUserData,
      getCurrentUserData,
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

