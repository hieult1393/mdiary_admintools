import PageContent, { HeaderPageContent } from '../../../../util/common/PageContent';
import { Form, FormRow, FormColumn, CancelButton, SaveButton } from '../../../../util/common/Form';
import { Select, FieldSelect, FieldDatePicker } from '../../../../util/common/Form';
import { createConnection } from '../ConnectionAction';
import { fetchUserData } from '../../SettingUsers/UserAction';
import { usersListSelector } from '../../SettingUsers/UserReducer';
import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { reduxForm } from 'redux-form';
import { isEmpty, find } from 'lodash';
import { compose, withState, lifecycle } from 'recompose';

const requiredForSelect = value => isEmpty(value) ? 'Vui lòng không để trống!' : undefined;
const optionDefault = () => (<option value='' disabled selected>Select your option</option>);
const statusList = [{ id: 1, name: 'Connected' }, { id: 2, name: 'Not Connect' }];

const ConnectionCreate = (props) => {
  const { handleSubmit, createConnection, usersList } = props;
  const titleName = 'Setting Connections';
  const buyersList = usersList.filter(user => user.type_id === 1);
  const farmersList = usersList.filter(user => user.type_id === 2);
  return (
    <PageContent>
      <HeaderPageContent titlePageContent={titleName}/>
      <Form onSubmit={handleSubmit(values => {
        createConnection(values);
        browserHistory.goBack();
      })}>
        <FormRow>
          <FormColumn style={{ marginLeft: '5%' }}>
            {FieldSelect('Buyer *', 'buyer_id', Select, buyersList, requiredForSelect, optionDefault())}
            {FieldSelect('Farmer *', 'farmer_id', Select, farmersList, requiredForSelect, optionDefault())}
            {FieldDatePicker('Date *', 'date', props)}
            {FieldSelect('Status *', 'status', Select, statusList, requiredForSelect, optionDefault())}
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

const EnhanceConnectionCreate = compose(
  connect(
    state => ({
      usersList: usersListSelector(state),
    }),
    ({
      createConnection,
      fetchUserData,
    })
  ),
  withState('errorDatePicker', 'setErrorDatePicker', null),
  reduxForm({
    form: 'connectionCreate',
  }),
  lifecycle({
    componentDidMount(){
      const { fetchUserData } = this.props;
      fetchUserData();
    },
  })
)
(ConnectionCreate);

export default EnhanceConnectionCreate;

