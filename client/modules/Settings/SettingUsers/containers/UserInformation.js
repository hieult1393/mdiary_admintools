import React from 'react'
import UpdateButton from '../../../../util/commonComponent/UpdateButton';
import DeleteButton from '../../../../util/commonComponent/DeleteButton';
import BackButton from '../../../../util/commonComponent/BackButton';
import { browserHistory } from 'react-router';
class UserInformation extends React.Component {
  render() {
    return (
      <div className="page-content-wrapper" style={{ display: 'inline-flex' }}>
        <div className="page-content"
             style={{ width: '100%', height: 'auto', backgroundColor: '#f6f6f6', margin: '0', }}>
          <div>
            <div className="portlet light portlet-fit bordered">
              <div className="portlet-title">
                <div className="caption">
                  <i className="icon-settings font-red"/>
                  <span className="caption-subject font-red sbold uppercase">USER information</span>
                </div>
                <div className="actions">
                  <div className="btn-group btn-group-devided" data-toggle="buttons">
                    <label className="btn grey-salsa btn-sm active">
                      <input type="radio" name="options" className="toggle" id="option1"/>ADD
                    </label>
                    
                    <BackButton onClick={ () => browserHistory.goBack('/settingUser')}/>
                  </div>
                </div>
              </div>
              <div className="portlet-body">
                <div className="table-scrollable table-scrollable-borderless">
                  <table className="table table-hover table-light">
                    <thead>
                    <tr className="uppercase">
                      <th> IdentityNo</th>
                      <th> UserName</th>
                      <th> Password</th>
                      <th> .........</th>
                      <th> Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <td> w1</td>
                      <td> dhamma</td>
                      <td> k3dew</td>
                      <td> .......</td>
                      <td>ACTIVE</td>
                      <td>
                        <span className="btn btn-success"> update </span>
                        <span className="btn btn-success">  </span>
                      </td>
                    </tr>
                    
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div>this is the place where you set your stuff</div>
        </div>
      </div>
    
    )
      ;
  }
}
export default UserInformation;
