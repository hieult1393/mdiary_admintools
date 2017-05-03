import PageContent, { HeaderPageContent, AddButton } from '../../../../util/common/PageContent';
import { Table, TableRow, TableColumn, UpdateButton, DeleteButton } from '../../../../util/common/Table';
import Confirm from '../../../../util/common/Confirm';
import { fetchSeasonData, deleteSeason, initDataForUpdateSeasonForm } from '../SeasonAction';
import {
  seasonsListSelector,
  createSeasonSuccessSelector,
  updateSeasonSuccessSelector,
  deleteSeasonSuccessSelector
} from '../SeasonReducer';
import { Toast } from '../../../../util/common/Toast';
import React from 'react';
import { connect }  from 'react-redux';
import { browserHistory } from 'react-router';
import { compose, withState, lifecycle } from 'recompose';

const tableHeaderList = [
  'S.No', 'Name', 'Order', 'Duration(day)', 'Description', 'Option'
];

const showConfirm = (seasonId, deleteSeason, setDeleting) => {
  return (
    <Confirm
      onConfirm={() => {
        deleteSeason(seasonId);
        setDeleting(false);
      }}
      onCancel={() => setDeleting(false)}/>
  );
};

const convertHtmlToString = (value) => (
  <p dangerouslySetInnerHTML={{ __html: value }}/>
);

const SeasonIndex = (props) => {
  const { seasonsList, setCurrentSeasonId, currentSeasonId, setDeleting, deleting, deleteSeason, params } = props;
  const { createSeasonSuccess, updateSeasonSuccess, deleteSeasonSuccess, initDataForUpdateSeasonForm } = props;
  const titleName = 'Seasons';
  Toast(createSeasonSuccess, updateSeasonSuccess, deleteSeasonSuccess);
  return (
    <PageContent>
      <HeaderPageContent titlePageContent={titleName}>
        <AddButton style={{ marginRight: '5px' }}
                   onClick={() => browserHistory.push(`/settingSeason/${params.elementId}/create`)}/>
      </HeaderPageContent>
      <Table tableHeaderList={tableHeaderList}>
        {seasonsList.map((season, index) => (
          <TableRow key={season.id}>
            <TableColumn value={index + 1}/>
            <TableColumn value={season.name}
                         onClick={() => browserHistory.push(`/settingSeason/${params.elementId}/settingPhase/${season.id}`)}/>
            <TableColumn value={season.order}/>
            <TableColumn value={season.duration}/>
            <TableColumn value={convertHtmlToString(season.description)}/>
            <TableColumn value={
              <div>
                <UpdateButton onClick={() => {
                  initDataForUpdateSeasonForm(season);
                  browserHistory.push(`settingSeason/${params.elementId}/update`);
                }}/>
                <DeleteButton onClick={() => {
                  setCurrentSeasonId(season.id);
                  setDeleting(true);
                }}/>
              </div>
            }/>
          </TableRow>
        ))}
      </Table>
      {deleting ? showConfirm(currentSeasonId, deleteSeason, setDeleting) : null}
    </PageContent>
  );
};

const EnhanceSeasonIndex = compose(
  connect(
    state => ({
      seasonsList: seasonsListSelector(state),
      createSeasonSuccess: createSeasonSuccessSelector(state),
      updateSeasonSuccess: updateSeasonSuccessSelector(state),
      deleteSeasonSuccess: deleteSeasonSuccessSelector(state),
    }),
    ({
      fetchSeasonData,
      deleteSeason,
      initDataForUpdateSeasonForm,
    })
  ),
  withState('deleting', 'setDeleting', false),
  withState('currentSeasonId', 'setCurrentSeasonId', null),
  lifecycle({
    componentDidMount(){
      const { fetchSeasonData, params } = this.props;
      fetchSeasonData(params.elementId);
    }
  })
)(SeasonIndex);

export default EnhanceSeasonIndex;
