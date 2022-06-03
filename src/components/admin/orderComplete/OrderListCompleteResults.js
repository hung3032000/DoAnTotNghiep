import { Box, Card, Checkbox, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core';
import { unwrapResult } from '@reduxjs/toolkit';
import OrderListInfo from 'components/admin/order/OrderListInfo';
import { getOrderCompleteAdmin, statusOrderComplete } from 'slice/OrderSlice';
import moment from 'moment';
import { useEffect, useState,useMemo } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import { formatPrice } from 'utils';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import { useSnackbar } from 'notistack';
import Loader from 'components/fullPageLoading';
import Pagination from 'components/web/pagination';
let PageSize = 5;
function OrderListCompleteResults(props) {
  const [loading, setLoading] = useState(false);

  const dataOrderCList = useSelector((state) => state.order.dataComplete);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const action = getOrderCompleteAdmin({
          limit: 100000,
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
  const handleOnComplete = async (id) => {
    try {
      setLoading(true);
      const action = statusOrderComplete(id, { status: 'Done' });
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);
      enqueueSnackbar('Thêm Thành công', { variant: 'success' });
      window.location.reload();
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
      const action = statusOrderComplete(id, { status: 'Cancel' });
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);
      window.location.reload();
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.message, { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);


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

  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return dataOrderCList.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, dataOrderCList]);
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
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentTableData.map((order) => (
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

                    <TableCell>{order.orderId.addressrecevie.name}</TableCell>
                    <TableCell>{formatPrice(order.totalPrice)}</TableCell>
                    <TableCell>{order.orderId.addressrecevie.address}</TableCell>
                    <TableCell>{moment(order.createdAt).format('DD/MM/YYYY')}</TableCell>
                    <TableCell>{order.status}</TableCell>
                    <TableCell>
                      <IconButton
                        className="mgr-10"
                        color="primary"
                        aria-label="edit"
                        onClick={() => {
                          handleOnComplete(order._id);
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
                      <OrderListInfo order={order.orderId} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
        <Pagination
          className="pagination cursor"
          currentPage={currentPage}
          totalCount={dataOrderCList.length}
          pageSize={PageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </Card>
    </>
  );
}

export default OrderListCompleteResults;
