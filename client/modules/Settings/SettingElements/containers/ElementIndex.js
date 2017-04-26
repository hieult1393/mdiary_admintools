import React from 'react';
import PageContent from '../../../../util/common/PageContent';
import HeaderPageContent from '../../../../util/common/HeaderPageContent';
import { Table, TableRow, TableColumn, UpdateButton, DeleteButton } from '../../../../util/common/Table';
import AddButton from '../../../../util/common/AddButton';
import { browserHistory } from 'react-router';
import { fetchElementData } from '../ElementAction';
import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import { elementDataSelector, fetchElementDataSelector } from '../ElementReducer';
const tableHeaderList = [
  'S.No', 'FarmID', 'TypeID', 'TypeName', 'Name', 'Years of Harvest', 'Description', 'Image', 'Created_at', 'Updated_at', 'Option'
];
const ElementIndex = (props) => {
  const { elementData } = props;
  const titleName = 'Elements';
  return (
    <PageContent>
      <HeaderPageContent titlePageContent={titleName}>
        <AddButton style={{ marginRight: '5px' }}
                   onClick={() => browserHistory.push(`settingElement/elementCreate`)}/>
      </HeaderPageContent>
      <Table tableHeaderList={tableHeaderList}>
        {elementData.map((elementData, index) => (
          <TableRow key={elementData.id}>
            <TableColumn value={index + 1}/>
            <TableColumn value={elementData.farm_id}/>
            <TableColumn value={elementData.type_id}/>
            <TableColumn value={elementData.type_name}/>
            <TableColumn value={elementData.name}/>
            <TableColumn value={elementData.years_of_harvest}/>
            <TableColumn value={elementData.description}/>
            <TableColumn value={elementData.images}/>
            <TableColumn value={elementData.created_at}/>
            <TableColumn value={elementData.updated_at}/>
            <TableColumn value={
              <div>
                <UpdateButton/>
                <DeleteButton/>
              </div>
            }/>
          </TableRow>
        ))}
      </Table>
    </PageContent>
  )
};

const EnhanceElementIndex = compose(
  connect(
    state => ({
      elementData: elementDataSelector(state),
      fetchElementDataSelector: fetchElementDataSelector(state),
    }),
    ({
      fetchElementData,
    })
  ),
  lifecycle({
    componentDidMount(){
      const { fetchElementData } = this.props;
      fetchElementData();
    }
  })
)(ElementIndex);

export default EnhanceElementIndex;
