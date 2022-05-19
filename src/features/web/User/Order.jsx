// import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import { unwrapResult } from '@reduxjs/toolkit';
import OrderListInfo from 'components/admin/order/OrderListInfo';
import { getOrder } from 'components/admin/order/OrderSlice';
import CustomerSp from 'components/web/customerSupport/CustomerSp';
import NavUser from 'components/web/NavUserPage/NavUser';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatPrice } from 'utils';
import { Helmet } from 'react-helmet';
import Loader from 'components/fullPageLoading';
const Order = function (props) {
  const dataOrderList = useSelector((state) => state.order.data);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const action = getOrder({
          page: 1,
          limit: 20,
          status: 'Pending',
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

  return (
    <>
      <Loader showLoader={loading} />
      <Helmet>
        <title>Đơn hàng</title>
      </Helmet>
      <main id="main" className="page-content clearfix" style={{ marginTop: '128px' }}>
        <div className="cart-live-region" aria-live="polite" role="status"></div>
        <div className="container">
          <NavUser />
        </div>
        <div id="primary" className="primary-content">
          <div className="orders-history">
            <div className="page-header">
              <h1>
                <span className="subtitle">Tài khoản của tôi</span> <span className="title">Đơn hàng</span>
              </h1>
            </div>
            {dataOrderList.length === 0 && <div className="container no-orders">Hiện tại chưa có đơn hàng</div>}
            {dataOrderList.length > 0 && (
              <div className="container" style={{ marginBottom: '30px' }}>
                <TableContainer component={Paper}>
                  <Table aria-label="collapsible table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>Địa chỉ email</TableCell>
                        <TableCell>Tổng giá</TableCell>
                        <TableCell>Ngày tạo đơn</TableCell>
                        <TableCell>Trạng thái</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {dataOrderList.map((order) => (
                        <TableRow hover key={order._id}>
                          <TableCell>
                            <Box
                              sx={{
                                alignItems: 'center',
                                display: 'flex',
                              }}
                            >
                              <Typography color="textPrimary" variant="body1">
                                {order._id}
                              </Typography>
                            </Box>
                          </TableCell>

                          <TableCell>{order.userId.email}</TableCell>
                          <TableCell>{formatPrice(order.totalPrice)}</TableCell>
                          {/* <TableCell>{order.userId.email}</TableCell> */}
                          <TableCell>{moment(order.createdAt).format('DD/MM/YYYY')}</TableCell>
                          <TableCell>{order.status}</TableCell>
                          <TableCell>
                            {/* <Fab
                            className="mgr-10"
                            color="primary"
                            aria-label="edit"
                            onClick={() => {
                              handleOnComplete(order);
                            }}
                          >
                            <CheckIcon />
                          </Fab>
                          <Fab
                            className="mgr-10"
                            color="secondary"
                            aria-label="delete"
                            onClick={() => {
                              handleOnCancel(order._id);
                            }}
                          >
                            <ClearIcon />
                          </Fab> */}
                            <OrderListInfo order={order} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            )}
          </div>
          <CustomerSp />
        </div>
      </main>
    </>
  );
};

export default Order;
