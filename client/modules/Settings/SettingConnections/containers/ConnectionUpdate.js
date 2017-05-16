import PageContent, { HeaderPageContent } from '../../../../util/common/PageContent';
import { Form, FormRow, FormColumn, CancelButton, SaveButton } from '../../../../util/common/Form';
import { Select, FieldSelect, FieldDatePicker } from '../../../../util/common/Form';
import { updateConnection } from '../ConnectionAction';
import { initDataForUpdateConnectionFormSelector } from '../ConnectionReducer';
import { fetchUserData } from '../../SettingUsers/UserAction';
import { usersListSelector } from '../../SettingUsers/UserReducer';
import { getDateTimeValue } from '../../../../util/helper/dateTime';
import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { reduxForm } from 'redux-form';
import { isEmpty, find } from 'lodash';
import { compose, withState, lifecycle } from 'recompose';

const statusList = [{ id: 1, name: 'Connected' }, { id: 2, name: 'Not Connect' }];

const ConnectionUpdate = (props) => {
  const { handleSubmit, updateConnection, usersList, initData } = props;
  const titleName = 'Setting Connections';
  const buyersList = usersList.filter(user => user.type_id === 1);
  const farmersList = usersList.filter(user => user.type_id === 2);
  return (
    <PageContent>
      <HeaderPageContent titlePageContent={titleName}/>
      <Form onSubmit={handleSubmit(values => {
        updateConnection(values.id, values);
        browserHistory.goBack();
      })}>
        <FormRow>
          <FormColumn style={{ marginLeft: '5%' }}>
            {FieldSelect('Buyer *', 'buyer_id', Select, buyersList, null, null)}
            {FieldSelect('Farmer *', 'farmer_id', Select, farmersList, null, null)}
            {FieldDatePicker('Date *', 'date', props, getDateTimeValue(initData.date))}
            {FieldSelect('Status *', 'status', Select, statusList, null, null)}
          </FormColumn>
        </FormRow>
        <FormRow>
          <div style={{ float: 'right', marginRight: '3%' }}>
            <CancelButton style={{ width: '70px', height: '34px' }}
                          onClick={() => browserHistory.goBack()}/>
            <SaveButton style={{ marginLeft: '5px' }}/>
          </div>
        </FormRow>
      </Form>
    </PageContent>
  )
};

const EnhanceConnectionUpdate = compose(
  connect(
    state => ({
      usersList: usersListSelector(state),
      initData: initDataForUpdateConnectionFormSelector(state),
      initialValues: initDataForUpdateConnectionFormSelector(state),
    }),
    ({
      updateConnection,
      fetchUserData,
    })
  ),
  withState('errorDatePicker', 'setErrorDatePicker', null),
  reduxForm({
    form: 'connectionUpdate',
  }),
  lifecycle({
    componentDidMount(){
      const { fetchUserData } = this.props;
      fetchUserData();
    },
  })
)
(ConnectionUpdate);

export default EnhanceConnectionUpdate;

