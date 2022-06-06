import { Box, Card, Checkbox, Table, TableBody, TableCell, TableHead, TableRow, Typography, IconButton } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import { unwrapResult } from '@reduxjs/toolkit';
import OrderListInfo from 'components/admin/order/OrderListInfo';
import { deleteOrderAdmin, addOrderCompleteAdmin, statusOrderComplete } from 'slice/OrderSlice';
import { useDispatch } from 'react-redux';
import { useState, useMemo } from 'react';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { formatPrice } from 'utils';
import { useSnackbar } from 'notistack';
import Loader from 'components/fullPageLoading';
import Pagination from 'components/web/pagination';
import PropTypes from 'prop-types';
let PageSize = 5;
OrderListResults.propTypes = {
  dataOrderCList: PropTypes.array.isRequired,
  orderComplete: PropTypes.bool,
  orderHistory: PropTypes.bool,
};

function OrderListResults(props) {
  const [loading, setLoading] = useState(false);
  const { dataOrderCList, orderComplete, orderHistory } = props;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  let data = [];
  if (orderComplete) {
    dataOrderCList.forEach((element) => {
      data.push({ _id: element._id, dataOrder: element.orderId });
    });
  } else {
    dataOrderCList.forEach((element) => {
      data.push({ _id: element._id, dataOrder: element });
    });
  }
  console.log(dataOrderCList);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleOnComplete = async (order) => {
    try {
      setLoading(true);
      const data = {};
      data.orderId = order._id;
      data.shiprice = 10000;
      data.totalPrice = order.totalPrice;
      const action = addOrderCompleteAdmin(data);
      const resultAction = dispatch(action);
      unwrapResult(resultAction);
      enqueueSnackbar('Thêm Thành công', { variant: 'success' });
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.message, { variant: 'error' });
    } finally {
      setTimeout(() => window.location.reload(), 1000);
      setLoading(false);
    }
  };

  const handleOnCancel = async (id) => {
    try {
      setLoading(true);
      const action = deleteOrderAdmin(id);
      const resultAction = dispatch(action);
      unwrapResult(resultAction);
      enqueueSnackbar('Huỷ Thành công', { variant: 'success' });
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.message, { variant: 'error' });
    } finally {
      setTimeout(() => window.location.reload(), 1000);
      setLoading(false);
    }
  };

  const handleOnHistoryOrder = async (order) => {
    try {
      setLoading(true);
      const action = statusOrderComplete(order._id);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);
      enqueueSnackbar('Thêm Thành công', { variant: 'success' });
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.message, { variant: 'error' });
    } finally {
      setTimeout(() => window.location.reload(), 1000);
      setLoading(false);
    }
  };

  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);

  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = data.map((orderList) => orderList.id);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCustomerIds.indexOf(id);
    let newSelectedCustomerIds = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds, id);
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(1));
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(0, selectedIndex), selectedCustomerIds.slice(selectedIndex + 1));
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, data]);
  return (
    <>
      <Loader showLoader={loading} />
      <Card>
        <PerfectScrollbar>
          <Box sx={{ minWidth: 1050 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedCustomerIds.length === dataOrderCList.length}
                      color="primary"
                      indeterminate={selectedCustomerIds.length > 0 && selectedCustomerIds.length < dataOrderCList.length}
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell>Id đơn hàng</TableCell>
                  <TableCell>Người đặt hàng</TableCell>
                  <TableCell>Địa chỉ nhận hàng</TableCell>
                  <TableCell>Tổng Giá</TableCell>
                  <TableCell>Ngày tạo</TableCell>
                  <TableCell>Trạng thái</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {currentTableData.map((order) => (
                  <TableRow hover key={order._id} selected={selectedCustomerIds.indexOf(order._id) !== -1}>
                    <TableCell padding="checkbox">
                      <Checkbox checked={selectedCustomerIds.indexOf(order._id) !== -1} onChange={(event) => handleSelectOne(event, order._id)} value="true" />
                    </TableCell>
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
                    <TableCell>{order.dataOrder.userId.email}</TableCell>
                    <TableCell>{order.dataOrder.addressrecevie.address}</TableCell>
                    <TableCell>{formatPrice(order.dataOrder.totalPrice)}</TableCell>
                    <TableCell>{moment(order.dataOrder.createdAt).format('DD/MM/YYYY')}</TableCell>
                    {orderComplete ? <TableCell>Waiting</TableCell> : <TableCell>{order.dataOrder.status}</TableCell>}
                    <TableCell>
                      {orderHistory ? (
                        ''
                      ) : (
                        <>
                          {orderComplete ? (
                            <IconButton
                              className="mgr-10"
                              color="primary"
                              aria-label="edit"
                              onClick={() => {
                                handleOnHistoryOrder(order);
                              }}
                            >
                              <CheckIcon />
                            </IconButton>
                          ) : (
                            <IconButton
                              className="mgr-10"
                              color="primary"
                              aria-label="edit"
                              onClick={() => {
                                handleOnComplete(order.dataOrder);
                              }}
                            >
                              <CheckIcon />
                            </IconButton>
                          )}
                          <IconButton
                            className="mgr-10"
                            color="secondary"
                            aria-label="delete"
                            onClick={() => {
                              handleOnCancel(order._id);
                            }}
                          >
                            <ClearIcon />
                          </IconButton>
                        </>
                      )}
                      <OrderListInfo order={order.dataOrder} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
        <Pagination className="pagination cursor" currentPage={currentPage} totalCount={data.length} pageSize={PageSize} onPageChange={(page) => setCurrentPage(page)} />
      </Card>
    </>
  );
}

export default OrderListResults;
