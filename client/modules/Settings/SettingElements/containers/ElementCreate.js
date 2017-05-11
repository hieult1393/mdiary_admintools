import PageContent, { HeaderPageContent } from '../../../../util/common/PageContent';
import { Form, FormRow, FormColumn, CancelButton, SaveButton } from '../../../../util/common/Form';
import {
  FieldImage,
  Input,
  FieldInput,
  Select,
  FieldSelect,
  FieldEditor,
  FieldColor,
} from '../../../../util/common/Form';
import { createElement } from '../ElementAction';
import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { reduxForm } from 'redux-form';
import { isEmpty, find } from 'lodash';
import { compose, withState } from 'recompose';

const requiredForInput = value => value ? undefined : 'Vui lòng không để trống!';
const requiredForSelect = value => isEmpty(value) ? 'Vui lòng không để trống!' : undefined;
const minValue = min => value => value && value <= min ? `Giá trị cần nhập phải lớn hơn 0!` : undefined;
const maxLength = max => value => value && value.length > max ? `Vui lòng nhập dưới ${max} kí tự!` : undefined;
const optionDefault = () => (<option value='' disabled>Select your option</option>);
const titleName = 'Setting elements';
const typeNameList = [{ id: 1, name: 'Dài ngày' }, { id: 2, name: 'Ngắn ngày' }];

const ElementCreate = (props) => {
  const { handleSubmit, createElement } = props;
  return (
    <PageContent>
      <HeaderPageContent titlePageContent={titleName}/>
      <Form onSubmit={handleSubmit(values => {
        values.type_name = find(typeNameList, { id: parseInt(values.type_id) }).name;
        values.images = values.images ? values.images : null;
        values.description = values.description ? values.description : null;
        createElement(values);
        browserHistory.goBack();
      })}>
        <FormRow>
          <FormColumn style={{ marginLeft: '5%' }}>
            {FieldInput('Element Name *', 'name', Input, [requiredForInput, maxLength(20)], 'text', 'Input element name')}
            {FieldInput('Year begin harvest *', 'year_begin_harvest', Input, [requiredForInput, minValue(0)], 'number', 'Input year begin harvest')}
            {FieldSelect('Type name *', 'type_id', Select, typeNameList, requiredForSelect, optionDefault())}
            {FieldColor('Color *', 'color', requiredForInput, props)}
          </FormColumn>
          <FormColumn>
            {FieldImage('Image', 'images', props)}
          </FormColumn>
        </FormRow>
        <FormRow>
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

const EnhanceElementCreate = compose(
  connect(
    state => ({}),
    ({
      createElement,
    })
  ),
  withState('showColor', 'setShowColor', false),
  withState('errorDatePicker', 'setErrorDatePicker', null),
  reduxForm({
    form: 'elementCreate',
  }),
)
(ElementCreate);

export default EnhanceElementCreate;
