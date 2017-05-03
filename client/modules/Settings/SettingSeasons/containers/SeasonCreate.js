import PageContent, { HeaderPageContent } from '../../../../util/common/PageContent';
import { Form, FormRow, FormColumn, CancelButton, SaveButton } from '../../../../util/common/Form';
import { Input, FieldInput, FieldEditor } from '../../../../util/common/Form';
import { createSeason } from '../SeasonAction';
import { seasonsListSelector } from '../SeasonReducer';
import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { reduxForm } from 'redux-form';
import { isEmpty, find } from 'lodash';
import { compose } from 'recompose';

const requiredForInput = value => value ? undefined : 'Vui lòng không để trống!';
const minValue = min => value => value && value <= min ? `Giá trị cần nhập phải lớn hơn 0!` : undefined;
const maxLength = max => value => value && value.length > max ? `Vui lòng nhập dưới ${max} kí tự!` : undefined;
const titleName = 'Setting seasons';

const SeasonCreate = (props) => {
  const { seasonsList, handleSubmit, createSeason, params } = props;
  return (
    <PageContent>
      <HeaderPageContent titlePageContent={titleName}/>
      <Form onSubmit={handleSubmit(values => {
        values.element_id = params.elementId;
        values.order = isEmpty(seasonsList) ? 1 : seasonsList.length + 1;
        values.description = values.description ? values.description : null;
        createSeason(values);
        browserHistory.goBack();
      })}>
        <FormRow>
          <FormColumn style={{ marginLeft: '5%' }}>
            {FieldInput('Season Name *', 'name', Input, [requiredForInput, maxLength(20)], 'text', 'Input season name')}
            {FieldInput('Duration(day) *', 'duration', Input, [requiredForInput, minValue(0)], 'number', 'Input season duration')}
          </FormColumn>
        </FormRow>
        <FormRow className="row">
          {FieldEditor('Description', 'description', props)}
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

const EnhanceSeasonCreate = compose(
  connect(
    state => ({
      seasonsList: seasonsListSelector(state),
    }),
    ({
      createSeason,
    })
  ),
  reduxForm({
    form: 'seasonCreate',
  })
)(SeasonCreate);

export default EnhanceSeasonCreate;
