import React from 'react';
import { compose } from 'recompose'

const AccountIndex = () => {
  return (
    <div>
      this is account index page
    </div>
  );
};

const EnhanceAccountIndex = compose()(AccountIndex);
export default EnhanceAccountIndex;
