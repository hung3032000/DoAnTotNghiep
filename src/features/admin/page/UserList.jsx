import UserListResults from 'components/admin/user/UserListResults';
import UserListToolbar from 'components/admin/user/UserListToolbar';
import React, { useState } from 'react';
import Common from './Common';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllUser } from 'slice/userSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import Loader from 'components/fullPageLoading';

function UserList() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const dataUserList = useSelector((state) => state.user.userList);
  const [userList, setUserList] = useState(dataUserList);
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const action = getAllUser();
        const resultAction = await dispatch(action);
        unwrapResult(resultAction);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [dispatch]);
  return (
    <>
      <Loader showLoader={loading} />
      <Common
        title="Quản lý người dùng"
        toolbar={<UserListToolbar data={dataUserList} setUserList={setUserList} />}
        listResults={<UserListResults dataUserList={userList.length === 0 ? dataUserList : userList} />}
      />
    </>
  );
}

export default UserList;
