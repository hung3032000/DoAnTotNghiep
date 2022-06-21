import { unwrapResult } from '@reduxjs/toolkit';
import Loader from 'components/fullPageLoading';
import OrderUser from 'components/web/orderUser';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderCompleteUser } from 'slice/OrderSlice';

const OrderComplete = function () {
  const dataOrderList = useSelector((state) => state.order.dataComplete);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const action = getOrderCompleteUser({
          status: 'Done',
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
  return (
    <>
      <Loader showLoader={loading} />
      <OrderUser dataOrderList={dataOrderList} label="Hoàn thành" orderComplete={true} />
    </>
  );
};

export default OrderComplete;
