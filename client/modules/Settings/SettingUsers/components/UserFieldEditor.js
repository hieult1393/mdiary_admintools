import React from 'react';
import { Field } from 'redux-form';
import Editor from '../../../../util/common/Editor';

export const UserFieldEditor = (labelName, fieldName, props, descriptionValueCreated) => (
  <div className='form-group'>
    <label className='col-md-2 control-label' style={{ width: '12.5%' }}>{labelName}</label>
    <div className='col-md-10' style={{ width: '84.5%' }}>
      <Field name={fieldName} component='hidden' type='text'/>
      <Editor fieldName={fieldName} descriptionValueCreated={descriptionValueCreated} {...props}/>
    </div>
  </div>
);
