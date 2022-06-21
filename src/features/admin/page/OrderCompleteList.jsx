import OrderListResults from 'components/admin/order/OrderListResults';
import OrderListToolbar from 'components/admin/order/OrderListToolbar';
import React from 'react';
import Common from './Common';
import { getOrderCompleteAdmin } from 'slice/OrderSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Loader from 'components/fullPageLoading';
import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
function OrderListComplete() {
  const [loading, setLoading] = useState(false);
  const dataOrderCList = useSelector((state) => state.order.dataComplete);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const action = getOrderCompleteAdmin({
          status: 'Waitting',
        });
        const resultAction = await dispatch(action);
        unwrapResult(resultAction);
      } catch (error) {
        console.log(error);
      enqueueSnackbar(error.message, { variant: 'error' });

      } finally {
        setLoading(false);
      }
    })();
  }, [dispatch, enqueueSnackbar]);
  // const { enqueueSnackbar } = useSnackbar();
  const [orderList, setOrderList] = useState(dataOrderCList);
  return (
    <>
      <Loader showLoader={loading} />
      <Common
        title="Quản lý đơn hàng"
        toolbar={<OrderListToolbar data={dataOrderCList} setOrderList={setOrderList} orderComplete={true}/>}
        listResults={<OrderListResults dataOrderCList={orderList.length === 0 ? dataOrderCList : orderList} orderComplete={true} />}
      />
      ;
    </>
  );
}

export default OrderListComplete;
