import PageContent from '../../../../util/common/PageContent';
import HeaderPageContent from '../../../../util/common/HeaderPageContent';
import { Form, FormRow, FormColumn, CancelButton, SaveButton, Input, FieldInput } from '../../../../util/common/Form';
import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { compose } from 'recompose';
import { reduxForm } from 'redux-form';

const requiredForInput = value => value ? undefined : 'Vui lòng không để trống!';
const maxLength = max => value => value && value.length > max ? `Vui lòng nhập dưới ${max} kí tự!` : undefined;

const UserCreate = () => {
  let titleName = 'Setting users';
  return (
    <PageContent>
      <HeaderPageContent titlePageContent={titleName}/>
      <Form>
        <FormRow>
          <FormColumn style={{ marginLeft: '5%' }}>
            {FieldInput('Name *', 'name', Input, [requiredForInput, maxLength(20)], 'text', 'Input name')}
            {FieldInput('Gender *', 'gender', Input, [requiredForInput], 'text', 'Input gender')}
            {FieldInput('User type *', 'userType', Input, [requiredForInput, maxLength(20)], 'text', 'Input user type')}
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
  );
};

const EnhanceUserCreate = compose(
  reduxForm({
    form: 'userCreate',
  })
)(UserCreate);

export default EnhanceUserCreate;

// import React from 'react'
// import CancelButton from '../../../../util/commonComponent/CancelButton';
// import { browserHistory } from 'react-router';
// class UserCreate extends React.Component {
//   render() {
//     return (
//       <div className="page-content-wrapper" style={{ display: 'inline-flex' }}>
//         <div className="page-content"
//              style={{ width: '100%', height: 'auto', backgroundColor: '#f6f6f6', margin: '0', }}>
//           <div>this is the place where you set your stuff</div>
//           <div className="portlet box yellow">
//             <div className="portlet-title">
//               <div className="caption">
//                 <i className="fa fa-gift"/>
//                 Create Account
//               </div>
//               <div className="tools">
//                 <a href="javascript:" className="collapse" data-original-title="" title=""> </a>
//                 <a href="#portlet-config" data-toggle="modal" className="config" data-original-title="" title=""> </a>
//                 <a href="javascript:" className="reload" data-original-title="" title=""> </a>
//                 <a href="javascript:" className="remove" data-original-title="" title=""> </a>
//               </div>
//             </div>
//             <div className="portlet-body form">
//               <form action="#" className="form-horizontal">
//                 <div className="form-actions top">
//                   <div className="row">
//                     <div className="col-md-offset-3 col-md-9">
//                     </div>
//                   </div>
//                 </div>
//                 <div className="form-body">
//                   <div className="form-group">
//                     <label className="col-md-3 control-label">USerName</label>
//                     <div className="col-md-4">
//                       <input type="text" className="form-control" placeholder="Enter text"/>
//                       <span className="help-block"> A block of help text.</span>
//                     </div>
//                   </div>
//                   <div className="form-group">
//                     <label className="col-md-3 control-label">Email Address</label>
//                     <div className="col-md-4">
//                       <div className="input-group">
//                     <span className="input-group-addon">
//                         <i className="fa fa-envelope"/>
//                     </span>
//                         <input type="email" className="form-control" placeholder="Email Address"/></div>
//                     </div>
//                   </div>
//                   <div className="form-group">
//                     <label className="col-md-3 control-label">Password</label>
//                     <div className="col-md-4">
//                       <div className="input-group">
//                         <input type="password" className="form-control" placeholder="Password"/>
//                         <span className="input-group-addon">
//                           <i className="fa fa-user"/>
//                       </span>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="form-group">
//                     <label className="col-md-3 control-label">Left Icon</label>
//                     <div className="col-md-4">
//                       <div className="input-icon">
//                         <i className="fa fa-bell-o"/>
//                         <input type="text" className="form-control" placeholder="Left icon"/></div>
//                     </div>
//                   </div>
//                   <div className="form-group">
//                     <label className="col-md-3 control-label">Right Icon</label>
//                     <div className="col-md-4">
//                       <div className="input-icon right">
//                         <i className="fa fa-microphone"/>
//                         <input type="text" className="form-control" placeholder="Right icon"/></div>
//                     </div>
//                   </div>
//                   <div className="form-group">
//                     <label className="col-md-3 control-label">Input With Spinner</label>
//                     <div className="col-md-4">
//                       <input type="password" className="form-control spinner" placeholder="Password"/></div>
//                   </div>
//                   <div className="form-group">
//                     <label className="col-md-3 control-label">Static Control</label>
//                     <div className="col-md-4">
//                       <p className="form-control-static"> email@example.com </p>
//                     </div>
//                   </div>
//                   <div className="form-group last">
//                     <label className="col-md-3 control-label">STATUS</label>
//                     <div className="col-md-4">
//                       <select className="form-control">
//                         <option>Active</option>
//                         <option>Inactive</option>
//                       </select>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="form-actions fluid">
//                   <div className="row">
//                     <div className="col-md-offset-9 col-md-2">
//                       <button type="submit" className="btn green" style={{ marginRight: 10 }}>Submit</button>
//                       <CancelButton onClick={() => browserHistory.goBack('/settingUser')}/>
//                     </div>
//                   </div>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//
//
//
//     );
//   }
// }
// export default UserCreate;

