import React from 'react';
import config from '../../../configs/config';
import ReactDom from 'react-dom';
import Loading  from 'react-loading';
import { store } from '../../store';
import { attachTokenAxios } from '../../util/setAuthorizationToken';
import axios from 'axios';
import style from './style.css';

export default class UploadImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      imgUrl: this.props.imgUrlCreated ? `${config.assets_url}upload/images/${this.props.imgUrlCreated}` : '/img/no-image.png',
    };
  }

  handleChangeImage(fieldName) {
    const { change } = this.props;
    this.setState({ loading: true });
    let formData = new FormData(ReactDom.findDOMNode(this.refs.form));
    const url = `${config.api_url}api/upload/images`;
    const configs = {
      headers: attachTokenAxios(store.getState),
    };
    axios.post(url, formData, configs)
      .then((response) => {
        if (response.data.success) {
          change(fieldName, response.data.payload);
          this.setState({ imgUrl: `${config.assets_url}upload/images/${response.data.payload}` });
          this.setState({ loading: false });
        }
      });
  }

  render() {
    const { labelName, fieldName } = this.props;
    return (
      <div className='form-group'>
        <label className='col-md-2 control-label' style={{ width: '25%' }}>{labelName}</label>
        <form className="form-horizontal" role="form" encType="multipart/form-data" ref="form">
          <div className={style.fileUpload}>
            <img src={this.state.imgUrl}
                 style={{ cursor: 'pointer', width: '90px', height: '90px', border: '2px solid #BFCAD1' }}/>
            {this.state.loading ?
              <div style={{ position: 'absolute', top: '35%', left: '30px' }}>
                <Loading type='spin' color='#F36A5A' width='30px' height='30px'/>
              </div> : null}
            <input type="file" name="images" className={style.upload} accept="image/*"
                   onChange={() => this.handleChangeImage(fieldName)}/>
          </div>
        </form>
      </div>
    )
  }
}
