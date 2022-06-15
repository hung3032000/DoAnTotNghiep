import UserListResults from 'components/admin/user/UserListResults';
import UserListToolbar from 'components/admin/user/UserListToolbar';
import React, { useState } from 'react';
import Common from './Common';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getOrderList,getProductList } from 'slice/StaticSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import Loader from 'components/fullPageLoading';

Statistical.propTypes = {};

function Statistical(props) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const dataUserList = useSelector((state) => state.user.userList);
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const action = getOrderList();
        const resultAction = await dispatch(action);
        unwrapResult(resultAction);
        const actionGet = getProductList();
        const resultActionGet = await dispatch(actionGet);
        unwrapResult(resultActionGet);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [dispatch]);
  const [userList, setUserList] = useState(dataUserList);
  return (
    <>
      <Loader showLoader={loading} />
      <Common
        title="Thống kê"
        toolbar={<UserListToolbar data={dataUserList} setUserList={setUserList} />}
        listResults={<UserListResults dataUserList={userList.length === 0 ? dataUserList : userList} />}
      />
    </>
  );
}

export default Statistical;
