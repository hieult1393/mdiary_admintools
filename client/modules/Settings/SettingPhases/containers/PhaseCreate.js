import PageContent, { HeaderPageContent } from '../../../../util/common/PageContent';
import { Form, FormRow, FormColumn, CancelButton, SaveButton } from '../../../../util/common/Form';
import { Input, FieldInput } from '../../../../util/common/Form';
import { createPhase } from '../PhaseAction';
import { phasesListSelector } from '../PhaseReducer';
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

const PhaseCreate = (props) => {
  const { phasesList, handleSubmit, createPhase, params } = props;
  return (
    <PageContent>
      <HeaderPageContent titlePageContent={titleName}/>
      <Form onSubmit={handleSubmit(values => {
        values.season_id = params.seasonId;
        values.element_id = params.elementId;
        values.order = isEmpty(phasesList) ? 1 : phasesList.length + 1;
        createPhase(values);
        browserHistory.goBack();
      })}>
        <FormRow>
          <FormColumn style={{ marginLeft: '5%' }}>
            {FieldInput('Phase Name *', 'name', Input, [requiredForInput, maxLength(20)], 'text', 'Input phase name')}
            {FieldInput('Duration(day) *', 'duration', Input, [requiredForInput, minValue(0)], 'number', 'Input phase duration')}
            {FieldInput('KC *', 'kc', Input, [requiredForInput, minValue(0)], 'number', 'Input phase kc')}
            {FieldInput('Root height *', 'root_height', Input, [requiredForInput, minValue(0)], 'number', 'Input phase root height')}
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

const EnhancePhaseCreate = compose(
  connect(
    state => ({
      phasesList: phasesListSelector(state),
    }),
    ({
      createPhase,
    })
  ),
  reduxForm({
    form: 'phaseCreate',
  })
)(PhaseCreate);

export default EnhancePhaseCreate;
