import React from 'react';
import { toastr } from 'react-redux-toastr';

export const Toast = (uploadImageSuccess, createSuccess, updateSuccess, deleteSuccess) => {
  if (uploadImageSuccess)
    toastr.success('Thông báo', 'Upload hình ảnh thành công!');
  if (uploadImageSuccess === false)
    toastr.warning('Thông báo', 'Upload hình ảnh thất bại!');
  if (createSuccess)
    toastr.success('Thông báo', 'Thêm thành công!');
  if (createSuccess === false)
    toastr.warning('Thông báo', 'Thêm thất bại!');
  if (updateSuccess)
    toastr.success('Thông báo', 'Sửa thành công!');
  if (updateSuccess === false)
    toastr.warning('Thông báo', 'Sửa thất bại!');
  if (deleteSuccess)
    toastr.success('Thông báo', 'Xóa thành công!');
  if (deleteSuccess === false)
    toastr.warning('Thông báo', 'Xóa thất bại!');
};


