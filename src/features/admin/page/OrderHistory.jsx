import OrderListResults from 'components/admin/order/OrderListResults';
import OrderListToolbar from 'components/admin/order/OrderListToolbar';
import React from 'react';
import Common from './Common';
import { getOrderAdmin } from 'slice/OrderSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Loader from 'components/fullPageLoading';
import { unwrapResult } from '@reduxjs/toolkit';

function OrderHistory() {
  const [loading, setLoading] = useState(false);
  const dataOrderCList = useSelector((state) => state.order.data);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const action = getOrderAdmin({
          status: 'Cancel',
          // eslint-disable-next-line no-dupe-keys
          status: 'Done',
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
      <Common title="Quản lý đơn hàng" toolbar={<OrderListToolbar />} listResults={<OrderListResults dataOrderCList={dataOrderCList} orderHistory={true}/>} />;
    </>
  );
}

export default OrderHistory;
