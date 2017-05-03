import React from 'react';
import { Field } from 'redux-form';
import UploadImage from './UploadImage';
import Editor from './Editor';

export const Input = ({ input, placeholder, label, type, meta: { touched, error } }) => (
  <div className={`form-group ${touched && error ? 'has-error' : ''}`}>
    <label className='col-md-2 control-label' style={{ width: '35%' }}>{label}</label>
    <div className='col-md-3'>
      <input {...input}
             className='form-control input-medium'
             placeholder={placeholder}
             type={type}/>
      <div className="help-block" style={{ width: '240px' }}>
        {touched && ((error && <span>{error}</span>))}
      </div>
    </div>
  </div>
);

export const FieldInput = (labelName, fieldName, component, validate, type, holder) => (
  <Field label={labelName}
         name={fieldName}
         component={component}
         validate={validate}
         type={type}
         placeholder={holder}/>
);

export const Select = ({ input, label, type, meta: { touched, error }, children }) => (
  <div className={`form-group ${touched && error ? 'has-error' : ''}`}>
    <label className='col-md-2 control-label' style={{ width: '35%' }}>{label}</label>
    <div className='col-md-3'>
      <select {...input} className='form-control input-medium' type={type}>
        {children}
      </select>
      <div className="help-block" style={{ width: '240px' }}>
        {touched && ((error && <span>{error}</span>))}
      </div>
    </div>
  </div>
);

export const FieldSelect = (labelName, fieldName, component, data, validate, option1, option2) => (
  <Field label={labelName}
         name={fieldName}
         component={component}
         validate={validate}
         type='text'>
    {option1 ? option1 : null}
    {option2 ? option2 : null}
    {data ? data.map(item => (
        <option value={item.id} key={item.id}>{item.name}</option>
      )) : null}
  </Field>
);

export const FieldImage = (labelName, fieldName, props, imgUrlCreated) => (
  <div>
    <Field name={fieldName} component='hidden'/>
    <UploadImage labelName={labelName} fieldName={fieldName} imgUrlCreated={imgUrlCreated} {...props} />
  </div>
);

export const FieldEditor = (labelName, fieldName, props, descriptionValueCreated) => (
  <div className='form-group'>
    <label className='col-md-2 control-label' style={{ width: '20.25%' }}>{labelName}</label>
    <div className='col-md-8' style={{ width: '70%' }}>
      <Field name={fieldName} component='hidden' type='text'/>
      <Editor fieldName={fieldName} descriptionValueCreated={descriptionValueCreated} {...props}/>
    </div>
  </div>
);

export class FormRow extends React.Component {
  render() {
    return (
      <div className='row'>
        {this.props.children}
      </div>
    );
  }
}

export class FormColumn extends React.Component {
  render() {
    return (
      <div className="col-md-5" style={this.props.style}>
        {this.props.children}
      </div>
    );
  }
}

export class CancelButton extends React.Component {
  render() {
    return (
      <button className='btn default'
              type='button'
              style={this.props.style}
              onClick={this.props.onClick}>
        Cancel
      </button>
    );
  }
}

export class SaveButton extends React.Component {
  render() {
    return (
      <button className='btn green'
              type='submit'
              style={this.props.style}>
        Save
      </button>
    );
  }
}


export class Form extends React.Component {
  render() {
    return (
      <div className='portlet-body'>
        <form className='form-horizontal' role='form'
              onSubmit={this.props.onSubmit}>
          {this.props.children}
        </form>
      </div>
    );
  }
}
