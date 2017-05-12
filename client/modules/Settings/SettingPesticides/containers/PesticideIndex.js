import PageContent, { HeaderPageContent, AddButton } from '../../../../util/common/PageContent';
import { Table, TableRow, TableColumn, UpdateButton, DeleteButton } from '../../../../util/common/Table';
import Confirm from '../../../../util/common/Confirm';
import { fetchPesticideData, deletePesticide, initDataForUpdatePesticideForm } from '../PesticideAction';
import {
  pesticidesListSelector,
  createPesticideSuccessSelector,
  updatePesticideSuccessSelector,
  deletePesticideSuccessSelector,
} from '../PesticideReducer';
import { Toast } from '../../../../util/common/Toast';
import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { compose, withState, lifecycle } from 'recompose';

const showConfirm = (pesticideId, deletePesticide, setDeleting) => {
  return (
    <Confirm
      onConfirm={() => {
        deletePesticide(pesticideId);
        setDeleting(false);
      }}
      onCancel={() => setDeleting(false)}/>
  );
};

const PesticideIndex = (props) => {
  const {
    pesticidesList, setCurrentPesticideId, currentPesticideId, setDeleting,
    deleting, deletePesticide, initDataForUpdatePesticideForm
  } = props;
  const titleName = 'Setting Pesticides';
  const tableHeaderList = [
    'S.No', 'Name', 'Active Substance', 'Use For', 'Dosage', 'Count', 'Unit', 'Isolation', 'Option',
  ];
  return (
    <PageContent>
      <HeaderPageContent titlePageContent={titleName}>
        <AddButton style={{ marginRight: '5px' }}
                   onClick={() => browserHistory.push(`settingPesticide/create`)}/>
      </HeaderPageContent>
      <Table tableHeaderList={tableHeaderList}>
        {pesticidesList.map((pesticide, index) => (
          <TableRow key={index}>
            <TableColumn value={index + 1}/>
            <TableColumn value={pesticide.name}/>
            <TableColumn value={pesticide.active_substance}/>
            <TableColumn value={pesticide.use_for}/>
            <TableColumn value={pesticide.dosage}/>
            <TableColumn value={pesticide.count}/>
            <TableColumn value={pesticide.unit}/>
            <TableColumn value={pesticide.isolation}/>
            <TableColumn value={
              <div>
                <UpdateButton onClick={() => {
                  initDataForUpdatePesticideForm(pesticide);
                  browserHistory.push(`settingPesticide/update`);
                }}/>
                <DeleteButton onClick={() => {
                  setCurrentPesticideId(pesticide.id);
                  setDeleting(true);
                }}/>
              </div>
            }/>
          </TableRow>
        ))}
      </Table>
      {deleting ? showConfirm(currentPesticideId, deletePesticide, setDeleting) : null}
    </PageContent>
  )
};

const EnhancePesticideIndex = compose(
  connect(
    state => ({
      pesticidesList: pesticidesListSelector(state),
      createPesticideSuccess: createPesticideSuccessSelector(state),
      updatePesticideSuccess: updatePesticideSuccessSelector(state),
      deletePesticideSuccess: deletePesticideSuccessSelector(state),
    }),
    ({
      fetchPesticideData,
      deletePesticide,
      initDataForUpdatePesticideForm,
    })
  ),
  withState('deleting', 'setDeleting', false),
  withState('currentPesticideId', 'setCurrentPesticideId', null),
  lifecycle({
    componentDidMount(){
      const { fetchPesticideData } = this.props;
      fetchPesticideData();
    },
    componentWillReceiveProps(nextProps){
      const { createPesticideSuccess, updatePesticideSuccess, deletePesticideSuccess } = nextProps;
      Toast(createPesticideSuccess, updatePesticideSuccess, deletePesticideSuccess);
    }
  })
)(PesticideIndex);

export default EnhancePesticideIndex;
