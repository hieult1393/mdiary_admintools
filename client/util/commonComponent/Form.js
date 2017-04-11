import React from 'react';
import { Field } from 'redux-form';

export const Input = ({ input, placeholder, type, meta: { touched, error } }) => (
  <div className={`${touched && error ? 'has-error' : ''}`}>
    <div>
      <input {...input}
             className='form-control input-small'
             placeholder={placeholder}
             type={type}/>
      <div className="help-block">
        {touched && ((error && <span>{error}</span>))}
      </div>
    </div>
  </div>
);

export const FieldInput = (fieldName, component, validate, type, holder) => (
  <Field name={fieldName}
         component={component}
         validate={validate}
         type={type}
         placeholder={holder}/>
);

export const Select = ({ input, type, meta: { touched, error }, children }) => (
  <div className={`${touched && error ? 'has-error' : ''}`}>
    <div>
      <select {...input} className='form-control input-small' type={type}>
        {children}
      </select>
      <div className="help-block">
        {touched && ((error && <span>{error}</span>))}
      </div>
    </div>
  </div>
);

export const FieldSelect = (fieldName, component, data, validate, option1, option2) => (
  <Field name={fieldName} type='text'
         validate={validate}
         component={component}>
    {option1 ? option1 : null}
    {option2 ? option2 : null}
    {data ? data.map(item => (
        <option value={item.id} key={item.id}>{item.name}</option>
      )) : null}
  </Field>
);

