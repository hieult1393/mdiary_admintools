import React from 'react';

export const UserTypeSelect = (data, props) => {
  const { getUserType } = props;
  return (
    <div className='portlet-body'>
      <form className='form-horizontal'
            style={{ borderBottomStyle: 'solid', borderWidth: '1px', borderColor: '#6aee0f' }}>
        <div className='row'>
          <div className="col-md-5" style={{ marginLeft: '11%' }}>
            <div className='form-group'>
              <label className='col-md-2 control-label' style={{ width: '20%' }}>User Type</label>
              <div className='col-md-3'>
                <select className='form-control input-medium'
                        onChange={e => getUserType(e.target.value)}>
                  <option value="" disabled selected>Select your option</option>
                  {data.map(item => (
                    <option value={item.id} key={item.id}>{item.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};


