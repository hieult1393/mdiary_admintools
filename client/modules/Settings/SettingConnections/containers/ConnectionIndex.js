import PageContent, { HeaderPageContent, AddButton } from '../../../../util/common/PageContent';
import { Table, TableRow, TableColumn, UpdateButton, DeleteButton } from '../../../../util/common/Table';
import { Toast } from '../../../../util/common/Toast';
import Confirm from '../../../../util/common/Confirm';
import { formatDate } from '../../../../util/helper/dateTime';
import {
  fetchConnectionData,
  deleteConnection,
  initDataForUpdateConnectionForm
} from '../ConnectionAction';
import {
  connectionsListSelector,
  createConnectionSuccessSelector,
  updateConnectionSuccessSelector,
  deleteConnectionSuccessSelector,
} from '../ConnectionReducer';
import React from 'react';
import { compose, withState, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

const showConfirm = (currentConnectionId, deleteConnection, setDeleting) => {
  return (
    <Confirm
      onConfirm={() => {
        deleteConnection(currentConnectionId);
        setDeleting(false);
      }}
      onCancel={() => setDeleting(false)}/>
  );
};

const ConnectionIndex = (props) => {
  const {
    connectionsList, setCurrentConnectionId, currentConnectionId, setDeleting,
    deleting, deleteConnection, initDataForUpdateConnectionForm,
  } = props;
  const titleName = 'Setting Connections';
  const tableHeaderList = [
    'STT', 'Farmer ID', 'Buyer ID', 'Date', 'Status', 'Options',
  ];
  return (
    <PageContent>
      <HeaderPageContent titlePageContent={titleName}>
        <AddButton style={{ marginRight: '5px' }}
                   onClick={() => browserHistory.push(`/settingConnection/create`)}/>
      </HeaderPageContent>
      <Table tableHeaderList={tableHeaderList}>
        {connectionsList.map((connection, index) => (
          <TableRow key={index}>
            <TableColumn value={index + 1}/>
            <TableColumn value={connection.farmer_id}/>
            <TableColumn value={connection.buyer_id}/>
            <TableColumn value={formatDate(connection.date)}/>
            <TableColumn value={connection.status}/>
            <TableColumn value={
              <div>
                <UpdateButton onClick={() => {
                  initDataForUpdateConnectionForm(connection);
                  browserHistory.push(`/settingConnection/update`);
                }}/>
                <DeleteButton onClick={() => {
                  setCurrentConnectionId(connection.id);
                  setDeleting(true);
                }}/>
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
)(ConnectionIndex);
export default EnhanceConnectionIndex;



