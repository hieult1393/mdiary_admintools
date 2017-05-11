import React from 'react';
import { TwitterPicker } from 'react-color';

export default class Color extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colorValue: this.props.colorValueCreated ? this.props.colorValueCreated : null,
    }
  }

  handleOnChange(color, fieldName) {
    const { change, setShowColor } = this.props;
    change(fieldName, color.hex);
    setShowColor(false);
  }

  render() {
    const { fieldName } = this.props;
    return (
      <div className='form-group' style={{ marginLeft: '33%' }}>
        <div className='col-md-3'>
          <TwitterPicker
            onChange={color => this.handleOnChange(color, fieldName)}/>
        </div>
      </div>
    );
  }
}
