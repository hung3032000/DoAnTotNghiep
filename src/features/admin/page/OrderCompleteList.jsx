import OrderListResults from 'components/admin/order/OrderListResults';
import OrderListToolbar from 'components/admin/order/OrderListToolbar';
import React from 'react';
import Common from './Common';
import { getOrderCompleteAdmin } from 'slice/OrderSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Loader from 'components/fullPageLoading';
import { unwrapResult } from '@reduxjs/toolkit';
function OrderListComplete() {
  const [loading, setLoading] = useState(false);
  const dataOrderCList = useSelector((state) => state.order.dataComplete);
  const dispatch = useDispatch();

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
      } finally {
        setLoading(false);
      }
    })();
  }, [dispatch]);
  // const { enqueueSnackbar } = useSnackbar();
  return (
    <>
      <Loader showLoader={loading} />
      <Common title="Quản lý đơn hàng" toolbar={<OrderListToolbar />} listResults={<OrderListResults dataOrderCList={dataOrderCList} orderComplete={true} />} />;
    </>
  );
}

export default OrderListComplete;
