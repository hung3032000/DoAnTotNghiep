import { Box, Container, Grid } from '@material-ui/core';
import { unwrapResult } from '@reduxjs/toolkit';
import LatestOrders from 'components/admin/dashboard/LatestOrders';
import LatestProducts from 'components/admin/dashboard/LatestProducts';
import TotalCustomers from 'components/admin/dashboard/TotalCustomers';
import Loader from 'components/fullPageLoading';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { getLastedOrder, getTopProduct, getTotalField } from 'slice/StaticSlice';
function Dashboard() {
  const [loading, setLoading] = useState(false);
  const orderLastedList = useSelector((state) => state.static.orderLasted);
  const topProductList = useSelector((state) => state.static.topProduct);
  const totalFieldList = useSelector((state) => state.static.totalField);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const lastedOrder = getLastedOrder();
        const resultAction = await dispatch(lastedOrder);
        unwrapResult(resultAction);

        const totalField = getTotalField();
        const resultActionTotalField = await dispatch(totalField);
        unwrapResult(resultActionTotalField);

        const topProduct = getTopProduct();
        const resultActionTopProduct = await dispatch(topProduct);
        unwrapResult(resultActionTopProduct);
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

      <Helmet>
        <title>Trang chủ admin</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3,
        }}
      >
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <TotalCustomers data={totalFieldList.getTotalOrderCompleteDay} label="Đơn hoàn thành trong ngày" />
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <TotalCustomers data={totalFieldList.totalUser} label="Tổng người dùng" />
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <TotalCustomers data={totalFieldList.getTotalOrderWaitingShipping} label="Tổng đơn đang chờ" />
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <TotalCustomers sx={{ height: '100%' }} data={totalFieldList.totalOrderByDay} label="Tổng đơn trong ngày" />
            </Grid>
            <Grid item lg={4} md={6} xl={3} xs={12}>
              <LatestProducts sx={{ height: '100%' }} data={topProductList.listProduct} label="Sản phẩm bán chạy" />
            </Grid>
            <Grid item lg={8} md={12} xl={9} xs={12}>
              <LatestOrders data={orderLastedList.orderlist} label="Đơn hàng mới nhất" />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

export default Dashboard;
