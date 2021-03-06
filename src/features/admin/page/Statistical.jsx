import { Box, Container, Grid } from '@material-ui/core';
import { unwrapResult } from '@reduxjs/toolkit';
import TotalCustomers from 'components/admin/dashboard/TotalCustomers';
import StatisticalResults from 'components/admin/statistical/StatisticalResults';
import StatisticalToolbar from 'components/admin/statistical/StatisticalToolbar';
import Loader from 'components/fullPageLoading';
import { useSnackbar } from 'notistack';
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
  const { enqueueSnackbar } = useSnackbar();
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
        enqueueSnackbar(error.message, { variant: 'error' });
      } finally {
        setLoading(false);
      }
    })();
  }, [dispatch, enqueueSnackbar]);

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
              <TotalCustomers data={dataProductList.productList?.length} label="S??? s???n ph???m b??n ???????c" />
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <TotalCustomers data={`${formatPrice(dataProductList.totalTurnover)}`} label="T???ng ti???n" />
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <TotalCustomers data={dataOrderList.listOrder?.length} label="T???ng ????n h??ng ho??n th??nh" />
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <TotalCustomers sx={{ height: '100%' }} data={`${formatPrice(dataOrderList.totalTurnover)}`} label="T???ng ti???n ????n h??ng" />
            </Grid>
          </Grid>
        </Container>
        <Common
          title="Qu???n l?? ng?????i d??ng"
          toolbar={<StatisticalToolbar data={statistical} setStatistical={setStatistical} setStatus={setStatus} setSearch={setSearch} />}
          listResults={<StatisticalResults status={status} search={search} dataStatistical={statistical ? statistical : []} />}
        />
      </Box>
    </>
  );
}

export default Statistical;
