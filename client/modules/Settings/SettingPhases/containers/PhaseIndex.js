import PageContent, { HeaderPageContent, AddButton } from '../../../../util/common/PageContent';
import { Table, TableRow, TableColumn, UpdateButton, DeleteButton } from '../../../../util/common/Table';
import Confirm from '../../../../util/common/Confirm';
import { fetchPhaseData, deletePhase, initDataForUpdatePhaseForm } from '../PhaseAction';
import {
  phasesListSelector,
  createPhaseSuccessSelector,
  updatePhaseSuccessSelector,
  deletePhaseSuccessSelector
} from '../PhaseReducer';
import { Toast } from '../../../../util/common/Toast';
import React from 'react';
import { connect }  from 'react-redux';
import { browserHistory } from 'react-router';
import { compose, withState, lifecycle } from 'recompose';

const tableHeaderList = [
  'S.No', 'Name', 'Order', 'Duration(day)', 'KC', 'Root height', 'Option'
];

const showConfirm = (phaseId, deletePhase, setDeleting) => {
  return (
    <Confirm
      onConfirm={() => {
        deletePhase(phaseId);
        setDeleting(false);
      }}
      onCancel={() => setDeleting(false)}/>
  );
};

const PhaseIndex = (props) => {
  const { phasesList, setCurrentPhaseId, currentPhaseId, setDeleting, deleting, deletePhase, params } = props;
  const { createPhaseSuccess, updatePhaseSuccess, deletePhaseSuccess, initDataForUpdatePhaseForm } = props;
  const titleName = 'Phases';
  Toast(createPhaseSuccess, updatePhaseSuccess, deletePhaseSuccess);
  return (
    <PageContent>
      <HeaderPageContent titlePageContent={titleName}>
        <AddButton style={{ marginRight: '5px' }}
                   onClick={() => browserHistory.push(`/settingSeason/${params.elementId}/settingPhase/${params.seasonId}/create`)}/>
      </HeaderPageContent>
      <Table tableHeaderList={tableHeaderList}>
        {phasesList.map((phase, index) => (
          <TableRow key={phase.id}>
            <TableColumn value={index + 1}/>
            <TableColumn value={phase.name}/>
            <TableColumn value={phase.order}/>
            <TableColumn value={phase.duration}/>
            <TableColumn value={phase.kc}/>
            <TableColumn value={phase.root_height}/>
            <TableColumn value={
              <div>
                <UpdateButton onClick={() => {
                  initDataForUpdatePhaseForm(phase);
                  browserHistory.push(`/settingSeason/${params.elementId}/settingPhase/${params.seasonId}/update`);
                }}/>
                <DeleteButton onClick={() => {
                  setCurrentPhaseId(phase.id);
                  setDeleting(true);
                }}/>
              </div>
            }/>
          </TableRow>
        ))}
      </Table>
      {deleting ? showConfirm(currentPhaseId, deletePhase, setDeleting) : null}
    </PageContent>
  );
};

const EnhancePhaseIndex = compose(
  connect(
    state => ({
      phasesList: phasesListSelector(state),
      createPhaseSuccess: createPhaseSuccessSelector(state),
      updatePhaseSuccess: updatePhaseSuccessSelector(state),
      deletePhaseSuccess: deletePhaseSuccessSelector(state),
    }),
    ({
      fetchPhaseData,
      deletePhase,
      initDataForUpdatePhaseForm,
    })
  ),
  withState('deleting', 'setDeleting', false),
  withState('currentPhaseId', 'setCurrentPhaseId', null),
  lifecycle({
    componentDidMount(){
      const { fetchPhaseData, params } = this.props;
      fetchPhaseData(params.seasonId);
    }
  })
)(PhaseIndex);

export default EnhancePhaseIndex;
