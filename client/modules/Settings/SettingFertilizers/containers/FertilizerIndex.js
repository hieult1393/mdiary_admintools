import PageContent, { HeaderPageContent, AddButton } from '../../../../util/common/PageContent';
import { Table, TableRow, TableColumn, UpdateButton, DeleteButton } from '../../../../util/common/Table';
import Confirm from '../../../../util/common/Confirm';
import { fetchFertilizerData, deleteFertilizer, initDataForUpdateFertilizerForm } from '../FertilizerAction';
import {
  fertilizersListSelector,
  createFertilizerSuccessSelector,
  updateFertilizerSuccessSelector,
  deleteFertilizerSuccessSelector,
} from '../FertilizerReducer';
import { Toast } from '../../../../util/common/Toast';
import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { compose, withState, lifecycle } from 'recompose';

const showConfirm = (fertilizerId, deleteFertilizer, setDeleting) => {
  return (
    <Confirm
      onConfirm={() => {
        deleteFertilizer(fertilizerId);
        setDeleting(false);
      }}
      onCancel={() => setDeleting(false)}/>
  );
};


const FertilizerIndex = (props) => {
  const {
    fertilizersList, setCurrentFertilizerId, currentFertilizerId, setDeleting,
    deleting, deleteFertilizer, initDataForUpdateFertilizerForm
  } = props;
  const titleName = ' Setting Fertilizers';
  const tableHeaderList = [
    'S.No', 'Name', 'Ingredients', 'Use For', 'Dosage', 'Usage', 'Unit', 'Option',
  ];
  return (
    <PageContent>
      <HeaderPageContent titlePageContent={titleName}>
        <AddButton style={{ marginRight: '5px' }}
                   onClick={() => browserHistory.push(`settingFertilizer/create`)}/>
      </HeaderPageContent>
      <Table tableHeaderList={tableHeaderList}>
        {fertilizersList.map((fertilizer, index) => (
          <TableRow key={index}>
            <TableColumn value={index + 1}/>
            <TableColumn value={fertilizer.name}/>
            <TableColumn value={fertilizer.ingredients}/>
            <TableColumn style={{ width: '240px' }} value={fertilizer.use_for}/>
            <TableColumn style={{ width: '130px' }} value={fertilizer.dosage}/>
            <TableColumn value={fertilizer.usage}/>
            <TableColumn value={fertilizer.unit}/>
            <TableColumn value={
              <div>
                <UpdateButton onClick={() => {
                  initDataForUpdateFertilizerForm(fertilizer);
                  browserHistory.push(`settingFertilizer/update`);
                }}/>
                <DeleteButton onClick={() => {
                  setCurrentFertilizerId(fertilizer.id);
                  setDeleting(true);
                }}/>
              </div>
            }/>
          </TableRow>
        ))}
      </Table>
      {deleting ? showConfirm(currentFertilizerId, deleteFertilizer, setDeleting) : null}
    </PageContent>
  )
};

const EnhanceFertilizerIndex = compose(
  connect(
    state => ({
      fertilizersList: fertilizersListSelector(state),
      createFertilizerSuccess: createFertilizerSuccessSelector(state),
      updateFertilizerSuccess: updateFertilizerSuccessSelector(state),
      deleteFertilizerSuccess: deleteFertilizerSuccessSelector(state),
    }),
    ({
      fetchFertilizerData,
      deleteFertilizer,
      initDataForUpdateFertilizerForm,
    })
  ),
  withState('deleting', 'setDeleting', false),
  withState('currentFertilizerId', 'setCurrentFertilizerId', null),
  lifecycle({
    componentDidMount(){
      const { fetchFertilizerData } = this.props;
      fetchFertilizerData();
    },
    componentWillReceiveProps(nextProps){
      const { createFertilizerSuccess, updateFertilizerSuccess, deleteFertilizerSuccess } = nextProps;
      Toast(createFertilizerSuccess, updateFertilizerSuccess, deleteFertilizerSuccess);
    }
  })
)(FertilizerIndex);

export default EnhanceFertilizerIndex;
