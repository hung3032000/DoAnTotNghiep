import UserListResults from 'components/admin/user/UserListResults';
import UserListToolbar from 'components/admin/user/UserListToolbar';
import React from 'react';
import Common from './Common';

function UserList() {
  return <Common title="Quản lý người dùng" toolbar={<UserListToolbar />} listResults={<UserListResults />} />;
}

export default UserList;
