import PageContent, { HeaderPageContent } from '../../../../util/common/PageContent';
import { Form, FormRow, FormColumn, CancelButton, SaveButton } from '../../../../util/common/Form';
import { Input, FieldInput } from '../../../../util/common/Form';
import { updatePhase } from '../PhaseAction';
import { initDataForUpdatePhaseFormSelector } from '../PhaseReducer';
import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { reduxForm } from 'redux-form';
import { isEmpty, find } from 'lodash';
import { compose } from 'recompose';

const requiredForInput = value => value ? undefined : 'Vui lòng không để trống!';
const minValue = min => value => value && value <= min ? `Giá trị cần nhập phải lớn hơn 0!` : undefined;
const maxLength = max => value => value && value.length > max ? `Vui lòng nhập dưới ${max} kí tự!` : undefined;
const titleName = 'Setting phases';

const PhaseUpdate = (props) => {
  const { handleSubmit, updatePhase } = props;
  return (
    <PageContent>
      <HeaderPageContent titlePageContent={titleName}/>
      <Form onSubmit={handleSubmit(values => {
        updatePhase(values.id, values);
        browserHistory.goBack();
      })}>
        <FormRow>
          <FormColumn style={{ marginLeft: '5%' }}>
            {FieldInput('Phase Name *', 'name', Input, requiredForInput, 'text', 'Input phase name')}
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

const EnhancePhaseUpdate = compose(
  connect(
    state => ({
      initialValues: initDataForUpdatePhaseFormSelector(state),
    }),
    ({
      updatePhase,
    })
  ),
  reduxForm({
    form: 'phaseUpdate',
  })
)(PhaseUpdate);

export default EnhancePhaseUpdate;
