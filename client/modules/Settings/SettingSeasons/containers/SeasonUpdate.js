import PageContent, { HeaderPageContent } from '../../../../util/common/PageContent';
import { Form, FormRow, FormColumn, CancelButton, SaveButton } from '../../../../util/common/Form';
import { Input, FieldInput, FieldEditor } from '../../../../util/common/Form';
import { updateSeason } from '../SeasonAction';
import { initDataForUpdateSeasonFormSelector } from '../SeasonReducer';
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

const SeasonUpdate = (props) => {
  const { handleSubmit, updateSeason, initData } = props;
  return (
    <PageContent>
      <HeaderPageContent titlePageContent={titleName}/>
      <Form onSubmit={handleSubmit(values => {
        values.description = values.description ? values.description : null;
        updateSeason(initData.id, values);
        browserHistory.goBack();
      })}>
        <FormRow>
          <FormColumn style={{ marginLeft: '5%' }}>
            {FieldInput('Season Name *', 'name', Input, requiredForInput, 'text', 'Input season name')}
          </FormColumn>
        </FormRow>
        <FormRow className="row">
          {FieldEditor('Description', 'description', props, initData.description)}
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

const EnhanceSeasonUpdate = compose(
  connect(
    state => ({
      initData: initDataForUpdateSeasonFormSelector(state),
      initialValues: initDataForUpdateSeasonFormSelector(state),
    }),
    ({
      updateSeason,
    })
  ),
  reduxForm({
    form: 'seasonUpdate',
  })
)(SeasonUpdate);

export default EnhanceSeasonUpdate;
