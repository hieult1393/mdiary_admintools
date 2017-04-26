import PageContent from '../../../../util/common/PageContent';
import HeaderPageContent from '../../../../util/common/HeaderPageContent';
import AddButton from '../../../../util/common/AddButton';
import { Table, TableRow, TableColumn, UpdateButton, DeleteButton, AccountButton } from '../../../../util/common/Table';
import { fetchUdData } from '../UserAction';
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
  const { userDataSelector, fetchUserDataSelector } = props;
  return (
    <PageContent>
      <HeaderPageContent titlePageContent={titleName}>
        <AddButton style={{ marginRight: '5px' }}
                   onClick={() => browserHistory.push(`/settingUser/userCreate`)}/>
      </HeaderPageContent>
      <Table tableHeaderList={tableHeaderList}>
        {userDataSelector.map((userData, index) => (
          <TableRow key={index}>
            <TableColumn value={index + 1}/>
            <TableColumn value={userData.name}/>
            <TableColumn value={userData.type_id}/>
            <TableColumn value={userData.username}/>
            <TableColumn value={
              <div>
                <UpdateButton/>
                <DeleteButton/>
                <AccountButton onClick={() => browserHistory.push(`/settingAccount`)}/>
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
      userDataSelector: userDataSelector(state),
      fetchUserDataSelector: fetchUserDataSelector(state),
    }),
    ({ fetchUdData })
  ),
  lifecycle({
    componentDidMount(){
      const { fetchUdData } = this.props;
      fetchUdData();
    }
    
  })
)(UserIndex);
export default EnhanceUserIndex;

// class UserIndex extends React.Component {
//   render() {
//     return (
//       <div style={{ width: '100%', display: 'flex' }}>
//         <PageContents/>
//       </div>
//     )
//   }
// }
// export default UserIndex;
