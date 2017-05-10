import React from 'react';
import { toastr } from 'react-redux-toastr';

export const Toast = (createSuccess, updateSuccess, deleteSuccess) => {
  if (createSuccess) {
    toastr.clean();
    toastr.success('Notification', 'Created successfully!');
  }
  if (createSuccess === false) {
    toastr.clean();
    toastr.warning('Notification', 'Created failure!');
  }

  if (updateSuccess) {
    toastr.clean();
    toastr.success('Notification', 'Updated successfully!');
  }
  if (updateSuccess === false) {
    toastr.clean();
    toastr.warning('Notification', 'Updated failure!');
  }

  if (deleteSuccess) {
    toastr.clean();
    toastr.success('Notification', 'Delete successfully!');
  }
  if (deleteSuccess === false) {
    toastr.clean();
    toastr.warning('Notification', 'Delete failure!');
  }
};


