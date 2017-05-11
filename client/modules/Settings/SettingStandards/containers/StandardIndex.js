import PageContent, { HeaderPageContent, AddButton } from '../../../../util/common/PageContent';
import { Table, TableRow, TableColumn, UpdateButton, DeleteButton } from '../../../../util/common/Table';
import Confirm from '../../../../util/common/Confirm';
import { fetchStandardData, deleteStandard, initDataForUpdateStandardForm } from '../StandardAction';
import {
  standardsListSelector,
  createStandardSuccessSelector,
  updateStandardSuccessSelector,
  deleteStandardSuccessSelector,
} from '../StandardReducer';
import { Toast } from '../../../../util/common/Toast';
import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { compose, withState, lifecycle } from 'recompose';

const showConfirm = (standardId, deleteStandard, setDeleting) => {
  return (
    <Confirm
      onConfirm={() => {
        deleteStandard(standardId);
        setDeleting(false);
      }}
      onCancel={() => setDeleting(false)}/>
  );
};


const StandardIndex = (props) => {
  const {
    standardsList, setCurrentStandardId, currentStandardId, setDeleting,
    deleting, deleteStandard, initDataForUpdateStandardForm
  } = props;
  const titleName = 'Standards';
  const tableHeaderList = [
    'S.No', 'Name', 'Description', 'Option',
  ];
  return (
    <PageContent>
      <HeaderPageContent titlePageContent={titleName}>
        <AddButton style={{ marginRight: '5px' }}
                   onClick={() => browserHistory.push(`settingStandard/create`)}/>
      </HeaderPageContent>
      <Table tableHeaderList={tableHeaderList}>
        {standardsList.map((standard, index) => (
          <TableRow key={index}>
            <TableColumn value={index + 1}/>
            <TableColumn value={standard.name}/>
            <TableColumn value={standard.description}/>
            <TableColumn value={
              <div>
                <UpdateButton onClick={() => {
                  initDataForUpdateStandardForm(standard);
                  browserHistory.push(`settingStandard/update`);
                }}/>
                <DeleteButton onClick={() => {
                  setCurrentStandardId(standard.id);
                  setDeleting(true);
                }}/>
              </div>
            }/>
          </TableRow>
        ))}
      </Table>
      {deleting ? showConfirm(currentStandardId, deleteStandard, setDeleting) : null}
    </PageContent>
  )
};

const EnhanceStandardIndex = compose(
  connect(
    state => ({
      standardsList: standardsListSelector(state),
      createStandardSuccess: createStandardSuccessSelector(state),
      updateStandardSuccess: updateStandardSuccessSelector(state),
      deleteStandardSuccess: deleteStandardSuccessSelector(state),
    }),
    ({
      fetchStandardData,
      deleteStandard,
      initDataForUpdateStandardForm,
    })
  ),
  withState('deleting', 'setDeleting', false),
  withState('currentStandardId', 'setCurrentStandardId', null),
  lifecycle({
    componentDidMount(){
      const { fetchStandardData } = this.props;
      fetchStandardData();
    },
    componentWillReceiveProps(nextProps){
      const { createStandardSuccess, updateStandardSuccess, deleteStandardSuccess } = nextProps;
      Toast(createStandardSuccess, updateStandardSuccess, deleteStandardSuccess);
    }
  })
)(StandardIndex);

export default EnhanceStandardIndex;
