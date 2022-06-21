import OrderListResults from 'components/admin/order/OrderListResults';
import OrderListToolbar from 'components/admin/order/OrderListToolbar';
import React from 'react';
import Common from './Common';
import { getOrderAdmin } from 'slice/OrderSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Loader from 'components/fullPageLoading';
import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';

function OrderHistory() {
  const [loading, setLoading] = useState(false);

  const dataOrderCList = useSelector((state) => state.order.data);
  const dispatch = useDispatch();
  const [status, setStatus] = useState('Cancel');
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const action = getOrderAdmin();
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

  var filterSuggestions = dataOrderCList.filter(function (el) {
    return el.status === status;
  });
  // const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    setOrderList(filterSuggestions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);
  const [orderHistoryList, setOrderList] = useState(filterSuggestions);
  const count = { status: status, count: filterSuggestions.length };
  return (
    <>
      <Loader showLoader={loading} />
      <Common
        title="Quản lý lịch sử đơn hàng"
        toolbar={<OrderListToolbar data={filterSuggestions} setStatus={setStatus} setOrderList={setOrderList} size={count} history={true} />}
        listResults={<OrderListResults dataOrderCList={orderHistoryList.length === 0 ? filterSuggestions : orderHistoryList} orderHistory={true} status={status} />}
      />
      ;
    </>
  );
}

export default OrderHistory;
