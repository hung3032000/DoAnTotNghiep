import { Box, Card, Checkbox, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Typography ,IconButton} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import { unwrapResult } from '@reduxjs/toolkit';
import OrderListInfo from 'components/admin/order/OrderListInfo';
import { deleteOrderAdmin, getOrderAdmin, addOrderCompleteAdmin } from 'slice/OrderSlice';
import moment from 'moment';
import { useEffect, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import { formatPrice } from 'utils';
import { useSnackbar } from 'notistack';
import Loader from 'components/fullPageLoading';

function OrderListResults() {
  const [loading, setLoading] = useState(false);

  const dataOrderCList = useSelector((state) => state.order.data);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const action = getOrderAdmin({
          page: 1,
          limit: 20,
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
      window.location.reload();
      enqueueSnackbar('Thêm Thành công', { variant: 'success' });
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.message, { variant: 'error' });
    } finally {
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
      window.location.reload();
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.message, { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = dataOrderCList.map((orderList) => orderList.id);
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

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
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
                  <TableCell>Tổng Giá</TableCell>
                  <TableCell>Địa chỉ nhận hàng</TableCell>
                  <TableCell>Ngày tạo</TableCell>
                  <TableCell>Trạng thái</TableCell>
                  <TableCell/>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataOrderCList.slice(0, limit).map((order) => (
                  <TableRow hover key={order._id} selected={selectedCustomerIds.indexOf(order.id) !== -1}>
                    <TableCell padding="checkbox">
                      <Checkbox checked={selectedCustomerIds.indexOf(order.id) !== -1} onChange={(event) => handleSelectOne(event, order.id)} value="true" />
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

                    <TableCell>{order.userId.email}</TableCell>
                    <TableCell>{formatPrice(order.totalPrice)}</TableCell>
                    <TableCell>{order.userId.email}</TableCell>
                    <TableCell>{moment(order.createdAt).format('DD/MM/YYYY')}</TableCell>
                    <TableCell>{order.status}</TableCell>
                    <TableCell>
                      <IconButton
                        className="mgr-10"
                        color="primary"
                        aria-label="edit"
                        onClick={() => {
                          handleOnComplete(order);
                        }}
                      >
                        <CheckIcon />
                      </IconButton>
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
                      <OrderListInfo order={order} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
        <TablePagination
          component="div"
          count={dataOrderCList.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Card>
    </>
  );
}

export default OrderListResults;
