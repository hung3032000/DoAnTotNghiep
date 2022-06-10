import OrderListResults from 'components/admin/order/OrderListResults';
import OrderListToolbar from 'components/admin/order/OrderListToolbar';
import React from 'react';
import Common from './Common';
import { getOrderAdmin } from 'slice/OrderSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Loader from 'components/fullPageLoading';
import { unwrapResult } from '@reduxjs/toolkit';

function OrderList() {
  const [loading, setLoading] = useState(false);
  const dataOrderCList = useSelector((state) => state.order.data);
  const dispatch = useDispatch();
  // const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const action = getOrderAdmin({
          status: 'Pending',
        });
        const resultAction = dispatch(action);
        unwrapResult(resultAction);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [dispatch]);
  const [orderList, setOrderList] = useState(dataOrderCList);

  return (
    <>
      <Loader showLoader={loading} />
      <Common
        title="Quản lý đơn hàng"
        toolbar={<OrderListToolbar data={dataOrderCList} setOrderList={setOrderList} />}
        listResults={<OrderListResults dataOrderCList={orderList.length === 0 ? dataOrderCList : orderList} />}
      />
      ;
    </>
  );
}

export default OrderList;
