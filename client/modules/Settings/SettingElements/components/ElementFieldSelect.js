import React from 'react';
import { Field } from 'redux-form';
import { TwitterPicker } from 'react-color';

const ElementSelect = ({ input, label, type, meta: { touched, error }, children }) => (
  <div className={`form-group ${touched && error ? 'has-error' : ''}`}>
    <label className='col-md-2 control-label' style={{ width: '35%' }}>{label}</label>
    <div className='col-md-3'>
      <select {...input} className='form-control input-medium'
              type={type} style={{ backgroundColor: 'red' }}
              onChange={() => console.log('ehhehe')}>
        {children}
      </select>
      <div className="help-block" style={{ width: '240px' }}>
        {touched && ((error && <span>{error}</span>))}
      </div>
    </div>
  </div>
);

export const ElementFieldSelect = (labelName, fieldName, data, validate, optionDefault) => (
  <Field label={labelName}
         name={fieldName}
         component={ElementSelect}
         validate={validate}
         type='text'>
    {optionDefault ? optionDefault : null}
    {data ? data.map(item => (
        <option value={item} key={item} style={{ background: { item } }}>{item}</option>
      )) : null}
  </Field>
);

