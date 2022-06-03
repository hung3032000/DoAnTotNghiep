import OrderListInfo from 'components/admin/order/OrderListInfo';
import { Box, Card, Checkbox, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core';
import { unwrapResult } from '@reduxjs/toolkit';
import { getOrderAdmin } from 'slice/OrderSlice';
import moment from 'moment';
import { useEffect, useState,useMemo } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import { formatPrice } from 'utils';
import Loader from 'components/fullPageLoading';
import Pagination from 'components/web/pagination';
let PageSize = 5;
function OrderHistoryResults() {
  const [loading, setLoading] = useState(false);
  const dataOrderCList = useSelector((state) => state.order.data);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const action = getOrderAdmin({
          page: 1,
          limit: 100,
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

                    <TableCell>{order.userId.email}</TableCell>
                    <TableCell>{formatPrice(order.totalPrice)}</TableCell>
                    <TableCell>{order.userId.email}</TableCell>
                    <TableCell>{moment(order.createdAt).format('DD/MM/YYYY')}</TableCell>
                    <TableCell>{order.status}</TableCell>
                    <TableCell>
                      <OrderListInfo order={order} />
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

export default OrderHistoryResults;
