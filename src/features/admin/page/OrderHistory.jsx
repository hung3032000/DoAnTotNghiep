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
  const [status, setStatus] = useState('Cancel');
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const action = getOrderAdmin({
          status: status,
        });
        const resultAction = await dispatch(action);
        unwrapResult(resultAction);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [dispatch,status]);
  // const { enqueueSnackbar } = useSnackbar();  
  const count = {status: status, count: dataOrderCList.length}
  return (
    <>
      <Loader showLoader={loading} />
      <Common title="Quản lý đơn hàng" toolbar={<OrderListToolbar setStatus={setStatus} size={count} history={true} />} listResults={<OrderListResults dataOrderCList={dataOrderCList} orderHistory={true} />} />;
    </>
  );
}

export default OrderHistory;
