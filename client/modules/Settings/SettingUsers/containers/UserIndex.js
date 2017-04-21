import PageContents from '../../../../util/common/PageContent';
import HeaderPageContent from '../../../../util/common/HeaderPageContent';
import AddButton from '../../../../util/common/AddButton';
import { Table, TableRow, TableColumn, UpdateButton, DeleteButton, AccountButton } from '../../../../util/common/Table';
import React from 'react';
import { compose } from 'recompose';
import { browserHistory } from 'react-router';

const tableHeaderList = [
  'STT', 'Name', 'Type', 'Options',
];

const UserIndex = () => {
  let titleName = 'Setting users';
  return (
    <PageContents>
      <HeaderPageContent titlePageContent={titleName}>
        <AddButton style={{ marginRight: '5px' }}
                   onClick={() => browserHistory.push(`/settingUser/userCreate`)}/>
      </HeaderPageContent>
      <Table tableHeaderList={tableHeaderList}>
        <TableRow>
          <TableColumn value="1"/>
          <TableColumn value="Themring"/>
          <TableColumn value="Buyer"/>
          <TableColumn value={
            <div>
              <UpdateButton/>
              <DeleteButton/>
              <AccountButton onClick={() => browserHistory.push(`/settingAccount`)}/>
            </div>
          }/>

        </TableRow>
      </Table>
    </PageContents>
  )
};
const EnhanceUserIndex = compose()(UserIndex);
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
