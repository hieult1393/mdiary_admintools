import PageContent, { HeaderPageContent, AddButton } from '../../../../util/common/PageContent';
import { Table, TableRow, TableColumn, UpdateButton, DeleteButton } from '../../../../util/common/Table';
import Confirm from '../../../../util/common/Confirm';
import { fetchElementData, deleteElement, initDataForUpdateElementForm } from '../ElementAction';
import {
  elementsListSelector,
  createElementSuccessSelector,
  updateElementSuccessSelector,
  deleteElementSuccessSelector,
} from '../ElementReducer';
import { Toast } from '../../../../util/common/Toast';
import config from '../../../../../configs/config';
import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { compose, withState, lifecycle } from 'recompose';

const tableHeaderList = [
  'S.No', 'Name', 'Type name', 'Description', 'Image', 'Option'
];

const showImage = (element) => {
  const imgUrlDefault = '/img/no-image.png';
  const imgUrl = `${config.assets_url}upload/images/${element.images}`;
  return (
    <img src={element.images ? imgUrl : imgUrlDefault}
         style={{ width: '90px', height: '90px' }}/>
  );
};

const showConfirm = (elementId, deleteElement, setDeleting) => {
  return (
    <Confirm
      onConfirm={() => {
        deleteElement(elementId);
        setDeleting(false);
      }}
      onCancel={() => setDeleting(false)}/>
  );
};

const convertHtmlToString = (value) => (
  <p dangerouslySetInnerHTML={{ __html: value }}/>
);

const ElementIndex = (props) => {
  const { elementsList, setCurrentElementId, currentElementId, setDeleting, deleting, deleteElement } = props;
  const { createElementSuccess, updateElementSuccess, deleteElementSuccess, initDataForUpdateElementForm } = props;
  const titleName = 'Elements';
  Toast(createElementSuccess, updateElementSuccess, deleteElementSuccess);
  return (
    <PageContent>
      <HeaderPageContent titlePageContent={titleName}>
        <AddButton style={{ marginRight: '5px' }}
                   onClick={() => browserHistory.push(`settingElement/create`)}/>
      </HeaderPageContent>
      <Table tableHeaderList={tableHeaderList}>
        {elementsList.map((element, index) => (
          <TableRow key={element.id}>
            <TableColumn value={index + 1}/>
            <TableColumn value={element.name} onClick={() => browserHistory.push(`/settingSeason/${element.id}`)}/>
            <TableColumn value={element.type_name}/>
            <TableColumn value={convertHtmlToString(element.description)}/>
            <TableColumn value={showImage(element)}/>
            <TableColumn value={
              <div>
                <UpdateButton onClick={() => {
                  initDataForUpdateElementForm(element);
                  browserHistory.push(`settingElement/update`);
                }}/>
                <DeleteButton onClick={() => {
                  setCurrentElementId(element.id);
                  setDeleting(true);
                }}/>
              </div>
            }/>
          </TableRow>
        ))}
      </Table>
      {deleting ? showConfirm(currentElementId, deleteElement, setDeleting) : null}
    </PageContent>
  )
};

const EnhanceElementIndex = compose(
  connect(
    state => ({
      elementsList: elementsListSelector(state),
      createElementSuccess: createElementSuccessSelector(state),
      updateElementSuccess: updateElementSuccessSelector(state),
      deleteElementSuccess: deleteElementSuccessSelector(state),
    }),
    ({
      fetchElementData,
      deleteElement,
      initDataForUpdateElementForm,
    })
  ),
  withState('deleting', 'setDeleting', false),
  withState('currentElementId', 'setCurrentElementId', null),
  lifecycle({
    componentDidMount(){
      const { fetchElementData } = this.props;
      fetchElementData();
    }
  })
)(ElementIndex);

export default EnhanceElementIndex;
