import React from 'react';
import PageContent,{ HeaderPageContent, AddButton } from '../../../../util/common/PageContent';
import { Table, TableRow, TableColumn, UpdateButton, DeleteButton } from '../../../../util/common/Table';
import {
  connectionsListSelector,
  createConnectionSuccessSelector,
  updateConnectionSuccessSelector,
  deleteConnectionSuccessSelector,
} from '../ConnectionReducer';
import { Toast }from '../../../../util/common/Toast';
import {
  fetchConnectionData,
  deleteConnection,
  initDataForUpdateConnectionForm,
} from '../ConnectionAction';
import { compose } from 'recompose';
const TableHeaderList = ['Farmer-ID', 'Buyer-ID', 'Date', 'Status',];
const showConfirm = (connectionId, deleteConnection, setDeleting) => {
  return (
    <Confirm
      onConfirm={() => {
        deleteConnection(connectionId);
        setDeleting(false);
      }}
      onCancel={() => setDeleting(false)}/>
  );
};

const connectionIndex = (props) => {
  const {
    connectionsList, setCurrentConnectionId, currentConnectionId, setDeleting, deleting, deleteConnection,
    initDataForUpdateConnectionForm
  } = props;
  const titleName = 'Setting Connections';
  return (
    <PageContent>
      <HeaderPageContent headerPageTitle={titleName}>
        <AddButton style={{ marginRight: '5px' }}/>
      </HeaderPageContent>
      <Table TableHeaderList={TableHeaderList}>
        {connectionsList.map((connection, index) => (
          <TableRow key={index}>
            <TableColumn values={index + 1}/>
            <TableColumn values={connection.farmer_id}/>
            <TableColumn values={connection.buyer_id}/>
            <TableColumn values={connection.date}/>
            <TableColumn values={connection.status}/>
            <TableColumn values={
              <div>
                <UpdateButton/>
                <DeleteButton/>
              </div>
            }/>
          </TableRow>
        ))}
      </Table>
      {deleting ? showConfirm(currentConnectionId, deleteConnection, setDeleting) : null}
    </PageContent>
  )
  
};
const EnhanceConnectionIndex = compose(
  connect(
    state => ({
      connectionsList: connectionsListSelector(state),
      createConnectionSuccess: createConnectionSuccessSelector(state),
      updateConnectionSuccess: updateConnectionSuccessSelector(state),
      deleteConnectionSuccess: deleteConnectionSuccessSelector(state),
    }),
    ({
      fetchConnectionData,
      deleteConnection,
      initDataForUpdateConnectionForm,
    })
  ),
  withState('deleting', 'setDeleting', false),
  withState('currentConnectionId', 'setCurrentConnectionId', null),
  lifecycle({
    componentDidMount(){
      const { fetchConnectionData } = this.props;
      fetchConnectionData();
    },
    componentWillReceiveProps(nextProps){
      const { createConnectionSuccess, updateConnectionSuccess, deleteConnectionSuccess } = nextProps;
      Toast(createConnectionSuccess, updateConnectionSuccess, deleteConnectionSuccess);
    }
  })
)(connectionIndex);
export default EnhanceConnectionIndex;
