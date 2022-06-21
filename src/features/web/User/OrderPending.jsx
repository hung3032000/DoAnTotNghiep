import { unwrapResult } from '@reduxjs/toolkit';
import Loader from 'components/fullPageLoading';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderCompleteUser } from 'slice/OrderSlice';
import OrderUser from "components/web/orderUser";
import { useSnackbar } from 'notistack';


const OrderPending = function () {
  const dataOrderList = useSelector((state) => state.order.dataComplete);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const action = getOrderCompleteUser({
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
  return (
    <>
      <Loader showLoader={loading} />
      <OrderUser dataOrderList={dataOrderList} label="Chờ vận chuyển" orderComplete={true}/>
    </>
  );
};

export default OrderPending;
