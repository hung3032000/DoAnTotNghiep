import { Box, Container, Grid } from '@material-ui/core';
import { unwrapResult } from '@reduxjs/toolkit';
import TotalCustomers from 'components/admin/dashboard/TotalCustomers';
import StatisticalResults from 'components/admin/statistical/StatisticalResults';
import StatisticalToolbar from 'components/admin/statistical/StatisticalToolbar';
import Loader from 'components/fullPageLoading';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderList, getProductList } from 'slice/StaticSlice';
import { formatPrice } from 'utils';
import Common from './Common';

function Statistical() {
  const [loading, setLoading] = useState(false);
  const [statistical, setStatistical] = useState([]);
  const [search, setSearch] = useState([]);
  const [status, setStatus] = useState('product');
  const dispatch = useDispatch();
  const dataProductList = useSelector((state) => state.static.productListStatic);
  const dataOrderList = useSelector((state) => state.static.orderListStatic);
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

  useEffect(() => {
    if (status === 'product') {
      setStatistical(dataProductList.productList);
    }
    if (status === 'order') {
      setStatistical(dataOrderList.listOrder);
    }
  }, [dataOrderList, dataProductList, status]);



  return (
    <>
      <Loader showLoader={loading} />
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
              <TotalCustomers data={dataProductList.productList?.length} label="Số sản phẩm bán được" />
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <TotalCustomers data={`${formatPrice(dataProductList.totalTurnover)}`} label="Tổng tiền" />
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <TotalCustomers data={dataOrderList.listOrder?.length} label="Tổng đơn hàng hoàn thành" />
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <TotalCustomers sx={{ height: '100%' }} data={`${formatPrice(dataOrderList.totalTurnover)}`} label="Tổng tiền đơn hàng" />
            </Grid>
          </Grid>
        </Container>
        <Common
          title="Quản lý người dùng"
          toolbar={<StatisticalToolbar data={statistical} setStatistical={setStatistical} setStatus={setStatus} setSearch={setSearch} />}
          listResults={<StatisticalResults status={status} search={search}  dataStatistical={statistical ? statistical : []} />}
        />
      </Box>
    </>
  );
}

export default Statistical;
